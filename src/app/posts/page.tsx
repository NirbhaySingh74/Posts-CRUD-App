"use client";
import { useEffect } from "react";
import { usePostsStore } from "../store/usePostsStore";
import PostItem from "../../components/PostItem";
import PostForm from "../../components/PostForm";

export default function Posts() {
  const { fetchPosts, posts } = usePostsStore();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Manage Posts</h1>

      <PostForm />

      <ul>
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </ul>
    </div>
  );
}
