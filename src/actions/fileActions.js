import { S3Client } from "@aws-sdk/client-s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";

const s3 = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  },
});

export async function createFile(crewId, fileData) {
  try {
    const response = await fetch("/api/post/files/create-file", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ crew_id: crewId, fileData: fileData }),
    });

    return await response.json();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create file");
  }
}

export async function fetchCrewFiles(crewId) {
  try {
    const response = await fetch("/api/post/files/file-crew", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(crewId),
    });

    return await response.json();
  } catch (err) {
    console.log(err);
  }
}

export async function fetchFile(file_id) {
  try {
    const response = await fetch("/api/post/files/fetch-file", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(file_id),
    });

    return await response.json();
  } catch (err) {
    console.log(err);
  }
}

export async function updateFile(crewId, file_id, fileData) {
  try {
    const response = await fetch("/api/post/files/update-file", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ crew_id: crewId, file_id: file_id, fileData }),
    });

    return await response.json();
  } catch (error) {
    console.error("Error in updateFile:", error);
    return { status: false, message: error.message };
  }
}

const generateFileName = (bytes = 32) => {
  return crypto.randomBytes(bytes).toString("hex");
};

export async function uploadFileToS3() {
  const fileName = generateFileName();

  const putObjCommand = new PutObjectCommand({
    Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
    Key: fileName,
  });

  const signedUrl = await getSignedUrl(s3, putObjCommand, {
    expiresIn: 60,
  });

  return { success: { url: signedUrl } };
}

export async function deleteFile(crewId, file_id, key, isHttpLink) {
  if (isHttpLink) {
    const deleteObjectCommand = new DeleteObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
      Key: key,
    });

    await s3.send(deleteObjectCommand);
  }

  try {
    const response = await fetch("/api/post/files/delete-file", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ crew_id: crewId, file_id: file_id }),
    });

    return await response.json();
  } catch (error) {
    console.error("Error in updateFile:", error);
    return { status: false, message: error.message };
  }
}
