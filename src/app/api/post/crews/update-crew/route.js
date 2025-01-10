import { NextResponse } from "next/server";
import connection from "@/lib/connection.js";
import Crew from "@/models/Crew";

export const POST = async (request) => {
  try {
    const { crewId, crewData } = await request.json();

    await connection();

    const result = await Crew.findOneAndUpdate(
      { crew_id: crewId },
      {
        crew_name: crewData.crew_name,
        crew_token: crewData.crew_token,
        crew_banner: {
          name: crewData.crew_banner.name,
          base64: crewData.crew_banner.base64,
        },
      },
      { new: true, upsert: false },
    );

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
