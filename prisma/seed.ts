import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const defaults = [
    {
      id: "default-testimonial-1",
      name: "Koffi A.",
      role: "Lomé, Togo",
      rating: 5,
      text: "J'ai construit ma maison avec les briques de Lomé Turque Brique et je suis plus que satisfait. La qualité est exceptionnelle et le service client impeccable.",
      published: true,
    },
    {
      id: "default-testimonial-2",
      name: "Amah E.",
      role: "Architecte",
      rating: 5,
      text: "Entreprise sérieuse et professionnelle. Les briques livrées étaient exactement comme sur les échantillons. Je recommande vivement !",
      published: true,
    },
    {
      id: "default-testimonial-3",
      name: "Séna G.",
      role: "Promoteur immobilier",
      rating: 5,
      text: "La résistance de ces briques est remarquable. Même après la saison des pluies, aucun problème à signaler. Un investissement durable.",
      published: true,
    },
  ];

  for (const t of defaults) {
    await prisma.testimonial.upsert({
      where: { id: t.id },
      update: {},
      create: t,
    });
  }

  console.log("✅ 3 témoignages par défaut insérés en base.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
