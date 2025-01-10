"use client";

import Title from "@/components/ui/Title";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Label from "@/components/ui/Label";
import { disbandCrew, fetchCrew } from "@/helper/crewHelpers";
import { fetchCrewFiles } from "@/helper/fileHelpers";
import { useEffect, useState } from "react";
import { Loading } from "@/components/loaders/Loading";
import { FaArrowLeft } from "react-icons/fa";
import { NoFiles } from "@/components/empty/NoFiles";
import Modal from "@/components/ui/Modal";
import { useRouter } from "next/navigation";

const Client = ({ crew_id }) => {
  const router = useRouter();

  const [crewData, setCrewData] = useState(null);
  const [crewFiles, setCrewFiles] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteCrew, setIsDeleteCrew] = useState(false);

  useEffect(() => {
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
        }, 2000);
      }
    };

    getCrewData();
  }, [crew_id]);

  const disbandHandler = async () => {
    setIsLoading(true);
    try {
      await disbandCrew(crew_id);
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
      <div className="mt-8 md:mt-5">
        <div className="flex justify-between gap-4">
          <div className="flex gap-4">
            <Link href={`/crews`}>
              <Button>
                <FaArrowLeft />
              </Button>
            </Link>
            <Title>{crewData?.crew_name || "Crew"}</Title>
          </div>
        </div>
        <Loading />
      </div>
    );

  if (!crewFiles || crewFiles.length === 0) {
    return (
      <>
        <div className="mt-8 md:mt-5">
          <div className="flex justify-between gap-4">
            <div className="flex gap-4">
              <Link href={`/crews`}>
                <Button>
                  <FaArrowLeft />
                </Button>
              </Link>
              <Title>{crewData?.crew_name || "Crew"}</Title>
            </div>
            <div className="flex gap-3">
              <Link
                className="absolute right-[11.5rem] top-5 md:relative md:left-0 md:top-0 md:flex md:justify-center"
                href={`/crew/${crew_id}/edit`}
              >
                <Button>Edit Crew</Button>
              </Link>
              <div
                onClick={() => setIsDeleteCrew(true)}
                className="absolute right-4 top-5 md:relative md:left-0 md:top-0 md:flex md:justify-center"
              >
                <Button>Disband Crew</Button>
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
            <Link href={`/create-file/${crew_id}`}>
              <Button>Create File</Button>
            </Link>
          </div>
        </div>
        {isDeleteCrew && (
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
        )}
      </>
    );
  }

  return (
    <>
      <div className="mt-8 md:mt-5">
        <div className="flex justify-between gap-4">
          <div className="flex gap-4">
            <Link href={`/crews`}>
              <Button>
                <FaArrowLeft />
              </Button>
            </Link>
            <Title>{crewData?.crew_name || "Crew"}</Title>
          </div>
          <div className="flex gap-3">
            <Link
              className="absolute right-[11.5rem] top-5 md:relative md:left-0 md:top-0 md:flex md:justify-center"
              href={`/crew/${crew_id}/edit`}
            >
              <Button>Edit Crew</Button>
            </Link>
            <div
              onClick={() => setIsDeleteCrew(true)}
              className="absolute right-4 top-5 md:relative md:left-0 md:top-0 md:flex md:justify-center"
            >
              <Button>Disband Crew</Button>
            </div>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-4">
          {crewFiles.map((file, index) => (
            <Link
              href={`/crew/${crew_id}/file/${file._id}`}
              key={index}
              className="text-primary hover:text-primary-dark mb-3 flex flex-col gap-4 rounded-lg bg-hover p-6 text-xl font-medium shadow-md transition-shadow duration-300 hover:shadow-xl hover:brightness-150 md:p-4"
            >
              <Title>{file.file_name}</Title>
              <div className="text-sm">
                <p>
                  Uploaded: {new Date(file.uploaded_at).toLocaleDateString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-4 flex w-full flex-col items-center justify-center gap-4">
          <div className="text-center">
            <Label className="text-sm">
              Create a new file to share with your crew.
            </Label>
          </div>
          <Link href={`/create-file/${crew_id}`}>
            <Button>Create File</Button>
          </Link>
        </div>
      </div>
      {isDeleteCrew && (
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
      )}
    </>
  );
};

export default Client;
