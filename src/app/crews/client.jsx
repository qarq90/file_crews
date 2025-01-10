"use client";

import { Card } from "@/components/crews/Card";
import Button from "@/components/ui/Button";
import { fetchCrews } from "@/helper/crewHelpers";
import Label from "@/components/ui/Label";
import Link from "next/link";
import { Loading } from "@/components/loaders/Loading";
import { useEffect, useState } from "react";
import { NoCrews } from "@/components/empty/NoCrews";

const Client = () => {
  const [crews, setCrews] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCrews = async () => {
      try {
        const result = await fetchCrews();
        setCrews(result.result);
      } catch (error) {
        console.error("Error fetching crews:", error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }
    };

    getCrews();
  }, []);

  if (isLoading) return <Loading />;

  if (!crews || crews.length === 0) {
    return (
      <div className="flex flex-col gap-4">
        <NoCrews />
        <div className="mt-4 flex w-full flex-col items-center justify-center gap-4">
          <div className="text-center">
            <Label className="text-sm">
              Create a new crew to collaborate and share files effortlessly.
            </Label>
          </div>
          <Link href="/create-crew">
            <Button>Create Crew</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-4">
        {crews && crews.map((crew, index) => <Card crew={crew} key={index} />)}
      </div>
      <div className="mt-4 flex w-full flex-col items-center justify-center gap-4">
        <div className="text-center">
          <Label className="text-sm">
            Create a new crew to collaborate and share files effortlessly.
          </Label>
        </div>
        <Link href="/create-crew">
          <Button>Create Crew</Button>
        </Link>
      </div>
    </div>
  );
};

export default Client;
