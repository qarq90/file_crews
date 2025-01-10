import { NextResponse } from "next/server";
import connection from "@/lib/connection.js";
import File from "@/models/File";

export const POST = async (request) => {
  try {
    const { crew_id, fileData } = await request.json();

    await connection();

    const result = await File.create({
      crew_id: crew_id,
      file_name: fileData.file_name,
      file_size: fileData.file_size,
      file_type: fileData.file_type,
      file_data: fileData.file_data,
    });

    if (result) {
      return NextResponse.json({
        message: "File created successfully",
        status: true,
        result: result,
      });
    } else {
      return NextResponse.json({
        message: "Failed to create file",
        status: false,
        result: [],
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Error fetching crews: " + error.message,
      status: false,
    });
  }
};
