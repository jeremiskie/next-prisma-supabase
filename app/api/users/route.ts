import { NextResponse } from "next/server"
import { userService } from "@/services/user.service"

export async function GET() {
  try {
    const users = await userService.findAll()

    return NextResponse.json(users, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch users." },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const user = await userService.create(body)

    return NextResponse.json(user, {
      status: 201,
    })
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create user." },
      { status: 500 }
    )
  }
}
