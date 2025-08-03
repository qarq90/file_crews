import { BodyWrapper } from "@/components/wrappers";
import Client from "./client";

export default async function CreateFile() {
    return (
        <BodyWrapper>
            <Client />
        </BodyWrapper>
    );
}
