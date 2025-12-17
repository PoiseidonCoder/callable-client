"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Image from "next/image";
import { Button } from "./button";
import { routing } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { switchLocale } from "@/i18n/switchLocale";

export const SwitchLanguage = () => {
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
        <Button variant="outline" className="flex items-center gap-2">
          <Image
            src={iconCountryImageNames[locale].path}
            alt={iconCountryImageNames[locale].name}
            width={20}
            height={20}
          />
          {iconCountryImageNames[locale].name.toUpperCase()}
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content>
        {locales.map((lcl) => (
          <DropdownMenu.Item
            key={lcl}
            onSelect={() => handleSwitch(lcl)}
            className="flex items-center gap-2 "
          >
            <Button
              variant="ghost"
              className="bg-background flex items-center gap-2 w-full justify-start"
            >
              <Image
                src={iconCountryImageNames[lcl].path}
                alt={iconCountryImageNames[lcl].name}
                width={20}
                height={20}
                className="rounded-full object-cover"
              />
              {iconCountryImageNames[lcl].name.toUpperCase()}
            </Button>
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
