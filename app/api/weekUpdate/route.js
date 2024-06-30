import { DecodeToken } from "@/lib/decode_token"
import getRollInfo from "@/lib/getRollInfo"
import getCTInfo from "@/lib/getCTInfo"
import { NextResponse } from 'next/server';

export async function GET(req, res) {
  try {
    const payload = await DecodeToken()
    const studentInfo = await getRollInfo(payload.roll)
    const ctInfo = await  getCTInfo(studentInfo)
    return NextResponse.json({
      data: ctInfo
    }, {status: 200});
  } catch (error) {
    return error.message
  }
}