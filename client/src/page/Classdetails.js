import React, { useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import domain from "../utils/config";
import axios from "axios";
import Product from "../components/Product";
import Loding from './../components/utils/Loding';
import Message from './../components/utils/Message';
import { Helmet } from "react-helmet-async";

const Classdetails = () => {
  const params = useParams();
  const [category, setCategory] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { categoryProducts } = params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          `${domain}/api/products/Productsbycategory/${categoryProducts}`
        );
        setCategory(result.data);
        setLoading(false);
        console.log(result);
      } catch (err) {
        setLoading(false);
        setError(err);
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return loading ? (
    <Loding></Loding>
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div className="Productsbycategory">
    <Helmet>
    <title>{categoryProducts} </title>
  </Helmet>
      {category.map((element, index) => {
        return (
          <div key={index}>
          <Product product={element} />
          </div>
        );
      })}
    </div>
  );
};

export default Classdetails;
