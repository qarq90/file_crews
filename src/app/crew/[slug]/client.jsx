"use client";

import { MdGroups } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { useUIStore } from "@/stores/UIStore";
import { deleteFile } from "@/actions/fileActions";
import { NoFiles } from "@/components/empty/NoFiles";
import { fetchCrewFiles } from "@/actions/fileActions";
import { Loading } from "@/components/loaders/Loading";
import { disbandCrew, fetchCrew } from "@/actions/crewActions";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie";
import Title from "@/components/ui/Title";
import Label from "@/components/ui/Label";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

const Client = ({ crew_id }) => {
  const router = useRouter();

  const [crewData, setCrewData] = useState(null);
  const [crewFiles, setCrewFiles] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // const [isDeleteCrew, setIsDeleteCrew] = useState(false);
  const [isEraseEvidence, setIsEraseEvidence] = useState(false);
  const [isConfirmDelete, setIsConfirmDelete] = useState(false);

  const { setIsUseLoading } = useUIStore();

  const getCrewData = async () => {
    try {
      const crew_data = await fetchCrew(crew_id);
      setCrewData(crew_data.result[0]);
      const crew_files = await fetchCrewFiles(crew_id);
      setCrewFiles(crew_files.result);
    } catch (error) {
      console.error("Error fetching crew data or files:", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    getCrewData();
  }, [crew_id]);

  const deletePopUp = (e, file) => {
    e.preventDefault();
    setDeleteFileState(file);
    setIsConfirmDelete(true);
  };

  const deleteHandler = async (file_id) => {
    try {
      setIsUseLoading(true);
      const bufferData = deleteFileState.file_data.data;
      const decodedString = new TextDecoder().decode(
        new Uint8Array(bufferData),
      );
      const isHttpLink = decodedString.startsWith("http");
      const key = decodedString.split("/").pop();
      await deleteFile(crew_id, file_id, key, isHttpLink);
      setIsConfirmDelete(false);
      getCrewData();
      setIsUseLoading(false);
    } catch (error) {
      console.error("Error deleting file:", error.message);
    }
  };

  // const disbandHandler = async () => {
  //   setIsLoading(true);
  //   try {
  //     await disbandCrew(crew_id);
  //     router.push(`/crews`);
  //   } catch (error) {
  //     console.error("Error disbanding crew data or files:", error);
  //   } finally {
  //     setTimeout(() => {
  //       setIsLoading(false);
  //     }, 2000);
  //   }
  // };

  const evidenceHandler = async () => {
    setIsLoading(true);
    try {
      Cookies.remove(`${crewData.crew_name}_Session`);
      router.push(`/crews`);
    } catch (error) {
      console.error("Error disbanding crew data or files:", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  if (isLoading)
    return (
      <div className="mt-5">
        <div className="flex h-12 justify-between gap-4">
          <div className="flex h-full flex-col items-center gap-4 md:flex-row">
            <Link
              href={`/crews`}
              className="fixed bottom-5 left-5 flex h-12 items-center justify-center gap-2 rounded-md bg-foreground px-4 py-2 text-xl text-background transition duration-200 ease-in-out hover:opacity-85 disabled:opacity-50 md:relative md:bottom-auto md:left-0 md:right-auto md:top-0 md:mt-0 md:transform-none"
            >
              <FaArrowLeft />
            </Link>
            <div className="flex w-[22.5rem] items-center justify-center gap-4 rounded-lg bg-hover p-4 sm:justify-center md:justify-start md:bg-transparent md:p-0">
              {crewData?.crew_banner?.base64 ? (
                <Image
                  src={crewData.crew_banner.base64}
                  className="h-12 w-12 rounded-full object-cover"
                  alt="crew_banner"
                  width={75}
                  height={75}
                />
              ) : (
                <MdGroups size={65} />
              )}
              <Title>{crewData?.crew_name || "Crew"}</Title>
            </div>
          </div>
          <div className="flex gap-3">
            <Link
              className="absolute right-4 top-5 md:relative md:left-0 md:top-0 md:flex md:justify-center"
              href={`/crew/${crew_id}/edit`}
            >
              <Button disabled={true}>Edit Crew</Button>
            </Link>
            <div
              onClick={() => setIsEraseEvidence(true)}
              className="absolute right-[9.25rem] top-5 md:relative md:left-0 md:top-0 md:flex md:justify-center"
            >
              <Button disabled={true}>Erase Evidence</Button>
            </div>
          </div>
        </div>
        <Loading />
      </div>
    );

  if (!crewFiles || crewFiles.length === 0) {
    return (
      <>
        <div className="mt-5">
          <div className="flex h-12 justify-between gap-4">
            <div className="flex h-full flex-col items-center gap-4 md:flex-row">
              <Link
                href={`/crews`}
                className="fixed bottom-5 left-5 flex h-12 items-center justify-center gap-2 rounded-md bg-foreground px-4 py-2 text-xl text-background transition duration-200 ease-in-out hover:opacity-85 disabled:opacity-50 md:relative md:bottom-auto md:left-0 md:right-auto md:top-0 md:mt-0 md:transform-none"
              >
                <FaArrowLeft />
              </Link>
              <div className="flex w-[22.5rem] items-center justify-center gap-4 rounded-lg bg-hover p-4 md:justify-start md:bg-transparent md:p-0">
                {crewData?.crew_banner?.base64 ? (
                  <Image
                    src={crewData.crew_banner.base64}
                    className="h-12 w-12 rounded-full object-cover"
                    alt="crew_banner"
                    width={75}
                    height={75}
                  />
                ) : (
                  <MdGroups size={65} />
                )}
                <Title>{crewData?.crew_name || "Crew"}</Title>
              </div>
            </div>
            <div className="flex gap-3">
              <Link
                className="absolute right-4 top-5 md:relative md:left-0 md:top-0 md:flex md:justify-center"
                href={`/crew/${crew_id}/edit`}
              >
                <Button>Edit Crew</Button>
              </Link>
              <div
                onClick={() => setIsEraseEvidence(true)}
                className="absolute right-[9.25rem] top-5 md:relative md:left-0 md:top-0 md:flex md:justify-center"
              >
                <Button>Erase Evidence</Button>
              </div>
            </div>
          </div>
          <NoFiles />
          <div className="mt-4 flex w-full flex-col items-center justify-center gap-4">
            <div className="text-center">
              <Label className="text-sm">
                Create a new file to share with your crew.
              </Label>
            </div>
            <div className="flex gap-4">
              <Link href={`/create-file/${crew_id}`}>
                <Button>Create File</Button>
              </Link>
              <Link href={`/upload-file/${crew_id}`}>
                <Button>Upload File</Button>
              </Link>
            </div>
          </div>
        </div>
        {/* {isDeleteCrew && (
          <Modal isOpen={isDeleteCrew}>
            <div className="flex flex-col justify-center gap-4 text-center">
              <Title>⚠️</Title>
              <div className="text-center">
                <Label>Are you sure you want to disband this Crew?</Label>
                <br />
                <Label>This action is not reversible.</Label>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => setIsEraseEvidence(false)}>Close</Button>
                <Button onClick={disbandHandler}>Disband</Button>
              </div>
            </div>
          </Modal>
        )} */}
        {isEraseEvidence && (
          <Modal isOpen={isEraseEvidence}>
            <div className="flex flex-col justify-center gap-4 text-center">
              <Title>⚠️</Title>
              <div className="text-center">
                <Label>You're about to erase all traces of this crew.</Label>
                <br />
              </div>
              <div className="flex gap-2">
                <Button onClick={() => setIsEraseEvidence(false)}>
                  Walk Away
                </Button>
                <Button onClick={evidenceHandler}>Do it</Button>
              </div>
            </div>
          </Modal>
        )}
      </>
    );
  }

  return (
    <>
      <div className="mt-5">
        <div className="flex h-12 justify-between gap-4">
          <div className="flex h-full flex-col items-center gap-4 md:flex-row">
            <Link
              href={`/crews`}
              className="fixed bottom-5 left-5 flex h-12 items-center justify-center gap-2 rounded-md bg-foreground px-4 py-2 text-xl text-background transition duration-200 ease-in-out hover:opacity-85 disabled:opacity-50 md:relative md:bottom-auto md:left-0 md:right-auto md:top-0 md:mt-0 md:transform-none"
            >
              <FaArrowLeft />
            </Link>
            <div className="flex w-[22.5rem] items-center justify-center gap-4 rounded-lg bg-hover p-4 md:justify-start md:bg-transparent md:p-0">
              {crewData?.crew_banner?.base64 ? (
                <Image
                  src={crewData.crew_banner.base64}
                  className="h-12 w-12 rounded-full object-cover"
                  alt="crew_banner"
                  width={75}
                  height={75}
                />
              ) : (
                <MdGroups size={65} />
              )}
              <Title>{crewData?.crew_name || "Crew"}</Title>
            </div>
          </div>
          <div className="flex gap-3">
            <Link
              className="absolute right-4 top-5 md:relative md:left-0 md:top-0 md:flex md:justify-center"
              href={`/crew/${crew_id}/edit`}
            >
              <Button>Edit Crew</Button>
            </Link>
            <div
              onClick={() => setIsDeleteCrew(true)}
              className="absolute right-[9.25rem] top-5 md:relative md:left-0 md:top-0 md:flex md:justify-center"
            >
              <Button>Erase Evidence</Button>
            </div>
          </div>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-1 md:mt-8 md:grid-cols-4 md:gap-4">
          {crewFiles.map((file, index) => {
            const bufferData = file.file_data.data;
            const decodedString = new TextDecoder().decode(
              new Uint8Array(bufferData),
            );
            const isHttpLink = decodedString.startsWith("http");
            const fileExtension = file.file_name.split(".").pop();
            const fileOGName = file.file_name.split(".")[0];
            return (
              <div key={index}>
                <Link
                  href={
                    !isHttpLink
                      ? `/crew/${crew_id}/file/${file._id}`
                      : decodedString
                  }
                  target={!isHttpLink ? "_self" : "_blank"}
                  className="text-primary hover:text-primary-dark relative flex flex-col gap-4 rounded-lg bg-hover p-6 text-xl font-medium shadow-md transition-shadow duration-300 hover:shadow-xl hover:brightness-150 md:p-4"
                >
                  <Title>{fileOGName}</Title>
                  <div className="flex items-center gap-2">
                    <Label>
                      {!isHttpLink
                        ? `Type: ${file.file_type}`
                        : `Type: ${fileExtension}`}
                    </Label>
                  </div>
                  <div className="text-sm">
                    <p>
                      Uploaded:{" "}
                      {new Date(file.uploaded_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div
                    onClick={(e) => deletePopUp(e, file)}
                    className={clsx(
                      "rounded-sm bg-foreground p-1 text-background",
                      !isHttpLink
                        ? "hidden"
                        : "absolute bottom-6 right-6 scale-125 md:bottom-2 md:right-2 md:scale-100",
                    )}
                  >
                    <FaTrashCan />
                  </div>
                </Link>
                {isConfirmDelete && (
                  <Modal
                    isOpen={isConfirmDelete}
                    onClose={() => setIsConfirmDelete(false)}
                  >
                    <div className="flex flex-col justify-center gap-4 text-center">
                      <Title>Are you sure?</Title>
                      <p>
                        Do you want to delete the file{" "}
                        <strong>{deleteFileState.file_name}</strong>?
                      </p>
                      <div className="mt-2 flex gap-2">
                        <Button onClick={() => setIsConfirmDelete(false)}>
                          Cancel
                        </Button>
                        <Button
                          onClick={() => {
                            deleteHandler(deleteFileState._id);
                            setIsConfirmDelete(false);
                          }}
                        >
                          Confirm
                        </Button>
                      </div>
                    </div>
                  </Modal>
                )}
              </div>
            );
          })}
        </div>
        <div className="mt-4 flex w-full flex-col items-center justify-center gap-4">
          <div className="text-center">
            <Label className="text-sm">
              Create a new file to share with your crew.
            </Label>
          </div>
          <div className="flex gap-4">
            <Link href={`/create-file/${crew_id}`}>
              <Button>Create File</Button>
            </Link>
            <Link href={`/upload-file/${crew_id}`}>
              <Button>Upload File</Button>
            </Link>
          </div>
        </div>
      </div>
      {/* {isDeleteCrew && (
        <Modal isOpen={isDeleteCrew}>
          <div className="flex flex-col justify-center gap-4 text-center">
            <Title>⚠️</Title>
            <div className="text-center">
              <Label>Are you sure you want to disband this Crew?</Label>
              <br />
              <Label>This action is not reversible.</Label>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => setIsDeleteCrew(false)}>Close</Button>
              <Button onClick={disbandHandler}>Disband</Button>
            </div>
          </div>
        </Modal>
      )} */}
      {isEraseEvidence && (
        <Modal isOpen={isEraseEvidence}>
          <div className="flex flex-col justify-center gap-4 text-center">
            <Title>⚠️</Title>
            <div className="text-center">
              <Label>You're about to erase all traces of this crew.</Label>
              <br />
            </div>
            <div className="flex gap-2">
              <Button onClick={() => setIsEraseEvidence(false)}>
                Walk Away
              </Button>
              <Button onClick={evidenceHandler}>Do it</Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Client;
