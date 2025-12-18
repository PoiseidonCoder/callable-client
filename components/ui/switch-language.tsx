"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Image from "next/image";
import { Button } from "./button";
import { routing } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { switchLocale } from "@/i18n/switchLocale";
import { SidebarMenuButton } from "./sidebar";

export const SwitchLanguage = ({ className }: { className: string }) => {
  const locale = useLocale();
  const router = useRouter();
  const locales = routing.locales;

  const iconCountryImageNames: Record<string, { path: string; name: string }> = {
    en: {
      path: "/images/en-flag.png",
      name: "English",
    },
    vi: {
      path: "/images/vi-flag.png",
      name: "Tiếng Việt",
    },
  };

  const handleSwitch = (nextLocale: "en" | "vi") => {
    if (nextLocale === locale) return;
    switchLocale(nextLocale);
    router.refresh();
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <SidebarMenuButton asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Image
              src={iconCountryImageNames[locale].path}
              alt={iconCountryImageNames[locale].name}
              width={20}
              height={20}
            />
            <div className={className}>
              {iconCountryImageNames[locale].name.toUpperCase()}
            </div>
          </Button>
        </SidebarMenuButton>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="opacity-100 z-50">
        {locales.map((lcl) => (
          <DropdownMenu.Item
            key={lcl}
            onSelect={() => handleSwitch(lcl)}
            className="flex items-center gap-2 "
            asChild
          >
            <SidebarMenuButton asChild>
              <Button
                variant="destructive"
                className="bg-background flex items-center gap-2 justify-start w-(--radix-dropdown-menu-trigger-width)"
              >
                <Image
                  src={iconCountryImageNames[lcl].path}
                  alt={iconCountryImageNames[lcl].name}
                  className={`rounded-full object-cover`}
                  width={20}
                  height={20}
                />
                <div className={className}>
                  {iconCountryImageNames[lcl].name.toUpperCase()}
                </div>
              </Button>
            </SidebarMenuButton>
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
