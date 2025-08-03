import { use } from "react";
import { BodyWrapper } from "@/components/wrappers";
import Client from "./client";

export default function CreateFile({ params }: { params: Promise<{ slug: string; id: string }> }) {
    const { slug, id } = use(params);

    return (
        <BodyWrapper>
            <Client slug={slug} id={id} />
        </BodyWrapper>
    );
}
