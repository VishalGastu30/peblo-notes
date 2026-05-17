import { customAlphabet } from 'nanoid'

// URL-safe, readable, 12 chars
const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 12)

export function generateShareId(): string {
  return nanoid()  // e.g. "a7k2m9p3x1qz"
}

export function buildShareUrl(shareId: string): string {
  return `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/share/${shareId}`
}
