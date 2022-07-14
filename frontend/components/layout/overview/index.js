import { Navbar } from "@components/overview";

export default function OverviewLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
