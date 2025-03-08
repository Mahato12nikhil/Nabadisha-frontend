import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "./ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel"
import img from '../assets/nabadisha_poster.png'

export function HomeCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false })
  )

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-[90%] relative sm:w-[60%]" 
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} >
            <div>
              <Card className="h-auto p-0">
                <CardContent className="relative flex items-center justify-center p-0">
                  <img src={img} className="w-full object-cover rounded-lg" />
                  <CarouselPrevious className="absolute left-4 top-1/2 p-2 rounded-full" />
                  <CarouselNext className="absolute right-4 top-1/2 p-2 rounded-full" />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

export default HomeCarousel;
