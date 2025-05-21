import { Card, CardContent } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";
// Define service card data for mapping
const serviceCards = [
  {
    id: 1,
    title: "Mike Ejeagha Day 2024",
    description:
      "Mike Ejeagha Day is set aside to Honour the Legend. MIKE EJEAGHA. The event features the screening",
    iconSrc: "https://afiahomecoming.com/admin/flyers/FB_IMG_1733766530842.jpg",
  },
  {
    id: 2,
    title: "Golibe Festival",
    description:
      "Golibe Festival is an annual Festival of Culture and contemporary music, dance and art specially designed to showcase the rich cultural heritage of the people of Enugu State, Nigeria.",
    iconSrc:
      "https://afiahomecoming.com/admin/flyers/Golibe%20Festival%20(6).jpg",
  },
  {
    id: 5,
    title: "25 Days of Christmas Festival in Enugu AfroBeat Lockdown",
    description:
      "Afrobeat Concert also known as ROADBLOCK, is a vibrant celebration of Nigeria's music industry, featuring top artists and a diverse lineup of performers.",
    iconSrc: "https://afiahomecoming.com/admin/flyers/ABL.jpg",
  },
];

const Events = () => {
  return (
    <section className="flex flex-col items-center justify-center py-32 px-6 md:px-10 lg:px-20 w-full">
      <div className="flex flex-col items-center w-full">
        {/* Section header */}
        <header className="flex flex-col items-center justify-center gap-[18px] max-w-[650px] w-full mb-18">
          <h1 className="text-4xl sm:text-5xl text-pretty font-garamond font-normal text-primary text-center">
            Join Us: Upcoming Events
          </h1>
        </header>

        {/* Service cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {serviceCards.map((service) => (
            <Card
              key={service.id}
              className="bg-[#ffffff0b] rounded-[28px] overflow-hidden shadow-none border-none"
            >
              <CardContent className="flex flex-col justify-between h-full gap-7 p-6">
                <div className="w-full h-[250px] mb-3">
                  <img
                    className="w-full h-[250px] rounded-[12px] object-cover"
                    alt={`${service.title} icon`}
                    src={service.iconSrc}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="[font-family:'Inter',Helvetica] font-medium text-white text-[24px] tracking-[-0.98px] leading-[42px] line-clamp-1">
                    {service.title}
                  </h3>
                  <p className="text-imaginative-timing-328979framerappboulder text-[14px] line-clamp-2">
                    {service.description}
                  </p>
                </div>

                <div className="flex items-center justify-start w-auto">
                  <Button
                    className={cn(
                      "h-11 w-auto bg-imaginative-timing-328979framerappmine-shaft text-white text-sm rounded-[1000px] px-10 py-2"
                    )}
                  >
                    View event
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-11 w-auto text-sm rounded-[1000px] px-10 py-2 mt-12"
          )}
        >
          View all events
        </Button>
      </div>
    </section>
  );
};

export default Events;
