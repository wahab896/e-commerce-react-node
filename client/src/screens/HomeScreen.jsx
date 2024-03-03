import Carousal from "../components/Carousal";
import Product from "../components/Product";
const items = [
  {
    id: 1,
    image: "https://picsum.photos/200/300",
    title: "Item 1",
    price: "10",
    cls: "translate-x-0",
    description: "This is the first item in the carousel.",
  },
  {
    id: 2,
    image: "https://picsum.photos/200/301",
    title: "Item 2",
    price: "30",
    cls: "translate-x-full",
    description: "This is the second item in the carousel.",
  },
  {
    id: 3,
    image: "https://picsum.photos/200/302",
    title: "Item 3",
    price: "120",
    cls: "translate-x-full",
    description: "This is the third item in the carousel.",
  },

  {
    id: 33,
    image: "https://picsum.photos/200/303",
    title: "Item 3",
    price: "10",
    cls: "translate-x-full",
    description: "This is the third item in the carousel.",
  },

  {
    id: 32,
    image: "https://picsum.photos/200/304",
    title: "Item 3",
    price: "1289",
    cls: "translate-x-full",
    description: "This is the third item in the carousel.",
  },
];

const HomeScreen = () => {
  return (
    <div className="container mx-auto px-5 md:px-20">
      <Carousal items={items} />

      <h1 className="text-3xl font-semibold text-gray-500 py-8">Latest Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {items.map((itm, i) => {
          return (
            <div className="" key={itm.id}>
              <Product product={itm} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default HomeScreen;
