import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "../auth";
import FormSearch from "../components/FormSearch";
import PostCard from "../components/PostCard";

export default async function Home({ searchParams }) {
  const session = await getSession();
  // if the user is not signed in, redirect them to the sign-in page
  if (!session) {
    redirect("/sign-in");
  }

  const { query = "", sort = "created" } = await searchParams; // Default values

  const url = `${process.env.NEXT_PUBLIC_FB_DB_URL}/posts.json`; // Get Firebase Realtime Database URL
  const response = await fetch(url); // Fetch data from Firebase Realtime Database
  const dataObject = await response.json(); // Convert response to JSON object

  const posts = Object.keys(dataObject).map(key => ({
    id: key,
    ...dataObject[key]
  })); // Convert object to array

  // Filter posts based on the search query
  const filteredPosts = posts.filter(post => post.caption.toLowerCase().includes(query));

  // Sort posts based on the selected option
  filteredPosts.sort((postA, postB) => {
    if (sort === "created") {
      // if the selected option is createdAt
      return postB.createdAt - postA.createdAt;
    }

    if (sort === "caption") {
      // if the selected option is caption
      return postA.caption.localeCompare(postB.caption);
    }
  });

  return (
    <main className="page">
      <FormSearch query={query} sort={sort} />
      <section className="grid">
        {filteredPosts.map(post => (
          <Link key={post.id} href={`/posts/${post.id}`}>
            <PostCard post={post} />
          </Link>
        ))}
      </section>
    </main>
  );
}
