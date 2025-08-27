"use client";;
import Cookies from "js-cookie";
import Image from "next/image";
import Label from "@/components/ui/label";
import Modal from "@/components/ui/modal";
import Input from "@/components/ui/input";
import Title from "@/components/ui/title";
import Button from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Processing } from "@/components/loaders/processing";
import { mono_alphabetic_encrypt } from "@/functions/cipher-functions";
import { Footer } from "@/components/crews/crews-footer";
import { useCrews } from "@/hooks/useCrews";
import { useSelectedCrew } from "@/stores/useCrew";
import { FullScreenLoading } from "@/components/loaders/full-screen";

export default function Client() {
    const router = useRouter()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCrew, setSelectedCrew] = useState<CrewType | null>(null);
    const [crewPassword, setCrewPassword] = useState("");
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [verifying, setIsVerifying] = useState(false)

    const { crews, loading } = useCrews();

    const { setSelectedCrewId } = useSelectedCrew()

    const handleCrewClick = (crew: CrewType) => {
        const cookieKey = `${selectedCrew?.crew_name}_Session`;
        const isSessionSet = Cookies.get(cookieKey) === "true";

        if (isSessionSet) {
            setSelectedCrewId(selectedCrew?.crew_id?.toString() ?? "")
            router.push(`/crew/${selectedCrew?.crew_id}`)
        } else {
            setSelectedCrew(crew);
            setIsModalOpen(true);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handlePasswordSubmit();
        }
    };

    const handlePasswordSubmit = () => {
        setIsVerifying(true)

        if (!crewPassword) {
            setIsModalOpen(false)
            setErrorMessage("Please make sure to fill in all required fields before submitting.");
            setIsVerifying(false)
            return;
        };

        if (mono_alphabetic_encrypt(crewPassword) === selectedCrew?.crew_token) {
            setSelectedCrewId(selectedCrew?.crew_id?.toString() ?? "")
            Cookies.set(`${selectedCrew.crew_name}_Session`, "true", {
                expires: 30 / 1440,
            });
            setCrewPassword("")
            router.push(`/crew/${selectedCrew.crew_id}`)
        } else {
            setCrewPassword("")
            setIsModalOpen(false)
            setErrorMessage("Incorrect Hood Password.");
            setIsVerifying(false)
            return;
        }
    };

    useEffect(() => {
        setSelectedCrewId("")
    }, [])

    if (loading) return <Processing />

    if (verifying) return <FullScreenLoading />

    return (
        <main>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-6">
                {crews.map((crew, index) => (
                    <div
                        key={index}
                        onClick={() => handleCrewClick(crew)}
                        className="flex flex-col gap-4 bg-foreground/10 py-8 rounded-md items-center cursor-pointer hover:bg-foreground/20 transition"
                    >
                        <Image
                            src={crew.banner_url}
                            width={128}
                            height={128}
                            className="rounded-full object-cover w-32 h-32"
                            alt="crew_banner"
                        />
                        <Label>{crew.crew_name}</Label>
                    </div>
                ))}
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-row justify-center items-center">
                        <Label>Crew Password</Label>
                    </div>
                    <div className="flex flex-row gap-4">
                        <Input
                            type={showPassword ? "text" : "password"}
                            name="crew_token"
                            value={crewPassword}
                            onKeyDown={handleKeyDown}
                            onChange={(e) => setCrewPassword(e.target.value)}
                            placeholder="Enter Crew Password"
                        />
                        <Button onClick={() => setShowPassword(!showPassword)}>
                            {!showPassword ? <FaEyeSlash /> : <FaEye />}
                        </Button>
                    </div>
                    <div className="flex flex-row gap-4">
                        <Button onClick={() => setCrewPassword("")}>Clear</Button>
                        <Button onClick={handlePasswordSubmit}>Submit</Button>
                    </div>
                </div>
            </Modal>

            <Footer />

            <Modal isOpen={errorMessage !== ""} onClose={() => setErrorMessage("")}>
                <div className="flex flex-col justify-center gap-4 text-center">
                    <Title>⚠️</Title>
                    <div className="text-center">
                        <Label>
                            {errorMessage}
                        </Label>
                    </div>
                    <div className="flex">
                        <Button onClick={() => setErrorMessage("")}>
                            Close
                        </Button>
                    </div>
                </div>
            </Modal>
        </main>
    );
}
