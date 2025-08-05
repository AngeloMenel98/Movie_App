import Image from "next/image";
import { Movie } from "@/types/movies/movie";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { MdStar, MdHideImage } from "@/icons";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const [avgRating, setAvgRating] = useState<number>(0);
  const [totalReviews, setTotalReviews] = useState<number>(0);
  const [imageError, setImageError] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (movie.reviews && movie.reviews.length > 0) {
      const total = movie.reviews.reduce(
        (sum, review) => sum + review.rating,
        0
      );
      const avg = total / movie.reviews.length;
      setAvgRating(avg);
      setTotalReviews(movie.reviews.length);
    }
  }, [movie]);

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer max-w-md w-full mx-auto"
      style={{ width: "275px" }}
      onClick={() => router.push(`/movie/${movie.id}`)}
    >
      {movie.coverImage && (
        <div className="relative w-full h-56">
          {imageError ? (
            <div className="flex items-center justify-center w-full h-full bg-gray-800 rounded">
              <MdHideImage className="text-5xl text-gray-500" />
            </div>
          ) : (
            <Image
              src={movie.coverImage}
              alt={movie.title}
              fill
              className="object-cover"
              onError={() => setImageError(true)}
            />
          )}
        </div>
      )}

      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-800 dark:text-white truncate">
          {movie.title}
        </h3>

        {avgRating > 0 ? (
          <div className="flex items-center">
            <MdStar className="text-yellow-500 text-sm mr-1" />
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {avgRating.toFixed(2)}/5.0
            </span>
            <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
              ({totalReviews})
            </span>
          </div>
        ) : (
          <span className="text-gray-500 dark:text-gray-400 text-sm">
            Sin calificaciones
          </span>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
