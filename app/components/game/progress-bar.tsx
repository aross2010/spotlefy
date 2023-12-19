'use client'
import { useEffect, useState, useRef, Fragment } from 'react'

type ProgressBarProps = {
  audioRef: React.RefObject<HTMLAudioElement>
  limit: number | null
}

export default function ProgressBar({ audioRef, limit }: ProgressBarProps) {
  const [progress, setProgress] = useState<number>(0)
  const [duration, setDuration] = useState<number>(0)
  const animationRef = useRef<number>()

  const progressBars = [1, 3, 6, 10, 18, duration] as const

  // update progress
  useEffect(() => {
    const updateProgress = () => {
      if (!audioRef.current) return

      setDuration(audioRef.current.duration)

      const currentTime = audioRef.current.currentTime

      if (!isNaN(duration)) {
        setProgress(currentTime)
      }

      animationRef.current = requestAnimationFrame(updateProgress)
    }

    updateProgress()

    return () => {
      cancelAnimationFrame(animationRef.current as number)
    }
  }, [audioRef])

  const progressPercentage = (progress / duration) * 100

  return (
    <Fragment>
      <div className="w-full h-6 relative border border-gray-500 mb-2 mt-2">
        <div
          className={`bg-[#1ed760] h-full`}
          style={{
            width: `${
              Number.isNaN(progressPercentage) ? 0 : progressPercentage
            }%`,
          }}
        ></div>
        <div
          className="bg-gray-700 -z-10 h-full absolute top-0 bottom-0"
          style={{
            width: `${limit ? (limit / duration) * 100 : 100}%`,
          }}
        />

        {progressBars.map((progressBar) => {
          return (
            <div
              key={progressBar}
              className="absolute top-0 bottom-0 w-[1px] bg-gray-500"
              style={{
                left: `${(progressBar / duration) * 100}%`,
              }}
            />
          )
        })}
      </div>
      <div className="flex items-center text-sm">
        <span>0:{`${Math.floor(progress)}`.padStart(2, '0')}</span>
        <span className="ml-auto">
          0:
          {`${Number.isNaN(Math.ceil(duration)) ? 30 : Math.ceil(duration)}`}
        </span>
      </div>
    </Fragment>
  )
}

// plus 1, 2, 3, 6, 6, 12
