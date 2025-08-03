"use client";

import Button from "@/components/buttons/button";
import MovieCard from "@/components/cards/movie-card";
import { getAllMovies } from "@/services/movie.service";
import { Movie } from "@/types/movies/movie";
import { MdMovie } from "react-icons/md";
import { useEffect, useState } from "react";

const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchMovies = async () => {
    try {
      setIsLoading(true);
      const allMovies = await getAllMovies();
      setMovies(allMovies);
      setError(null);
    } catch (err) {
      console.error("Error fetching movies:", err);
      setError(
        "No se pudieron cargar las películas. Inténtalo de nuevo más tarde."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="ml-4 text-xl text-gray-600">Cargando películas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-xl w-full">
          <strong className="font-bold">¡Error!</strong>
          <span className="block sm:inline"> {error}</span>
          <Button
            onClick={fetchMovies}
            className="mt-3 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Reintentar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Catálogo de Películas
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Explora nuestra colección completa de películas
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 ">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        {movies.length === 0 && (
          <div className="text-center py-16">
            <MdMovie className="text-gray-500 mr-2" size={20} />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              No hay películas disponibles
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Prueba a recargar la página o inténtalo más tarde.
            </p>
            <Button
              onClick={fetchMovies}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
            >
              Recargar películas
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
