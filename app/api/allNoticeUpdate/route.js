import { DecodeToken } from "@/lib/decode_token";
import getRollInfo from "@/lib/getRollInfo";
import { getAllNoticeInfo } from "@/lib/getNoticeInfo";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    const payload = await DecodeToken();
    const studentInfo = await getRollInfo(payload.roll);
    const noticeInfo = await getAllNoticeInfo(studentInfo);
    // console.log(noticeInfo);
    return NextResponse.json(
      {
        data: noticeInfo,
      },
      { status: 200 }
    );
  } catch (error) {
    return error.message;
  }
}
