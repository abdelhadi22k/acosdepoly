import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import Message from "./../components/utils/Message";
import axios from "axios";
import domain from "../utils/config";

function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartData = useSelector((state) => state.cart.cart.cartItems);
  const userInfo = useSelector((state) => state.user.userInfo);

  const removeItemHandler = (item) => {
    dispatch({
      type: "CART_REMOVE_ITEM",
      payload: item,
    });
  };

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`${domain}/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };

  const checkoutHandler = () => {
    if (!userInfo) {
      navigate("/signin?redirect=/shipping");
    } else {
      navigate("/shipping");
    }
  }; 

  // const discount = (cartData.price * cartData.discount.discountValue) / 100;
 
  // const discountprice = cartData.price - discount;

  return (
    <Container className="cartSction">
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <div>
        <h1>Shopping Cart</h1>
        <Row>
          <Col md={8}>
            {cartData.length === 0 ? (
              <Message>
                Cart is empty. <Link to="/products">Go Shopping</Link>
              </Message>
            ) : (
              <ListGroup>
                {cartData.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row className="align-items-center">
                      <Col md={4}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded img-thumbnail"
                        ></img>{" "}
                        <Link to={`/products/${item.slug}`}>{item.name}</Link>
                      </Col>
                      <Col md={3}>
                        <Button
                          variant="light"
                          disabled={item.quantity === 1}
                          onClick={() =>
                            updateCartHandler(item, item.quantity - 1)
                          }
                        >
                          <i className="fas fa-minus-circle"></i>
                        </Button>{" "}
                        <span>{item.quantity}</span>{" "}
                        <Button
                          variant="light"
                          disabled={item.quantity === item.countInStock}
                          onClick={() =>
                            updateCartHandler(item, item.quantity + 1)
                          }
                        >
                          <i className="fas fa-plus-circle"></i>
                        </Button>
                      </Col>
                      <Col md={3}>${ item.discount.discountAvailable === true ? (
                        (item.price -  ((item.price * item.discount.discountValue) / 100) )
                      ) : (
                        item.price
                      )
                      }</Col>
                      <Col md={2}>
                        <Button
                          onClick={() => removeItemHandler(item)}
                          variant="light"
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>
                      Subtotal ({cartData.reduce((a, c) => a + c.quantity, 0)}{" "}
                      items) : $
                       { cartData.reduce( (a, c) =>  a + (c.price -  ((c.price * c.discount.discountValue) / 100) ) * c.quantity   , 0) }
                    </h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div className="d-grid">
                      <Button
                        type="button"
                        variant="primary"
                        onClick={checkoutHandler}
                        disabled={cartData.length === 0}
                      >
                        Proceed to Checkout
                      </Button>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default CartPage;
