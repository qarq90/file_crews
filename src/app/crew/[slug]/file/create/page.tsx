import { BodyWrapper } from "@/components/wrappers";
import Client from "./client";

export default async function CreateFile({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    return (
        <BodyWrapper>
            <Client slug={slug} />
        </BodyWrapper>
    );
}
