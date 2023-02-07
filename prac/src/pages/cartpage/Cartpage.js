import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import Top from "../../components/top/Top";
import OrderMod from "../../components/CartPage/OrderMod";
import MarkMod from "../../components/CartPage/MarkMod";
import cart from "../../components/CartPage/img/cart.svg";
import collectCourse from "../../components/CartPage/img/collectCourse.svg";
import Nav from "../../components/nav/Nav";
import NavLogOut from "../../components/nav/NavLogOut";
import Footer from "../../components/footer/Footer";
import memoryUtils from "../../utils/memoryUtils";


const Cartpage = (props) => {
  let title = [
    {
      key: 1,
      title: "購物車",
      iconPath: cart,
      compos: OrderMod,
    },
    {
      key: 2,
      title: "我收藏的課程",
      iconPath: collectCourse,
      compos: MarkMod,
    },
  ];

window.scrollTo(0, 0);

  const username =
    memoryUtils.user.username || memoryUtils.user.displayName || "";
  return (
    <Fragment>
      {username ? <Nav /> : <NavLogOut />}
      <div className="headerss"></div>
      {title.map((t) => {
        return (
          <div className="dCartContainer" key={t.key}>
            <div className="dcartPageTitle">
              <span className="dCartTitle">
                {t.title}
                <img src={t.iconPath} />
              </span>
            </div>
            <div className="cartcompos">
              <t.compos />
            </div>
          </div>
        );
      })}
      <Top />
      <Footer />
    </Fragment>
  );
};
export default Cartpage;
