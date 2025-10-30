import { prisma } from "@/app/utils/prisma";
import { NextResponse } from "next/server";

// GET user by ID
export async function GET(req, { params }) {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
    include: { posts: true, teamMembers: true },
  });
  return NextResponse.json(user);
}

// UPDATE user
export async function PUT(req, { params }) {
  const data = await req.json();
  const user = await prisma.user.update({
    where: { id: params.id },
    data,
  });
  return NextResponse.json(user);
}

// DELETE user
export async function DELETE(req, { params }) {
  await prisma.user.delete({ where: { id: params.id } });
  return NextResponse.json({ message: "User deleted" });
}
