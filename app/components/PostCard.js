import Image from "next/image";
import UserAvatar from "./UserAvatar";

export default function PostCard({ post }) {
  return (
    <article className="post-card">
      <UserAvatar uid={post.uid} />
      <Image src={post.image} alt={post.caption} width={600} height={400} />
      <h3>{post.caption}</h3>
    </article>
  );
}
