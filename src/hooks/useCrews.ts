import { useEffect, useState } from "react";
import { fetchCrews } from "@/functions/crew-functions";

export function useCrews() {
    const [crews, setCrews] = useState<CrewType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getCrews = async () => {
            try {
                const result = await fetchCrews();
                setCrews(result.result);
            } catch (err: any) {
                console.error("Error fetching crews:", err);
                setError(err.message || "Unknown error");
            } finally {
                setLoading(false);
            }
        };

        getCrews();
    }, []);

    return { crews, loading, error };
}
