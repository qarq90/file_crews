"use client";;
import { useState, useRef } from "react";
import { LoadingNav } from "@/components/loaders/loading-nav";
import { useRouter } from "next/navigation";
import { useCrew } from "@/hooks/useCrew";
import { CrewFooter } from "@/components/crew/crew-footer";
import { CrewNav } from "@/components/crew/crew-nav";
import { FileUpload } from "@/components/ui/file-input";
import { LuTrash } from "react-icons/lu";
import Button from "@/components/ui/button";
import { insertFileRow, uploadToPinata } from "@/functions/file-functions";
import { getFileSize, getFileType } from "@/functions/file-functions";
import { Processing } from "@/components/loaders/processing";
import { useSelectedCrew } from "@/stores/useCrew";

export default function Client({ slug }: Slug) {
    const router = useRouter()

    const [selectedFiles, setSelectedFiles] = useState<FileType[]>([]);
    const [uploading, setUploading] = useState<boolean>(false)

    const { selectedCrewId } = useSelectedCrew()

    const fileInputRef = useRef<HTMLInputElement>(null);

    const { crew, loading } = useCrew(selectedCrewId as string);

    const handleFiles = async (files: File[]) => {
        const mappedFiles: FileType[] = files.map((file) => ({
            file_name: file.name,
            file_type: file.type,
            file_size: file.size,
            file_url: "",
            file_crew_id: crew?.crew_id?.toString() ?? "",
            original_file: file
        }));
        setSelectedFiles((prev) => [...prev, ...mappedFiles]);
    };

    const triggerFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const submitHandler = async () => {
        setUploading(true);
        await Promise.all(
            selectedFiles.map(async (file) => {
                try {
                    const pinataResult: PinataInsert = await uploadToPinata(file);
                    const supabaseResult = await insertFileRow(crew?.crew_id?.toString() ?? "", file, pinataResult);
                    if (supabaseResult.status) {
                        setUploading(false);
                        router.push(`/crew/${crew?.crew_id}`)
                    }
                } catch (e) {
                    console.log("Something went wrong: ", e);
                } finally {
                    setUploading(false);
                }
            })
        );
    };

    if (loading) return (
        <main>
            <LoadingNav />
            <div className="mt-24" />
            <Processing />
        </main>
    )

    if (uploading) return (
        <main>
            <CrewNav selectedCrewId={selectedCrewId} pageTitle="Upload Files" />
            <div className="mt-24" />
            <Processing />
        </main>
    )


    return (
        <main>
            <CrewNav selectedCrewId={selectedCrewId} pageTitle="Upload Files" />

            <FileUpload handleFiles={handleFiles} ref={fileInputRef} />

            {selectedFiles.length > 0 && (
                <>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {selectedFiles.map((file, index) => (
                            <div
                                key={index}
                                className="transition-colors rounded-lg border border-foreground/10 shadow-sm overflow-hidden hover:shadow-md"
                            >
                                <div className="p-4 flex flex-col space-y-2">
                                    <div className="flex flex-row justify-between items-center">
                                        <h3 className="text-lg font-medium text-foreground truncate flex-1">
                                            {file.file_name}
                                        </h3>
                                        <LuTrash
                                            onClick={() => setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))}
                                            size={24}
                                            className="p-1 mt-1 bg-red-700 transition-all hover:bg-foreground hover:text-background cursor-pointer rounded-sm ml-2"
                                        />
                                    </div>
                                    <p className="text-sm text-foreground/70">
                                        {getFileType(file.file_type)}
                                    </p>
                                    <p className="text-sm text-foreground/70">
                                        {getFileSize(file.file_size)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="w-full mt-10 mb-16 grid grid-cols-3 gap-3">
                        <Button
                            onClick={() => setSelectedFiles([])}
                        >
                            Clear all
                        </Button>
                        <Button onClick={triggerFileInput}>
                            Add more files
                        </Button>
                        <Button onClick={submitHandler}>Submit</Button>
                    </div>
                </>
            )}

            <div className="w-full flex justify-center">
                <CrewFooter crew_id={crew?.crew_id?.toString() ?? ""} showCreate={true} showUpload={false} />
            </div>
        </main >
    );
}
