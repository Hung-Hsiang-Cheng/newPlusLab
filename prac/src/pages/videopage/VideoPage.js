import React, { useState, useRef, Fragment } from "react";
import ClassList from "../../components/Videopage/ClassList";
import VideoInterface from "../../components/Videopage/VideoInterface";
import InfoHead from "../../components/Videopage/InfoHead";
import InfoTabs from "../../components/Videopage/InfoTabs";
import Comment from "../../components/Videopage/Comment";
import CourseAnnouncement from "../../components/Videopage/CourseAnnouncement";
import CourseIntro from "../../components/Videopage/CourseIntro";
import Note from "../../components/Videopage/Note";
import Nav from "../../components/nav/Nav";
import Footer from "../../components/footer/Footer";
import Top from "../../components/top/Top";
import NavLogOut from "../../components/nav/NavLogOut";
import memoryUtils from "../../utils/memoryUtils";

const VideoPage = () => {
  const [currentTime, setCurrentTime] = useState('00:00');
  const [currentTab, setCurrentTab] = useState("intro");
  const videoRefProps = useRef(null);
  const username =
    memoryUtils.user.username || memoryUtils.user.displayName || "";

  window.scrollTo(0, 0);


  return (
    <Fragment>
      {username ? <Nav /> : <NavLogOut />}
      <div className="allV">
        <div className="videoContainer">
          <VideoInterface
            getCurrentTime={setCurrentTime}
            videoRefProps={videoRefProps}
          />
          <ClassList />
        </div>

        <div className="infoContainer">
          <InfoHead />
          <InfoTabs onClickTab={setCurrentTab} />
          {currentTab === "intro" && <CourseIntro />}
          {currentTab === "question" && <CourseAnnouncement />}
          {currentTab === "note" && (
            <Note b={currentTime} videoRefProps={videoRefProps} />
          )}
          {currentTab === "comment" && <Comment />}
        </div>
      </div>
      <Top />
      <Footer />
    </Fragment>
  );
}
export default VideoPage;