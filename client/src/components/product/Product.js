import domain from "../../utils/config";
import axios from "axios";
import { useEffect, useState } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
import Product from "../Product";
import Loding from "../utils/Loding";
import Message from "../utils/Message";

const Products = ({ products }) => {
  const [product, setproduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchproduct() {
      try {
        const { data } = await axios.get(
          `${domain}/api/products/Productsbycategory/${products.categoryValue}`
        );
        setproduct(data);
        setLoading(false);
        console.log(data);
      } catch (err) {
        setLoading(false);
        setError(err.message);
        console.log(err);
      }
    }
    fetchproduct();
  }, []);

  return loading ? (
    <Loding></Loding>
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          "@0.00": {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          "@0.75": {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          "@1.00": {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          "@1.50": {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className="mySwiper1"
      >
        {product.map((el, index) => {
          return (
            <SwiperSlide key={index} className="SwiperSlideProduct">
              <Product product={el} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Products;
