"use client"

import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useFavorites } from '@/contexts/favorites-context'
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Icons } from "@/components/icons"

export function MovieCard({ movie }) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const favorite = isFavorite(movie.id);

  const handleFavoriteClick = () => {
    if (favorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative aspect-[2/3] w-full">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            fill
            className="object-cover"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="line-clamp-1">{movie.title}</CardTitle>
        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{movie.overview}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <Badge variant="secondary">{movie.release_date?.split('-')[0]}</Badge>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleFavoriteClick}
              >
                <Icons.heart className={favorite ? "fill-current text-red-500" : ""} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{favorite ? 'Remove from Favorites' : 'Add to Favorites'}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  )
}

