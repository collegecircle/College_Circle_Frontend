import React, { useState, useRef, useEffect } from "react";

const Carousel = ({ items = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const carouselRef = useRef(null);

  const carouselItems =
    items.length > 0
      ? items
      : [
          {
            id: 1,
            title: " Reel 1",
            subtitle: " Reel 1",
            thumbnail: "/assets/reel1.jpg",
            link: "https://www.instagram.com/reel/DHc9XbpOhHy",
          },
          {
            id: 2,
            title: " Reel 1",
            subtitle: " Reel 1y",
            thumbnail: "/assets/reel2.jpg",
            link: "https://www.instagram.com/reel/DMiKMXgToZQ",
          },
          {
            id: 3,
            title: " Reel 1",
            subtitle: " Reel 1",
            thumbnail: "/assets/reel4.jpg",
            link: "https://www.instagram.com/reel/DNN1MA6T9gs",
          },
          {
            id: 4,
            title: " Reel 1",
            subtitle: " Reel 1",
            thumbnail: "/assets/reel6.jpg",
            link: "https://www.instagram.com/reel/DMu3HPnTfAp",
          },

          {
            id: 5,
            title: " Reel 1",
            subtitle: " Reel 1y",
            thumbnail: "/assets/reel5.jpg",
            link: "https://www.instagram.com/reel/DMK0D6xTJrE",
          },
          {
            id: 6,
            title: " Reel 1",
            subtitle: " Reel 1",
            thumbnail: "/assets/reel3.jpg",
            link: "https://www.instagram.com/reel/DM2qmycTjrG",
          },
        ];

  useEffect(() => {
    const updateItemsPerView = () => {
      const width = window.innerWidth;
      if (width <= 650) setItemsPerView(1);
      else if (width <= 870) setItemsPerView(2);
      else if (width <= 1120) setItemsPerView(3);
      else setItemsPerView(4);
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const totalPages = Math.ceil(carouselItems.length / itemsPerView);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  const handleDotClick = (index) => {
    setActiveIndex(index);
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches ? e.touches[0].clientX : e.clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const currentX = e.touches ? e.touches[0].clientX : e.clientX;
    setDragOffset(currentX - startX);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (Math.abs(dragOffset) > 50) {
      if (dragOffset > 0) handlePrev();
      else handleNext();
    }
    setDragOffset(0);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") handlePrev();
      else if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="w-full mx-auto">
      <div
        ref={carouselRef}
        className="relative overflow-hidden rounded-2xl shadow-2xl backdrop-blur-sm mb-4"
      >
        <div
          className="flex py-2 transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(${
              -(activeIndex * 100) / totalPages
            }%) translateX(${dragOffset}px)`,
            width: `${totalPages * 100}%`,
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleTouchStart}
          onMouseMove={handleTouchMove}
          onMouseUp={handleTouchEnd}
          onMouseLeave={handleTouchEnd}
        >
          {Array.from({ length: totalPages }).map((_, pageIndex) => (
            <div
              key={pageIndex}
              className="flex-shrink-0 w-full h-[450px] flex gap-6"
              style={{ width: `${100 / totalPages}%` }}
            >
              {carouselItems
                .slice(pageIndex * itemsPerView, (pageIndex + 1) * itemsPerView)
                .map((item) => (
                  <div
                    key={item.id}
                    className="group h-full flex justify-center items-center text-white rounded-xl relative overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                    style={{
                      width: `${100 / itemsPerView}%`,
                      backgroundImage: `url(${
                        item.thumbnail ||
                        "https://via.placeholder.com/400x600?text=Image+Not+Found"
                      })`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      backgroundColor: "#1a202c",
                      transition: "background-image 0.3s ease-in-out",
                    }}
                    role="group"
                    aria-label={`Carousel item: ${item.title}`}
                  >
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-300 rounded-xl" />

                    {/* Centered Instagram button */}
                    <div
                      className="relative z-10 flex justify-center items-center"
                      onClick={() => window.open(item.link, "_blank")}
                      role="button"
                      aria-label={`Open Instagram reel: ${item.title}`}
                    >
                      <div className="rounded-full p-3 transition-all duration-300 hover:scale-110 bg-gradient-to-tr from-[#f58529] via-[#dd2a7b] to-[#515bd4]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#ffffff"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-instagram"
                        >
                          <rect
                            width="20"
                            height="20"
                            x="2"
                            y="2"
                            rx="5"
                            ry="5"
                          />
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>

        {/* Prev Button */}
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full p-3 z-10 border border-white/20"
          onClick={handlePrev}
          aria-label="Previous slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ffffff"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-arrow-left-icon lucide-arrow-left"
          >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
        </button>

        {/* Next Button */}
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full p-3 z-10 border border-white/20"
          onClick={handleNext}
          aria-label="Next slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ffffff"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-arrow-right-icon lucide-arrow-right"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center my-4 space-x-3">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? "bg-[#fbbf24] w-8 shadow-lg"
                : "bg-white h-2 w-2"
            }`}
            aria-label={`Go to page ${index + 1}`}
          />
        ))}
      </div>

      {/* Counter */}
      <div className="flex justify-center items-center my-4">
        <div className="text-sm font-medium bg-gradient-to-r from-gray-600 to-gray-500 bg-clip-text text-transparent px-6 py-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
          {activeIndex + 1} / {totalPages}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
