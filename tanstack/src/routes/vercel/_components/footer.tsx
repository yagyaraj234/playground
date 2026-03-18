import { Link } from "@tanstack/react-router";
import {
  IconBrandLinkedinFilled,
  IconBrandTwitterFilled,
  IconBrandGithubFilled,
  IconBrandYoutubeFilled,
} from "@tabler/icons-react";
import React from "react";

type FooterItem = {
  label: string;
  href: string;
  icon?: React.ElementType;
  badge?: string;
};
const footerData: Record<string, FooterItem[]> = {
  "Get Started": [
    { label: "Templates", href: "/templates" },
    { label: "Supported frameworks", href: "/frameworks" },
    { label: "Marketplace", href: "/marketplace" },
    { label: "Domains", href: "/domains" },
  ],
  Build: [
    { label: "Next.js on Vercel", href: "/nextjs" },
    { label: "Turborepo", href: "/turborepo" },
    { label: "v0", href: "/v0" },
  ],
  Scale: [
    { label: "Content delivery network", href: "/cdn" },
    { label: "Fluid compute", href: "/compute" },
    { label: "CI/CD", href: "/ci-cd" },
    { label: "Observability", href: "/observability" },
    { label: "AI Gateway", href: "/ai-gateway", badge: "new" },
    { label: "Vercel Agent", href: "/agent", badge: "new" },
  ],
  Secure: [
    { label: "Platform security", href: "/security" },
    { label: "Web Application Firewall", href: "/waf" },
    { label: "Bot management", href: "/bot-management" },
    { label: "BotID", href: "/botid" },
    { label: "Sandbox", href: "/sandbox", badge: "new" },
  ],
  Resources: [
    { label: "Pricing", href: "/pricing" },
    { label: "Customers", href: "/customers" },
    { label: "Enterprise", href: "/enterprise" },
    { label: "Articles", href: "/articles" },
    { label: "Startups", href: "/startups" },
    { label: "Solution partners", href: "/partners" },
  ],
  Learn: [
    { label: "Docs", href: "/docs" },
    { label: "Blog", href: "/blog" },
    { label: "Changelog", href: "/changelog" },
    { label: "Knowledge Base", href: "/knowledge-base" },
    { label: "Academy", href: "/academy" },
    { label: "Community", href: "/community" },
  ],
  Frameworks: [
    { label: "Next.js", href: "/frameworks/nextjs" },
    { label: "Nuxt", href: "/frameworks/nuxt" },
    { label: "Svelte", href: "/frameworks/svelte" },
    { label: "Nitro", href: "/frameworks/nitro" },
    { label: "Turbo", href: "/frameworks/turbo" },
  ],
  SDKS: [
    { label: "AI SDK", href: "/sdk/ai" },
    { label: "Workflow DevKit", href: "/sdk/workflow", badge: "new" },
    { label: "Flags SDK", href: "/sdk/flags" },
    { label: "Chat SDK", href: "/sdk/chat" },
    { label: "Streamdown AI", href: "/sdk/streamdown", badge: "new" },
  ],
  "Use Cases": [
    { label: "Composable commerce", href: "/use-cases/composable-commerce" },
    { label: "Multi-tenant platforms", href: "/use-cases/multi-tenant" },
    { label: "Web apps", href: "/use-cases/web-apps" },
    { label: "Marketing sites", href: "/use-cases/marketing" },
    { label: "Platform engineers", href: "/use-cases/platform-engineers" },
    { label: "Design engineers", href: "/use-cases/design-engineers" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Help", href: "/help" },
    { label: "Press", href: "/press" },
    { label: "Legal", href: "/legal" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
  Community: [
    { label: "Open source program", href: "/open-source" },
    { label: "Events", href: "/events" },
    { label: "Shipped on Vercel", href: "/showcase" },
    {
      label: "GitHub",
      href: "https://github.com",
      icon: IconBrandGithubFilled,
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com",
      icon: IconBrandLinkedinFilled,
    },
    { label: "X", href: "https://x.com", icon: IconBrandTwitterFilled },
    {
      label: "YouTube",
      href: "https://youtube.com",
      icon: IconBrandYoutubeFilled,
    },
  ],
};

export default function Footer() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 max-w-7xl mx-auto giest-400 p-4">
      {Object.entries(footerData).map(([section, items]) => (
        <div key={section} className="mb-4">
          <h3 className="text-base font-sans text-zinc-300   giest-600 uppercase">
            {section}
          </h3>
          <ul className="mt-4 space-y-2 transition-all duration-300 ease-in-out">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className="text-sm  flex items-center gap-1"
                >
                  <span className="text-zinc-500 hover:text-zinc-300 flex gap-2 items-center">
                    {item.icon && React.createElement(item.icon, { size: 16 })}
                    {item.label}
                  </span>
                  {item.badge && (
                    <span className="uppercase text-[8px] font-medium px-1 py-0.5 rounded ring-1 ring-offset-zinc-200">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <svg
        data-testid="geist-icon"
        height="16"
        stroke-linejoin="round"
        style={{
          width: "16px",
          height: "32px",
          color: "var(--ds-gray-1000)",
        }}
        viewBox="0 0 16 16"
        width="16"
        aria-label="Vercel logo"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M8 1L16 15H0L8 1Z"
          fill="currentColor"
        ></path>
      </svg>
    </div>
  );
}
