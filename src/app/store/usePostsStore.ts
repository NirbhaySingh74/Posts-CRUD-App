import { create } from "zustand";
import axios from "axios";

// Define Post interface
export interface Post {
  id: number;
  title: string;
  body: string;
}

// Define the shape of our store's state and actions
interface PostsState {
  posts: Post[]; // Array of posts
  newPost: { title: string; body: string }; // New post to be created
  editingPost: Post | null; // Post being edited, or null if none
  fetchPosts: () => void; // Function to fetch posts
  setNewPost: (post: { title: string; body: string }) => void; // Set new post's values
  createPost: (e: React.FormEvent) => void; // Function to create a new post
  deletePost: (id: number) => void; // Function to delete a post
  setEditingPost: (post: Post | null) => void; // Set the post being edited
  updatePost: (e: React.FormEvent) => void; // Function to update an existing post
  setEditingPostValue: (field: string, value: string) => void; // Set values while editing post
}

// Define the Zustand store
export const usePostsStore = create<PostsState>((set, get) => ({
  posts: [],
  newPost: { title: "", body: "" },
  editingPost: null,

  // Fetch posts from the API
  fetchPosts: async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      set({ posts: response.data });
    } catch (error) {
      console.error("Failed to fetch posts", error);
    }
  },

  // Set the new post values
  setNewPost: (post) => set({ newPost: post }),

  // Create a new post
  createPost: async (e: React.FormEvent) => {
    e.preventDefault();
    const { newPost, posts } = get();
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        newPost
      );
      set({
        posts: [response.data, ...posts],
        newPost: { title: "", body: "" },
      });
    } catch (error) {
      console.error("Failed to create post", error);
    }
  },

  // Delete a post by ID
  deletePost: async (id: number) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
      const updatedPosts = get().posts.filter((post) => post.id !== id);
      set({ posts: updatedPosts });
    } catch (error) {
      console.error("Failed to delete post", error);
    }
  },

  // Set the post being edited
  setEditingPost: (post: Post | null) => set({ editingPost: post }),

  // Update an existing post
  updatePost: async (e: React.FormEvent) => {
    e.preventDefault();
    const { editingPost, posts } = get();
    if (!editingPost) return;

    try {
      const response = await axios.put(
        `https://jsonplaceholder.typicode.com/posts/${editingPost.id}`,
        editingPost
      );
      const updatedPosts = posts.map((post) =>
        post.id === editingPost.id ? response.data : post
      );
      set({ posts: updatedPosts, editingPost: null });
    } catch (error) {
      console.error("Failed to update post", error);
    }
  },

  // Set the editing post's field values dynamically
  setEditingPostValue: (field: string, value: string) => {
    const editingPost = get().editingPost;
    if (editingPost) {
      set({ editingPost: { ...editingPost, [field]: value } });
    }
  },
}));
