import { BodyWrapper } from "@/components/wrappers";
import Client from "./client";


export default function Crews({ params }: CrewSlug) {
    const { slug } = params;

    return (
        <BodyWrapper>
            <Client slug={slug} />
        </BodyWrapper>
    );
}
