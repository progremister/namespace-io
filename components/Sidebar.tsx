"use client";

import { MenuIcon } from "lucide-react";
import NewDocumentButton from "./NewDocumentButton";
import { useCollection } from "react-firebase-hooks/firestore";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useUser } from "@clerk/nextjs";
import {
  collectionGroup,
  DocumentData,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebase";
import { useEffect, useState } from "react";
import SidebarOption from "./SidebarOption";

interface RoomDocument extends DocumentData {
  createdAt: string;
  role: "owner" | "editor" | "viewer";
  roomId: string;
  userId: string;
}

function Sidebar() {
  const { user } = useUser();
  const [groupedData, setGroupedData] = useState<{
    owner: RoomDocument[];
    editor: RoomDocument[];
    viewer: RoomDocument[];
  }>({
    owner: [],
    editor: [],
    viewer: [],
  });

  const [data, loading, error] = useCollection(
    user &&
      query(
        collectionGroup(db, "rooms"),
        where("userId", "==", user.emailAddresses[0].toString())
      )
  );

  useEffect(() => {
    if (!data) return;

    const grouped = data.docs.reduce<{
      owner: RoomDocument[];
      editor: RoomDocument[];
      viewer: RoomDocument[];
    }>(
      (acc, current) => {
        const roomData = current.data() as RoomDocument;

        if (roomData.role === "owner") {
          acc.owner.push({
            id: current.id,
            ...roomData,
          });
        } else if (roomData.role === "editor") {
          acc.editor.push({
            id: current.id,
            ...roomData,
          });
        } else {
          acc.viewer.push({
            id: current.id,
            ...roomData,
          });
        }

        return acc;
      },
      {
        owner: [],
        editor: [],
        viewer: [],
      }
    );

    setGroupedData(grouped);
  }, [data]);

  const menuOptions = (
    <>
      <NewDocumentButton />

      <div className="flex py-4 flex-col space-y-4 md:max-w-36">
        {/* My Documents */}
        {groupedData.owner.length === 0 ? (
          <h2 className="text-gray-500 font-semibold text-sm">
            No documents found
          </h2>
        ) : (
          <>
            <h2 className="text-gray-500 font-semibold text-sm">
              My Documents
            </h2>
            {console.log(groupedData.owner)}
            {groupedData.owner.map((doc) => (
              <SidebarOption
                key={doc.id}
                id={doc.id}
                href={`/doc/${doc.id}`}
              />
            ))}
          </>
        )}
      </div>

      {/* Shared with me */}
      {(groupedData.editor.length > 0 || groupedData.viewer.length) && (
        <>
          <h2 className="text-gray-500 font-semibold text-sm">
            Shared With Me
          </h2>
          {groupedData.editor.concat(groupedData.viewer).map((doc) => (
            <SidebarOption key={doc.id} id={doc.id} href={`/doc/${doc.id}`} />
          ))}
        </>
      )}
    </>
  );

  return (
    <div className="p-2 md:p-5 bg-gray-200 relative">
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <MenuIcon className="p-2 hover:opacity-30 rounded-lg" size={40} />
          </SheetTrigger>
          <SheetContent side={"left"}>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <div>{menuOptions}</div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden md:inline">{menuOptions}</div>
    </div>
  );
}

export default Sidebar;
