import { StarIcon } from "lucide-react";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

// Testimonial data for mapping
const testimonials = [
  {
    id: 1,
    text: "The quality is outstanding! They always exceed our expectations, delivering more than we imagined",
    author: "John Smith",
    metric: "100x Views",
    avatar: "/2nwtcuhloumu8he9nnz0xnpvmn4-jpg.png",
    highlighted: false,
  },
  {
    id: 2,
    text: "They nailed everything we needed and went above and beyond to bring our vision to life",
    author: "Maxxz",
    metric: "100M+ Revenue",
    avatar: "/22zoocygiwaviuemgxpu352dmm-jpg.png",
    highlighted: true,
  },
  {
    id: 3,
    text: "Amazing service! They consistently deliver top-notch results and meet every requirement perfectly",
    author: "Martin Guptil",
    metric: "1M+ Subsribers",
    avatar: "/mmpqlndspjohedh9w5b2mtgvuw-jpg.png",
    highlighted: false,
  },
];

export const DivByAnima = () => {
  return (
    <section className="w-full py-[72px] flex justify-center">
      <div className="flex flex-col max-w-[1200px] items-center gap-[100px] px-[25px]">
        {/* Testimonial Header */}
        <div className="flex flex-col max-w-[550px] items-center justify-center gap-[18px]">
          <div className="flex items-center gap-2.5">
            <div className="w-[9px] h-[9px] bg-imaginative-timing-328979framerappoutrageous-orange rounded-[1000px]" />
            <p className="font-medium text-imaginative-timing-328979framerappblack text-[17.6px] tracking-[-0.72px] leading-[27px]">
              Testimonial
            </p>
          </div>

          <div className="text-center">
            <h2 className="font-medium text-imaginative-timing-328979framerappmine-shaft text-[47.3px] tracking-[-1.50px] leading-[64px]">
              What our premium clients
              <br />
              <span className="font-imaginative-timing-328979-framer-app-semantic-heading-2 text-[length:var(--imaginative-timing-328979-framer-app-semantic-heading-2-font-size)] tracking-[var(--imaginative-timing-328979-framer-app-semantic-heading-2-letter-spacing)] leading-[var(--imaginative-timing-328979-framer-app-semantic-heading-2-line-height)]">
                are saying about us
              </span>
            </h2>
          </div>
        </div>

        {/* Testimonial Cards */}
        <div className="flex flex-wrap justify-center gap-[22px] w-full max-w-[1150px]">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className={`flex flex-col justify-between p-6 rounded-3xl overflow-hidden w-full md:w-[368px] ${
                testimonial.highlighted
                  ? "bg-imaginative-timing-328979framerappoutrageous-orange"
                  : "bg-white"
              }`}
            >
              <CardContent className="p-0 flex flex-col gap-[26px]">
                {/* Star Rating */}
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`w-5 h-5 ${
                        testimonial.highlighted
                          ? "text-white"
                          : "text-yellow-400"
                      }`}
                      fill="currentColor"
                    />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p
                  className={`font-medium text-[20.3px] tracking-[-0.66px] leading-[30.8px] ${
                    testimonial.highlighted
                      ? "text-white"
                      : "text-imaginative-timing-328979framerappblack"
                  }`}
                >
                  {testimonial.text}
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-3.5 mt-auto">
                  <Avatar className="w-[54px] h-[54px]">
                    <AvatarImage
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      className="rounded-[1000px]"
                    />
                    <AvatarFallback>
                      {testimonial.author.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col">
                    <p
                      className={`font-medium text-[20.3px] tracking-[-0.66px] leading-[30.8px] ${
                        testimonial.highlighted
                          ? "text-white"
                          : "text-imaginative-timing-328979framerappblack"
                      }`}
                    >
                      {testimonial.author}
                    </p>

                    <Badge
                      className={`mt-1 font-imaginative-timing-328979-framer-app-semantic-button text-[length:var(--imaginative-timing-328979-framer-app-semantic-button-font-size)] tracking-[var(--imaginative-timing-328979-framer-app-semantic-button-letter-spacing)] leading-[var(--imaginative-timing-328979-framer-app-semantic-button-line-height)] px-0 ${
                        testimonial.highlighted
                          ? "text-white bg-transparent"
                          : "text-imaginative-timing-328979framerappblack bg-transparent"
                      }`}
                      variant="outline"
                    >
                      <img
                        src="/svg.svg"
                        alt=""
                        className="w-4 h-4 mr-1 rotate-0"
                      />
                      {testimonial.metric}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
