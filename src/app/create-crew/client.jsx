"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUIStore } from "@/stores/UIStore";
import { createCrew } from "@/actions/crewActions";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import Modal from "@/components/ui/Modal";
import Title from "@/components/ui/Title";

const Client = () => {
  const router = useRouter();

  const [crewData, setCrewData] = useState({
    crew_name: "",
    crew_token: "",
    crew_banner: "",
  });
  const [showError, setIsShowError] = useState(false);
  const [nameError, setNameError] = useState(false);

  const { setIsUseLoading } = useUIStore();

  const createHandler = async () => {
    if (crewData.crew_name.length > 14) {
      setNameError(true);
      return;
    }

    if (crewData.crew_name !== "" && crewData.crew_token !== "") {
      setIsUseLoading(true);
      try {
        await createCrew(crewData);
        clearHandler();
        router.push("/crews");
      } catch (error) {
        console.error("Error creating crew:", error);
      } finally {
        setTimeout(() => {
          setIsUseLoading(false);
        }, 500);
      }
    } else {
      setIsShowError(true);
    }
  };

  const clearHandler = () => {
    setCrewData({
      ...crewData,
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
          setCrewData({
            ...crewData,
            crew_banner: { name: file.name, base64: reader.result },
          });
        };
        reader.readAsDataURL(file);
      } else {
        alert("Please select a PNG, JPG, or JPEG file.");
        setCrewData({ ...crewData, crew_banner: "" });
      }
    }
  };

  return (
    <>
      <div className="flex w-[90%] flex-col gap-4 md:w-[40%]">
        <div className="flex flex-col gap-2">
          <Label>Crew Name</Label>
          <Input
            value={crewData.crew_name}
            onChange={(e) =>
              setCrewData({ ...crewData, crew_name: e.target.value })
            }
            placeholder="Enter crew name"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Crew Password</Label>
          <Input
            value={crewData.crew_token}
            onChange={(e) =>
              setCrewData({ ...crewData, crew_token: e.target.value })
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
          {crewData.crew_banner && crewData.crew_banner.name && (
            <Label>Selected file: {crewData.crew_banner.name}</Label>
          )}
        </div>
        <div className="mt-2 flex justify-between gap-2">
          <Button onClick={clearHandler}>Clear</Button>
          <Button onClick={createHandler}>Create</Button>
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
      {nameError && (
        <Modal isOpen={nameError}>
          <div className="flex flex-col justify-center gap-4 text-center">
            <Title>⚠️</Title>
            <div className="text-center">
              <Label>
                The crew name is too long. Please make sure it is 14 characters
                or fewer.
              </Label>
            </div>
            <div className="flex">
              <Button onClick={() => setNameError(false)}>Close</Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Client;
