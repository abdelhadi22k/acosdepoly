import axios from "axios";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import domain from "./../utils/config";
import Product from "../components/Product";
import Loding from "../components/utils/Loding";
import Message from "../components/utils/Message";
import { Helmet } from "react-helmet-async";

const Products = () => {
  const [product, setproduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchproduct() {
      try {
        const { data } = await axios.get(`${domain}/api/products/`);
        setproduct(data);
        setLoading(false);
        console.log(data);
      } catch (err) {
        setLoading(false);
        setError(err.message);
      }
    }
    fetchproduct();
  }, []);

  return loading ? (
    <Loding></Loding>
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <section>
      <Helmet>
        <title> product</title>
      </Helmet>
      <Container className="Product">
        {product.map((elment, index) => {
          return (
            <div kye={index}>
              <Product product={elment} />
            </div>
          );
        })}
      </Container>
    </section>
  );
};

export default Products;
