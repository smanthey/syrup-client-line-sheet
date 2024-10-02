import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Welcome to Client Line Sheet</h1>
      <p className="text-xl mb-4">Your clothing line management solution</p>
      <Link 
        href="/line-sheet" 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        View Line Sheet
      </Link>
    </main>
  )
}