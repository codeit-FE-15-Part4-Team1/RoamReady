import { NextResponse } from 'next/server';

export async function DELETE() {
  console.log('Test DELETE route called');
  return NextResponse.json({ message: 'Test DELETE success' });
}
