/* eslint-disable react-hooks/exhaustive-deps */
import Image from 'next/image'
import classes from './TouchPosterToMove.module.css'
import { useEffect } from 'react'
import { Movie } from '../../../types/Movie.interface'

interface props {
  readonly movie: Movie
  readonly setHoverLevel: Function
  readonly positionToMove: {
    x: number
    y: number
  }
}

export default function TouchPosterToMove({
  positionToMove,
  movie,
  setHoverLevel,
}: props) {
  useEffect(() => {
    const allLevels = document.querySelectorAll('[id*="position"')

    Array.from(allLevels).forEach((el: HTMLElement) => {
      el.setAttribute('data-drophover', 'false')
    })

    if (positionToMove) {
      const scale = document.getElementById('scale'),
        partOfScreen = (positionToMove.y / window.innerHeight) * 100

      scale.scrollTo({
        top: partOfScreen < 50 ? scale.scrollTop - 40 : scale.scrollTop + 40,
        behavior: 'smooth',
      })

      const elFromPoints = document.elementsFromPoint(
        positionToMove.x,
        positionToMove.y
      )
      if (elFromPoints) {
        Array.from(elFromPoints).forEach((el: HTMLElement) => {
          if (el.id.match(/position/)) {
            setHoverLevel(parseInt(el.id.replace('position-', '')))
            el.setAttribute('data-drophover', 'true')
          }
        })
      }
    }
  }, [positionToMove])

  return (
    positionToMove && (
      <div
        className={classes.container}
        style={{
          top: positionToMove.y - 15 + 'px',
          left: positionToMove.x - 15 + 'px',
        }}
      >
        <Image
          src={movie.poster}
          width={80}
          height={80 * 1.33}
          alt="film déplacé"
        />
      </div>
    )
  )
}
