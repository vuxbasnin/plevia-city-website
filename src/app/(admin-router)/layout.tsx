import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/context/AuthContext";
import { SiteSettingsProvider } from "@/context/SiteSettingsContext";
import ClientOnly from "@/components/shared/ClientOnly";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClientOnly>
      <AuthProvider>
        <SiteSettingsProvider>{children}</SiteSettingsProvider>
      </AuthProvider>
      <Toaster />
    </ClientOnly>
  );
}
