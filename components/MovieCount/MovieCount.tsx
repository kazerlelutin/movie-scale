import classes from './MovieCount.module.css'
import { useMemo } from 'react'
import { Level } from '../../types/Level.interface'

export default function MovieCount({ levels }) {
  const count = useMemo(() => {
    return levels.reduce(
      (previousValue:number, currentValue:Level) =>
        previousValue + currentValue?.movies?.length || 0,
      0
    )
  }, [levels])

  return <div className={classes.container}>{count} film{count > 0 ? 's':''}</div>
}
