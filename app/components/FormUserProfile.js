"use client";

import Image from "next/image";
import { useState } from "react";

export default function FormUserProfile({ action, user }) {
  const [image, setImage] = useState(user?.image);

  return (
    <form className="form-grid" action={action}>
      <label htmlFor="name">Name</label>
      <input
        id="name"
        type="text"
        name="name"
        placeholder="Type name"
        defaultValue={user.name}
      />

      <label htmlFor="email">Mail</label>
      <input
        type="email"
        name="email"
        placeholder="Type email"
        disabled
        defaultValue={user.mail}
      />

      <label htmlFor="title">Title</label>
      <input
        id="title"
        type="text"
        name="title"
        placeholder="Type your title"
        defaultValue={user.title}
      />

      <label htmlFor="image">Image</label>
      <input
        type="url"
        name="image"
        id="image"
        defaultValue={image}
        aria-label="image"
        placeholder="Paste an image URL"
        onChange={event => setImage(event.target.value)}
      />
      <label htmlFor="image-preview"></label>
      <Image
        id="image-preview"
        className="image-preview"
        src={
          image
            ? image
            : "https://placehold.co/600x400.webp?text=Paste+image+URL"
        }
        width={600}
        height={400}
        alt={user?.name || "Image preview"}
      />

      <div className="btns">
        <button>Save User</button>
      </div>
    </form>
  );
}
