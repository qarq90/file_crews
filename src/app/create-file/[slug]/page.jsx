import { BodyWrapper } from "@/components/Wrapper";
import Client from "./client";

export default async function CreateFile({ params }) {
  const { slug: crew_id } = await params;

  return (
    <BodyWrapper>
      <Client crew_id={crew_id} />
    </BodyWrapper>
  );
}
