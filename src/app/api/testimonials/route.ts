import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error("GET testimonials error:", error);
    return NextResponse.json({ error: "Impossible de récupérer les témoignages" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, role, rating, text } = body;

    if (!name || !role || !text || !rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Tous les champs sont obligatoires et la note doit être entre 1 et 5" },
        { status: 400 }
      );
    }

    const testimonial = await prisma.testimonial.create({
      data: { name, role, rating: Number(rating), text },
    });

    return NextResponse.json(testimonial, { status: 201 });
  } catch (error) {
    console.error("POST testimonial error:", error);
    return NextResponse.json({ error: "Impossible d'enregistrer le témoignage" }, { status: 500 });
  }
}
