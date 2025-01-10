import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { AppWrapper } from "@/components/Wrapper";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <AppWrapper>
                    <Sidebar />
                    {children}
                </AppWrapper>
            </body>
        </html>
    );
}
