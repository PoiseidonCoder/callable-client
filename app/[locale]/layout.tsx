import I18nProvider from "@/components/providers/i18n-provider"

const AppLayout = async ({ children, params }: { children: React.ReactNode, params: Promise<{ locale: string }> }) => {
    const { locale } = await params;

    return (
        <I18nProvider locale={locale}>
            {children}
        </I18nProvider>

    )

}
export default AppLayout