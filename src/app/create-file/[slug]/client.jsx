"use client";

import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useUIStore } from "@/stores/UIStore";
import { fetchCrew } from "@/actions/crewActions";
import Link from "next/link";
import Title from "@/components/ui/Title";
import NewFile from "@/components/NewFile";
import Button from "@/components/ui/Button";

const Client = ({ crew_id }) => {
  const [crewData, setCrewData] = useState(null);

  const { setIsUseLoading, isUseLoading } = useUIStore();

  useEffect(() => {
    const getCrewData = async () => {
      setIsUseLoading(true);
      try {
        const result = await fetchCrew(crew_id);
        setCrewData(result.result[0]);
      } catch (error) {
        console.error("Error fetching crews:", error);
      } finally {
        setTimeout(() => {
          setIsUseLoading(false);
        }, 500);
      }
    };

    getCrewData().then(() => null);
  }, []);

  if (!crewData || isUseLoading) return;
  return (
    <>
      <div className="mt-5">
        <div className="flex gap-4">
          <Link href={`/crew/${crew_id}`}>
            <Button>
              <FaArrowLeft />
            </Button>
          </Link>
          <Title>{crewData.crew_name}</Title>
        </div>
        <NewFile crew_id={crew_id} />
      </div>
    </>
  );
};

export default Client;
