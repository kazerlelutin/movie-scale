import { useState } from "react";
import { Level } from "../types/Level.interface";
import { Movie } from "../types/Movie.interface";

interface returns {
  readonly levels: Array<Level>;
  readonly addMovie: Function;
  readonly createLevel: Function;
  readonly removeMovie: Function;
}
export default function useLevels(): returns {
  const [levels, setLevels] = useState<Array<Level>>([]);

  function cleanLevel(levelsToClean: Array<Level>, movieToFind: Movie) {
    levelsToClean.forEach((o) => {
      const existMovieIndex = o.movies.findIndex(
        (it) => it.api_id === movieToFind.api_id
      );
      if (existMovieIndex >= 0) {
        o.movies.splice(existMovieIndex, 1);
      }
      o.peripheral = false;
    });
    return levelsToClean;
  }

  function addMovie(movie: Movie) {
    const newLevels = [],
      level = { ...levels.find((o) => o.position === movie.position) };
    if (level && level.hasOwnProperty("position")) {
      newLevels.push(
        ...levels.filter((o) => o.position !== movie.position),
        level
      );
      cleanLevel(newLevels, movie);
      level.movies.push(movie);
    } else {
      newLevels.push(...levels);
      cleanLevel(newLevels, movie);
      newLevels.push({ position: movie.position, movies: [movie] });
    }

    newLevels.sort((a, b) => b.position - a.position);

    const firstPosition = newLevels[0] ? newLevels[0].position + 1 : 1,
      lastPosition = newLevels[newLevels.length - 1]
        ? newLevels[newLevels.length - 1].position - 1
        : -1;

    if (!newLevels[0].peripheral) {
      //splice because if push, this was the last element and last position was wrong.
      newLevels.splice(0, 0, {
        position: firstPosition,
        movies: [],
        peripheral: true,
      });
      newLevels.push();
    }

    if (!newLevels[newLevels.length - 1].peripheral) {
      newLevels.push({
        position: lastPosition,
        movies: [],
        peripheral: true,
      });
    }

    setLevels(
      newLevels
        .filter((lvl) => lvl.movies.length > 0 || lvl.peripheral)
        .sort((a, b) => b.position - a.position)
    );
  }

  function removeMovie(levelsClean: Array<Level>) {
    setLevels(
      levelsClean.filter((lvl) => lvl.movies.length > 0 || lvl.peripheral)
    );
  }

  function createLevel(data: {
    positions: Array<number>;
    movies: Array<Movie>;
  }) {
    const newsLevels = [
      {
        position: data.positions[0] ? data.positions[0] + 1 : 1,
        movies: [],
        peripheral: true,
      },
      {
        position: data.positions[data.positions.length - 1]
          ? data.positions[data.positions.length - 1] - 1
          : -1,
        movies: [],
        peripheral: true,
      },
    ];

    data.positions.forEach((o: number) => {
      newsLevels.push({
        position: o,
        movies: data.movies.filter((it: Movie) => it.position === o),
        peripheral: false,
      });
    });
    setLevels(newsLevels.sort((a, b) => b.position - a.position));
  }

  return {
    levels,
    addMovie,
    createLevel,
    removeMovie,
  };
}
