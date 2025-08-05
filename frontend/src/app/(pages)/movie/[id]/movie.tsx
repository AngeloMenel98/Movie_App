"use client";

import { useState, useEffect } from "react";
import { getMovieById } from "@/lib/services/movie.service";
import { Movie } from "@/types/movies/movie";
import { MdBlock } from "react-icons/md";
import MovieComments from "@/(pages)/home/movies/movie-comments";
import MovieHeader from "@/(pages)/home/movies/movie-header";

interface MovieDetailProps {
  id: string;
}

const MovieDetail = ({ id }: MovieDetailProps) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    getMovieById(id)
      .then(setMovie)
      .catch(() => setMovie(null));
  }, [id]);

  if (!movie) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center text-gray-500">
        <MdBlock className="w-16 h-16 text-gray-400 mb-4" />
        <p className="text-xl font-semibold">Movie not Found</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-10">
      <MovieHeader movie={movie} />

      <MovieComments movie={movie} reviews={movie.reviews} />
    </div>
  );
};

export default MovieDetail;
