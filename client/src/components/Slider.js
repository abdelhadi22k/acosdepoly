import Carousel from "react-bootstrap/Carousel";

function Slider() {
  return (
    <Carousel className="carousel" data-bs-theme="light">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="figma/Slider1.png"
          alt="First slide"
        />
        <Carousel.Caption className="carouselinfo">
          <h5>First slide label</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
        <div className="Shade"></div>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="figma/Slider2.png"
          alt="First slide"
        />
        <Carousel.Caption className="carouselinfo">
          <h5>First slide label</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
        <div className="Shade"></div>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="figma/Slider3.png"
          alt="First slide"
        />
        <Carousel.Caption className="carouselinfo">
          <h5>First slide label</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
        <div className="Shade"></div>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="figma/Slider4.png"
          alt="First slide"
        />
        <Carousel.Caption className="carouselinfo">
          <h5>First slide label</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
        <div className="Shade"></div>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="figma/Slider5.png"
          alt="First slide"
        />
        <Carousel.Caption className="carouselinfo">
          <h5>First slide label</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
        <div className="Shade"></div>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="figma/Slider6.png"
          alt="First slide"
        />
        <Carousel.Caption className="carouselinfo">
          <h5>First slide label</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
        <div className="Shade"></div>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="figma/Slider7.png"
          alt="First slide"
        />
        <Carousel.Caption className="carouselinfo">
          <h5>First slide label</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
        <div className="Shade"></div>
      </Carousel.Item>
    </Carousel>
  );
}

export default Slider;
