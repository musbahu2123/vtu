// src/app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import clientPromise, { getDb } from '@/lib/mongodb';
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
    // Ensure 'user.password' exists and is a string (it should be from bcrypt hash)
    if (typeof user.password !== 'string') {
        console.error("User password in DB is not a string:", user.password);
        return NextResponse.json({ message: 'Internal server error: Invalid user data.' }, { status: 500 });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      // Passwords do not match
      return NextResponse.json({ message: 'Invalid credentials.' }, { status: 401 });
    }

    // If login is successful, construct the user object to send to the frontend
    // Ensure these fields match the 'User' interface in AuthContext.tsx
    const userForFrontend = {
      uid: user._id.toString(), // Convert MongoDB ObjectId to string for uid
      email: user.email,
      fullName: user.fullName || 'User', // Provide a fallback if fullName is not set
      balance: user.balance ? user.balance.toString() : '₦0.00', // Ensure balance is a string, provide default
      phoneNumber: user.phoneNumber || null, // Provide null if phoneNumber is not set
      // Add any other fields from your MongoDB user document that the frontend needs
    };

    return NextResponse.json({ message: 'Login successful!', user: userForFrontend }, { status: 200 });

  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
