'use client'

import React, { Fragment } from 'react'
import SearchBar from './search-bar'
import { useState } from 'react'

const types = [
  { value: 'playlist', label: 'Playlist' },
  { value: 'artist', label: 'Artist' },
] as const

type Type = (typeof types)[number]['value']

export default function SearchTypeSelector() {
  const [selectedType, setSelectedType] = useState<Type>(types[0].value)

  return (
    <Fragment>
      <div className="mb-6 bg-gray-900 rounded-full flex items-center">
        {types.map((type) => {
          return (
            <Fragment key={type.value}>
              <label
                className={`cursor-pointer rounded-full px-8 text-center py-1 transition-colors ${
                  selectedType === type.value
                    ? 'bg-[#1ed760] text-gray-950'
                    : ''
                }`}
                htmlFor={type.value}
              >
                {type.label}
              </label>

              <input
                type="radio"
                name="search-type"
                id={type.value}
                value={type.value}
                className="hidden"
                onChange={(e) => setSelectedType(type.value)}
              />
            </Fragment>
          )
        })}
      </div>

      <SearchBar type={selectedType} />
    </Fragment>
  )
}