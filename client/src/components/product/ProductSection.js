
import domain from "./../../utils/config";
import axios from "axios";
import { useEffect, useState } from "react";
import Products from "./Product";
import Loding from './../utils/Loding';
import Message from './../utils/Message'; 

const ProductSection = () => {
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
    <section>
      <div>
        {Category.map((elment, index) => {
          return (
            <div kye={index} className='categorySection'>
              <h1>{elment.categoryValue}</h1>
              <Products products={elment} />
              </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProductSection;

