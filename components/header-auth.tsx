import { ToggleTheme } from "./theme-mode";
import Image from "next/image";

export const HeaderAuth = () => {
  return (
    <div className=" fixed bg-background text-foreground top-0 left-0 w-full z-50 flex justify-between items-center h-16">
      <Image
        src={"/images/logo-app.png"}
        alt="Logo App"
        width={80}
        height={80}
        objectFit="center"
        className="ml-4"
      />
      <ToggleTheme />
    </div>
  );
};
