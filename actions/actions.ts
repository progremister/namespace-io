"use server";

import { adminDb } from "@/firebase-admin";
import { auth } from "@clerk/nextjs/server";

export async function createNewDocument() {
  auth.protect();

  const { sessionClaims } = await auth();

  const documentCollectionRef = adminDb.collection("documents");
  const documentRef = await documentCollectionRef.add({
    title: "New Document",
  });

  await adminDb
    .collection("users")
    .doc(sessionClaims?.email!)
    .collection("rooms")
    .doc(documentRef.id)
    .set({
      userId: sessionClaims?.email!,
      role: "owner",
      cretedAt: new Date(),
      roomId: documentRef.id,
    });

    return {documentId: documentRef.id};
}
