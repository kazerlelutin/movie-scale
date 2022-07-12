/* eslint-disable react-hooks/exhaustive-deps */
import classes from './MoviesForScale.module.css'
import useFetch from '../../utils/hooks/useFetch'
import { useSession } from 'next-auth/react'
import { DragEvent, useEffect, useMemo, useState } from 'react'
import { Movie } from '../../types/Movie.interface'
import Image from 'next/image'
import AddMedia from '../_ui/AddMedia/AddMedia'
import ToastLoading from '../_ui/ToastLoading/ToastLoading'
import TouchPosterToMove from '../_ui/TouchPosterToMove/TouchPosterToMove'
import useLazyFetch from '../../hooks/useLazyFetch'
import useDebounce from '../../utils/hooks/useDebounce copy'

interface props {
  readonly scaleId: string
  readonly levels: Array<any>
  readonly setLevels: Function
  readonly addMovie: Function
  readonly ownerId: string
  readonly openPopin: Function
}

interface setPositionToMove {
  readonly x: number
  readonly y: number
}

export default function MoviesForScale({
  scaleId,
  levels,
  setLevels,
  ownerId,
  addMovie,
  openPopin,
}: props) {
  const { data: session } = useSession(),
    peripheralPosition = useMemo(
      () => ({
        first: levels[0] ? levels[0].position + 1 : 1,
        last: levels[levels.length - 1]
          ? levels[levels.length - 1].position - 1
          : -1,
      }),
      [levels]
    ),
    isMyScale = useMemo(
      () => session && session.user.id === ownerId,
      [session, ownerId]
    ),
    [movieToMove, setMovieToMove] = useState<Movie>(),
    debounceMovieToMove = useDebounce(movieToMove, 200),
    [hoverLevel, setHoverLevel] = useState<number | null>(null),
    [positionToMove, setPositionToMove] = useState<setPositionToMove | null>(
      null
    ),
    { loading, data } = useFetch('/scale/movies/', { id: scaleId }),
    { loading: loadingForChangeLevel, api } = useLazyFetch('/scale/addMovie')

  function createLevel() {
    const levels = []
    data.positions.forEach((o: number) => {
      levels.push({
        position: o,
        movies: data.movies.filter((it: Movie) => it.position === o),
      })
    })
    setLevels(levels.sort((a, b) => b.position - a.position))
  }

  useEffect(() => {
    if (data) createLevel()
  }, [data])

  async function handleDrop(e: any, position: number) {
    e.preventDefault()
    setHoverLevel(null)
    api({ movie: movieToMove, position, scaleId })
    addMovie({ ...movieToMove, position })
  }

  function handleOver(e: DragEvent) {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move' //for can drop
  }

  function handleTouchEnd() {
    setPositionToMove(null)
    if (movieToMove.position !== hoverLevel) {
      api({ movie: movieToMove, position: hoverLevel, scaleId })
      addMovie({ ...movieToMove, position: hoverLevel })
    }
    setMovieToMove(null)
  }

  return (
    <div className={classes.container}>
      {debounceMovieToMove && (
        <TouchPosterToMove
          positionToMove={positionToMove}
          movie={movieToMove}
          setHoverLevel={setHoverLevel}
        />
      )}
      <ToastLoading
        loading={loading || loadingForChangeLevel}
        text={
          loadingForChangeLevel
            ? 'Déplacement du film'
            : "chargement de l'echelle"
        }
      />
      {isMyScale && (
        <div
          data-drophover={peripheralPosition.first === hoverLevel}
          className={classes.level}
          id={`position-${peripheralPosition.first}`}
          onDragOver={handleOver}
          onDragEnter={() => setHoverLevel(peripheralPosition.first)}
          onDrop={(e) => handleDrop(e, peripheralPosition.first)}
        >
          <AddMedia onClick={() => openPopin(peripheralPosition.first)} />
        </div>
      )}
      {isMyScale && levels.length === 0 && 'Ajoute ton premier film'}
      {!isMyScale && levels.length === 0 && 'Aucun film sur cette échelle'}
      <div className={classes.container}>
        {levels.map((level) => (
          <div
            data-drophover={level.position === hoverLevel}
            key={level.position}
            className={classes.level}
            id={`position-${level.position}`}
            onDragOver={handleOver}
            onDragEnter={() => setHoverLevel(level.position)}
            onDrop={(e) => handleDrop(e, level.position)}
          >
            {level.movies.map((movie: Movie) => (
              <div
                className={classes.movie}
                key={movie.id}
                title={movie.title}
                draggable
                onDragStart={(e) => {
                  setMovieToMove(movie)
                }}
                onDragEnd={() => {
                  setHoverLevel(null)
                  setMovieToMove(null)
                }}
                onTouchStart={() => {
                  setHoverLevel(movie.position)
                  setMovieToMove(movie)
                }}
                onTouchMove={(e) => {
                  if (debounceMovieToMove === movieToMove) {
                    const { pageX, pageY } = e.targetTouches[0]
                    setPositionToMove({ x: pageX, y: pageY })
                  }
                }}
                onTouchEnd={handleTouchEnd}
              >
                <Image
                  className={classes.img}
                  src={movie.poster}
                  alt={movie.title}
                  width={75}
                  height={75 * 1.33}
                />
              </div>
            ))}
            {isMyScale && levels.length > 0 && (
              <AddMedia onClick={() => openPopin(level.position)} />
            )}
          </div>
        ))}
        {isMyScale && levels.length > 0 && (
          <div
            data-drophover={peripheralPosition.last === hoverLevel}
            className={classes.level}
            id={`position-${peripheralPosition.last}`}
            onDragOver={handleOver}
            onDrop={(e) => handleDrop(e, peripheralPosition.last)}
            onDragEnter={() => setHoverLevel(peripheralPosition.last)}
          >
            <AddMedia onClick={() => openPopin(peripheralPosition.last)} />
          </div>
        )}
      </div>
    </div>
  )
}
