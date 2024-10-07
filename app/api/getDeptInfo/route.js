import { getDepartments } from "@/lib/getInfo";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    const departments = await getDepartments();
    return NextResponse.json(
      {
        data: departments,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
