import React, { useEffect, useState } from "react";
import Rating from "./Rating";
import axios from "axios";
import domain from "../utils/config";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  const [quantity, setCount] = useState(1);
  const [Product, setProduct] = useState([]);

  const addCount = () => {
    if (quantity === product.countInStock) {
      return;
    } else {
      setCount(quantity + 1);
    }
  };
  const manCount = () => {
    if (quantity <= 1) {
      return;
    } else {
      setCount(quantity - 1);
    }
  };

  useEffect(() => {
    async function fetchProduct() {
      try {
        const { data } = await axios.get(`${domain}/api/products`);
        setProduct(data);

        console.log(data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchProduct();
  }, []);

  const dispatch = useDispatch();

  const addToCart = async () => {
    if (Product && Product.length > 0) {
      const existItem = Product.find((x) => x._id === product._id);
      const quantitys = existItem ? existItem.quantity + 1 : 1;
      if (quantitys) {
      }
      if (existItem) {
        const { data } = await axios.get(
          `${domain}/api/products/${existItem._id}`
        );

        dispatch({
          type: "CART_ADD_ITEM",
          payload: { ...data, quantity },
        });
        console.log(data);
      } else {
        console.log("Item not found in food array");
      }
    } else {
      console.log("Food data not loaded");
    }
  };
  const addToLike = async () => {
    if (Product && Product.length > 0) {
      const existItem = Product.find((x) => x._id === product._id);
      const quantitys = existItem ? existItem.quantity + 1 : 1;
      if (quantitys) {
      }
      if (existItem) {
        const { data } = await axios.get(
          `${domain}/api/products/${existItem._id}`
        );

        dispatch({
          type: "LIKE_ADD_ITEM",
          payload: { ...data },
        });
        console.log(data);
      } else {
        console.log("Item not found in food array");
      }
    } else {
      console.log("Food data not loaded");
    }
  };
  const discount = (product.price * product.discount.discountValue) / 100;
 
  const discountprice = product.price - discount;

  return (
    <div className="productBoxs">
      {product.offer.offerAvailable === true ? (
        <span data-offer={product.offer.offerDescription} className="offerTagBoxs ">Offer <i class="fa-brands fa-buffer"></i>____________</span>
      ) : (
        <span></span>
      )}

      <button className="imgBoxbutton" onClick={addToLike}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-suit-heart"
          viewBox="0 0 16 16"
        >
          <path d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z" />
        </svg>
      </button>
      <div className="imgBox">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="infoBox">
        <div className="countInfo">
          <Link to={`/products/${product.slug}`}>
            <h5>{product.name}</h5>
          </Link>

          <div className="countBox">
            <div className="buttonBox">
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="8"
                  height="8"
                  fill="currentColor"
                  class="bi bi-caret-up-fill"
                  viewBox="0 0 16 16"
                  onClick={addCount}
                >
                  <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                </svg>
              </button>

              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="8"
                  height="8"
                  fill="currentColor"
                  class="bi bi-caret-down-fill"
                  viewBox="0 0 16 16"
                  onClick={manCount}
                >
                  <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                </svg>
              </button>
            </div>

            <h5>{quantity}</h5>

            <button className="countCart" onClick={addToCart}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-cart3"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="description">
          <span>{product.description}</span>
        </div>

        <div className="reviews">
          <span>
            <Rating rating={product.rating} caption={product.numReviews} />
          </span>
        </div>
        <div>
          {product.discount.discountAvailable === true ? (
            <div className="discountprice">
              <span className="newprice">price {discountprice}$</span>
              <span className="oldprice"> {product.price}$</span>
            </div>
          ) : (
            <span className="newprice">price {product.price}$</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
