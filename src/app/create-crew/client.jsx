"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import { createCrew } from "@/helper/crewHelpers";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Client = () => {
  const router = useRouter();

  const [crewData, setCrewData] = useState({
    crew_name: "",
    crew_password: "",
  });

  const createHandler = async () => {
    await createCrew(crewData);
    clearHandler();
    router.push("/crews");
  };

  const clearHandler = () => {
    setCrewData({ ...crewData, crew_name: "", crew_password: "" });
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
        <div className="flex flex-col gap-1">
          <Label>Crew Password</Label>
          <Input
            value={crewData.crew_password}
            onChange={(e) =>
              setCrewData({ ...crewData, crew_password: e.target.value })
            }
            placeholder="Enter crew password"
          />
        </div>
        <div className="mt-2 flex justify-between gap-2">
          <Button onClick={clearHandler}>Clear</Button>
          <Button onClick={createHandler}>Create</Button>
        </div>
      </div>
    </>
  );
};

export default Client;
