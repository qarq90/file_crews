import { NextResponse } from "next/server";
import connection from "@/lib/connection";
import File from "@/models/File";

export const POST = async (request) => {
  try {
    const { crew_id, file_id } = await request.json();

    await connection();

    const deletedFile = await File.findOneAndDelete({ crew_id, _id: file_id });

    if (deletedFile) {
      return NextResponse.json({
        message: "File deleted successfully",
        status: true,
        result: deletedFile,
      });
    }

    return NextResponse.json({
      message: "File not found or failed to delete",
      status: false,
    });
  } catch (error) {
    console.error("Error in deleting file:", error);
    return NextResponse.json({
      message: `Error deleting file: ${error.message}`,
      status: false,
    });
  }
};
