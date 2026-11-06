import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AFDEEF — Association des Femmes Dynamiques Engagées pour l'Épanouissement de la Famille",
  description: "Organisation de développement communautaire et d'autonomisation féminine basée à Yaoundé (Ngousso), Cameroun. Récépissé N° 00000852/RDA/JO6/A2/SAAJP/BAPP.",
  keywords: [
    "AFDEEF",
    "Cameroun",
    "Yaoundé",
    "Femmes Dynamiques",
    "Épanouissement de la Famille",
    "Burnout maternel",
    "Autonomisation des femmes",
    "Santé mentale",
    "ONG Cameroun",
    "Elvire FOKAM"
  ],
  openGraph: {
    title: "AFDEEF — L'union fait la force pour nos familles",
    description: "Autonomisation, santé mentale et résilience des mères et des familles au Cameroun.",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="h-full">
      <body className="min-h-full flex flex-col antialiased selection:bg-blue-900 selection:text-white">
        {children}
      </body>
    </html>
  );
}
