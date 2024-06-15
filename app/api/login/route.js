import {getStudent, getTeacher} from '@/lib/getInfo';
import { status } from 'express/lib/response';
import { NextResponse } from 'next/server';

export async function POST(request, response) {
  console.log("Request: ");
  try {
    const {
      accountType,
      roll,
      email,
      password
    } = await request.json();
    console.log("AccountType: ", accountType);

    //  checking if all the required fields are provided
    if (!(roll || email) || !password || !accountType) {
      return NextResponse.json({
        error: {
          message: "Please provide all the required fields",
          fields: {
            roll: roll ? roll : "Not provided",
            email: email ? email : "Not provided",
            accountType: accountType ? accountType : "Not provided",
          },
          request: request,
          },
        },
        { status: 400 }
      )
    }

    let user;
    if (accountType === 'student') {
      user = await getStudent(roll, password);
    } else {
      user = await getTeacher(email, password);
    }

    if (user === 'Student not found' || user === 'Invalid password') {
      return NextResponse.json({
        status: 401,
        error: {
          message: "Invalid credentials !",
          Details: user,
        }
      }
    );
    } else if (user === 'Teacher not found' || user === 'Invalid password') {
      return NextResponse.json({
        status: 401,
        error: {
          message: "Invalid credentials !",
          Details: user,
        }
      }
    );
    } else {
      return NextResponse.json({
        status: 200,
        body: {
          message: "Successfully logged in",
        }
      }
    );
    }

  } catch (error) {
    return NextResponse.json({
      error: {
        message: "An error occurred while logging in. Please try again.",
        errorDetails: error,
      }
    },
    { status: 500 }
  );
  }
}