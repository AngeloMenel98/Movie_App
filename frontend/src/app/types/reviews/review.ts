import { Movie } from "../movies/movie";
import { User } from "../users/user";

export interface Review {
  id: string;
  comment: string;
  rating: number;
  user: User;
  movie: Movie
}