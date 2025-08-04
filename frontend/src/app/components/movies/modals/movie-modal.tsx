"use client";

import { useState } from "react";
import { CreateReview, Review } from "@/types/reviews/review";
import { FaStar } from "@/icons";
import Button from "@/components/buttons/button";
import { useUser } from "@/context/user-context";

interface AddCommentModalProps {
  movieId: string;
  onClose: () => void;
  onReviewSubmit: (review: CreateReview) => void;
}

const AddCommentModal = ({
  movieId,
  onClose,
  onReviewSubmit,
}: AddCommentModalProps) => {
  const { user } = useUser();

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);

  const handleSubmit = () => {
    if (!comment.trim() || rating === 0 || comment.length > 140) return;

    const newReview: CreateReview = {
      rating,
      comment,
      movieId: movieId,
      userId: user?.id,
    };

    onReviewSubmit(newReview);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: "rgba(128, 128, 128, 0.3)" }} // gris con 30% opacity
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-lg shadow-lg max-w-md w-full p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-2xl font-bold"
          onClick={onClose}
          aria-label="Cerrar modal"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Add Comment
        </h2>

        <div className="mb-4">
          <textarea
            id="comment"
            maxLength={140}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            placeholder="Escribe tu comentario..."
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
          />
          <div className="text-right text-sm mt-1">
            <span
              className={
                comment.length > 130 ? "text-red-500" : "text-gray-500"
              }
            >
              {comment.length}/140
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 mb-6 justify-center">
          {[1, 2, 3, 4, 5].map((value) => (
            <FaStar
              key={value}
              onClick={() => setRating(value)}
              onMouseEnter={() => setHovered(value)}
              onMouseLeave={() => setHovered(0)}
              className={`w-8 h-8 cursor-pointer transition-colors ${
                value <= (hovered || rating)
                  ? "text-yellow-500"
                  : "text-gray-300 dark:text-gray-600"
              }`}
            />
          ))}
        </div>

        <Button
          onClick={handleSubmit}
          disabled={!comment.trim() || rating === 0}
          className="w-full bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 text-black font-semibold rounded shadow-md transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Enviar comentario
        </Button>
      </div>
    </div>
  );
};

export default AddCommentModal;
