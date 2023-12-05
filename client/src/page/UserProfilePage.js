import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userSignout } from "../redux/user/UserAction";
import { Helmet } from "react-helmet-async";

const UserProfilePage = () => {
  const userInfo = useSelector((state) => state.user.userInfo);

  const signoutHandler = () => {
    userSignout({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    window.location.href = "/signin";
  };

  return (
    <section className="userProfile">
    <Helmet>
    <title>Profile</title>
  </Helmet>
      <h1>{userInfo.name} Profile</h1>

      <ul>
        <li>
          <Link to="">
            <i class="fa-solid fa-crown"></i> Favorites
          </Link>
        </li>
        <li>
          <Link to="/orderhistory">
            <i class="fa-solid fa-truck-fast"></i> My Order
          </Link>
        </li>
        <li>
          <Link to="/Editprofile">
            {" "}
            <i class="fa-solid fa-gear"></i> Edit Profile
          </Link>
        </li>
        <li onClick={signoutHandler}>
          <Link to="/signin">
            <i class="fa-solid fa-arrow-right-from-bracket"></i> signout
          </Link>
        </li>
      </ul>
    </section>
  );
};
export default UserProfilePage;
