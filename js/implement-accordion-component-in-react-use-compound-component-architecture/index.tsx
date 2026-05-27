const AccordionContext = createContext<{
  multiple: boolean;
  activeIds: string[];
  toggleItem: (i: string) => void;
}>({
  multiple: false,
  activeIds: [],
  toggleItem: (i: string) => {},
});
const AcordionItemContext = createContext({
  open: false,
  toggle: () => {},
  id: "",
});

const Accordion = ({
  children,
  collapsible = false,
  title = "",
  description = "",
  multiple = false,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
  multiple?: boolean;
  collapsible?: boolean;
}) => {
  const [open, setOpen] = useState(true);
  const [activeIds, setActiveIds] = useState<string[]>([]);

  function toggle() {
    setOpen((open) => !open);
  }

  function toggleItem(id: string) {
    if (!multiple) {
      setActiveIds(activeIds[0] === id ? [] : [id]);
    } else if (activeIds.some((i) => i == id)) {
      setActiveIds((i) => i.filter((it) => it !== id));
    } else {
      setActiveIds((i) => [...i, id]);
    }
  }

  return (
    <AccordionContext.Provider
      value={{
        multiple,
        activeIds,
        toggleItem,
      }}
    >
      <div
        className={cn(
          "max-w-4xl mx-auto min-w-xs sm:min-w-4xl min-h-6/12 select-none",
        )}
      >
        <div className="flex justify-between items-start">
          <div className="flex flex-col mb-4">
            <h3 className="sm:text-4xl text-2xl">{title}</h3>
            <p className="sm:text-base text-sm text-zinc-700">{description}</p>
          </div>
          <Button
            className={`${!collapsible ? "hidden" : ""}`}
            onClick={toggle}
          >
            {open ? "close" : "open"}
          </Button>
        </div>
        <div
          className={cn("space-y-4 divide-y", {
            invisible: !open,
          })}
        >
          {children}
        </div>
      </div>
    </AccordionContext.Provider>
  );
};

Accordion.Item = ({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) => {
  const { toggleItem, activeIds } = useContext(AccordionContext);
  const toggle = () => toggleItem(id);
  const open = activeIds.some((i) => i == id);

  return (
    <AcordionItemContext.Provider
      value={{
        id,
        toggle,
        open,
      }}
    >
      <div id={id.toString()} className="bg-zinc-100 p-4">
        {children}
      </div>
    </AcordionItemContext.Provider>
  );
};

Accordion.Toggle = (props: { children: ReactNode }) => {
  const { toggle, open } = useContext(AcordionItemContext);
  return (
    <div
      onClick={toggle}
      className={
        "cursor-pointer flex items-center justify-between  font-medium text-xl "
      }
    >
      {props.children}
      <IconChevronDown
        className={cn(
          "transition-transform cursor-pointer ease-in-out duration-300",
          {
            "rotate-180": !open,
          },
        )}
      />
    </div>
  );
};

Accordion.Panel = ({ children }: { children: ReactNode }) => {
  const { open } = useContext(AcordionItemContext);

  return (
    <div hidden={!open}>
      <p>{children}</p>
    </div>
  );
};

function RouteComponent() {
  return (
    <div>
      <Accordion
        collapsible
        title="Have Questions?"
        description="find out here"
        multiple
      >
        <Accordion.Item id="1">
          <Accordion.Toggle>Devtools Tech? 🤔</Accordion.Toggle>
          <Accordion.Panel>
            The aim with Devtools Tech is to create a platform for Frontend
            Engineers where we all can improve, invest in ourselves, and grow by
            learning from high quality real world programming content. This is a
            platform where you can practice actual interview questions, watch
            courses, read blogs, and keep track of your progress across various
            domains and topics.
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item id="2">
          <Accordion.Toggle>Is it Free?</Accordion.Toggle>
          <Accordion.Panel>
            Yes, the platform and YouTube both are completely free!
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
