import { Button } from "./button";

export function ButtonLink({
  href,
  children,
  ...props
}: { href: string; children: React.ReactNode } & Omit<
  React.ComponentPropsWithoutRef<typeof Button>,
  "asChild"
>) {
  return (
    <Button asChild {...props}>
      <a href={href}>{children}</a>
    </Button>
  );
}
