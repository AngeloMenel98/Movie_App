import api from "@/lib/api";
import { Movie } from "@/types/movies/movie";

export const getAllMovies = async (): Promise<Movie[]> => {
  const res = await api.get<Movie[]>('/movies');
  return res.data;
};

export const getMovieById = async (id: string): Promise<Movie> => {
  const res = await api.get<Movie>(`/movies/${id}`);
  return res.data;
};