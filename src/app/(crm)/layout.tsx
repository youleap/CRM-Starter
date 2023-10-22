import { ReactNode } from "react";
import { AppLayout } from "@/components/components/Layout";

interface Props {
  children: ReactNode;
}

export default function Layout(props: Props) {
  const { children } = props;

  return <AppLayout>{children}</AppLayout>;
}
