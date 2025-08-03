"use client";

import { LoadingNav } from "@/components/loaders/loading-nav";
import { useRouter } from "next/navigation";
import { useCrew } from "@/hooks/useCrew";
import { LanguageKey, languageNames, languageMap } from "@/lib/editor";
import { CrewFooter } from "@/components/crew/crew-footer";
import { CrewNav } from "@/components/crew/crew-nav";
import { useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { oneDark } from "@codemirror/theme-one-dark";
import { javascript } from "@codemirror/lang-javascript";
import { Extension } from "@codemirror/state";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { html } from "@codemirror/lang-html";
import Title from "@/components/ui/title";
import Modal from "@/components/ui/modal";
import { css } from "@codemirror/lang-css";
import { php } from "@codemirror/lang-php";
import { json } from "@codemirror/lang-json";
import Label from "@/components/ui/label";
import Button from "@/components/ui/button";
import { createFileRow, deleteFileRow, fetchFile, updateFileRow } from "@/functions/file-functions";
import Input from "@/components/ui/input";
import { useSelectedFile } from "@/stores/useFile";
import { useSelectedCrew } from "@/stores/useCrew";

type ModalType = "clear" | "delete" | "rename" | "save" | "";

export default function Client() {
    const router = useRouter();

    const { selectedCrewId } = useSelectedCrew()

    const { crew, loading } = useCrew(selectedCrewId as string);

    const [language, setLanguage] = useState<LanguageKey>("js");
    const [activeModal, setActiveModal] = useState<ModalType>("");
    const [tempFileName, setTempFileName] = useState("");
    const [file_id, setFileId] = useState<string>("");
    const [code, setCode] = useState("// Start coding...");
    const [fileName, setFileName] = useState("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const { selectedFileId } = useSelectedFile()

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(e.target.value as LanguageKey);
    };

    const saveFile = async () => {
        const CodeFile: FileType = {
            file_name: fileName,
            file_type: language,
            file_size: code.length > 0 ? code.length : 0,
            file_url: code,
            file_id: file_id,
            file_crew_id: crew?.crew_id?.toString() ?? "",
        };

        const result = selectedFileId
            ? await updateFileRow(selectedFileId, CodeFile)
            : await createFileRow(crew?.crew_id?.toString() ?? "", CodeFile);

        if (result.status) {
            router.push(`/crew/${crew?.crew_id}`);
        } else {
            setErrorMessage("Failed to save file. Please try again.");
        }

        setActiveModal("");
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === "s") {
                e.preventDefault();
                setActiveModal("save");
            }

            if (e.key === "Escape") {
                setActiveModal("");
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);


    useEffect(() => {
        const loadFile = async () => {
            if (!selectedFileId) return;
            const { result, status } = await fetchFile(selectedFileId);

            if (status && result) {
                setFileName(result.file_name || "");
                setCode(result.file_url || "");
                setFileId(result.file_id || "")
                const lang = result.file_type as LanguageKey;
                if (lang in languageMap) setLanguage(lang);
            } else {
                setErrorMessage("Failed to load file.");
            }
        };

        loadFile();
    }, [selectedFileId]);

    if (loading) return <LoadingNav />;

    return (
        <main>
            <CrewNav selectedCrewId={selectedCrewId} pageTitle="Edit File" />

            <div className="flex flex-row-reverse gap-6 my-8">
                <div className="flex flex-col justify-between w-1/5">
                    <div className="flex flex-col gap-4">
                        <Label>Language:</Label>
                        <select
                            value={language}
                            onChange={handleLanguageChange}
                            className="px-2 py-1 bg-sidebar rounded"
                        >
                            {Object.entries(languageNames).map(([key, label]) => (
                                <option key={key} value={key}>
                                    {label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col gap-4 px-4">
                        <Label>Name: {fileName}</Label>
                        <Button onClick={() => setActiveModal("clear")}>Clear</Button>
                        <Button onClick={() => setActiveModal("delete")}>Delete</Button>
                        <Button
                            onClick={() => {
                                setTempFileName(fileName);
                                setActiveModal("rename");
                            }}
                        >
                            Rename
                        </Button>
                        <Button onClick={() => setActiveModal("save")}>Save</Button>

                    </div>
                </div>

                <CodeMirror
                    className="w-4/5"
                    value={code}
                    width="850px"
                    height="500px"
                    theme={oneDark}
                    extensions={[languageMap[language]]}
                    onChange={(value) => setCode(value)}
                />
            </div>

            <Modal isOpen={errorMessage !== ""} onClose={() => setErrorMessage("")}>
                <div className="flex flex-col justify-center gap-4 text-center">
                    <Title>⚠️</Title>
                    <Label>{errorMessage}</Label>
                    <Button onClick={() => setErrorMessage("")}>Close</Button>
                </div>
            </Modal>

            <Modal isOpen={activeModal !== ""} onClose={() => setActiveModal("")}>
                {activeModal === "clear" && (
                    <div className="text-center flex flex-col gap-4">
                        <Title>Are you sure you want &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Title>
                        <Title>to clear the code?&nbsp;&nbsp;&nbsp;</Title>
                        <div className="flex justify-center gap-4">
                            <Button onClick={() => setActiveModal("")}>Cancel</Button>
                            <Button
                                onClick={() => {
                                    setCode("// Start coding...");
                                    setActiveModal("");
                                }}
                            >
                                Yes
                            </Button>
                        </div>
                    </div>
                )}

                {activeModal === "delete" && (
                    <div className="text-center flex flex-col gap-4">
                        <Title>Are you sure you want&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Title>
                        <Title>to delete this file?&nbsp;&nbsp;&nbsp;&nbsp;</Title>
                        <div className="flex justify-center gap-4">
                            <Button onClick={() => setActiveModal("")}>Cancel</Button>
                            <Button
                                onClick={async () => {
                                    await deleteFileRow(file_id)
                                    router.push(`/crew/${crew?.crew_id}`)
                                    setActiveModal("");
                                }}
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                )}

                {activeModal === "rename" && (
                    <div className="text-center flex flex-col gap-4">
                        <Title>Rename File</Title>
                        <Input
                            type="text"
                            value={tempFileName}
                            onChange={(e) => setTempFileName(e.target.value)}
                            placeholder="Enter new file name"
                        />
                        <div className="flex justify-center gap-4">
                            <Button onClick={() => setTempFileName("")}>Clear</Button>
                            <Button
                                onClick={() => {
                                    if (!tempFileName.trim()) {
                                        setErrorMessage("File name cannot be empty.");
                                        return;
                                    }
                                    setFileName(tempFileName);
                                    setActiveModal("");
                                }}
                            >
                                Save
                            </Button>
                        </div>
                    </div>
                )}

                {activeModal === "save" && (
                    <div className="text-center flex flex-col gap-4">
                        <Title>Are you sure you want &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Title>
                        <Title>to save this file?&nbsp;&nbsp;&nbsp;&nbsp;</Title>
                        <div className="flex justify-center gap-4">
                            <Button onClick={() => setActiveModal("")}>Cancel</Button>
                            <Button
                                onClick={async () => {
                                    if (!fileName.trim()) {
                                        setErrorMessage("File name cannot be empty.");
                                        setActiveModal("");
                                        return;
                                    }
                                    await saveFile();
                                    setActiveModal("");
                                }}
                            >
                                Save
                            </Button>
                        </div>
                    </div>
                )}
            </Modal>

            <div className="w-full flex justify-center">
                <CrewFooter crew_id={crew?.crew_id?.toString() ?? ""} showCreate={false} showUpload={true} />
            </div>
        </main>
    );
}
