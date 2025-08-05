"use client";

import { useState } from "react";
import Image from "next/image";
import { LuImageOff } from "react-icons/lu";
import { Movie } from "@/types/movies/movie";
import { FaStar } from "@/icons";

interface MovieHeaderProps {
  movie: Movie;
}

const MovieHeader = ({ movie }: MovieHeaderProps) => {
  const [imageError, setImageError] = useState(false);

  const averageRating =
    movie.reviews && movie.reviews.length > 0
      ? movie.reviews.reduce((acc, cur) => acc + cur.rating, 0) /
        movie.reviews.length
      : 0;

  const avgFormatted = averageRating.toFixed(2);

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-1/3">
        {imageError ? (
          <div className="flex items-center justify-center w-full h-full bg-gray-800 rounded aspect-[2/3]">
            <LuImageOff className="text-5xl text-gray-500" />
          </div>
        ) : (
          <Image
            src={movie.coverImage}
            alt={movie.title}
            width={400}
            height={600}
            className="rounded-xl object-cover w-full h-auto"
            onError={() => setImageError(true)}
          />
        )}
      </div>

      <div className="w-full md:w-2/3 space-y-4">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold">{movie.title}</h1>

          <div className="flex items-center gap-1 bg-yellow-400 text-black px-3 py-1 rounded-full font-semibold select-none">
            <span>{avgFormatted}</span>
            <FaStar className="h-5 w-5 fill-current" />
          </div>
        </div>

        <p className="text-black-700 text-lg">{movie.synopsis}</p>
      </div>
    </div>
  );
};

export default MovieHeader;
