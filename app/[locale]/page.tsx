import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { AUTH_ROUTES } from "@/constants/route";
import { Link } from "@/i18n/navigation";
import { IntroduceCards } from "@/types/common";
import { Heart, MapPinCheck, MessageCircle, PhoneCall, Share2, Shield } from "lucide-react";
import { useTranslations } from "next-intl";

const RootPage = () => {
  const t = useTranslations("RootPage");

  const listCardIntroduce: IntroduceCards = [
    {
      name: t("feature1.name"),
      description: t("feature1.description"),
      icon: MapPinCheck,
      className: "bg-gradient-to-br from-orange-400 to-rose-500 text-white",
    },
    {
      name: t("feature2.name"),
      description: t("feature2.description"),
      icon: MessageCircle,
      className: "bg-gradient-to-br from-pink-400 to-rose-500 text-white p-2",
    },
    {
      name: t("feature3.name"),
      description: t("feature3.description"),
      icon: PhoneCall,
      className: "bg-gradient-to-br from-purple-400 to-violet-500 text-white",
    },
    {
      name: t("feature4.name"),
      description: t("feature4.description"),
      icon: Share2,
      className: "bg-gradient-to-br from-orange-500 to-red-500 text-white",
    },
    {
      name: t("feature5.name"),
      description: t("feature5.description"),
      icon: Heart,
      className: "bg-gradient-to-br from-rose-400 to-pink-500 text-white",
    },
    {
      name: t("feature6.name"),
      description: t("feature6.description"),
      icon: Shield,
      className: "bg-gradient-to-br from-violet-400 to-purple-500 text-white",
    },
  ];

  return (
    <div className="w-full flex flex-col p-5 gap-10 bg-gradient">
      <div className="flex justify-around h-50 ">
        <div className="items-start h-fit rounded-2xl px-3 py-1 shadow-2xl bg-white">
          <div className="text-nowrap">{t("newMessage")}</div>
          <div className="text-muted-foreground text-nowrap">{t("supportNewMessage")}</div>
        </div>

        <div className="self-center h-fit rounded-2xl px-3 py-1 shadow-2xl bg-white">
          <div className="text-nowrap">{t("inComingCall")}</div>
          <div className="text-muted-foreground text-nowrap">{t("supportInComingCall")}</div>
        </div>
      </div>
      <div className="mx-auto flex self-end items-center gap-2 shadow-2xl px-3 py-1 rounded-full bg-white">
        <div className="size-2 bg-green-400 rounded-full"></div>
        <div className="text-nowrap">{t("userOnline")}</div>
      </div>
      <div className="flex text-5xl md:7xl items-center flex-col pt-5 font-extrabold">
        {t("title1")}
        <h1 className="text-gradient">{t("title2")}</h1>
        {t("title3")}
      </div>
      <div className="mx-auto l md:text-2xl max-w-2xl text-xl text-center">
        <div>{t("description")}</div>
      </div>
      <div className="flex flex-col md:flex-row justify-center gap-5">
        <Button variant="ghost" className="bg-btn-gradient text-2xl px-8 py-8 rounded-3xl">
          <Link href={AUTH_ROUTES.LOGIN}>{t("getStarted")}</Link>
        </Button>
        <Button className="text-2xl px-8 py-8 rounded-3xl">{t("learnMore")}</Button>
      </div>
      <div className="flex justify-center gap-30">
        <div className="">
          <p className="text-gradient text-2xl font-bold">{t("50k")}</p>
          <p className="text-muted-foreground">{t("userCount")}</p>
        </div>
        <div>
          <p className="text-gradient text-2xl font-bold">{t("1m")}</p>
          <p className="text-muted-foreground">{t("messagePerDay")}</p>
        </div>
        <div>
          <p className="text-gradient text-2xl font-bold">{t("100k")}</p>
          <p className="text-muted-foreground">{t("cityCount")}</p>
        </div>
      </div>
      <div className="flex items-center flex-col">
        <h1 className="text-gradient text-2xl font-bold">{t("featureTitle")}</h1>
        <div className="text-3xl text-center">{t("featureSubtitle")}</div>
        <div className="text-xl text-center">{t("featureDescription")}</div>
      </div>
      <div className="grid mx-auto max-w-7xl lg:grid-cols-[repeat(auto-fit,minmax(500px,1fr))]  xl:grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-6">
        {listCardIntroduce.map((card, index) => (
          <Card className=" h-62.5 " key={index}>
            <CardContent className="h-full flex flex-col justify-around gap-4">
              <div className={`size-12 rounded-xl flex items-center justify-center ${card.className}`}>
                <card.icon size={22} />
              </div>

              <CardTitle className="text-xl">{card.name}</CardTitle>
              <CardDescription className="text-muted-foreground">{card.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RootPage;
