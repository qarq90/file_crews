import { useState, useEffect } from "react";
import { deleteFile, updateFile } from "@/helper/fileHelpers";
import { useRouter } from "next/navigation";
import MonacoEditor from "@monaco-editor/react";
import Label from "./ui/Label";
import Modal from "./ui/Modal";
import Title from "./ui/Title";
import Button from "@/components/ui/Button";
import Input from "./ui/Input";

const EditFile = ({ crew_id, file_id, fileName, code, setCode }) => {
  const router = useRouter();

  const [theme, setTheme] = useState("vs-dark");
  const [language, setLanguage] = useState("javascript");
  const [isConfirmSave, setIsConfirmSave] = useState(false);
  const [isConfirmClear, setIsConfirmClear] = useState(false);
  const [isConfirmDelete, setIsConfirmDelete] = useState(false);
  const [isConfirmRename, setIsConfirmRename] = useState(false);
  const [newFileName, setNewFileName] = useState(fileName);

  const handleLanguageChange = (e) => {
    const selectedLang = e.target.value;
    setLanguage(selectedLang || "javascript");
  };

  const handleThemeChange = (e) => {
    setTheme(e.target.value || "vs-dark");
  };

  const handleChange = (value) => setCode(value);

  const editHandler = async () => {
    const fileData = {
      file_name: fileName,
      file_size: code.length,
      file_type: "text/plain",
      file_data: Buffer.from(code).toString("base64"),
    };

    try {
      await updateFile(crew_id, file_id, fileData);
      setIsConfirmSave(false);
      router.push(`/crew/${crew_id}`);
    } catch (error) {
      console.error("Error adding file:", error.message);
    }
  };

  const clearHandler = () => {
    setCode("");
    setIsConfirmClear(false);
  };

  const deleteHandler = async () => {
    try {
      await deleteFile(crew_id, file_id);
      setIsConfirmDelete(false);
      router.push(`/crew/${crew_id}`);
    } catch (error) {
      console.error("Error deleting file:", error.message);
    }
  };

  const renameHandler = async () => {
    const fileData = {
      file_name: newFileName,
      file_size: code.length,
      file_type: "text/plain",
      file_data: Buffer.from(code).toString("base64"),
    };
    try {
      await updateFile(crew_id, file_id, fileData);
      setIsConfirmRename(false);
      router.push(`/crew/${crew_id}`);
    } catch (error) {
      console.error("Error renaming file:", error.message);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      renameHandler();
    }
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        setIsConfirmSave(true);
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [code, fileName, crew_id, file_id]);

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
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                  <option value="cpp">C++</option>
                  <option value="csharp">C#</option>
                  <option value="go">Go</option>
                  <option value="html">HTML</option>
                  <option value="css">CSS</option>
                  <option value="typescript">TypeScript</option>
                  <option value="php">PHP</option>
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
                  <option value="vs-dark">VS Dark</option>
                  <option value="light">Light</option>
                  <option value="hc-black">High Contrast Black</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-1">
              <div className="flex">
                <Button onClick={() => setIsConfirmRename(true)}>Rename</Button>
              </div>
              <div className="flex">
                <Button onClick={() => setIsConfirmClear(true)}>Clear</Button>
              </div>
              <div className="flex">
                <Button onClick={() => setIsConfirmDelete(true)}>Delete</Button>
              </div>
              <div className="flex">
                <Button onClick={() => setIsConfirmSave(true)}>Save As</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isConfirmSave && (
        <Modal isOpen={isConfirmSave} onClose={() => setIsConfirmSave(false)}>
          <div className="flex flex-col justify-center gap-4 text-center">
            <Title>Are you sure?</Title>
            <p>
              Do you want to save the file as <strong>{fileName}</strong>?
            </p>
            <div className="flex gap-2">
              <Button onClick={() => setIsConfirmSave(false)}>Cancel</Button>
              <Button onClick={editHandler}>Confirm</Button>
            </div>
          </div>
        </Modal>
      )}

      {isConfirmClear && (
        <Modal isOpen={isConfirmClear} onClose={() => setIsConfirmClear(false)}>
          <div className="flex flex-col justify-center gap-4 text-center">
            <Title>Are you sure?</Title>
            <p>Do you want to clear the file content?</p>
            <div className="flex gap-2">
              <Button onClick={() => setIsConfirmClear(false)}>Cancel</Button>
              <Button onClick={clearHandler}>Confirm</Button>
            </div>
          </div>
        </Modal>
      )}

      {isConfirmDelete && (
        <Modal
          isOpen={isConfirmDelete}
          onClose={() => setIsConfirmDelete(false)}
        >
          <div className="flex flex-col justify-center gap-4 text-center">
            <Title>Are you sure?</Title>
            <p>
              Do you want to delete the file <strong>{fileName}</strong>?
            </p>
            <div className="flex gap-2">
              <Button onClick={() => setIsConfirmDelete(false)}>Cancel</Button>
              <Button onClick={deleteHandler}>Confirm</Button>
            </div>
          </div>
        </Modal>
      )}

      {isConfirmRename && (
        <Modal
          isOpen={isConfirmRename}
          onClose={() => setIsConfirmRename(false)}
        >
          <div className="flex flex-col justify-center gap-4 text-center">
            <Title>Rename File</Title>
            <Input
              type="text"
              value={newFileName}
              onKeyDown={handleKeyDown}
              onChange={(e) => setNewFileName(e.target.value)}
            />
            <div className="flex gap-2">
              <Button onClick={() => setIsConfirmRename(false)}>Cancel</Button>
              <Button onClick={renameHandler}>Rename</Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default EditFile;
