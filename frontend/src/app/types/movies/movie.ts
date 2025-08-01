import { Review } from "../reviews/review";

export interface Movie {
  id: string;
  title: string;
  synopsis: string;
  coverImage:string;
  reviews: Review[];
}