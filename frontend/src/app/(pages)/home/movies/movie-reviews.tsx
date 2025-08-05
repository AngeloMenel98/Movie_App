"use client";

import { CreateReview, Review } from "@/types/reviews/review";
import Button from "../../../components/button/button";
import { MdBlock, MdAddComment, MdStar } from "@/icons";
import { useState } from "react";
import { useUser } from "@/context/user-context";
import { Movie } from "@/types/movies/movie";
import { createReview } from "@/lib/services/movie.service";
import { formatDate } from "@/lib/date";
import AddReviewModal from "@/(pages)/home/movies/add-review";

interface MovieReviewsProps {
  movie: Movie;
  reviews: Review[];
}

const MovieReviews = ({
  movie,
  reviews: initialReviews,
}: MovieReviewsProps) => {
  const { user } = useUser();
  const [openModal, setOpenModal] = useState(false);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);

  const onReviewSubmit = async (newReview: CreateReview) => {
    const review = await createReview(newReview);

    const createdReview: Review = {
      id: crypto.randomUUID(),
      comment: review.comment,
      rating: review.rating,
      createdAt: review.createdAt,
      user: {
        id: user?.id || "",
        username: user?.username || "",
      },
      movie: movie,
    };

    setReviews((prev) => [createdReview, ...prev]);

    setOpenModal(false);
  };

  return (
    <>
      <div className="flex flex-col h-80 w-full bg-gray-900 rounded-lg p-4 text-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Comments</h2>
          <Button size="sm" onClick={() => setOpenModal(true)}>
            <MdAddComment size={20} />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
          {!reviews || reviews.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center text-gray-500 py-10">
              <MdBlock size={60} className="mb-2" />
              <p className="text-lg font-semibold">No comments yet</p>
              <span className="text-sm">Be the first to leave one!</span>
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map((review, idx) => (
                <div
                  key={idx}
                  className="bg-gray-800 p-4 rounded-lg shadow-sm text-sm"
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">
                        {review.user.username}
                      </span>
                      <span className="text-gray-400 text-xs">
                        {formatDate(review.createdAt)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <MdStar
                          key={i}
                          size={14}
                          className={
                            i < review.rating
                              ? "fill-yellow-400"
                              : "fill-gray-600"
                          }
                        />
                      ))}
                    </div>
                  </div>
                  <p>{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {openModal && (
        <AddReviewModal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          movieId={movie.id}
          onReviewSubmit={onReviewSubmit}
        />
      )}
    </>
  );
};

export default MovieReviews;
