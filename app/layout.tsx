import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Client Line Sheet',
  description: 'Manage your clothing line with ease',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}