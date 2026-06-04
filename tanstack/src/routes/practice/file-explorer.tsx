import { IconFile, IconFolder } from "@tabler/icons-react";
import { createFileRoute } from "@tanstack/react-router";
import React, { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/practice/file-explorer")({
  component: RouteComponent,
});

const generateId = () => Math.floor(Math.random() * 1000000);

const fileSystem = [
  {
    id: generateId(),
    name: "Desktop",
    type: "directory",
    children: [
      {
        id: generateId(),
        name: "photos",
        type: "directory",
        children: [
          {
            id: generateId(),
            name: "Personal",
            type: "directory",
            children: [
              {
                id: generateId(),
                name: "new.png",
                type: "image",
                metadata: {
                  size: "2.1MB",
                  lastUpdated: "22 Dec 2025",
                },
              },
              {
                id: generateId(),
                name: "user.png",
                type: "image",
                metadata: {
                  size: "1.8MB",
                  lastUpdated: "21 Dec 2025",
                },
              },
            ],
          },
          {
            id: generateId(),
            name: "new.txt",
            type: "text",
            metadata: {
              size: "14MB",
              lastUpdated: "22 Dec 2025",
            },
          },
        ],
      },
      {
        id: generateId(),
        name: "new.txt",
        type: "text",
        metadata: {
          size: "5MB",
          lastUpdated: "25 Dec 2025",
        },
      },
      {
        id: generateId(),
        name: "text.txt",
        type: "text",
        metadata: {
          size: "3MB",
          lastUpdated: "26 Dec 2025",
        },
      },
    ],
  },
];

function RenderFiles({ file }: { file: any }) {
  return (
    <div className="flex gap-2 items-center  justify-between text-zinc-950 text-xs mb-1">
      <div className="flex gap-2">
        <IconFile size={16} />
        <p>{file?.name}</p>
      </div>
      <div>{file?.size}</div>
    </div>
  );
}
function RenderDirectories({
  directory,
  idx,
}: {
  directory: any;
  idx: number;
}) {
  const [open, setOpen] = useState(true);
  const [directories, setDirectories] = useState(directory);
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);
  const [input, setInput] = useState("");
  const [newItem, setNewItem] = useState(false);

  function handleToggle(e: any) {
    e.stopPropagation();
    setOpen((t) => !t);
  }

  const subChilds = directories.children;

  function handleToggleMenu(e: any) {
    e.preventDefault();
    setOpenMenu((i) => !i);
  }

  const handleNewItem = (e: any) => {
    e.stopPropagation();
    setNewItem(true);
    setOpenMenu(false);
  };

  const handleSave = (e: any) => {
    if (e.key !== "Enter") return;
    setDirectories((d: any) => {
      return {
        ...d,
        children: [
          ...d.children,
          {
            name: input,
            type: input.includes(".") ? "file" : "directory",
            id: generateId(),
          },
        ],
      };
    });
    setNewItem(false);
  };

  return (
    <>
      <div
        className="text-zinc-950 text-xs flex gap-2 items-center cut relative select-none mb-1 cursor-pointer"
        onClick={handleToggle}
        onContextMenu={handleToggleMenu}
      >
        <IconFolder size={16} /> {directory.name}
        {openMenu ? (
          <div
            ref={menuRef}
            className=" z-10 bg-blue-100 flex flex-col gap-1 absolute w-max p-2 left-[110%] top-[20%] items-start [>&button]:cursor-pointer  "
          >
            <button onClick={handleNewItem}> Create Directory</button>
            <button onClick={handleNewItem}>Delete Directory</button>
            <button onClick={handleNewItem}>Create File</button>
            <button onClick={handleNewItem}>Delete File</button>
            <button>Info</button>
          </div>
        ) : (
          <></>
        )}
      </div>
      {newItem ? (
        <input
          style={{
            marginLeft: `${8 * idx + 8}px`,
          }}
          type="text"
          onChange={(e) => {
            setInput(e.target.value);
          }}
          onKeyDown={handleSave}
          className="ring ring-zinc-500 text-zinc-950 outline-none px-1 mb-2"
        />
      ) : (
        <></>
      )}

      <React.Activity mode={open ? "visible" : "hidden"}>
        <div
          style={{
            paddingLeft: `${8 * idx}px`,
          }}
        >
          {subChilds?.map((item: any, index: number) => {
            if (item.type !== "directory") {
              return <RenderFiles key={item.id} file={item} />;
            }
            return (
              <RenderDirectories
                key={item.id}
                directory={item}
                idx={idx + 1 + index}
              />
            );
          })}
        </div>
      </React.Activity>
    </>
  );
}

function FileSystem() {
  return (
    <div className="ring text-xs ring-zinc-500 flex flex-col  items-start justify-start p-2 min-w-60 bg-white/80">
      <div className="mb-2 pb-1 border-b border-zinc-500 w-full">
        File Directory
      </div>
      {fileSystem?.map((item, idx) => {
        return (
          <RenderDirectories key={item.id} directory={item} idx={idx + 1} />
        );
      })}
    </div>
  );
}

function RouteComponent() {
  return <FileSystem />;
}
