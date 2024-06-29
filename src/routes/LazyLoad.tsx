import { Suspense } from "react";
import Loading from "../components/Loading/Loading";

const LazyLoad = (Component: React.LazyExoticComponent<() => JSX.Element>) => {
  return (
    <Suspense
      fallback={
        <>
          <div className="w-100vw h-80vh lg:w-100% lg:h-100%">
            <Loading />
          </div>
        </>
      }
    >
      <Component />
    </Suspense>
  );
};

export default LazyLoad;
