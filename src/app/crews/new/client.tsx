"use client";
import { ChangeEvent, useState } from "react"
import Label from "@/components/ui/label"
import Input from "@/components/ui/input"
import Button from "@/components/ui/button"
import Title from "@/components/ui/title"
import Modal from "@/components/ui/modal"
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { uploadBanner, createCrew } from "@/functions/crew-functions";
import { mono_alphabetic_encrypt } from "@/functions/cipher-functions"
import { useRouter } from "next/navigation"
import { FullScreenLoading } from "@/components/loaders/full-screen"

export default function Client() {
    const router = useRouter()

    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [creating, setCreating] = useState<boolean>(false);

    const [crewData, setCrewData] = useState({
        crew_name: "",
        crew_token: "",
        crew_banner: ""
    })

    const createCrewHandler = async () => {
        try {
            if (crewData.crew_name.length > 14) {
                setErrorMessage("The crew name is too long. Please make sure it is 14 characters or fewer.");
                return;
            }

            if (crewData.crew_name === "" || crewData.crew_token === "") {
                setErrorMessage("Please make sure to fill in all required fields before submitting.");
                return;
            }

            if (!/^[a-zA-Z0-9]*$/.test(crewData.crew_token)) {
                setErrorMessage("Only alpha-numeric characters are allowed for the password.");
                return;
            }

            if (!selectedFile) {
                setErrorMessage("Please upload a crew banner.");
                return;
            }

            const uploadRes = await uploadBanner(selectedFile);
            if (!uploadRes.status) {
                setErrorMessage("Failed to upload banner.");
                return;
            }

            setCreating(true)
            const { banner_id, banner_hash, banner_url } = uploadRes.result;

            const encryptedToken = mono_alphabetic_encrypt(crewData.crew_token)

            const payload: CrewType = {
                crew_name: crewData.crew_name,
                crew_token: encryptedToken,
                banner_id,
                banner_hash,
                banner_url,
                banner_name: selectedFile.name,
                banner_type: selectedFile.type,
            };


            const createRes = await createCrew(payload);
            if (!createRes.status) {
                setErrorMessage("Failed to create crew.");
                return;
            }

            clearHandler();
            router.push("/crews")

        } catch (err) {
            console.error(err);
            setErrorMessage("An unexpected error occurred.");
        } finally {
            setCreating(false)
        }
    };


    const clearHandler = () => {
        setCrewData({
            crew_name: "",
            crew_token: "",
            crew_banner: "",
        });
    };


    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCrewData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
            if (validTypes.includes(file.type)) {
                setCrewData(prev => ({
                    ...prev,
                    crew_banner: file.name
                }));
                setSelectedFile(file);
            } else {
                setErrorMessage('Please select a PNG, JPG, or JPEG file.');
            }
        }
    };

    if (creating) return <FullScreenLoading />

    return (
        <main className="flex flex-col gap-6 w-[425px]">
            <div className="flex flex-col gap-2">
                <Label>Crew Name</Label>
                <Input
                    name="crew_name"
                    value={crewData.crew_name}
                    onChange={handleInputChange}
                    placeholder="Be Creative"
                    maxLength={14}
                />
                {crewData.crew_name.length > 0 && (
                    <span className="text-sm text-gray-400">
                        {14 - crewData.crew_name.length} characters remaining
                    </span>
                )}
            </div>

            <div className="flex flex-col gap-2">
                <Label>Crew Password</Label>
                <div className="flex flex-row gap-4">
                    <Input
                        type={showPassword ? "text" : "password"}
                        name="crew_token"
                        value={crewData.crew_token}
                        onChange={handleInputChange}
                        placeholder="Alpha-Numeric characters only"
                    />
                    <Button onClick={() => setShowPassword(!showPassword)}>
                        {!showPassword ? <FaEyeSlash /> : <FaEye />}
                    </Button>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <Label>Crew Banner</Label>
                <Input
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    onChange={handleFileChange}
                    placeholder="Choose crew banner"
                />
                {crewData.crew_banner && (
                    <Label>Selected file: {crewData.crew_banner}</Label>
                )}
            </div>


            <div className="flex flex-row gap-4">
                <Button onClick={clearHandler}>Clear</Button>
                <Button onClick={createCrewHandler}>Create</Button>
            </div>

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
    )
}