import { useState } from 'react'
import { Level } from '../types/Level.interface'
import { Movie } from '../types/Movie.interface'

interface returns {
  readonly levels: Array<Level>
  readonly setLevels: Function
  readonly addMovie: Function
}
export default function useLevels(): returns {
  const [levels, setLevels] = useState<Array<Level>>([])

  function cleanLevel(levelsToClean: Array<Level>, movieToFind: Movie) {
    levelsToClean.forEach((o) => {
      const existMovieIndex = o.movies.findIndex(
        (it) => it.api_id === movieToFind.api_id
      )
      if (existMovieIndex >= 0) {
        o.movies.splice(existMovieIndex, 1)
      }
    })
    return levelsToClean
  }

  function addMovie(movie: Movie) {
    const newLevels = [],
      level = { ...levels.find((o) => o.position === movie.position) }
    if (level && level.hasOwnProperty('position')) {
      newLevels.push(
        ...levels.filter((o) => o.position !== movie.position),
        level
      )
      cleanLevel(newLevels, movie)
      level.movies.push(movie)
    } else {
      newLevels.push(...levels)
      cleanLevel(newLevels, movie)
      newLevels.push({ position: movie.position, movies: [movie] })
    }

    setLevels(
      newLevels
        .filter((lvl) => lvl.movies.length > 0)
        .sort((a, b) => b.position - a.position)
    )
  }

  return {
    levels,
    setLevels,
    addMovie,
  }
}
