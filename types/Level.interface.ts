import { Movie } from "./Movie.interface";

export interface Level {
  readonly position: number;
  readonly movies: Array<Movie>;
}