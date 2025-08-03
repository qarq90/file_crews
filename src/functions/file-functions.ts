import pool from "@/lib/neon";

export async function fetchFiles(
    crew_id: string
): Promise<FilesNeonResultType> {
    try {
        const client = await pool.connect();
        const result = await client.query(
            `SELECT * FROM files WHERE file_crew_id = $1`,
            [crew_id]
        );

        client.release();
        return {
            result: result.rows,
            status: true,
            message: "Crew Created Successfully",
        };
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to create crew");
    }
}

export async function fetchFile(file_id: string): Promise<FileNeonResultType> {
    try {
        const client = await pool.connect();
        const result = await client.query(
            `SELECT * FROM files WHERE file_id = $1`,
            [file_id]
        );

        client.release();
        return {
            result: result.rows[0],
            status: true,
            message: "File Fetched Successfully",
        };
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to create crew");
    }
}

export async function insertFileRow(
    crew_id: string,
    file: FileType,
    pinataResult: PinataInsert
): Promise<FileCreateResponseType> {
    try {
        const client = await pool.connect();
        const result = await client.query(
            `INSERT into files 
             (file_name, file_type, file_size, file_url, file_crew_id, file_id)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING *`,
            [
                file.file_name,
                file.file_type,
                file.file_size,
                pinataResult.banner_url,
                crew_id,
                pinataResult.banner_id,
            ]
        );

        client.release();
        return {
            result: result.rows[0],
            status: true,
            message: "File Uploaded Successfully",
        };
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to create crew");
    }
}

export async function updateFileRow(
    file_id: string,
    fileData: Partial<FileType>
) {
    try {
        const client = await pool.connect();

        const updateQuery = `
      UPDATE files
      SET file_name = $1,
          file_type = $2,
          file_size = $3,
          file_url = $4
      WHERE file_id = $5
    `;

        await client.query(updateQuery, [
            fileData.file_name,
            fileData.file_type,
            fileData.file_size,
            fileData.file_url,
            file_id,
        ]);

        client.release();

        return {
            status: true,
            message: "File updated successfully",
        };
    } catch (error) {
        console.error("Update Error:", error);
        return {
            status: false,
            message: "Failed to update file",
        };
    }
}

export async function deleteFileRow(file_id: string) {
    try {
        const client = await pool.connect();

        const deleteQuery = `
      DELETE FROM files
      WHERE file_id = $1
    `;

        await client.query(deleteQuery, [file_id]);

        client.release();

        return {
            status: true,
            message: "File deleted successfully",
        };
    } catch (error) {
        console.error("Delete Error:", error);
        return {
            status: false,
            message: "Failed to delete file",
        };
    }
}

export async function createFileRow(
    crew_id: string,
    file: FileType
): Promise<FileCreateResponseType> {
    try {
        const client = await pool.connect();
        const result = await client.query(
            `INSERT into files 
             (file_name, file_type, file_size, file_url, file_crew_id, file_id)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING *`,
            [
                file.file_name,
                file.file_type,
                file.file_size,
                file.file_url,
                crew_id,
                file.file_id,
            ]
        );

        client.release();
        return {
            result: result.rows[0],
            status: true,
            message: "File Uploaded Successfully",
        };
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to create crew");
    }
}

export const getFileName = (fileName: string): string => {
    const lastDotIndex = fileName.lastIndexOf(".");
    return lastDotIndex !== -1 ? fileName.slice(0, lastDotIndex) : fileName;
};

export const getFileType = (mimeType: string): string => {
    const mimeToExtension: Record<string, string> = {
        "application/msword": ".doc",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            ".docx",
        "application/vnd.oasis.opendocument.text": ".odt",
        "application/rtf": ".rtf",
        "text/plain": ".txt",

        "application/vnd.ms-excel": ".xls",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
            ".xlsx",
        "application/vnd.oasis.opendocument.spreadsheet": ".ods",
        "text/csv": ".csv",

        "application/vnd.ms-powerpoint": ".ppt",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation":
            ".pptx",
        "application/vnd.oasis.opendocument.presentation": ".odp",

        "application/pdf": ".pdf",

        "image/jpeg": ".jpg",
        "image/png": ".png",
        "image/gif": ".gif",
        "image/svg+xml": ".svg",
        "image/webp": ".webp",
        "image/tiff": ".tiff",
        "image/bmp": ".bmp",
        "image/vnd.adobe.photoshop": ".psd",

        "application/zip": ".zip",
        "application/x-rar-compressed": ".rar",
        "application/x-7z-compressed": ".7z",
        "application/x-tar": ".tar",
        "application/gzip": ".gz",

        "application/json": ".json",
        "application/xml": ".xml",
        "text/html": ".html",
        "text/css": ".css",
        "application/javascript": ".js",
        "application/x-sh": ".sh",
    };

    return (
        mimeToExtension[mimeType] ||
        (mimeType ? `.${mimeType.split("/").pop()?.split(".").pop()}` : "")
    );
};

export const getFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export const uploadToPinata = async (file: FileType) => {
    try {
        if (!file) {
            alert("No file selected");
            return;
        }

        if (file.original_file !== undefined) {
            const renamedFile = new File([file.original_file], file.file_name, {
                type: file.file_type,
            });

            const data = new FormData();
            data.set("file", renamedFile);

            const uploadRequest = await fetch("/api/post/files/upload-files", {
                method: "POST",
                body: data,
            });

            if (!uploadRequest.ok) {
                throw new Error(`Upload failed for file: ${file.file_name}`);
            }

            return await uploadRequest.json();
        }
    } catch (e) {
        console.error(e);
        alert("Error uploading file");
    }
};

export const deleteFromPinata = async (file_id: string) => {
    try {
        const response = await fetch("/api/delete/files/delete-file", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: file_id }),
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                error:
                    data.error || `Failed to delete file (${response.status})`,
            };
        }

        const client = await pool.connect();

        const deleteQuery = `
      DELETE FROM files
      WHERE file_id = $1
    `;

        await client.query(deleteQuery, [file_id]);

        client.release();

        return {
            status: true,
            message: "File deleted successfully",
        };
    } catch (e) {
        const error = e instanceof Error ? e.message : "Connection failed";
        console.error("Deletion error:", error);
        return { success: false, error };
    }
};
