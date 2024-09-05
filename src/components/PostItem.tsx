import { Post } from "../app/store/usePostsStore";
import { usePostsStore } from "../app/store/usePostsStore";

interface PostItemProps {
  post: Post;
}

export default function PostItem({ post }: PostItemProps) {
  const {
    deletePost,
    setEditingPost,
    editingPost,
    updatePost,
    setEditingPostValue,
  } = usePostsStore();

  return (
    <li className="p-4 mb-4 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">{post?.title}</h2>
      <p className="text-gray-700 mb-4">{post?.body}</p>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => deletePost(post.id)}
          className="p-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 transition-colors duration-300"
        >
          Delete
        </button>
        <button
          onClick={() => setEditingPost(post)}
          className="p-2 bg-yellow-500 text-white rounded-md shadow-md hover:bg-yellow-600 transition-colors duration-300"
        >
          Edit
        </button>
      </div>

      {editingPost && editingPost.id === post.id && (
        <form onSubmit={updatePost} className="mt-4 space-y-4">
          <input
            type="text"
            value={editingPost.title}
            onChange={(e) => setEditingPostValue("title", e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          />
          <textarea
            value={editingPost.body}
            onChange={(e) => setEditingPostValue("body", e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 transition-colors duration-300"
          >
            Update Post
          </button>
        </form>
      )}
    </li>
  );
}
