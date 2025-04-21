"use client";

import Title from "@/components/ui/Title";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { fetchCrew, updateCrew } from "@/actions/crewActions";
import { useEffect, useState } from "react";
import { Loading } from "@/components/loaders/Loading";
import { FaArrowLeft } from "react-icons/fa";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import Modal from "@/components/ui/Modal";
import { useRouter } from "next/navigation";
import CryptoJS from "crypto-js";

const Client = ({ crew_id }) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [showError, setIsShowError] = useState(false);
  const [crewDataNew, setCrewDataNew] = useState({
    crew_name: "",
    crew_token: "",
    crew_banner: "",
  });

  useEffect(() => {
    const getCrewData = async () => {
      try {
        const crew_data = await fetchCrew(crew_id);
        const decryptedTokenBytes = CryptoJS.AES.decrypt(
          crew_data?.result[0]?.crew_token,
          process.env.NEXT_PUBLIC_ENCRYPTION_KEY,
        );
        const decryptedToken = decryptedTokenBytes.toString(CryptoJS.enc.Utf8);
        setCrewDataNew({
          ...crewDataNew,
          crew_banner: crew_data?.result[0]?.crew_banner,
          crew_name: crew_data?.result[0]?.crew_name,
          crew_token: decryptedToken,
        });
      } catch (error) {
        console.error("Error fetching crew data:", error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    };

    getCrewData();
  }, [crew_id]);

  const updateHandler = async () => {
    if (crewDataNew.crew_name !== "" || crewDataNew.crew_token !== "") {
      const encryptedToken = CryptoJS.AES.encrypt(
        crewDataNew.crew_token,
        process.env.NEXT_PUBLIC_ENCRYPTION_KEY,
      ).toString();

      const updatedCrewData = {
        ...crewDataNew,
        crew_token: encryptedToken,
      };

      await updateCrew(crew_id, updatedCrewData);

      setCrewDataNew(updatedCrewData);
      router.push("/crews");
    } else {
      setIsShowError(true);
    }
  };

  const clearHandler = () => {
    setCrewDataNew({
      ...crewDataNew,
      crew_name: "",
      crew_token: "",
      crew_banner: "",
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (validTypes.includes(file.type)) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setCrewDataNew({
            ...crewDataNew,
            crew_banner: { name: file.name, base64: reader.result },
          });
        };
        reader.readAsDataURL(file);
      } else {
        alert("Please select a PNG, JPG, or JPEG file.");
        setCrewDataNew({ ...crewDataNew, crew_banner: "" });
      }
    }
  };

  if (isLoading)
    return (
      <div className="mt-5">
        <div className="flex justify-between gap-4">
          <div className="flex gap-4">
            <Link href={`/crew/${crew_id}`}>
              <Button>
                <FaArrowLeft />
              </Button>
            </Link>
            <Title>{crewDataNew?.crew_name || "Crew"}</Title>
          </div>
        </div>
        <Loading />
      </div>
    );

  return (
    <>
      <div className="mt-5">
        <div className="flex justify-between gap-4">
          <div className="flex gap-4">
            <Link href={`/crew/${crew_id}`}>
              <Button>
                <FaArrowLeft />
              </Button>
            </Link>
            <Title>{crewDataNew?.crew_name || "Crew"}</Title>
          </div>
        </div>
        <div className="ml-5 mt-28 flex w-[90%] flex-col gap-4 md:ml-80 md:mt-36 md:w-[40%]">
          <div className="flex flex-col gap-2">
            <Label>Crew Name</Label>
            <Input
              value={crewDataNew.crew_name}
              onChange={(e) =>
                setCrewDataNew({ ...crewDataNew, crew_name: e.target.value })
              }
              placeholder="Enter crew name"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Crew Password</Label>
            <Input
              value={crewDataNew.crew_token}
              onChange={(e) =>
                setCrewDataNew({ ...crewDataNew, crew_token: e.target.value })
              }
              placeholder="Enter crew password"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Crew Banner</Label>
            <Input
              type="file"
              accept=".png, .jpg, .jpeg"
              onChange={handleFileChange}
              placeholder="Choose crew banner"
            />
            {crewDataNew.crew_banner && crewDataNew.crew_banner.name && (
              <Label>Selected file: {crewDataNew.crew_banner.name}</Label>
            )}
          </div>
          <div className="mt-2 flex justify-between gap-2">
            <Button onClick={clearHandler}>Clear</Button>
            <Button onClick={updateHandler}>Update</Button>
          </div>
        </div>
      </div>
      {showError && (
        <Modal isOpen={showError}>
          <div className="flex flex-col justify-center gap-4 text-center">
            <Title>⚠️</Title>
            <div className="text-center">
              <Label>
                Looks like some crew fields are still empty. Please make sure to
                fill in all required fields before submitting.
              </Label>
            </div>
            <div className="flex">
              <Button onClick={() => setIsShowError(false)}>Close</Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Client;
