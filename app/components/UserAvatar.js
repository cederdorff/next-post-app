import Image from "next/image";

export default async function UserAvatar({ uid }) {
  const response = await fetch(
    `https://fb-rest-race-default-rtdb.firebaseio.com/users/${uid}.json`
  );
  const user = await response.json();

  return (
    <div className="avatar">
      <Image src={user.image} alt={user.name} width={75} height={75} />
      <span>
        <h3>{user.name}</h3>
        <p>{user.title}</p>
      </span>
    </div>
  );
}
