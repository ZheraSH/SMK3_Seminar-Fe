import { useEffect } from "react";
import LoadingScreen from "./LandingPageElement/LoadingScreen";
import useLoading from "../../hooks/useLoading";

const PageWrapper = ({ children }) => {
  const { isLoading, connectionSpeed, stopLoading } = useLoading(true);

  useEffect(() => {
    const handlePageChange = () => {

      if (window.performance.navigation.type === 1) {

        window.location.reload();
      }
    };

    window.addEventListener("beforeunload", handlePageChange);
    return () => window.removeEventListener("beforeunload", handlePageChange);
  }, []);

  const handleLoadingComplete = () => {
    stopLoading();
  };

  return (
    <>
      <LoadingScreen
        isLoading={isLoading}
        onLoadingComplete={handleLoadingComplete}
        connectionSpeed={connectionSpeed}
      />

      {!isLoading && children}
    </>
  );
};

export default PageWrapper;
