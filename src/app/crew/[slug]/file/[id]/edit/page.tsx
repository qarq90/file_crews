import { BodyWrapper } from "@/components/wrappers";
import Client from "./client";

type PageProps = {
    params: {
        slug: string;
        id: string;
    };
};

export default function CreateFile({ params }: PageProps) {
    const { slug, id } = params;

    return (
        <BodyWrapper>
            <Client slug={slug} id={id} />
        </BodyWrapper>
    );
}
