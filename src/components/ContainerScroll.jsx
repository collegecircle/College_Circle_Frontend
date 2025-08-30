"use client";
import React from "react";
import ContainerScroll from "../gobalComponents/container-scroll-animation";

function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-black dark:text-white">
              <span className="inline-block bg-[#fdc700] px-3 sm:px-4 py-2 sm:py-3 rounded">
                Unleash the power of
              </span>
              <br />
              <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-[6rem] font-bold mt-2 leading-tight">
                FEEDBACK
              </span>
            </h1>

          </>
        }
      >
        <img
          src="/assets/feeback.png"
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}

export default HeroScrollDemo;
