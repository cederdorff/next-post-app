import Link from "next/link";

export default function Home() {
  return (
    <main className="page">
      <h1>Post App</h1>
      <p>This is my post app</p>
      <Link href="/posts">Go to Posts</Link>
    </main>
  );
}
