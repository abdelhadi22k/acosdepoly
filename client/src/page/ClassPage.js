import React, { useEffect, useState } from "react";
import axios from "axios";
import domain from "./../utils/config";
import { Link } from "react-router-dom";
import Classdetails from "./Classdetails";
import Loding from "../components/utils/Loding";
import Message from "../components/utils/Message";
import { Helmet } from "react-helmet-async";

const ClassPage = () => {
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
      <Helmet>
        <title> Category</title>
      </Helmet>
      <h4>Category Available</h4>

      <div className="availableCategoryHolder">
        {Category.map((elmeent, index) => {
          return (
            <div key={index} className="availableCategory">
              <img
                src={elmeent.categoryImg}
                className="availableimg"
                alt={elmeent.categoryValue}
              />
              <div className="availableshado">
                {" "}
                <Link to={`/categories/${elmeent.categoryValue}`}>
                  {elmeent.categoryValue}{" "}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
export default ClassPage;
