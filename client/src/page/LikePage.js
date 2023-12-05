import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import Message from "./../components/utils/Message";

function LikePage() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const likeData = useSelector((state) => state.like.like.likeItems);

  const userInfo = useSelector((state) => state.user.userInfo);

  const removeItemHandler = (item) => {
    dispatch({
      type: "LIKE_REMOVE_ITEM",
      payload: item,
    });
  };

  return (
    <Container className="cartSction">
      <Helmet>
        <title>{userInfo.name} Favorites</title>
      </Helmet>
      <div>
        <h1>Favorites Product</h1>
        <Row>
          <Col md={8}>
            {likeData.length === 0 ? (
              <Message>
                Favorites is empty. <Link to="/products">Go Shopping</Link>
              </Message>
            ) : (
              <ListGroup>
                {likeData.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row className="align-items-center">
                      <Col md={2}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded img-thumbnail imgFavorites"
                        ></img>{" "}
                        <Link
                          className="linkFavorites"
                          to={`/products/${item.slug}`}
                        >
                          {item.name}
                        </Link>
                      </Col>
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
        </Row>
      </div>
    </Container>
  );
}

export default LikePage;
