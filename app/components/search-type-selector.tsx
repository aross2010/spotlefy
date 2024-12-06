'use client'

import React, { Fragment } from 'react'
import SearchBar from './search-bar'
import { useState } from 'react'
import { motion } from 'framer-motion'

const types = [
  { value: 'playlist', label: 'Playlist' },
  { value: 'artist', label: 'Artist' },
] as const

type SearchTypeSelectorProps = {
  disabled?: boolean
}

type Type = (typeof types)[number]['value']

export default function SearchTypeSelector({
  disabled,
}: SearchTypeSelectorProps) {
  const [selectedType, setSelectedType] = useState<Type>(types[0].value)

  return (
    <Fragment>
      <div className="mb-6 bg-gray-900 rounded-full flex items-center">
        {types.map((type) => {
          return (
            <Fragment key={type.value}>
              <label
                className={`cursor-pointer relative z-10 rounded-full px-8 text-center py-1.5 transition-all ${
                  selectedType === type.value
                    ? 'text-gray-950 bg-transparent'
                    : 'text-gray-400'
                }`}
                htmlFor={type.value}
              >
                {type.label}
                {selectedType === type.value && (
                  <motion.span
                    className="bg-[#1db954] rounded-full absolute inset-0 -z-10"
                    layoutId="selectedType"
                    transition={{
                      type: 'spring',
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
              </label>

              <input
                type="radio"
                name="search-type"
                id={type.value}
                value={type.value}
                className="hidden"
                onChange={() => setSelectedType(type.value)}
              />
            </Fragment>
          )
        })}
      </div>

      <SearchBar
        disabled
        type={selectedType}
      />
    </Fragment>
  )
}
