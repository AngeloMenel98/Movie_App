import { Movie } from "@/types/movies/movie";
import { useEffect, useState } from "react";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
    const [avgRating, setAvgRating] = useState<number>(0);
    const [totalReviews, setTotalReviews] = useState<number>(0);

    useEffect(() => {
        if (movie.reviews && movie.reviews.length > 0) {
            const total = movie.reviews.reduce((sum, review) => sum + review.rating, 0);
            const avg = total / movie.reviews.length;
            setAvgRating(avg);
            setTotalReviews(movie.reviews.length);
        }
    }, [movie]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">      
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-800 dark:text-white truncate">
          {movie.title}
        </h3>
        
          {avgRating > 0 ? (
            <div className="flex items-center">
              <span className="text-yellow-500 text-sm mr-1">⭐</span>
              <span className="font-medium text-gray-700 dark:text-gray-300">
                {avgRating.toFixed(1)}/10
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
        
        <div className="mt-3 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
          {movie.synopsis}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;