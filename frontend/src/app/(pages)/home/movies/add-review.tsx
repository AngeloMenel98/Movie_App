"use client";

import { useEffect, useState } from "react";
import { CreateReview } from "@/types/reviews/review";
import { MdStar } from "@/icons";
import Button from "@/components/button/button";
import { useUser } from "@/context/user-context";
import Modal from "@/components/modals/general-modal";

interface AddReviewModalProps {
  movieId: string;
  isOpen: boolean;
  onClose: () => void;
  onReviewSubmit: (review: CreateReview) => void;
}

const AddReviewModal = ({
  movieId,
  isOpen,
  onClose,
  onReviewSubmit,
}: AddReviewModalProps) => {
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        Write a Review
      </h2>

      <div className="mb-4">
        <textarea
          id="comment"
          maxLength={140}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
          placeholder="Share your thoughts about the movie..."
          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
        />
        <div className="text-right text-sm mt-1">
          <span
            className={comment.length > 130 ? "text-red-500" : "text-gray-500"}
          >
            {comment.length}/140
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-6 justify-center">
        <h3 className="text-gray-900 dark:text-white">Rate this movie:</h3>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((value) => (
            <MdStar
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
      </div>

      <Button
        onClick={handleSubmit}
        disabled={!comment.trim() || rating === 0}
        className="w-full bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 text-black font-semibold rounded shadow-md transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Submit Review
      </Button>
    </Modal>
  );
};

export default AddReviewModal;
