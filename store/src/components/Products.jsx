import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import { CartContext } from "./CartContext";
import { AiFillHeart } from "react-icons/ai";

// import { ToastContainer, toast } from "react-toastify";

const Products = () => {
  const [data, setData] = useState([]);

  const { handleFav } = useContext(AppContext);
  const { addToCart } = useContext(CartContext);

  const [selectedCardId, setSelectedCardId] = useState([]);
  // const savedToFav = () => {
  //   toast.success("Saved to Favorites");
  // };

  useEffect(() => {
    fakeStore();
  }, []);

  const fakeStore = async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    const convertJson = await response.json();
    setData(convertJson);
  };

  function handleChangeColor(id) {
    const foundItem = selectedCardId.findIndex((each) => each === id);
    if (foundItem !== -1) {
      const updatedFavId = [...selectedCardId];
      updatedFavId.splice(foundItem, 1);
      setSelectedCardId(updatedFavId);

    } else {
      setSelectedCardId([...selectedCardId, id]);
      // savedToFav();
    }
  }

  return (
    <>
      <div className="flex flex-wrap gap-x-4 gap-y-10 m-10 max-w-[1500px] mx-auto ">
        {data.length > 0 &&
          data.map((elements) => (
            <div className="  bg-white rounded-lg drop-shadow-2xl max-w-[300px] h-[380px] mx-auto ">
              <div className="p-5 flex flex-col justify-center items-center h-[400px] ">
                <div className="image w-[100px] h-[120px] overflow-hidden ">
                  <img
                    src={elements.image}
                    alt=""
                    className="rounded-full hover:scale-110 h-[100px]"
                  />
                </div>
                <div className="body mt-2">
                  <p className="title text-xl font-bold overflow-hidden  h-[30px]">
                    {elements.title}
                  </p>

                  <p className="price">{elements.price}$</p>
                  <p class="description text-justify mt-2 h-[50px] ">
                    {elements.description.substring(0, 60)}
                  </p>
                  <div className="flex gap-x-28">
                    <button
                      className=" mt-4 font-bold p-3 flex items-center gap-1"
                      onClick={() => {
                        handleFav(elements);
                        // savedToFav();
                        handleChangeColor(elements.id);
                      }}
                    >
                      <icon className="text-gray-500 hover:text-red-600 text-xl font-bold ">
                        <AiFillHeart
                          className={`${
                            selectedCardId.find((each) => each === elements.id)
                              ? "text-[#FF0000]"
                              : ""
                          }`}
                        />
                      </icon>
                    </button>

                    <button
                      className="border rounded mt-3 font-bold w-[100px] p-1 flex items-center "
                      onClick={() => {
                        addToCart(elements);
                      }}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        {/* <ToastContainer className="mt-16" /> */}
      </div>
    </>
  );
};

export default Products;
