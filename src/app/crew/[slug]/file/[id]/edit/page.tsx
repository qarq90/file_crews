import { BodyWrapper } from "@/components/wrappers";
import Client from "./client";

export default function CreateFile({ params }: CrewEditSlug) {
    const { slug, id } = params;

    return (
        <BodyWrapper>
            <Client slug={slug} id={id} />
        </BodyWrapper>
    );
}
