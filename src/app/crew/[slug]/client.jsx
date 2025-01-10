"use client";

import Title from "@/components/ui/Title";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { fetchCrew } from "@/helper/crewHelpers";
import { fetchCrewFiles } from "@/helper/fileHelpers";
import { useEffect, useState } from "react";
import { Loading } from "@/components/loaders/Loading";
import { FaArrowLeft } from "react-icons/fa";

const Client = ({ crew_id }) => {
  const [crewData, setCrewData] = useState(null);
  const [crewFiles, setCrewFiles] = useState(null);

  useEffect(() => {
    const getCrewData = async () => {
      try {
        const crew_data = await fetchCrew(crew_id);
        setCrewData(crew_data.result[0]);
        const crew_files = await fetchCrewFiles(crew_id);
        setCrewFiles(crew_files.result);
      } catch (error) {
        console.error("Error fetching crews:", error);
      }
    };

    getCrewData();
  }, [crew_id]);

  if (!crewData || !crewFiles) return <Loading />;

  return (
    <>
      <div className="mt-5">
        <div className="flex gap-4">
          <Link href={`/crews`}>
            <Button>
              <FaArrowLeft />
            </Button>
          </Link>
          <Title>{crewData.crew_name}</Title>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-4">
          {crewFiles.map((file, index) => (
            <Link
              href={`/crew/${crew_id}/file/${file._id}`}
              key={index}
              className="text-primary hover:text-primary-dark mb-3 flex flex-col gap-4 rounded-lg bg-hover p-4 text-xl font-medium shadow-md transition-shadow duration-300 hover:shadow-xl hover:brightness-150"
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
        <Link className="mt-4 flex w-full" href={`/create-file/${crew_id}`}>
          <Button>Create File </Button>
        </Link>
      </div>
    </>
  );
};

export default Client;
