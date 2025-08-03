import { BodyWrapper } from "@/components/wrappers";
import Client from "./client";

export default function CreateFile({
    params,
}: {
    params: { slug: string; id: string };
}) {
    return (
        <BodyWrapper>
            <Client slug={params.slug} id={params.id} />
        </BodyWrapper>
    );
}
