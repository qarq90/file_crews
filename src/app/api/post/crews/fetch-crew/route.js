import { NextResponse } from "next/server";
import connection from "@/lib/connection.js";
import Crew from "@/models/Crew";

export const POST = async (request) => {
  try {
    const crewId = await request.json();

    await connection();

    const result = await Crew.find({
      _id: crewId,
    });

    if (result) {
      return NextResponse.json({
        message: "Crew Data fetched successfully",
        status: true,
        result: result,
      });
    } else {
      return NextResponse.json({
        message: "No crew found",
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
