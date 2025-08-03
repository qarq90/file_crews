"use client";;
import { NoFiles } from "@/components/empty/no-files";
import { LoadingNav } from "@/components/loaders/loading-nav";
import { useRouter } from "next/navigation";
import { useCrew } from "@/hooks/useCrew";
import { CrewFooter } from "@/components/crew/crew-footer";
import { FullScreenLoading } from "@/components/loaders/full-screen";
import { Processing } from "@/components/loaders/processing";
import Modal from "@/components/ui/modal";
import { deleteFileRow, deleteFromPinata, fetchFiles, getFileName, getFileSize, getFileType } from "@/functions/file-functions";
import { CrewNav } from "@/components/crew/crew-nav";
import { useEffect, useState } from "react";
import Button from "@/components/ui/button";
import Title from "@/components/ui/title";
import { useSelectedFile } from "@/stores/useFile";

export default function Client({ slug }: Slug) {
    const router = useRouter()

    const [files, setFiles] = useState<FileType[]>([]);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [fileToDelete, setFileToDelete] = useState<{ url: string, id: string } | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const { setSelectedFileId } = useSelectedFile()

    const { crew, loading } = useCrew(slug as string);

    const getFiles = async () => {
        try {
            const res = await fetchFiles(slug);
            setFiles(res.result);
        } catch {
            router.push("/crews");
        } finally {
        }
    };

    useEffect(() => {
        setSelectedFileId("")
    }, [slug])

    const viewFile = (link: string, file_id: string) => {
        setSelectedFileId(file_id);
        if (link.startsWith("https://aquamarine-patient-galliform-980.mypinata.cloud/ipfs")) {
            window.open(link, '_blank');
        } else {
            router.push(`/crew/${crew?.crew_id}/file/${file_id}/edit`)
        }
    }

    const deleteFile = async () => {
        if (!fileToDelete) return;

        setIsDeleting(true);

        const { url, id } = fileToDelete;

        try {
            if (url.startsWith("https://aquamarine-patient-galliform-980.mypinata.cloud/ipfs")) {
                await deleteFromPinata(id);
            } else {
                await deleteFileRow(id);
            }
        } catch (err) {
            console.error("Delete failed:", err);
        } finally {
            getFiles();
            setIsConfirmModalOpen(false)
            setIsDeleting(false);
        }
    };

    useEffect(() => {
        getFiles();
    }, [slug]);

    if (loading) return (
        <main>
            <LoadingNav />
            <div className="mt-24" />
            <Processing />
        </main>
    )

    if (isDeleting) return <FullScreenLoading />;

    return (
        <main>
            <CrewNav slug={slug} pageTitle={crew?.crew_name} />

            {files.length > 0 ? (
                <div className="my-8 overflow-x-auto">
                    <table className="min-w-full border border-foreground/10 text-left shadow-sm">
                        <thead className="bg-foreground/10 rounded-t-lg">
                            <tr>
                                <th className="p-4 border-b text-xl tracking-widest border-foreground/10 text-foreground">Name</th>
                                <th className="p-4 border-b text-xl tracking-widest border-foreground/10 text-foreground">Type</th>
                                <th className="p-4 border-b text-xl tracking-widest border-foreground/10 text-foreground">Size</th>
                                <th className="p-4 border-b text-xl tracking-widest border-foreground/10 text-foreground">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {files.map((file, index) => (
                                <tr
                                    key={index}
                                >
                                    <td className="p-4 border-b text-xl border-foreground/10 text-foreground truncate max-w-[200px]">
                                        {
                                            file.file_url.startsWith("https://aquamarine-patient-galliform-980.mypinata.cloud/ipfs") ? getFileName(file.file_name) : file.file_name
                                        }
                                    </td>
                                    <td className="p-4 border-b border-foreground/10 text-foreground/70">
                                        {getFileType(file.file_type)}
                                    </td>
                                    <td className="p-4 border-b border-foreground/10 text-foreground/70">
                                        {getFileSize(file.file_size)}
                                    </td>
                                    <td className="flex w-fit flex-row gap-8 p-4 border-b border-foreground/10">
                                        <div
                                            onClick={() => {
                                                setFileToDelete({
                                                    url: file.file_url,
                                                    id: file.file_id?.toString() ?? ""
                                                });
                                                setIsConfirmModalOpen(true);
                                            }}
                                            className="transform-skew skew-x-[-30deg] w-fit flex flex-1 items-center cursor-pointer justify-center gap-2 hover:opacity-50 bg-foreground px-4 pb-1 pt-2 text-background transition duration-200 ease-in-out disabled:opacity-50"
                                        >
                                            <span className="transform-skew-content skew-x-[30deg]">
                                                Delete
                                            </span>
                                        </div>
                                        <div
                                            className="transform-skew skew-x-[-30deg] p-4 w-fit flex flex-1 items-center cursor-pointer justify-center gap-2 hover:opacity-50 bg-foreground px-4 pb-1 pt-2 text-background transition duration-200 ease-in-out disabled:opacity-50"
                                        >
                                            <div onClick={() => viewFile(file.file_url, file.file_id?.toString() ?? "")} className="transform-skew-content skew-x-[30deg]">
                                                View
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <NoFiles />
            )}

            <Modal isOpen={isConfirmModalOpen} onClose={() => setIsConfirmModalOpen(false)}>
                <div className="flex flex-col gap-4 justify-center text-center">
                    <Title>Are you sure you want</Title>
                    <Title>to delete this file?</Title>
                    <Title>This action cannot be undone.</Title>
                    <div className="flex justify-center gap-6 mt-4">
                        <Button onClick={() => setIsConfirmModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            onClick={() => {
                                if (fileToDelete) {
                                    deleteFile();
                                }
                            }}
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            </Modal>

            <div className="w-full flex justify-center">
                <CrewFooter crew_id={crew?.crew_id?.toString() ?? ""} />
            </div>
        </main>
    );
}
