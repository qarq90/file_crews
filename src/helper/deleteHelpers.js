import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  },
});

export async function deleteDoc(_id, key) {
  const deleteObjectCommand = new DeleteObjectCommand({
    Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
    Key: key,
  });

  await s3.send(deleteObjectCommand);

  const request = {
    _id: _id,
  };

  const response = await fetch("/api/post/delete-doc", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });

  return await response.json();
}
