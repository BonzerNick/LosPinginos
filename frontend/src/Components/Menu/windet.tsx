import React, { useState } from "react";

interface WidgetProps {
  title: string;
  description: string;
  githubLink: string;
}

const Widget: React.FC<WidgetProps> = ({ title, description, githubLink }) => {
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState<string>("");

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value);
  };

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      setComments([...comments, newComment]);
      setNewComment("");
    }
  };

  return (
    <div className="bg-gray-100 p-20 rounded-lg shadow-md h-screen w-full">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
      <a href={githubLink} className="text-blue-500 hover:underline mb-4 block">
        Ссылка на репозиторий вашего задания
      </a>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Comments</h3>
        <ul>
          {comments.map((comment, index) => (
            <li key={index} className="mb-1">
              {comment}
            </li>
          ))}
        </ul>
        <div className="mt-2">
          <input
            type="text"
            className="border border-gray-300 px-2 py-1 rounded-md w-3/4 mr-2"
            placeholder="Add a comment..."
            value={newComment}
            onChange={handleCommentChange}
          />
          <button
            className="bg-green-400 text-white px-3 py-1 rounded-md hover:bg-blue-600"
            onClick={handleAddComment}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default Widget;
