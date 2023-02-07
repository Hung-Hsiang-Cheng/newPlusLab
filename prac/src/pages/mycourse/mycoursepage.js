import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Couponbar from "../../components/CoursePage/Couponbar";
import ForYouCourse from "../../components/CoursePage/ForYouCourse";
import PopCourse from "../../components/CoursePage/PopCourse";
import RecentClass from "../../components/CoursePage/RecentClass";
import SelectCourse from "../../components/CoursePage/SelectCourse";
import Top from "../../components/top/Top";
import Nav from "../../components/nav/Nav";
import NavLogOut from "../../components/nav/NavLogOut";
import Footer from "../../components/footer/Footer";
import memoryUtils from "../../utils/memoryUtils";
import MyCourse from "../../components/mycoursepage/myCourse";

const MyCoursepage = () => {
  let title = [
    {
      key: 1,
      title: "我的課程",
      clsNam: ["divText"],
      compos: MyCourse,
    },
  ];

  const username =
    memoryUtils.user.username || memoryUtils.user.displayName || "";
  window.scrollTo(0, 0);
  return (
    <Fragment>
      {/* <Helmet><title>課程列表</title> </Helmet> */}
      {username ? <Nav /> : <NavLogOut />}
      <div className="headersss"></div>
      {title.map((t) => {
        return (
          <Fragment key={t.key}>
            <div className={t.clsNam.join(" ")}>
              <span>{t.title}</span>
            </div>
            <t.compos />
          </Fragment>
        );
      })}
      <Top />
      <Footer />
    </Fragment>
  );
};
export default MyCoursepage;
