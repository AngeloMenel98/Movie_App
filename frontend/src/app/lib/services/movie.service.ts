import api from "@/lib/api";
import { Movie } from "@/types/movies/movie";
import { CreateReview, Review } from "@/types/reviews/review";

export const getAllMovies = async (): Promise<Movie[]> => {
  const res = await api.get<Movie[]>("/movies");
  return res.data;
};

export const getMovieById = async (id: string): Promise<Movie> => {
  const res = await api.get<Movie>(`/movies/${id}`);
  return res.data;
};

export const createReview = async (review: CreateReview): Promise<Review> => {
  const res = await api.post<Review>("/mov-user", review);
  return res.data;
};
