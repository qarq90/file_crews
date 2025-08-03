"use client";

import { LoadingNav } from "@/components/loaders/loading-nav";
import { useRouter } from "next/navigation";
import { Extension } from "@codemirror/state";
import { useCrew } from "@/hooks/useCrew";
import { CrewFooter } from "@/components/crew/crew-footer";
import { CrewNav } from "@/components/crew/crew-nav";
import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { oneDark } from "@codemirror/theme-one-dark";
import { javascript } from "@codemirror/lang-javascript";
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
import { generateUUIDv4 } from "@/functions/cipher-functions";
import { createFileRow } from "@/functions/file-functions";
import Input from "@/components/ui/input";

type LanguageKey = "js" | "ts" | "jsx" | "tsx" | "java" | "py" | "c" | "cpp" | "html" | "css" | "php" | "json";

const languageMap: Record<string, Extension> = {
    js: javascript(),
    ts: javascript({ typescript: true }),
    jsx: javascript({ jsx: true }),
    tsx: javascript({ typescript: true, jsx: true }),
    java: java(),
    py: python(),
    c: cpp(),
    cpp: cpp(),
    html: html(),
    css: css(),
    php: php(),
    json: json(),
};

const languageNames = {
    js: "JavaScript",
    ts: "TypeScript",
    jsx: "JSX",
    tsx: "TSX",
    java: "Java",
    py: "Python",
    c: "C",
    cpp: "C++",
    html: "HTML",
    css: "CSS",
    php: "PHP",
    json: "JSON",
};

export default function Client({ slug }: Slug) {
    const router = useRouter();
    const { crew, loading } = useCrew(slug as string);

    const [language, setLanguage] = useState<LanguageKey>("js");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [code, setCode] = useState("// Start coding...");
    const [fileName, setFileName] = useState("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(e.target.value as LanguageKey);
        setCode("// New " + languageNames[e.target.value as LanguageKey] + " file");
    };

    const createFile = async () => {
        const CodeFile: FileType = {
            file_name: fileName,
            file_type: language,
            file_size: code.length,
            file_url: code,
            file_id: generateUUIDv4(),
            file_crew_id: crew?.crew_id?.toString() ?? "",
        };

        const result = await createFileRow(crew?.crew_id?.toString() ?? "", CodeFile);
        if (result.status) {
            router.push(`/crew/${crew?.crew_id}`);
        } else {
            setErrorMessage("Failed to save file. Please try again.");
        }
    };

    if (loading) return <LoadingNav />;

    return (
        <main>
            <CrewNav slug={slug} pageTitle="Create File" />

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
                        <Button onClick={() => setCode("// Start coding...")}>Clear</Button>
                        <Button onClick={() => setIsModalOpen(true)}>Save As</Button>
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

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="flex flex-col gap-4 text-center">
                    <Title>File Name</Title>

                    <Input
                        type="text"
                        value={fileName}
                        onChange={(e) => setFileName(e.target.value)}
                        placeholder="Enter file name"
                    />

                    <div className="flex justify-center gap-4 mt-4">
                        <Button
                            onClick={() => {
                                setFileName("");
                            }}
                        >
                            Clear
                        </Button>

                        <Button
                            onClick={async () => {
                                if (!fileName.trim()) {
                                    setErrorMessage("File name cannot be empty.");
                                    return;
                                }

                                await createFile();
                                setIsModalOpen(false);
                            }}
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </Modal>

            <div className="w-full flex justify-center">
                <CrewFooter crew_id={crew?.crew_id?.toString() ?? ""} showCreate={false} showUpload={true} />
            </div>
        </main>
    );
}
