import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function MovieCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <Skeleton className="aspect-[2/3] w-full" />
      </CardHeader>
      <CardContent className="p-4">
        <Skeleton className="h-4 w-3/4 mb-2" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full mt-2" />
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </CardFooter>
    </Card>
  )
}

