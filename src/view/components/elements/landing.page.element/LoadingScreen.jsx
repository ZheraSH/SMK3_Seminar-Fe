import { useState, useEffect } from "react";

const LoadingScreen = ({
  isLoading,
  onLoadingComplete,
  connectionSpeed = "normal",
}) => {
  const [progress, setProgress] = useState(0);
  const [currentLetter, setCurrentLetter] = useState(0);

  const seminarText = "SEMINAR";
  const letters = seminarText.split("");

  useEffect(() => {
    if (!isLoading) return;

    // Progress animation berdasarkan koneksi
    const getProgressSpeed = () => {
      switch (connectionSpeed) {
        case "slow":
          return 0.5; 
        case "fast":
          return 3; 
        default:
          return 1.5; 
      }
    };

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            onLoadingComplete();
          }, 300);
          return 100;
        }
        return prev + getProgressSpeed();
      });
    }, 50);

    // Letter animation
    const letterInterval = setInterval(() => {
      setCurrentLetter((prev) => (prev + 1) % letters.length);
    }, 400);

    return () => {
      clearInterval(progressInterval);
      clearInterval(letterInterval);
    };
  }, [isLoading, onLoadingComplete, letters.length, connectionSpeed]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      {/* Simple Background */}
      <div className="absolute inset-0 bg-gray-50/50"></div>

      {/* Main Content */}
      <div className="relative z-10 text-center">
        {/* SEMINAR Text */}
        <div className="mb-16">
          <div className="flex justify-center space-x-3 mb-6">
            {letters.map((letter, index) => (
              <span
                key={index}
                className={`text-7xl md:text-9xl font-bold transition-all duration-300 ${
                  index === currentLetter
                    ? "text-blue-600 transform scale-110"
                    : "text-gray-400 transform scale-100"
                }`}
                style={{
                  textShadow:
                    index === currentLetter
                      ? "0 0 20px rgba(37, 99, 235, 0.4)"
                      : "0 0 5px rgba(156, 163, 175, 0.2)",
                }}
              >
                {letter}
              </span>
            ))}
          </div>
        </div>

        {/* Simple Progress Bar */}
        <div className="w-64 mx-auto">
          <div className="bg-gray-200 rounded-full h-1 overflow-hidden">
            <div
              className="bg-blue-600 h-full rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
