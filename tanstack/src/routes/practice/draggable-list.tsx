import { createFileRoute } from "@tanstack/react-router";
import React, { useMemo, useRef, useState } from "react";

export const Route = createFileRoute("/practice/draggable-list")({
  component: RouteComponent,
});

type TASK = {
  id: number;
  title: string;
  status: "not started" | "progress" | "completed";
};

const DATA: TASK[] = [
  { id: 1, title: "Gather requirements", status: "not started" },
  { id: 2, title: "Create wireframes", status: "not started" },
  { id: 3, title: "Set up database", status: "not started" },
  { id: 4, title: "Develop login page", status: "progress" },
  { id: 5, title: "Implement API", status: "progress" },
  { id: 6, title: "Write tests", status: "progress" },
  { id: 7, title: "Initialize repository", status: "completed" },
  { id: 8, title: "Configure environment", status: "completed" },
  { id: 9, title: "Create roadmap", status: "completed" },
];

const DraggableList = () => {
  const [data, setData] = useState<TASK[]>(DATA);
  const draggingItem = useRef<TASK | null>(null);

  const { NOT_STARTED, COMPLETED, PROGRESS } = useMemo(() => {
    const NOT_STARTED: TASK[] = [];
    const COMPLETED: TASK[] = [];
    const PROGRESS: TASK[] = [];

    data.forEach((item) => {
      if (item.status === "completed") {
        COMPLETED.push(item);
      } else if (item.status === "not started") {
        NOT_STARTED.push(item);
      } else {
        PROGRESS.push(item);
      }
    });
    return {
      NOT_STARTED,
      COMPLETED,
      PROGRESS,
    };
  }, [data]);

  const handleDrop = (e: any) => {
    const type = e.target.id;
    if (draggingItem.current && draggingItem.current.status !== type) {
      const filtered = data.filter(
        (item) => item.id !== draggingItem.current.id,
      );
      filtered.push({ ...draggingItem.current, status: type });
      setData(filtered);
      draggingItem.current = null;
    }
  };
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex h-full gap-4 w-full  items-center justify-center">
      <div
        onDrop={handleDrop}
        id="not started"
        onDragOver={handleDragOver}
        className="min-w-3/12 bg-lime-200/20 min-h-8/12 flex flex-col gap-2 items-start justify-start p-4 ring ring-lime-300 rounded-xl drop-shadow-2xl"
      >
        <div>NOT STARTED</div>

        {NOT_STARTED?.map((item) => {
          return (
            <div
              onDragStart={(e) => {
                draggingItem.current = item;
              }}
              draggable
              key={item.id}
              className="cursor-pointer bg-lime-50 drop-shadow-lg select-none text-start border-2 border-dashed border-lime-300 rounded-lg   px-2  py-2 w-full"
            >
              {item.title}
            </div>
          );
        })}
      </div>
      <div
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        id="progress"
        className="min-h-8/12 bg-purple-300/20 min-w-3/12 flex flex-col gap-2 items-start justify-start p-4 ring ring-purple-300 rounded-xl drop-shadow-2xl"
      >
        <div>IN PROGRESS</div>{" "}
        {PROGRESS?.map((item) => {
          return (
            <div
              onDragStart={(e) => {
                draggingItem.current = item;
              }}
              draggable
              key={item.id}
              className="cursor-pointer bg-purple-50 drop-shadow-lg select-none text-start border-2 border-dashed border-purple-300 rounded-lg   px-2  py-2 w-full"
            >
              {item.title}
            </div>
          );
        })}
      </div>
      <div
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        id="completed"
        className="min-h-8/12 bg-pink-200/20 min-w-3/12 flex flex-col gap-2 items-start justify-start p-4 ring ring-pink-300 rounded-xl drop-shadow-2xl"
      >
        <div>COMPLETED</div>
        {COMPLETED?.map((item) => {
          return (
            <div
              onDragStart={(e) => {
                draggingItem.current = item;
              }}
              draggable
              key={item.id}
              className="cursor-pointer bg-pink-100 drop-shadow-lg select-none text-start border-2 border-dashed border-pink-300 rounded-lg   px-2  py-2 w-full"
            >
              {item.title}
            </div>
          );
        })}
      </div>
    </div>
  );
};

function RouteComponent() {
  return <DraggableList />;
}
