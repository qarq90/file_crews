import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { fetchCrew } from "@/functions/crew-functions";

export function useCrew(slug: string) {
    const router = useRouter();
    const [crew, setCrew] = useState<CrewType>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getCrew = async () => {
            try {
                const res = await fetchCrew(slug);
                setCrew(res.result);
            } catch {
                router.push("/crews");
            } finally {
                setLoading(false);
            }
        };

        getCrew();
    }, [slug]);

    useEffect(() => {
        if (!crew?.crew_name) return;
        const name = `${crew.crew_name}_Session`;
        if (!Cookies.get(name)) router.push("/crews");
    }, [crew]);

    return { crew, loading, setLoading };
}
