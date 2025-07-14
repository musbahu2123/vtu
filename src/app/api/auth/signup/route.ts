// src/app/api/auth/signup/route.ts
import { NextRequest, NextResponse } from 'next/server';
import clientPromise, { getDb } from '@/lib/mongodb';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    // Assuming signup form sends fullName, email, password, and optionally phoneNumber
    const { fullName, email, password, phoneNumber } = await req.json();

    // Basic server-side validation
    if (!fullName || !email || !password) {
      return NextResponse.json({ message: 'All fields are required.' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ message: 'Password must be at least 6 characters long.' }, { status: 400 });
    }

    const db = await getDb();
    const usersCollection = db.collection('users');

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'User with this email already exists.' }, { status: 409 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into the database with initial balance and phone number
    const result = await usersCollection.insertOne({
      fullName,
      email,
      password: hashedPassword, // Store the hashed password
      createdAt: new Date(),
      balance: '₦0.00', // Initialize balance for new users
      phoneNumber: phoneNumber || null, // Initialize phone number, or null if not provided
    });

    // Respond with success
    return NextResponse.json({ message: 'User created successfully!', userId: result.insertedId }, { status: 201 });

  } catch (error) {
    console.error('Error during signup:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
