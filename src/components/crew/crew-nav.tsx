import { FaArrowLeft } from "react-icons/fa6";
import Image from "next/image";
import Title from "@/components/ui/title";
import Button from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useCrew } from "@/hooks/useCrew";

interface CrewNavProps {
    selectedCrewId: string;
    pageTitle: string | undefined
}

export function CrewNav({ selectedCrewId, pageTitle }: CrewNavProps) {
    const router = useRouter()
    const { crew, loading } = useCrew(selectedCrewId as string);

    const logoutHandler = async () => {
        try {
            if (crew?.crew_name) {
                Cookies.remove(`${crew.crew_name}_Session`);
            }
            router.push(`/crews`);
        } catch (error) {
            console.error("Error disbanding crew data or files:", error);
        }
    };

    const goBack = () => {
        router.push(`/crew/${crew?.crew_id}`)
    }

    return (
        <nav className="flex flex-row justify-between items-center">
            <section className="flex flex-row items-center gap-4 w-1/2">
                <div
                    onClick={goBack}
                    className="fixed bottom-5 cursor-pointer left-5 flex h-12 items-center justify-center gap-2 bg-foreground py-2 px-3.5 rounded-full text-xl text-background transition duration-200 shadow-md ease-in-out hover:opacity-50 disabled:opacity-50 md:relative md:bottom-auto md:left-0 md:right-auto md:top-0 md:mt-0 md:transform-none"
                >
                    <FaArrowLeft />
                </div>
                {crew?.banner_url && (
                    <Image
                        src={crew.banner_url}
                        alt="Crew Banner"
                        width={128}
                        height={128}
                        className="rounded-full w-12 h-12 shadow-md"
                    />
                )}
                <Title>{pageTitle}</Title>
            </section>
            <section className="flex flex-row gap-4 w-1/4">
                <Button disabled={loading}>Edit</Button>
                <Button disabled={loading} onClick={logoutHandler}>Logout</Button>
            </section>
        </nav>
    )
}