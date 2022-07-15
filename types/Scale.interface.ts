import { Movie } from "./Movie.interface";
import { User } from "./User.interface";

export interface Scale {
  readonly id: string;
  readonly name: string;
  readonly userId: string;
  readonly user: User;
  readonly movies: Array<Movie>;
  readonly _count: {
    readonly movies: number;
    readonly favorites: number;
  };
}
