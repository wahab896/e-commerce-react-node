import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const items = [
  {
    id: 1,
    image: "https://picsum.photos/200/300",
    title: "Item 1",
    cls: "translate-x-0",
    description: "This is the first item in the carousel.",
  },
  {
    id: 2,
    image: "https://picsum.photos/200/301",
    title: "Item 2",
    cls: "translate-x-full",
    description: "This is the second item in the carousel.",
  },
  {
    id: 3,
    image: "https://picsum.photos/200/302",
    title: "Item 3",
    cls: "translate-x-full",
    description: "This is the third item in the carousel.",
  },

  {
    id: 3,
    image: "https://picsum.photos/200/303",
    title: "Item 3",
    cls: "translate-x-full",
    description: "This is the third item in the carousel.",
  },

  {
    id: 3,
    image: "https://picsum.photos/200/304",
    title: "Item 3",
    cls: "translate-x-full",
    description: "This is the third item in the carousel.",
  },
];

const Carousal = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  // const [transitionCls, setTransitionCls] = useState("");
  const [data, setData] = useState([...items]);

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
    <div className="w-[60%] m-auto pt-11">
      <div className="relative">
        <button
          hidden={activeIndex == 0}
          onClick={handlePrevClick}
          className="absolute bottom-1/2 left-2 z-10"
        >
          <FaChevronLeft className="text-gray-700 w-5 h-10" />
        </button>
        <button
          hidden={activeIndex == data.length - 1}
          onClick={handleNextClick}
          className="absolute bottom-1/2 right-2 z-10"
        >
          <FaChevronRight className="text-gray-700 w-5 h-10" />
        </button>
        <div className={`relative overflow-hidden h-[300px] w-full`}>
          {/* <div className="h-[300px] w-full transition-all linear duration-1000 -translate-x-full">
            <img className="w-full h-[100%]" src={data[0].image} />
          </div> */}
          {data.map((s, i) => {
            return (
              <div
                key={s.id}
                className={
                  "absolute h-[300px] w-full transition-all linear duration-1000 " +
                  s.cls +
                  " bg-red-900"
                }
              >
                <img className="w-full h-[100%]" src={s.image} />
              </div>
            );
          })}
        </div>
        <div>
          <h1>Show the hovering buttons of carousal</h1>
        </div>
      </div>
    </div>
  );
};
export default Carousal;
