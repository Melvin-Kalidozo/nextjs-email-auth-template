import { NextResponse } from "next/server";
import { prisma } from "@/app/utils/prisma";
import bcrypt from "bcrypt";

// GET all users
export async function GET() {
  const users = await prisma.user.findMany({
    include: {
      posts: true,
      teamMembers: true,
    },
  });
  return NextResponse.json(users);
}

// CREATE new user
export async function POST(req) {
  try {
    const data = await req.json();

    // Validate required fields
    if (!data.email || !data.password || !data.name) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: data.role || "USER",
      },
    });

    // Hide password in response
    const { password, ...userWithoutPassword } = user;

    return NextResponse.json(userWithoutPassword, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Error creating user" }, { status: 500 });
  }
}
