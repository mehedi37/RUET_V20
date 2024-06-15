import {setTeachers, setStudents} from '@/lib/setInfo';
import { encrypt } from '@/middlewares/crypto';
import { NextResponse } from 'next/server';

export async function POST(request, response) {
  try {
    const {
      accountType,
      name,
      roll,
      email,
      password
    } = await request.json();

    //  checking if all the required fields are provided
    if (!name || !email || !password || !accountType) {
      return NextResponse.json({
        error: {
          message: "Please provide all the required fields",
          fields: {
            name: name ? name : "Not provided",
            email: email ? email : "Not provided",
            accountType: accountType ? accountType : "Not provided",
          },
          request: request,
          },
        },
        { status: 400 }
      )
    }
    const encPassword = encrypt(password);

    if (accountType === 'student') {
      await setStudents(roll, name, email, encPassword);
    } else {
      await setTeachers(name, email, encPassword);
    }

    return NextResponse.json({
        body: {
          message: "Data inserted successfully",
        }
      },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json({
      error: {
        message: "An error occurred while inserting data",
        errorDetails: error,
      }
    },
    { status: 500 }
  );
  }
}