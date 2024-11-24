"use client";
import React, { useState, useEffect } from 'react';
import { Heart, Trash2, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { useFavorites } from '@/contexts/favorites-context'
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Icons } from "@/components/icons"



// import { getSlug } from '@/app/_helpers/slugify';
// import Cart from '@/app/_components/Cart';
import { MovieCard } from './movie-card';
const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load favorites from localStorage
    const loadFavorites = () => {
      const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      setFavorites(storedFavorites);
      setIsLoading(false);
    };

    loadFavorites();

    // Listen for storage changes from other tabs
    window.addEventListener('storage', loadFavorites);
    return () => window.removeEventListener('storage', loadFavorites);
  }, []);

  const removeFavorite = (movieId) => (e) => {
    e.preventDefault(); // Prevent link navigation
    e.stopPropagation(); // Prevent event from bubbling up to parent elements
    const newFavorites = favorites.filter(fav => fav.id !== movieId);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setFavorites(newFavorites);
  };

  const clearAllFavorites = () => {
    localStorage.setItem('favorites', '[]');
    setFavorites([]);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 ">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <Heart className="w-6 h-6 text-red-500" />
          <h1 className="text-2xl font-bold">Mes Favoris ({favorites.length})</h1>
        </div>
        {favorites.length > 0 && (
          <button
            onClick={clearAllFavorites}
            className="flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Tout supprimer
          </button>
        )}
      </div>

      {/* Empty state */}
      {favorites.length === 0 ? (
        <div className="text-center py-16">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Aucun favori pour le moment
          </h2>
          <p className="text-gray-500 mb-4">
            Commencez à ajouter des produits à vos favoris pour les retrouver ici
          </p>
          <Link
            href="/products"
            className="inline-flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Découvrir nos produits
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center px-4 mx-auto max-w-7xl">
          {favorites.map((movie) => (
            <div 
              key={movie.id} 
              className="group relative w-56 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-2"
            >
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
                onClick={removeFavorite(movie.id)}
              >
                <Icons.heart className={ "fill-current text-red-500"} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{ 'Remove from Favorites'}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;