import * as React from "react";

import { Card, CardContent } from "../../components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../../components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Social from "../Social";
import { IUser } from "../../definitions/user";

interface MemberCardProps {
  members: IUser[];
}



const MemberCard :React.FC<MemberCardProps> = ({members} ) => {
  const plugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: false }));


  const onSocialClick=(url: string | undefined)=>{
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  }


  return (
    <Carousel opts={{ align: "start" }} plugins={[plugin.current]} className="w-full">
      <CarouselContent>
        {members.map((member, index) => (
          <CarouselItem key={index} className="basis-1/2 sm:basis-1/3 lg:basis-1/7">
            <div className="p-1">
              <Card className="p-0 rounded-lg overflow-hidden"> 
                <CardContent className="flex flex-col h-full h-60  p-0">
                  <div className="h-[70%] w-full">
                    <img 
                      src={member.userpic}
                      className="w-full h-full object-cover object-top rounded-tl-lg rounded-tr-lg" 
                      alt="Member" 
                      onError={(e) => console.error("Image failed to load", e)}
                    />
                  </div>

                  <div className="h-[30%] w-full flex flex-col items-center justify-between  rounded-b-lg">
                    <span>{member?.name}</span>
                    <div className="p-2">
                      <Social socials={member.social} onSocialClick={onSocialClick}/>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default MemberCard;
