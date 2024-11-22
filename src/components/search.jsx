"use client"

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export function Search({ onSearch }) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(query)
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2 md:w-[100px] lg:w-[300px]">
      <Input
        type="search"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="h-9 md:w-[300px] lg:w-[300px]"
      />
      <Button type="submit" size="sm" className="px-3">
        <Icons.search className="h-4 w-4" />
        <span className="sr-only">Search</span>
      </Button>
    </form>
  )
}

