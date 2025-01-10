import { BodyWrapper } from "@/components/Wrapper";
import Client from "./client";

export default async function File({ params }) {
  const { slug: crew_id, id: file_id } = await params;
  return (
    <BodyWrapper>
      <Client crew_id={crew_id} file_id={file_id} />
    </BodyWrapper>
  );
}
