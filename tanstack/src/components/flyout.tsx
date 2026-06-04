import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { IconChevronRight, IconDotsVerticalFilled } from "@tabler/icons-react";
import { cn } from "../lib/utils";

const FlyoutContext = createContext({
  toggle: () => {},
  open: false,
});

const useFlyOutContext = () => {
  if (!FlyoutContext) {
    throw new Error("useFlyOutContext must be used within a FlyOut");
  }

  return useContext(FlyoutContext);
};

export const FlyOut = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);

  const toggle = useCallback(() => {
    setOpen((open) => !open);
  }, []);

  const values = useMemo(() => ({ open, toggle }), [open, toggle]);

  return (
    <div className="relative">
      <FlyoutContext.Provider value={values}>{children}</FlyoutContext.Provider>
    </div>
  );
};

FlyOut.Toggle = ({ className }: { className?: string }) => {
  const { toggle } = useFlyOutContext();

  return (
    <button
      className={cn(
        "flex p-2 rounded text-4xl cursor-pointer text-white",
        className,
      )}
      onClick={toggle}
    >
      <IconDotsVerticalFilled />
    </button>
  );
};

FlyOut.List = ({
  className,
  children,
  position = "right",
}: {
  className: string;
  children: ReactNode;
  position: "left" | "right" | "top" | "bottom";
}) => {
  const ref = useRef(null);
  const { open } = useFlyOutContext();

  return (
    <ul
      ref={ref}
      className={`${open ? "block" : "hidden"} absolute ${className}`}
    >
      {children}
    </ul>
  );
};

FlyOut.ListItem = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return <li className={className}>{children}</li>;
};
