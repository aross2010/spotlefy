'use client'
import React from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { gameStats } from '@/app/lib/types'
import { FaXmark } from 'react-icons/fa6'
import { FaRecordVinyl, FaChartLine, FaTrophy, FaFire } from 'react-icons/fa'

export default function StatsModal({
  open,
  setOpen,
  gameStats,
}: {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  gameStats: gameStats
}) {
  const cancelButtonRef = React.useRef(null)

  const totalGames = Number.parseInt(localStorage.getItem('totalGames') ?? '0')
  const totalWins = Number.parseInt(localStorage.getItem('totalWins') ?? '0')
  const maxStreak = Number.parseInt(localStorage.getItem('maxWinStreak') ?? '0')
  const currentStreak = Number.parseInt(
    localStorage.getItem('currentWinStreak') ?? '0'
  )
  const gamePoints =
    (JSON.parse(localStorage.getItem('gamePoints') as string) as number[]) ??
    ([0, 0, 0, 0, 0, 0] as number[])
  const losses = totalGames - totalWins

  const maxPoints = Math.max(...gamePoints, losses)

  const stats = [
    {
      title: 'Games',
      icon: <FaRecordVinyl className="text-gray-300" />,
      value: totalGames,
    },
    {
      title: 'Win %',
      icon: <FaChartLine className="text-green-600" />,
      value: Number.isNaN(totalWins / totalGames)
        ? 0
        : ((totalWins / totalGames) * 100).toFixed(0) + '%',
    },
    {
      title: 'Max Streak',
      icon: <FaTrophy className="text-yellow-600" />,
      value: maxStreak,
    },
    {
      title: 'Current',
      icon: <FaFire className="text-orange-600" />,
      value: currentStreak,
    },
  ]

  return (
    <Transition.Root
      show={open}
      as={Fragment}
    >
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full w-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative flex flex-col items-center justify-center transform py-4 px-2 border border-gray-700 overflow-hidden rounded-md bg-gray-950 shadow-xl transition-all sm:my-8 sm:w-auto w-full sm:max-w-full">
                <h3 className="text-center mb-6 text-lg font-medium">
                  Your Stats
                </h3>
                <button
                  className="absolute right-0 top-0 mr-3 mt-3"
                  onClick={() => setOpen(false)}
                  ref={cancelButtonRef}
                >
                  <FaXmark className="text-gray-400 text-lg" />
                </button>

                <div className="grid grid-cols-7 gap-2 w-full px-4 py-6 h-48">
                  {Array(7)
                    .fill(0)
                    .map((_, index) => {
                      const height =
                        index !== 6
                          ? (gamePoints[index] / maxPoints) * 100
                          : (losses / maxPoints) * 100

                      return (
                        <div
                          key={index}
                          className="flex flex-col justify-end"
                        >
                          <div
                            className={`${
                              index === 6
                                ? 'bg-red-600'
                                : index === 0
                                ? 'bg-[#20c554]'
                                : index === 1
                                ? 'bg-[#44c520]'
                                : index === 2
                                ? 'bg-[#7bc520]'
                                : index === 3
                                ? 'bg-[#7ec520]'
                                : index === 4
                                ? 'bg-[#83c520]'
                                : 'bg-[#c0c520]'
                            } rounded-t-sm`}
                            style={{
                              height: `${height}%`,
                            }}
                          />
                          <span className="mt-2 text-sm font-medium text-gray-400">
                            {index !== 6
                              ? index === 0
                                ? 1
                                : index === 1
                                ? 3
                                : index === 2
                                ? 6
                                : index === 3
                                ? 10
                                : index == 4
                                ? 18
                                : 30
                              : 'L'}
                          </span>
                        </div>
                      )
                    })}
                </div>

                <div className="grid w-full pt-6 sm:grid-cols-4 grid-cols-2 sm:gap-2 gap-4 mb-10">
                  {stats.map((stat, index) => {
                    return (
                      <div
                        key={index}
                        className="flex flex-col items-center"
                      >
                        <span className="text-2xl mb-3 rounded-full p-4 bg-gray-900">
                          {stat.icon}
                        </span>
                        <span className="font-medium">{stat.value}</span>
                        <h5 className="text-sm px-1 text-gray-500 font-medium">
                          {stat.title}
                        </h5>
                      </div>
                    )
                  })}
                </div>

                {gameStats.win && (
                  <p className="text-gray-400 text-sm">
                    It took you {gameStats.time} seconds to win.
                  </p>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
