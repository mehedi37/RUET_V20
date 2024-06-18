import { getStudent, getTeacher } from '@/lib/getInfo';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(req, res) {
  try {
    const { accountType, roll, email, password } = await req.json();
    console.log("AccountType: ", accountType);

    if (!(roll || email) || !password || !accountType) {
      return NextResponse.json({
        error: {
          message: "Please provide all the required fields",
          fields: {
            roll: roll ? roll : "Not provided",
            email: email ? email : "Not provided",
            accountType: accountType ? accountType : "Not provided",
          },
        },
      }, { status: 400 });
    }

    let user;
    if (accountType === 'student') {
      user = await getStudent(roll, password);
    } else {
      user = await getTeacher(email, password);
    }

    if (user === 'Student not found' || user === 'Invalid password' || user === 'Teacher not found' || user === 'Invalid password') {
      return NextResponse.json({
        status: 401,
        error: {
          message: "Invalid credentials!",
          details: user,
        },
      });
    } else {
      let payload;
      if (accountType === 'student') {
        payload = {
          roll: user[0].student_roll,
          name: user[0].student_name,
          email: user[0].student_email,
          accountType: 'student',
        };
      } else {
        payload = {
          id: user[0].teacher_id,
          name: user[0].teacher_name,
          email: user[0].teacher_email,
          accountType: 'teacher',
        };
      }
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '24h',
      });

      // Set the cookie using NextResponse
      const response = NextResponse.json({
        status: 200,
        body: {
          message: "Successfully logged in",
        },
      });
      response.cookies.set('token', token, {
        httpOnly: !process.env.IS_DEV,
        path: '/',
        maxAge: 24 * 60 * 60,
      });
      return response;
    }
  } catch (error) {
    return NextResponse.json({
      error: {
        message: "An error occurred while logging in. Please try again.",
        errorDetails: error,
      },
    }, { status: 500 });
  }
}
