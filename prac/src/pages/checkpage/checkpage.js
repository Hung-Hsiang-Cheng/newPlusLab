import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import Top from "../../components/top/Top";
import CheckMod from "../../components/CartPage/CheckMod";
import cart from "../../components/CartPage/img/cart.svg";
import Nav from "../../components/nav/Nav";
import NavLogOut from "../../components/nav/NavLogOut";
import Footer from "../../components/footer/Footer";
import memoryUtils from "../../utils/memoryUtils";


const Checkpage = (props) => {
  let title = [
    {
      key: 1,
      title: "訂單確認",
      iconPath: cart,
      compos: CheckMod,
    },
  ];

window.scrollTo(0,0);


  const username =
    memoryUtils.user.username || memoryUtils.user.displayName || "";
  return (
    <Fragment>
      {username ? <Nav /> : <NavLogOut />}
      <div className="headerss"></div>
      {title.map((t) => {
        return (
          <div className="dCheckContainer" key={t.key}>
            <div className="dCheckPageTitle">
              <span className="dCheckTitle">
                {t.title}
                <img src={t.iconPath} />
              </span>
            </div>
            <div className="checkcompos">
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
export default Checkpage;
