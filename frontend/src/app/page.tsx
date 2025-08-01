'use client';

import { ServiceTester } from "./components/service-tester";
import { Movie } from "./types/movies/movie";
import { getAllMovies } from "./services/movie.service";

export default function Home() {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold">Test de Servicios</h1>
      <ServiceTester<Movie[]> service={() => getAllMovies()} />

    </main>
  );
}
