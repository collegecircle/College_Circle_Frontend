import React, { useState, useEffect } from "react";
import icon from "/assets/icon.jpg";

const Splash = () => {
    const [phase, setPhase] = useState("initial");

    useEffect(() => {
        const timeline = [
            { delay: 100, phase: "split" },
            { delay: 700, phase: "textReveal" },
            { delay: 1800, phase: "sectionsComplete" },
            { delay: 2000, phase: "settled" },
        ];
        timeline.forEach(({ delay, phase: nextPhase }) => {
            setTimeout(() => setPhase(nextPhase), delay);
        });
    }, []);

    return (
        <div className="min-h-screen relative overflow-hidden flex items-center justify-center bg-black">
            {phase === "settled" && (
                <div
                    className="absolute inset-0 bg-cover bg-center z-0 transition-opacity duration-700"
                    style={{
                        backgroundImage: `url(${icon})`,
                        // backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjMTExMTExIi8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjIwMCIgcj0iMTUwIiBmaWxsPSJ1cmwoI2dyYWRpZW50KSIvPgo8ZGVmcz4KPHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjMTExMTExIi8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjIwMCIgcj0iNTAiIGZpbGw9IiMxOWZmNzUiLz4KPHN2Zz4=")`,
                        filter: "brightness(0.5)",
                        opacity: 1,
                    }}
                />
            )}

            {/* Left Section */}
            <div
                className={`absolute top-0 left-0 bottom-0 w-full md:w-1/2 flex items-center justify-center transition-all duration-1000 ease-in-out z-20 ${phase === "initial"
                    ? "transform -translate-x-full md:-translate-x-full"
                    : phase === "sectionsComplete" || phase === "settled"
                        ? "opacity-0 transform -translate-x-full md:-translate-x-full"
                        : "transform translate-x-0 opacity-100"
                    }`}
                style={{ background: "#000000" }}
            // style={{
            //     //   background: "linear-gradient(45deg, #1a1a1a, #1d974a, #195f64)",
            // }}
            >
                <div
                    className={`text-center transition-all duration-800 delay-200 ease-out px-4 ${phase === "textReveal"
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-6"
                        }`}
                >
                    <div className="flex flex-col items-center justify-center mb-2 md:mb-4">
                        <div className="w-12 h-12 md:w-16 md:h-16 border-2 border-cyan-400 rounded-full flex items-center justify-center mb-2 md:mb-4">
                            <div className="w-6 h-6 md:w-8 md:h-8 bg-cyan-400 rounded-full animate-pulse flex items-center justify-center">
                                <div className="w-2 h-2 md:w-3 md:h-3 bg-white rounded-full"></div>
                            </div>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 md:mb-4">
                            BRIGHT
                        </h2>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                            FUTURE
                        </h2>
                    </div>
                    <p className="text-cyan-300 text-sm md:text-lg font-light">
                        Career opportunities{" "}
                    </p>
                    <p className="text-cyan-300 text-sm md:text-lg font-light">
                        Skill development{" "}
                    </p>
                    <div className="flex justify-center mt-4 md:mt-6 space-x-1">
                        {[...Array(8)].map((_, i) => (
                            <div
                                key={i}
                                className="w-1.5 h-6 md:w-2 md:h-8 bg-cyan-400 opacity-60 animate-pulse"
                                style={{ animationDelay: `${i * 0.1}s` }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Section */}
            <div
                className={`absolute top-0 right-0 bottom-0 w-full md:w-1/2 flex items-center justify-center transition-all duration-800 ease-in-out z-20 ${phase === "initial"
                    ? "translate-x-full md:translate-x-full"
                    : phase === "sectionsComplete" || phase === "settled"
                        ? "opacity-0 translate-x-full md:translate-x-full"
                        : "translate-x-0 opacity-100"
                    }`}
                style={{ background: "#ffffff" }}

            >
                <div
                    className={`text-center transition-all duration-600 delay-300 ease-out px-4 ${phase === "textReveal" || phase === "settled"
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-6"
                        }`}
                >
                    <div className="flex flex-col items-center justify-center mb-2 md:mb-4">
                        <div className="w-12 h-12 md:w-16 md:h-16 border-2 border-orange-400 rounded-full flex items-center justify-center mb-2 md:mb-4">
                            <div className="w-3 h-3 md:w-4 md:h-4 bg-orange-400 rounded-sm animate-ping transform rotate-45"></div>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-2 md:mb-4">
                            CONNECT
                        </h2>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black">
                            STUDENTS
                        </h2>
                    </div>
                    <p className="text-orange-300 text-sm md:text-lg font-light">
                        Global university network
                    </p>
                    <p className="text-orange-300 text-sm md:text-lg font-light">
                        Peer-to-peer learning
                    </p>
                    <div className="mt-4 md:mt-6">
                        <div className="w-32 md:w-40 h-2 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full mx-auto animate-pulse"></div>
                    </div>
                </div>
            </div>

            {/* Divider Line */}
            {/* <div
                className={`absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-transparent via-white to-transparent transition-all duration-800 ease-in-out z-30 hidden md:block ${phase === "split" || phase === "textReveal"
                    ? "opacity-60 scale-y-100"
                    : "opacity-0 scale-y-0"
                    }`}
            ></div> */}

            {/* Logo Section */}
            <div
                className={`absolute inset-0 flex items-center justify-center z-40 transition-all duration-800 ease-out px-4 ${phase === "settled" ? "opacity-100" : "opacity-0"
                    }`}
            >
                <div className="text-center">
                    <h1
                        className={`text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black transition-all duration-800 ease-out ${phase === "settled" ? "blur-none scale-100" : "blur-xl scale-90"
                            }`}
                        style={{
                            textShadow:
                                phase === "settled"
                                    ? "0 0 20px rgba(41, 185, 84, 0.3), 0 0 40px rgba(52, 143, 79, 0.1)"
                                    : "0 0 60px #bace27",
                            color: phase === "settled" ? "#ffffff" : "transparent",
                            filter:
                                phase === "settled"
                                    ? "drop-shadow(0 0 10px rgba(255,255,255,0.1))"
                                    : "none",
                        }}
                    >
                        COLLEGECIRCLE
                    </h1>
                    <div
                        className={`mt-4 md:mt-6 transition-all duration-1000 delay-300 ease-out ${phase === "settled"
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-6"
                            }`}
                    >
                        <p className="text-gray-300 text-sm sm:text-base md:text-xl font-light tracking-wider sm:tracking-widest px-4">
                            WHERE EDUCATION MEETS COMMUNITY
                        </p>
                        <div className="w-16 md:w-24 h-0.5 bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto mt-2 md:mt-4 opacity-50"></div>
                    </div>
                </div>
            </div>

            {/* Floating Particles */}
            {phase === "settled" && (
                <div className="absolute inset-0 z-30 pointer-events-none">
                    {[...Array(15)].map((_, i) => (
                        <div
                            key={i}
                            className={`absolute opacity-30 ${i % 4 === 0
                                ? "w-2 h-2 bg-cyan-400 rounded-full"
                                : i % 4 === 1
                                    ? "w-1.5 h-1.5 bg-white rounded-full"
                                    : i % 4 === 2
                                        ? "w-2 h-2 bg-orange-400 rounded-sm transform rotate-45"
                                        : "w-1 h-1 bg-yellow-400 rounded-full"
                                }`}
                            style={{
                                left: `${15 + Math.random() * 70}%`,
                                top: `${15 + Math.random() * 70}%`,
                                animation: `float ${3 + Math.random() * 2
                                    }s ease-in-out infinite`,
                                animationDelay: `${Math.random() * 2}s`,
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Custom CSS for floating animation */}
            <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 0.8;
          }
        }
      `}</style>
        </div>
    );
};

export default Splash;