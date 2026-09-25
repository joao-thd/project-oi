import { createFileRoute } from "@tanstack/react-router";
import referenceHtml from "../reference.html?raw";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <div dangerouslySetInnerHTML={{ __html: referenceHtml }} />;
}
