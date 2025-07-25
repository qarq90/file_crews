import { AuthWrapper } from "@/components/Wrapper";
import Client from "./client";
import Title from "@/components/ui/Title";

export default function CreateCrew() {
  return (
    <AuthWrapper>
      <div className="flex h-screen w-full flex-col items-center justify-center gap-8">
        <Title>New Crew</Title>
        <Client />
      </div>
    </AuthWrapper>
  );
}
