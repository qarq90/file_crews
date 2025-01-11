import { BodyWrapper } from "@/components/Wrapper";
import Title from "@/components/ui/Title";
import Client from "./client";

export default function Crews() {
  return (
    <BodyWrapper>
      <div className="mt-5">
        <Title>Crews</Title>
      </div>
      <Client />
    </BodyWrapper>
  );
}
