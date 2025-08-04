import { CreateReview, Review } from "@/types/reviews/review";
import { FaStar } from "react-icons/fa";
import Button from "../buttons/button";
import { MdAddComment } from "@/icons";
import { useState } from "react";
import AddCommentModal from "@/components/movies/modals/movie-modal";
import { useUser } from "@/context/user-context";
import { Movie } from "@/types/movies/movie";
import { createReview } from "@/services/movie.service";

interface MovieCommentsProps {
  movie: Movie;
  reviews: Review[];
}

const MovieComments = ({
  movie,
  reviews: initialReviews,
}: MovieCommentsProps) => {
  const { user } = useUser();
  const [openModal, setOpenModal] = useState(false);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);

  const onReviewSubmit = async (newReview: CreateReview) => {
    const review = await createReview(newReview);

    const createdReview: Review = {
      id: crypto.randomUUID(),
      comment: review.comment,
      rating: review.rating,
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
            <p className="text-gray-400">There is no comment yet.</p>
          ) : (
            <div className="space-y-4">
              {reviews.map((review, idx) => (
                <div
                  key={idx}
                  className="bg-gray-800 p-4 rounded-lg shadow-sm text-sm"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold">
                      {review.user.username}
                    </span>
                    <div className="flex items-center gap-1 text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
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
        <AddCommentModal
          onClose={() => setOpenModal(false)}
          movieId={movie.id}
          onReviewSubmit={onReviewSubmit}
        />
      )}
    </>
  );
};

export default MovieComments;
