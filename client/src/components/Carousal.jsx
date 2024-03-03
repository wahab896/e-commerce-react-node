import { useEffect, useRef, useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaWindowMinimize,
} from "react-icons/fa";

const Carousal = ({ items = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  // const [transitionCls, setTransitionCls] = useState("");
  const [data, setData] = useState([...items]);
  const touchRef = useRef(null);

  const handleNextClick = () => {
    // setTransitionCls("translate-x-full");
    setActiveIndex((prevIndex) =>
      prevIndex + 1 >= items?.length ? 0 : prevIndex + 1
    );
  };

  const handlePrevClick = () => {
    // setTransitionCls("-translate-x-full");
    setActiveIndex((prevIndex) =>
      prevIndex - 1 < 0 ? items?.length - 1 : prevIndex - 1
    );
  };

  const handleTouchStart = (e) => {
    if (!e.touches?.[0]?.clientX) {
      touchRef.current = null;
    } else {
      touchRef.current = e.touches[0].clientX;
    }
  };

  const handleTouchMove = (e) => {
    if (touchRef.current) {
      const touchStart = touchRef.current;
      const touchEnd = e.touches[0].clientX;
      const delta = touchEnd - touchStart;

      if (delta > 0) {
        handleNextClick();
      } else {
        handlePrevClick();
      }
      touchRef.current = null;
    }
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      // handleNextClick();
    }, 1500);
    return () => {
      clearTimeout(timeOut);
    };
  }, [handleNextClick]);

  useEffect(() => {
    let transitionCls = "translate-x-full";
    const newItems = data.map((i, j) => {
      if (activeIndex == j) {
        transitionCls = "-translate-x-full";
      }
      // i.active = activeIndex == j ? true : false;
      i.cls = activeIndex == j ? "z-15" : `${transitionCls} z-5`;
      return i;
    });
    setData(newItems);
  }, [activeIndex]);

  return (
    <div className="relative w-full h-[410px] m-auto mt-11 hover:cursor-pointer">
      <button
        hidden={activeIndex == 0}
        onClick={handlePrevClick}
        className="absolute top-1/2 left-2 z-10"
      >
        <FaChevronLeft className="text-gray-200 w-5 h-10" />
      </button>
      <button
        hidden={activeIndex == data.length - 1}
        onClick={handleNextClick}
        className="absolute top-1/2 right-2 z-10"
      >
        <FaChevronRight className="text-gray-200 w-5 h-10" />
      </button>
      <div
        className={`relative overflow-hidden h-[inherit] w-full`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        {data.map((s, i) => {
          return (
            <div
              key={s.id}
              className={
                "absolute h-[inherit] w-full transition-all linear duration-1000 flex " +
                s.cls
              }
            >
              <img className="w-full h-full" src={s.image} />
              <div className="bg-gray-600 w-1/2 h-full text-white font-semibold hidden flex-col text-center justify-center md:flex">
                <span className="text-2xl">{data[activeIndex].title}</span>
                <span className="text-xl">(${data[activeIndex].price})</span>
              </div>
            </div>
          );
        })}
        <div className="absolute bottom-0 w-full h-30 bg-gray-700/60 flex-col justify-center items-center text-white text-center ">
          <span className="text-xl md:hidden">
            {data[activeIndex].title} (${data[activeIndex].price})
          </span>
          <CarousalInfoNavigator
            data={data}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        </div>
      </div>
    </div>
  );
};
export default Carousal;

const CarousalInfoNavigator = ({ data, activeIndex, setActiveIndex }) => {
  return (
    <div className=" w-full flex justify-center items-center">
      {data.map((s, i) => {
        return (
          <FaWindowMinimize
            onClick={() => {
              setActiveIndex(i);
            }}
            key={s.id}
            className={
              (activeIndex == i
                ? "text-white"
                : "text-white/40 hover:text-white/60") +
              " w-6 h-5 px-1 mb-3 hover:cursor-pointer"
            }
          />
        );
      })}
    </div>
  );
};
