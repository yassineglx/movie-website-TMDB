"use client"
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useFavorites } from '@/contexts/favorites-context'
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Icons } from "@/components/icons"

export function MovieCard({ movie }) {
  // const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  // const favorite = isFavorite(movie.id);

  // const handleFavoriteClick = () => {
  //   if (favorite) {
  //     removeFromFavorites(movie.id);
  //   } else {
  //     addToFavorites(movie);
  //   }
  // };

  const [moreText, setMoreText] = useState(false);

  const [isFavorite, setIsFavorite] = useState(false);

  // Initialize favorites from localStorage on component mount
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.some(fav => fav.id === movie.id));
  }, [movie.id]);

  const handleFavoriteClick = (e) => {
    e.preventDefault(); // Prevent link navigation

    // Get current favorites from localStorage
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    let newFavorites;
    if (isFavorite) {
      // Remove from favorites
      newFavorites = favorites.filter(fav => fav.id !== movie.id);
    } else {
      // Add to favorites
      const favoriteProduct = {
        id: movie.id,
        title: movie.title,
        poster_path:movie.poster_path,
        overview:movie.overview,
        
        release_date:movie.release_date,
        addedAt: new Date().toISOString()
      };
      newFavorites = [...favorites, favoriteProduct];
    }

    // Update localStorage
    localStorage.setItem('favorites', JSON.stringify(newFavorites));

    // Update state
    setIsFavorite(!isFavorite);
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
        {/* <p className="text-sm text-muted-foreground mt-2 line-clamp-2">  </p> */}
        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                      {moreText
                        ? movie.overview
                        : `${movie.overview?.slice(0, 50)}...`}
                    </p>
                    {movie.overview?.length > 50 && (
                      <button
                        onClick={() => setMoreText(!moreText)}
                        className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-500"
                      >
                        {moreText ? 'Voir moins' : 'Lire plus'}
                      </button>
                    )}
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
                <Icons.heart className={isFavorite ? "fill-current text-red-500" : ""} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  )
}

