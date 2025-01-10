import { NextResponse } from "next/server";
import connection from "@/lib/connection";
import Crew from "@/models/Crew";
import File from "@/models/File";

export const POST = async (request) => {
  try {
    const crew_id = await request.json();

    await connection();

    const resultCrew = await Crew.deleteMany({ _id: crew_id });
    const resultFile = await File.deleteMany({ crew_id: crew_id });

    if (resultCrew && resultFile) {
      return NextResponse.json({
        message: "Crew disbanded successfully",
        status: true,
        result: deletedFile,
      });
    }

    return NextResponse.json({
      message: "Failed to disband Crew",
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
