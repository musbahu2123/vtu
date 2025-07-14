// src/app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import clientPromise, { getDb } from '@/lib/mongodb'; // Correct path to mongodb.ts
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // Basic server-side validation
    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required.' }, { status: 400 });
    }

    const db = await getDb();
    const usersCollection = db.collection('users'); // Assuming your user collection is named 'users'

    // Find the user by email
    const user = await usersCollection.findOne({ email });

    if (!user) {
      // User not found
      return NextResponse.json({ message: 'Invalid credentials.' }, { status: 401 });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      // Passwords do not match
      return NextResponse.json({ message: 'Invalid credentials.' }, { status: 401 });
    }

    // If login is successful
    // In a real application, you would generate a JWT (JSON Web Token) here
    // and send it back to the client. For now, we'll just send a success message.
    return NextResponse.json({ message: 'Login successful!', user: { id: user._id, email: user.email, fullName: user.fullName } }, { status: 200 });

  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

// You can also define other HTTP methods if needed
// export async function GET(req: NextRequest) { ... }
