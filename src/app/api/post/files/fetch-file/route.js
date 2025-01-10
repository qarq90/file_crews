import { NextResponse } from "next/server";
import connection from "@/lib/connection.js";
import File from "@/models/File";

export const POST = async (request) => {
  try {
    const fileId = await request.json();

    await connection();

    const result = await File.find({
      _id: fileId,
    });

    if (result) {
      return NextResponse.json({
        message: "File fetched successfully",
        status: true,
        result: result,
      });
    } else {
      return NextResponse.json({
        message: "No file found",
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
