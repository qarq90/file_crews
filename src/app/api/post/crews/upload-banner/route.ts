import { NextResponse, type NextRequest } from "next/server";
import pinata from "@/lib/pinata";

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        const data = await request.formData();
        const file: File | null = data.get("crew_banner") as File | null;

        if (!file) {
            return NextResponse.json(
                {
                    result: {
                        banner_id: "",
                        banner_hash: "",
                        banner_url: "",
                    },
                    status: false,
                    message: "No File Found",
                },
                { status: 400 }
            );
        }

        const result = await pinata.upload.public.file(file);
        const url = await pinata.gateways.public.convert(result.cid);

        return NextResponse.json(
            {
                result: {
                    banner_id: result.id,
                    banner_hash: result.cid,
                    banner_url: url,
                },
                status: true,
                message: "Banner Uploaded",
            },
            { status: 200 }
        );
    } catch (e) {
        console.error("Pinata upload error:", e);
        return NextResponse.json(
            {
                result: {
                    banner_id: "",
                    banner_hash: "",
                    banner_url: "",
                },
                status: false,
                message: "Internal Server Error",
            },
            { status: 500 }
        );
    }
}
