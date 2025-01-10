import { NextResponse } from "next/server";
import connection from "@/lib/connection.js";
import Crew from "@/models/Crew";

export const GET = async () => {
  try {
    await connection();

    const result = await Crew.find({});

    if (result) {
      return NextResponse.json({
        message: "Crews fetched successfully",
        status: true,
        result: result,
      });
    } else {
      return NextResponse.json({
        message: "No crews found",
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
