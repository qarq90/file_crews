import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchFiles } from "@/functions/file-functions";

export function useFiles(slug: string) {
    const router = useRouter();
    const [files, setFiles] = useState<FileType[]>([]);
    const [loading, setLoading] = useState(true);

    const getFiles = async () => {
        try {
            const res = await fetchFiles(slug);
            setFiles(res.result);
        } catch {
            router.push("/crews");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getFiles();
    }, [slug]);

    return { files, getFiles, loading };
}
