import { usePostsStore } from "../app/store/usePostsStore";

export default function PostForm() {
  const { newPost, setNewPost, createPost } = usePostsStore();

  return (
    <form onSubmit={createPost} className="mb-8 flex flex-col items-center">
      <input
        type="text"
        placeholder="Title"
        value={newPost.title}
        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        className="border p-2 mb-4 w-80"
      />
      <textarea
        placeholder="Body"
        value={newPost.body}
        onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
        className="border p-2 mb-4 w-80 h-32"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Create Post
      </button>
    </form>
  );
}
