import Image from "next/image";
import { Movie } from "@/types/movies/movie";
import { FaStar } from "react-icons/fa";
import { useState } from "react";

interface MovieModalProps {
  movie: Movie;
  avgRating: number;
  totalReviews: number;
  onClose: () => void;
}

const MovieModal = ({
  movie,
  avgRating,
  totalReviews,
  onClose,
}: MovieModalProps) => {
  const [hovered, setHovered] = useState(0);
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50  scrollbar-none"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-lg shadow-lg max-w-lg w-full p-6 relative max-h-[80vh] overflow-y-auto"
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
          {movie.title}
        </h2>

        {movie.coverImage && (
          <div className="relative w-full h-64 mb-4">
            <Image
              src={movie.coverImage}
              alt={movie.title}
              fill
              className="object-cover rounded"
            />
          </div>
        )}

        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {movie.synopsis}
        </p>

        {avgRating > 0 && (
          <div className="flex items-center mb-4">
            <FaStar className="text-yellow-500 text-sm mr-2" />
            <span className="font-medium text-yellow-700 dark:text-yellow-300">
              {avgRating.toFixed(1)} / 5 ({totalReviews} reseñas)
            </span>
          </div>
        )}

        <div className="flex items-center space-x-1">
          {[1, 2, 3, 4, 5].map((value) => (
            <FaStar
              key={value}
              onMouseEnter={() => setHovered(value)}
              onMouseLeave={() => setHovered(0)}
              className={`w-5 h-5 transition-colors cursor-pointer ${
                value <= hovered
                  ? "text-yellow-500"
                  : "text-gray-300 dark:text-gray-600"
              }`}
            />
          ))}
        </div>

        {movie.reviews && movie.reviews.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
              Reseñas
            </h3>
            <div className="max-h-48 overflow-y-auto space-y-4">
              {movie.reviews.map((rev, index) => (
                <div
                  key={index}
                  className="border-b border-gray-300 dark:border-gray-700 pb-2"
                >
                  <div className="flex items-center justify-between mt-1 text-black-500">
                    <span className="font-semibold text-gray-800 dark:text-white">
                      {rev.user.username}
                    </span>
                    <div className="flex items-center">
                      <FaStar className="text-yellow-500 text-sm mr-2" />
                      <span> {rev.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <p className="text-gray-800 dark:text-gray-300">
                    {rev.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieModal;
