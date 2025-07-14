// src/app/api/auth/signup/route.ts
import { NextRequest, NextResponse } from 'next/server';
import clientPromise, { getDb } from '@/lib/mongodb'; // Correct path to mongodb.ts
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const { fullName, email, password } = await req.json();

    // Basic server-side validation
    if (!fullName || !email || !password) {
      return NextResponse.json({ message: 'All fields are required.' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ message: 'Password must be at least 6 characters long.' }, { status: 400 });
    }

    const db = await getDb(); // Get the database instance
    const usersCollection = db.collection('users'); // Assuming your user collection is named 'users'

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'User with this email already exists.' }, { status: 409 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Insert new user into the database
    const result = await usersCollection.insertOne({
      fullName,
      email,
      password: hashedPassword, // Store the hashed password
      createdAt: new Date(),
    });

    // Respond with success
    return NextResponse.json({ message: 'User created successfully!', userId: result.insertedId }, { status: 201 });

  } catch (error) {
    console.error('Error during signup:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

// You can also define other HTTP methods if needed, e.g., GET, PUT, DELETE
// export async function GET(req: NextRequest) { ... }
