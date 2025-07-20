import * as jwt from 'jsonwebtoken';
import type { JwtPayload, Secret, SignOptions } from 'jsonwebtoken';

// Ensure your secret is typed as a string explicitly
const JWT_SECRET: string = process.env.JWT_SECRET || 'default_secret';

export function signToken(
  payload: Record<string, any>,
  expiresIn: number
): string {
  // Explicitly define the options object with SignOptions type
  const options: SignOptions = { expiresIn };
  return jwt.sign(payload, JWT_SECRET, options); // ✅ Correct usage
}

export function verifyToken(token: string): JwtPayload {
  const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
  if (typeof decoded === 'string') {
    throw new Error('Invalid token payload');
  }
  return decoded;
}
