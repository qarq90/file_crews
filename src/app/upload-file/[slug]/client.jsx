"use client";

import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useUIStore } from "@/stores/UIStore";
import { fetchCrew } from "@/actions/crewActions";
import { Loading } from "@/components/loaders/Loading";
import Link from "next/link";
import Title from "@/components/ui/Title";
import Button from "@/components/ui/Button";
import InputFile from "@/components/InputFile";

const Client = ({ crew_id }) => {
  const [crewData, setCrewData] = useState(null);

  const { isUseLoading, setIsUseLoading } = useUIStore();

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
        <div className="mt-48 flex w-full justify-center p-4">
          <InputFile
            accept="
              application/pdf,
              image/*,
              .doc, .docx,
              .xls, .xlsx,
              .ppt, .pptx,
              .txt,
              .rtf,
              .jpg, .jpeg, .png, .gif, .svg, .bmp,
              .mp4, .avi, .mkv, .mov,
              .mp3, .wav, .aac,
              .zip, .rar
            "
            crew_id={crew_id}
          />
        </div>
      </div>
    </>
  );
};

export default Client;
