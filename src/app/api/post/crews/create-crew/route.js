import { NextResponse } from "next/server";
import connection from "@/lib/connection.js";
import Crew from "@/models/Crew";

export const POST = async (request) => {
  try {
    const crewData = await request.json();

    await connection();

    const result = await Crew.create({
      crew_name: crewData.crew_name,
      crew_token: crewData.crew_password,
    });

    if (result) {
      return NextResponse.json({
        message: "Crew created Successfully",
        status: true,
        result: result,
      });
    } else {
      return NextResponse.json({
        message: "Failed to create Crew",
        status: false,
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Error connecting to Database: " + error.message,
      status: false,
    });
  }
};
