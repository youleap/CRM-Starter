import { ReactNode } from "react";
import { Header } from "@/components/components/Header";
import { SideMenu } from "@/components/components/SideMenu";

interface Props {
  children: ReactNode;
}

export function AppLayout(props: Props) {
  const { children } = props;

  return (
    <div className="flex">
      <SideMenu />
      <div className="min-w-0 flex-1">
        <Header />
        <div className="flex-1 p-8">{children}</div>
      </div>
    </div>
  );
}
