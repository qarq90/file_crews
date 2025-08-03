import Title from "@/components/ui/title";
import { AuthWrapper } from "@/components/wrappers";
import Client from "./client";

export default function CreateCrew() {
    return (
        <AuthWrapper>
            <Title>New Crew</Title>
            <Client />
        </AuthWrapper>
    )
}