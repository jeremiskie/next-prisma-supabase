import { NextResponse } from "next/server";
import { userService } from "@/services/user.service";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const user = await userService.findById(Number(id));

    if (!user) {
      return NextResponse.json(
        { message: "User not found." },
        { status: 204 }
      );
    }

    return NextResponse.json(user, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "Server error." },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const body = await req.json();

    const user = await userService.update(Number(id), body);

    return NextResponse.json(user, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "Failed to update user." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const user = await userService.findById(Number(id))

    if (!user) {
      NextResponse.json({ message: "No record found "}, { status: 204 })
    }

    await userService.delete(Number(id))

    return NextResponse.json({
      message: "User deleted successfully.",
    }, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "Failed to delete user." },
      { status: 500 }
    );
  }
}