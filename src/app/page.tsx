"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Posts App</h1>
      <p className="mb-4">
        Use the navigation below to manage posts. You can create, edit, and
        delete posts as needed.
      </p>

      <Link
        href="/posts"
        className="text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
      >
        Go to Posts
      </Link>
    </div>
  );
}
