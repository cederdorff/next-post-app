import PostCard from "../components/PostCard";

export default async function Home() {
  const response = await fetch(
    "https://fb-rest-race-default-rtdb.firebaseio.com/posts.json"
  ); // Fetch data from Firebase Realtime Database
  const dataObject = await response.json(); // Convert response to JSON object

  const posts = Object.keys(dataObject).map(key => ({
    id: key,
    ...dataObject[key]
  })); // Convert object to array
  console.log(posts);

  return (
    <main className="page">
      <section className="grid">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>
    </main>
  );
}
