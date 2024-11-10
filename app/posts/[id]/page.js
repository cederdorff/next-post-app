import PostCard from "@/app/components/PostCard";

export default async function PostPage({ params }) {
  const url = `https://fb-rest-race-default-rtdb.firebaseio.com/posts/${params.id}.json`;
  const response = await fetch(url);
  const post = await response.json();

  return (
    <main className="page" id="post-page">
      <div className="container">
        <h1>{post.caption}</h1>
        <PostCard post={post} />
        <div className="btns">
          <button className="btn-cancel">Delete post</button>
          <button>Update post</button>
        </div>
      </div>
    </main>
  );
}
