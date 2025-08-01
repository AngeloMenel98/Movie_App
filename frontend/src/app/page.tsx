'use client';

import { ServiceTester } from "./components/service-tester";
import { Movie } from "./types/movies/movie";
import { getAllMovies } from "./services/movie.service";
import LoginPage from "./pages/login";

export default function Home() {
  return (
      <LoginPage/>

  );
}
