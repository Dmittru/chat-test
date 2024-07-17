import type {Metadata} from "next";
import {Jost} from "next/font/google";
import "./globals.scss";
import '../shared/styles/index.scss'
import {SwitchTheme} from "@/providers/switch-theme";

const jost = Jost({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
})

export const metadata: Metadata = {
    title: "Chat App ⚡",
    description: "NextJS 14.2 & React 18 Chat App by @Dmittru",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={`${jost.className} app`}>
        <SwitchTheme>
            {children}
        </SwitchTheme>
        </body>
        </html>
    );
}
