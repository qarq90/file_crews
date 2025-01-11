"use client";

import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { fetchFile } from "@/helper/fileHelpers";
import { Loading } from "@/components/loaders/Loading";
import Link from "next/link";
import Title from "@/components/ui/Title";
import EditFile from "@/components/EditFile";
import Button from "@/components/ui/Button";

const Client = ({ crew_id, file_id }) => {
  const [file, setFile] = useState(null);
  const [code, setCode] = useState("// Type here...");

  useEffect(() => {
    const getFile = async () => {
      try {
        const result = await fetchFile(file_id);
        const fileData = result.result;

        const fileContent = Buffer.from(fileData[0].file_data).toString();
        setFile(fileData[0]);
        setCode(fileContent);
      } catch (error) {
        console.error("Error fetching file:", error);
      }
    };

    getFile();
  }, [file_id]);

  if (!file) return <Loading />;

  return (
    <>
      <div className="mt-5">
        <div className="flex gap-4">
          <Link href={`/crew/${crew_id}`}>
            <Button>
              <FaArrowLeft />
            </Button>
          </Link>
          <Title>{file.file_name}</Title>
        </div>
        <EditFile
          file_id={file_id}
          crew_id={crew_id}
          code={code}
          setCode={setCode}
          fileName={file.file_name}
        />
      </div>
    </>
  );
};

export default Client;
