import { usePathname } from "next/navigation";

export function useIsActiveLink(
  href: string,
  options?: {
    isFuzzy?: boolean;
  }
) {
  const pathName = usePathname();
  const isFuzzy = options?.isFuzzy ?? false;
  return pathName === href || (isFuzzy && pathName.startsWith(href));
}
