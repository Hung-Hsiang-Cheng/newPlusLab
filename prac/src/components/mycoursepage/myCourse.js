import React, {
  useState,
  useEffect,
  Fragment,
  useReducer,
  useContext,
} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { CartState } from "../CartPage/CartContext";
import instance from "../../api/axiosInstance";
import MyCoursemod from "./myCoursemod";
import user from "../../utils/memoryUtils";
import { getError } from "../CartPage/utils";

const MyCourse = () => {
  const {
    state: { Courselist },
    dispatch,
  } = CartState();
  const [list, setList] = useState([]); // 全部數據
  const [page, setPage] = useState(1); //  第一次展示 第一頁數據
  useEffect(() => {
    const historyTransData = async () => {
      try {
        const result = await instance.post("/history/transDatas", {
          user: user.user._id,
        });

        //

        setList(result.data);

      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    historyTransData();
  }, []);





  const getNextPage = () => {
    setPage((preState) => preState + 1);
  };
  // const [SelectCourse, setSelectCourse] = useState([]);

  return (
    <Fragment>
      <div className="divAllCourse">
        <ul className="ulAllCourseContainer">
          {list.length !== 0 ? (
            <MyCoursemod
              data={list.slice(0, page * 12)}
              handleNextPage={getNextPage}
              curPage={page}
            />
          ) : null}
        </ul>
      </div>

      {list.slice(0, page * 12).length !== list.length ? (
        <div className="dCardMore">
          <button onClick={getNextPage}>
            查看下一頁精彩課程
            <svg
              width="24"
              height="26"
              viewBox="3 3 11 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.5964 8.69663L5.23279 12.3885C4.6925 12.7019 4 12.3228 4 11.6922L4 4.30846C4 3.67783 4.6925 3.29871 5.23279 3.61216L11.5964 7.30403C12.1345 7.6162 12.1345 8.38445 11.5964 8.69663Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
      ) : (
        <div className="dCardLast">
          {" "}
          <button>課程已達最後分頁</button>
        </div>
      )}
    </Fragment>
  );
};

export default MyCourse;
