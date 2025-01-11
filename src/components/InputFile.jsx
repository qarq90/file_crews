import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useUIStore } from "@/stores/UIStore";
import { createFile } from "@/helper/fileHelpers";
import { uploadFileToS3 } from "@/helper/addHelpers";
import Button from "./ui/Button";
import Title from "@/components/ui/Title";

const InputFile = ({
  crew_id,
  id = "file-input",
  title = "Choose a file",
  accept,
  disabled = false,
}) => {
  const router = useRouter();

  const [selectedFile, setSelectedFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const inputRef = useRef(null);

  const { setIsUseLoading } = useUIStore();

  const handleFileChange = async (e) => {
    try {
      const file = e.target.files?.[0] || null;
      setSelectedFile(file);

      if (fileUrl) {
        URL.revokeObjectURL(fileUrl);
      }

      if (file) {
        const url = URL.createObjectURL(file);
        setFileUrl(url);
      }
    } catch (error) {
      console.error("Error in handleFileChange:", error);
    }
  };

  const handleFileClear = () => {
    setSelectedFile(null);
    setFileUrl(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      return alert("No file selected!");
    }

    setIsUseLoading(true);

    try {
      const signedURLResult = await uploadFileToS3();

      if (!signedURLResult?.success) {
        throw new Error("Failed to get signed URL from S3");
      }

      const { url } = signedURLResult.success;

      const uploadResponse = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": selectedFile.type },
        body: selectedFile,
      });

      if (!uploadResponse.ok) {
        throw new Error("File upload failed");
      }

      const fileData = {
        file_name: selectedFile.name,
        file_size: selectedFile.size,
        file_type: selectedFile.type,
        file_data: url.split("?")[0],
      };

      await createFile(crew_id, fileData);
      router.push(`/crew/${crew_id}`);
    } catch (error) {
      console.error("Error in file upload:", error);
    } finally {
      setIsUseLoading(false);
    }
  };

  const triggerFileInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div className="grid w-full max-w-sm items-center gap-3">
      <Title>Select a file</Title>
      <div className="relative w-full cursor-pointer hover:opacity-50">
        <input
          ref={inputRef}
          id={id}
          type="file"
          accept={accept}
          disabled={disabled}
          onChange={handleFileChange}
          className="file-input absolute inset-0 z-10 cursor-pointer opacity-0"
        />
        <div className="flex">
          <Button onClick={triggerFileInput}>
            {selectedFile ? selectedFile.name : title}
          </Button>
        </div>
      </div>
      <div className="flex w-full gap-3">
        <Button onClick={handleFileClear} disabled={!selectedFile}>
          Clear File
        </Button>
        <Button onClick={handleFileUpload} disabled={!selectedFile}>
          Upload File
        </Button>
      </div>
      <span className="text-center">
        {selectedFile ? "File Selected" : "No File Selected"}
      </span>
    </div>
  );
};

export default InputFile;
