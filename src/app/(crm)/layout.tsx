import { ReactNode } from "react";
import { AppLayout } from "@/components/components/Layout";

interface Props {
  children: ReactNode;
  modal?: ReactNode;
}

export default function Layout(props: Props) {
  const { children, modal } = props;

  return (
    <AppLayout>
      {children}
      {modal}
    </AppLayout>
  );
}
