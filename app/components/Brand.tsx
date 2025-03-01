"use client";

import * as React from "react";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import MaxWidthWrapper from "./MaxWidthWrapper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { SkewedButton } from "./ButtonCustom";
import styles from "../brand.module.css"; // Import as a module
import { Button } from "@/components/ui/button";
import Image from "next/image";
const ambassadors = [
  {
    name: "DARIO MARCHETTI",
    role: "BRAND AMBASSADOR",
    description:
      "Dario Marchetti, former pro rider and Technical Director of the Ducati DRE Racetrack Academy and DRE Road.",
    image: "/ss1.webp",
  },
  {
    name: "MARCO ROSSI",
    role: "BRAND AMBASSADOR",
    description: "Leading expert in electric motorcycle development with over 15 years of racing experience.",
    image: "/ss2.webp",
  },
  {
    name: "ELENA FERRARI",
    role: "BRAND AMBASSADOR",
    description: "Professional rider and sustainability advocate, pioneering electric racing competitions.",
    image: "/ss3.webp",
  },
  {
    name: "ELENA FERRARI",
    role: "BRAND AMBASSADOR",
    description: "Professional rider and sustainability advocate, pioneering electric racing competitions.",
    image: "/ss4.webp",
  },
];

export function BrandAmbassadors() {
  //@ts-ignore
  const swiperRef = React.useRef<SwiperType>();

  return (
    <section className={`relative brand-ambassadors ${styles.brandambassadors}`}>
      <MaxWidthWrapper noPadding className="flex flex-col">
        <div className="flex items-center justify-between">
          <h2 className="specail mb-2 w-fit border-b border-input text-base font-light tracking-[0.2em]">
            BRAND AMBASSADORS
          </h2>
        </div>
      </MaxWidthWrapper>

      <MaxWidthWrapper noPadding className="relative  flex flex-col items-end">
        <div className="relative max-w-full lg:max-w-[77rem] overflow-hidden">
          <Swiper
            modules={[Navigation, Autoplay, Pagination]}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            pagination={{
              clickable: true,
              bulletClass: "swiper-pagination-bullet",
              bulletActiveClass: "swiper-pagination-bullet-active",
            }}
            slidesPerView={1}
            spaceBetween={32}
            loop={true}
            speed={800}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            className="!overflow-visible !brand-ambassadors"
          >
            {ambassadors.map((ambassador, i) => (
              <SwiperSlide className=" pb-6" key={i}>
                <div className="grid grid-cols-1  lg:pb-0 pb-10 gap-8 md:grid-cols-2">
                  <div className="relative  h-[80vh] w-full overflow-hidden">
                    <Image
                      fill
                      src={ambassador.image || "/placeholder.svg"}
                      alt={ambassador.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-5 justify-center">
                    <h3 className="specail border-b-2 border-input w-fit special mb-2 text-sm font-light tracking-[0.2em] text-gray-600">
                      {ambassador.role}
                    </h3>
                    <h2 className="mb-4 text-2xl lg:text-5xl font-bold tracking-tight">{ambassador.name}</h2>
                    <p className="text-base text-gray-900">{ambassador.description}</p>
                    <SkewedButton className="!w-fit mt-4">Learn more</SkewedButton>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
