import React, { useEffect,  useState } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

import axios from "axios";
import domain from './../utils/config';
import Loding from "./utils/Loding";
import Message from "./utils/Message";

const SliderCayegory = () => {
  const [Category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCategory() {
      try {
        const { data } = await axios.get(
          `${domain}/api/products/categoryProducts`
        );
        setCategory(data);
        setLoading(false);
        console.log(data);
      } catch (err) {
        setLoading(false);
        setError(err.message);
      }
    }
    fetchCategory();
  }, []);

  return loading ? (
    <Loding></Loding>
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <section className="swiperSection">
      <h4>What do you need today</h4>

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
        className="mySwiper"
      >
        {Category.map((elmeent, index) => {
          return (
            <SwiperSlide key={index} className="SwiperSlideCategory">
              <img src={elmeent.categoryImg} alt={elmeent.categoryValue} />
              <div className="SwiperSlide">{elmeent.categoryValue} </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};
export default SliderCayegory;
