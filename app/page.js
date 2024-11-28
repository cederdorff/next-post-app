import Link from "next/link";

export default function Home() {
  return (
    <main className="page">
      <section className="container">
        <h1>Post App</h1>
        <p>This is my post app.</p>
        <Link href="/posts">Go to Posts to see all posts.</Link>
      </section>
    </main>
  );
}
