import { useState, useEffect } from "react";
import { createFile } from "@/helper/fileHelpers";
import { useRouter } from "next/navigation";
import MonacoEditor from "@monaco-editor/react";
import Button from "@/components/ui/Button";
import Label from "./ui/Label";
import Modal from "./ui/Modal";
import Title from "./ui/Title";
import Input from "./ui/Input";

const NewFile = ({ crew_id }) => {
  const router = useRouter();

  const [code, setCode] = useState("// Type here...");
  const [fileName, setFileName] = useState("");
  const [theme, setTheme] = useState("vs-dark");
  const [language, setLanguage] = useState("javascript");
  const [isSaveAs, setIsSaveAs] = useState(false);

  const handleLanguageChange = (e) => {
    const selectedLang = e.target.value;
    setLanguage(selectedLang || "javascript");
  };

  const handleThemeChange = (e) => {
    setTheme(e.target.value || "vs-dark");
  };

  const handleChange = (value) => setCode(value);

  const createHandler = async () => {
    const fileData = {
      file_name: fileName,
      file_size: code.length,
      file_type: "text/plain",
      file_data: Buffer.from(code),
    };

    try {
      await createFile(crew_id, fileData);
      setFileName("");
      setIsSaveAs(false);
      router.push(`/crew/${crew_id}`);
    } catch (error) {
      console.error("Error adding file:", error.message);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      createHandler(true);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        setIsSaveAs(true);
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [crew_id]);

  return (
    <>
      <div className="mt-4">
        <div className="flex flex-col gap-4 md:flex-row">
          <MonacoEditor
            value={code}
            height="600px"
            theme={theme}
            language={language}
            onChange={handleChange}
            options={{
              fontSize: 18,
            }}
          />
          <div className="flex w-full flex-1 flex-col justify-between gap-8 md:gap-4">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4">
                <Label htmlFor="language-select">Language:</Label>
                <select
                  id="language-select"
                  value={language}
                  onChange={handleLanguageChange}
                  className="rounded border bg-hover p-2"
                >
                  <option className="text-background" value="javascript">
                    JavaScript
                  </option>
                  <option className="text-background" value="python">
                    Python
                  </option>
                  <option className="text-background" value="java">
                    Java
                  </option>
                  <option className="text-background" value="cpp">
                    C++
                  </option>
                  <option className="text-background" value="csharp">
                    C#
                  </option>
                  <option className="text-background" value="go">
                    Go
                  </option>
                  <option className="text-background" value="html">
                    HTML
                  </option>
                  <option className="text-background" value="css">
                    CSS
                  </option>
                  <option className="text-background" value="typescript">
                    TypeScript
                  </option>
                  <option className="text-background" value="php">
                    PHP
                  </option>
                </select>
              </div>
              <div className="flex flex-col gap-4">
                <Label htmlFor="theme-select">Theme:</Label>
                <select
                  id="theme-select"
                  value={theme}
                  onChange={handleThemeChange}
                  className="rounded border bg-hover p-2"
                >
                  <option className="text-background" value="vs-dark">
                    VS Dark
                  </option>
                  <option className="text-background" value="light">
                    Light
                  </option>
                  <option className="text-background" value="hc-black">
                    High Contrast Black
                  </option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-1">
              <div className="flex">
                <Button onClick={() => setIsSaveAs(true)}>Clear</Button>
              </div>
              <div className="flex">
                <Button onClick={() => setIsSaveAs(true)}>Save As</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isSaveAs && (
        <Modal isOpen={isSaveAs} onClose={() => setIsSaveAs(false)}>
          <div className="flex flex-col justify-center gap-4 text-center">
            <Title>Save File</Title>
            <div className="mb-2 flex flex-col gap-2">
              <Label htmlFor="file-name">Save file as:</Label>
              <Input
                id="file-name"
                value={fileName}
                placeholder="Enter file name"
                onKeyDown={handleKeyDown}
                onChange={(e) => setFileName(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={() => setIsSaveAs(false)}>Cancel</Button>
              <Button onClick={createHandler}>Save</Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default NewFile;
