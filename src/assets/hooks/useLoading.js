import { useState, useEffect } from "react";

const useLoading = (initialLoading = true) => {
  const [isLoading, setIsLoading] = useState(initialLoading);
  const [connectionSpeed, setConnectionSpeed] = useState("normal");

  useEffect(() => {
    if (!isLoading) return;


    const detectConnectionSpeed = () => {
      const connection =
        navigator.connection ||
        navigator.mozConnection ||
        navigator.webkitConnection;
      if (connection) {
        const effectiveType = connection.effectiveType;
        switch (effectiveType) {
          case "slow-2g":
          case "2g":
            return "slow";
          case "3g":
            return "normal";
          case "4g":
            return "fast";
          default:
            return "normal";
        }
      }
      return "normal";
    };

    const speed = detectConnectionSpeed();
    setConnectionSpeed(speed);


    const checkResourcesLoaded = () => {
      if (document.readyState === "complete") {
        const images = document.querySelectorAll("img");
        const allImagesLoaded = Array.from(images).every((img) => img.complete);

        const fontsLoaded = document.fonts
          ? document.fonts.ready
          : Promise.resolve();

        return Promise.all([Promise.resolve(allImagesLoaded), fontsLoaded]);
      }
      return Promise.resolve([false, false]);
    };
    const getLoadingTime = () => {
      switch (speed) {
        case "slow":
          return 4000; 
        case "fast":
          return 1500; 
        default:
          return 2500; 
      }
    };

    const loadingTime = getLoadingTime();

  
    const timer = setTimeout(() => {
      checkResourcesLoaded().then(([imagesLoaded, fontsLoaded]) => {
        if ((imagesLoaded && fontsLoaded) || loadingTime >= 3000) {
          setIsLoading(false);
        } else {
          setTimeout(() => setIsLoading(false), 1000);
        }
      });
    }, loadingTime);

    return () => clearTimeout(timer);
  }, [isLoading]);

  const startLoading = () => {
    setIsLoading(true);
  };

  const stopLoading = () => {
    setIsLoading(false);
  };

  return {
    isLoading,
    connectionSpeed,
    startLoading,
    stopLoading,
  };
};

export default useLoading;
