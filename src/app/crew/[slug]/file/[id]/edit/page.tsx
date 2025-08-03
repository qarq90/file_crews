import { BodyWrapper } from "@/components/wrappers";
import Client from "./client";

type PageProps = {
    params: {
        slug: string;
        id: string;
    };
};

export default async function CreateFile({ params }: PageProps) {
    const { slug, id } = params;

    // You can also do async data fetching here if needed
    // const data = await fetch(...)

    return (
        <BodyWrapper>
            <Client slug={slug} id={id} />
        </BodyWrapper>
    );
}
