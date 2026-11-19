import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";

import { cn } from "@/lib/utils";

const socialLinks = [
  {
    name: "Facebook",
    href: "https://facebook.com/",
    icon: FaFacebookF,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/",
    icon: FaXTwitter,
  },
  {
    name: "Instagram",
    href: "https://instagram.com/",
    icon: FaInstagram,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/",
    icon: FaLinkedinIn,
  },
  {
    name: "YouTube",
    href: "https://youtube.com/",
    icon: FaYoutube,
  },
];

interface SocialIconsProps {
  wrapperClassName?: string;
  itemClassName?: string;
  iconClassName?: string;
}

export function SocialIcons({
  wrapperClassName,
  itemClassName,
  iconClassName,
}: SocialIconsProps) {
  return (
    <div className={cn("flex items-center", wrapperClassName)}>
      {socialLinks.map(({ name, href, icon: Icon }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={name}
          className={cn(
            "flex items-center justify-center rounded-full",
            itemClassName
          )}
        >
          <Icon className={cn("size-4", iconClassName)} />
        </a>
      ))}
    </div>
  );
}