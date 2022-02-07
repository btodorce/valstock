import { AppProps } from "next/app";
import Head from "next/head";
import "./styles.css";
import i18next from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { languages } from "../i18n/languages";
import config from "../app.json";
import { UnsplashProvider, UserProvider } from "../providers";
import { RecoilRoot } from "recoil";
import { useEffect, useState } from "react";

const SafeHydrate = ({ children }) => (
    <div suppressHydrationWarning>
        {typeof window === "undefined" ? null : children}
    </div>
);

function CustomApp({ Component, pageProps }: AppProps) {
    const [language, setLanguage] = useState<string>("en");

    useEffect(() => {
        const lng =
            (navigator.languages && navigator.languages[0]) ||
            navigator.language;
        setLanguage(lng?.slice(0, 2));
    }, []);

    i18next.use(initReactI18next).init({
        interpolation: { escapeValue: false },
        lng: language,
        resources: languages
    });

    return (
        <SafeHydrate>
            <Head>
                <title>{config.title}</title>
            </Head>
            <RecoilRoot>
                <UserProvider>
                    <I18nextProvider i18n={i18next} defaultNS="">
                        <UnsplashProvider>
                            <main className="app">
                                <Component {...pageProps} />
                            </main>
                        </UnsplashProvider>
                    </I18nextProvider>
                </UserProvider>
            </RecoilRoot>
        </SafeHydrate>
    );
}

export default CustomApp;
