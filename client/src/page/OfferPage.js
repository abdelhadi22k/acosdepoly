import React, { useEffect, useState } from "react";
import domain from "../utils/config";
import axios from "axios";
import Product from "../components/Product";
import Loding from "../components/utils/Loding";
import Message from "../components/utils/Message";
import { Helmet } from "react-helmet-async";

const OfferPage = () => {
  const [offer, setOffer] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCategory() {
      try {
        const offers = await axios.get(`${domain}/api/products/offer`);
        setOffer(offers.data);
        setLoading(false);
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
    <div className="Productsbycategory">
      <Helmet>
        <title> Offer</title>
      </Helmet>
      {offer.map((element, index) => {
        return (
          <div key={index}>
            <Product product={element} />
          </div>
        );
      })}
    </div>
  );
};

export default OfferPage;
