import LiveBlocksProvided from "@/components/LiveBlocksProvided";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return <LiveBlocksProvided>{children}</LiveBlocksProvided>;
};

export default PageLayout;
