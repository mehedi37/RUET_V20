import { CTMarksInputUpdate } from "@/lib/ctMarks";
import { DecodeToken } from "@/lib/decode_token";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    const { ctResultId, ctMarks } = await req.json();

    const payload = await DecodeToken();
    const teacherId = payload.id;

    const result = await CTMarksInputUpdate(ctResultId, ctMarks, teacherId);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("From API: ", error.message);
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
