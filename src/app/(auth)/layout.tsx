"use client";

import { ReactNode } from "react";
import Image from "next/image";

export default function AuthLayout(props: { children: ReactNode }) {
  const { children } = props;
  return (
    <div className="flex h-screen w-full">
      <div className="flex flex-1 flex-col items-center justify-center bg-white">
        {children}
      </div>
      <div className="h-full w-[1px] bg-gray-200" />
      <div className="bg-bgPurple flex w-96 flex-1 items-end pl-40">
        <Image
          src="/assets/auth-layout-tablet.png"
          alt="Login"
          width={1634}
          height={1596}
        />
      </div>
    </div>
  );
}
