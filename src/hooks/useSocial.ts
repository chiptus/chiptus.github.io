import { useMemo } from "react";
import { useHeroData } from "./useHeroData";
import { GithubIcon, LinkedinIcon, MailIcon } from "lucide-react";

export function useSocial() {
  const query = useHeroData();

  const social = query.data?.social;
  const links = useMemo(
    () =>
      social
        ? [
            {
              icon: MailIcon,
              label: "Email",
              value: social.email,
              href: `mailto:${social.email}`,
            },
            {
              icon: GithubIcon,
              label: "GitHub",
              value: social.github.replace("https://", ""),
              href: social.github,
            },
            {
              icon: LinkedinIcon,
              label: "LinkedIn",
              value: social.linkedin
                .replace("http://", "")
                .replace("https://", ""),
              href: social.linkedin,
            },
          ]
        : [],
    [social]
  );

  return { social, links };
}
