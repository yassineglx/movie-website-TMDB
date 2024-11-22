"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MainNav } from "@/components/main-nav"
import { Search } from "@/components/search"
import { UserNav } from "@/components/user-nav"
import { useAuth } from '@/contexts/auth-context'

const navItems = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Favorites",
    href: "/favorites",
  },
]

export function Header() {
  const router = useRouter();
  const { user } = useAuth();

  const handleSearch = (query) => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <>
    
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center">
        <MainNav items={navItems} />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <Search onSearch={handleSearch} />
          <UserNav user={user} />
        </div>
      </div>
    </header>
    
    </>
  )
}

