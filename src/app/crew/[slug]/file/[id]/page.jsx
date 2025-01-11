import Client from "./client";
import { BodyWrapper } from "@/components/Wrapper";

export default async function File({ params }) {
  const { slug: crew_id, id: file_id } = await params;
  return (
    <BodyWrapper>
      <Client crew_id={crew_id} file_id={file_id} />
    </BodyWrapper>
  );
}
