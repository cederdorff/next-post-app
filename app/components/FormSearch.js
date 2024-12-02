"use client";

import Form from "next/form";

export default function FormSearch({ query = "", sort = "createdAt" }) {
  return (
    <Form
      className="grid-filter"
      id="search-form"
      role="search"
      action="/posts"
      onChange={event => event.target.form.requestSubmit()}>
      <label>
        Search by caption{" "}
        <input aria-label="Search by caption" defaultValue={query} placeholder="Search" type="search" name="query" />
      </label>
      <label>
        Sort by{" "}
        <select name="sort" defaultValue={sort}>
          <option value="created">newest</option>
          <option value="caption">caption</option>
        </select>
      </label>
    </Form>
  );
}
