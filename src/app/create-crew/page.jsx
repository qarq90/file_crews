import { AuthWrapper } from "@/components/Wrapper";
import Title from "@/components/ui/Title";
import Client from "./client";

export default function CreateCrew() {
  return (
    <AuthWrapper>
      <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
        <Title>New Crew</Title>
        <Client />
      </div>
    </AuthWrapper>
  );
}
