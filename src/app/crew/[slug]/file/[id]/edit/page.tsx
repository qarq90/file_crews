import { BodyWrapper } from "@/components/wrappers";
import Client from "./client";

type PageProps = {
    params: { slug: string; id: string };
    searchParams: { [key: string]: string | string[] | undefined }; // or use `URLSearchParams` if you're handling query strings
};

export default function Page({ params }: PageProps) {
    const { slug, id } = params;

    return (
        <BodyWrapper>
            <Client slug={slug} id={id} />
        </BodyWrapper>
    );
}
