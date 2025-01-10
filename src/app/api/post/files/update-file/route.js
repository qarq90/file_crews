import { NextResponse } from "next/server";
import connection from "@/lib/connection";
import File from "@/models/File";

export const POST = async (request) => {
  try {
    const { crew_id, file_id, fileData } = await request.json();

    await connection();

    const updatedFile = await File.findOneAndUpdate(
      { crew_id, _id: file_id },
      {
        $set: {
          file_name: fileData.file_name,
          file_size: fileData.file_size,
          file_type: fileData.file_type,
          file_data: Buffer.from(fileData.file_data, "base64"),
        },
      },
      { new: true, upsert: false },
    );

    if (updatedFile) {
      return NextResponse.json({
        message: "File updated successfully",
        status: true,
        result: updatedFile,
      });
    }

    return NextResponse.json({
      message: "File not found or failed to update",
      status: false,
    });
  } catch (error) {
    console.error("Error in updating file:", error);
    return NextResponse.json({
      message: `Error updating file: ${error.message}`,
      status: false,
    });
  }
};
