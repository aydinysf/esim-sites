import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  await prisma.admin.upsert({
    where: { email: "admin@esim-germany.com" },
    update: {},
    create: {
      email: "admin@esim-germany.com",
      passwordHash: await bcrypt.hash("change-me-123", 12),
      name: "Admin",
    },
  });

  await prisma.homepage.upsert({
    where: { country: "DE" },
    update: {},
    create: {
      country: "DE",
      heroHeadline: "Germany eSIM — Sofort aktivieren",
      heroSubheadline: "Die besten eSIM-Tarife für Deutschland. Kein Warten, sofort online.",
      heroCtaText: "Tarife ansehen",
      whyEsimTitle: "Warum eSIM?",
      whyEsimItems: [
        { icon: "zap", title: "Sofort aktivieren", description: "Kein Warten auf eine physische SIM-Karte" },
        { icon: "globe", title: "Deutschlandweit", description: "Stabile Verbindung im ganzen Land" },
        { icon: "shield", title: "Sicher & zuverlässig", description: "Verschlüsselte Verbindung" },
      ],
      howItWorksTitle: "So funktioniert es",
      howItWorksSteps: [
        { step: 1, title: "Tarif wählen", description: "Vergleichen Sie unsere eSIM-Tarife" },
        { step: 2, title: "Kaufen & aktivieren", description: "QR-Code scannen und fertig" },
        { step: 3, title: "Verbunden", description: "Sofort online in Deutschland" },
      ],
      stats: [
        { value: "50+", label: "Tarife" },
        { value: "24/7", label: "Support" },
        { value: "5min", label: "Aktivierung" },
      ],
    },
  });

  console.log("Seed tamamlandı");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
