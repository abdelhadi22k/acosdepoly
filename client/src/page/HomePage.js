

import Container from "react-bootstrap/Container";
import SliderCayegory from "../components/SliderCayegory";
import Slider from "../components/Slider";
import ProductSection from './../components/product/ProductSection';
import { Helmet } from 'react-helmet-async';



const HomePage = () => {
    return(
        <section className="homePage" id="homePage">
        <Helmet>
        <title>Home Page </title>
      </Helmet>
        <Container>
          <Slider />
          <SliderCayegory />
          <ProductSection />
        </Container>
      </section>
    )
}
export default HomePage