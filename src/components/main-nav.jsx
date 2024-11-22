import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

export function MainNav({ items }) {
  const pathname = usePathname()

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <Icons.logo className="h-6 w-6" />
        <span className="inline-block font-bold">MovieHub</span>
      </Link>
      {items?.length ? (
        <nav className="flex gap-6">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center text-sm font-medium text-muted-foreground",
                item.href === pathname && "text-foreground"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      ) : null}
    </div>
  )
}

