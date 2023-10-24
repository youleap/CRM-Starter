import { ReactNode } from "react";
import { Command } from "lucide-react";
import Link from "next/link";
import { config } from "@/config/config";

function ExternalLink(props: { href: string; children: ReactNode }) {
  const { href, children } = props;

  return (
    // eslint-disable-next-line react/forbid-elements
    <a
      className="flex items-center text-lg font-medium text-foreground/60 transition-colors hover:text-foreground/80 sm:text-sm"
      href={href}
    >
      {children}
    </a>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link className="hidden items-center space-x-2 md:flex" href="/">
            <Command height={24} width={24} />
            <span className="hidden font-bold sm:inline-block">My CRM</span>
          </Link>
          <nav className="hidden gap-6 md:flex">
            <ExternalLink href={config.links.app}>Youleap App</ExternalLink>
            <ExternalLink href={config.links.marketing}>
              Youleap Home
            </ExternalLink>
            <ExternalLink href={config.links.github}>Github</ExternalLink>
          </nav>
          <button
            className="flex items-center space-x-2 md:hidden"
            type="button"
          >
            <Command height={24} width={24} />
            <span className="font-bold">Menu</span>
          </button>
        </div>
      </div>
    </header>
  );
}
