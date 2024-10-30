"use client";

import { useTransition } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { createNewDocument } from "@/actions/actions";

function NewDocumentButton() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleCreateDocument = () => {
    startTransition(async () => {
      // new document
      const { documentId } = await createNewDocument();
      router.push(`/doc/${documentId}`);
    });
  };

  return (
    <div>
      <Button onClick={handleCreateDocument} disabled={isPending}>{isPending ? "Creating..." : "New Document"}</Button>
    </div>
  );
}

export default NewDocumentButton;
