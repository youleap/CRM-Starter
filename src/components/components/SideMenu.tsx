"use client";

import { UserButton } from "@clerk/nextjs";
import { pathFor } from "@nirtamir2/next-static-paths";
import {
  Command,
  Home,
  LucideIcon,
  Package,
  Settings,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

function SideMenuLink(props: {
  href: string;
  Icon: LucideIcon;
  text: string;
  isFuzzy?: boolean;
  disabled?: boolean;
}) {
  const { text, Icon, href, isFuzzy = false, disabled = false } = props;
  const pathName = usePathname();
  const isActive = pathName === href;
  const isActiveFuzzy = isFuzzy && pathName.startsWith(href);

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center rounded-lg px-3 py-2 text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700",
        (isActive || disabled) && "pointer-events-none select-none",
        (isActive || isActiveFuzzy) && "bg-slate-200 dark:bg-slate-800"
      )}
    >
      <Icon className="h-5 w-5" />
      <span className="ml-3 flex-1 whitespace-nowrap">{text}</span>
    </Link>
  );
}

export function SideMenu() {
  return (
    <aside
      id="sidebar"
      className="sticky left-0 top-0 z-40 h-screen w-64 transition-transform"
      aria-label="Sidebar"
    >
      <div className="flex h-full flex-col overflow-y-auto border-r border-slate-200 bg-white px-3 py-4 dark:border-slate-700 dark:bg-slate-900">
        <Link
          href="/"
          className="mb-10 flex items-center rounded-lg px-3 py-2 text-slate-900 dark:text-white"
        >
          <Command className="h-5 w-5" />
          <span className="ml-3 text-base font-semibold">My CRM</span>
        </Link>
        <ul>
          <li>
            <SideMenuLink Icon={Home} text="Home" href={pathFor("/")} />
          </li>
          <li>
            <SideMenuLink
              isFuzzy
              Icon={Users}
              text="Deals"
              href={pathFor("/deals")}
            />
          </li>
          <li>
            <SideMenuLink
              disabled
              Icon={Package}
              text="Products"
              href={pathFor("/sign-in/[...sign-in]", { "sign-in": [] })}
            />
          </li>
          <li>
            <SideMenuLink
              disabled
              Icon={Settings}
              text="Create Organization"
              href={pathFor("/create-organization")}
            />
          </li>
        </ul>
        <div className="mt-auto flex flex-col gap-2">
          <div className="flex">
            <UserButton
              showName
              appearance={{
                elements: {
                  rootBox: "w-full",
                  userButtonOuterIdentifier: "w-full",
                },
              }}
            />
          </div>
        </div>
      </div>
    </aside>
  );
}
