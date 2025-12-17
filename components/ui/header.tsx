import Image from "next/image";
import { ToggleTheme } from "./toggle-theme";
import { useTranslations } from "next-intl";
import { SwitchLanguage } from "./switch-language";
import Link from "next/link";

export const Header = () => {
  const t = useTranslations("Header");
  return (
    <div>
      <div className=" fixed bg-background text-foreground top-0 left-0 w-full z-50 flex justify-between items-center h-16">
        <Link href={"/"}>
          <Image
            src={"/images/logo-app.png"}
            alt="Logo App"
            width={80}
            height={80}
            className="ml-4 object-cover"
          />
        </Link>
        {t("test")}
        <div className="flex justify-center items-center gap-4 mr-4">
          <SwitchLanguage />
          <ToggleTheme />
        </div>
      </div>
    </div>
  );
};
