import React, {
  useState,
  useEffect,
  Fragment,
  useContext,
  useReducer,
} from "react";
import { Link } from "react-router-dom";
import instance from "../../api/axiosInstance";
import { CartState } from "./CartContext";
import Checkout from "./Checkout";
import user from "../../utils/memoryUtils";
import { getError } from "../CartPage/utils";

const OrderDetail = (props) => {
  const {
    state: { cart,order },
    dispatch,
  } = CartState();
  const [checked, isChecked] = useState(props.value.isChecked);
  const handleDelCart = (e) => {
    const DelData = async () => {
      try {
        const result = await instance.post("/cart/delCart", {
          user: user.user._id,
          id: props.value.id,
        });
        dispatch({ type: "REMOVE_FROM_CART", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    DelData();
    const delOrder = async () => {
      try {
        const result = await instance.post("/orderCourse/delete", {
          user: user.user._id,
          id: props.value.id,
        });
        dispatch({ type: "REMOVE_FROM_ORDER", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    delOrder();
    e.preventDefault();
  };

  const handleChangeChecked = (e) => {
 
    const chengeChecked = async () => {
      try {
        const result = await instance.post("/cart/updateCheck", {
          user: user.user._id,
          id: props.value.id,
          isChecked: e.target.checked,
        });
       isChecked(!e.target.checked);
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
       
    };
    chengeChecked();
    if (e.target.checked === true) {
      const updataOrder = async () => {
        try {
          const result = await instance.post("/orderCourse/update", {
            user: user.user._id,
            id: props.value.id,
            Course: props.value.Course,
            img: props.value.img,
            url: props.value.url,
            title: props.value.title,
            price: props.value.price,
            teacher: props.value.teacher,
            shoppingPrice: props.value.shoppingPrice,
            isChecked: e.target.checked,
            discount: 1,
          });
          dispatch({ type: "ADD_TO_ORDER", payload: result.data });
        } catch (err) {
          dispatch({ type: "FETCH_FAIL", payload: getError(err) });
        }
      };
      updataOrder();
    } else {
      const delOrder = async () => {
        try {
          const result = await instance.post("/orderCourse/delete", {
            user: user.user._id,
            id: props.value.id,
          });
          dispatch({ type: "REMOVE_FROM_ORDER", payload: result.data });
        } catch (err) {
          dispatch({ type: "FETCH_FAIL", payload: getError(err) });
        }
      };
      delOrder();
    }
  };

  return (
    <Fragment>
      <tr>
        <td>
          <input
            type="checkbox"
            className="orderdetial"
            checked={checked}
            onChange={handleChangeChecked}
          />
        </td>
        <td>
          <img src={props.value.img} alt="" />
        </td>
        <td className="dCartitem">
          <Link to={`/video/${props.value.title}`}>
            <div className="dCartTiltle">{props.value.title}</div>
          </Link>
          <div className="dCartTeacher">{props.value.teacher}</div>
        </td>
        <td className="dOldPrice">
          NT$ {Number(props.value.price).toLocaleString()}
        </td>
        <td className="dSpecailPrice">
          NT${" "}
          {Number(
            parseFloat(props.value.shoppingPrice).toFixed(3)
          ).toLocaleString()}
        </td>
        <td className="dTrash">
          <svg
            width="30"
            height="110"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={handleDelCart}
          >
            <path
              d="M11 1.5V2.5H14.5C14.7761 2.5 15 2.72386 15 3C15 3.27614 14.7761 3.5 14.5 3.5H13.9616L13.1088 14.1595C13.0257 15.1989 12.1579 16 11.1152 16H4.88479C3.84207 16 2.97431 15.1989 2.89116 14.1595L2.0384 3.5H1.5C1.22386 3.5 1 3.27614 1 3C1 2.72386 1.22386 2.5 1.5 2.5H5V1.5C5 0.671573 5.67157 0 6.5 0H9.5C10.3284 0 11 0.671573 11 1.5ZM6 1.5V2.5H10V1.5C10 1.22386 9.77614 1 9.5 1H6.5C6.22386 1 6 1.22386 6 1.5ZM4.49999 5.0285L4.99999 13.5285C5.0162 13.8042 5.25282 14.0145 5.52849 13.9983C5.80415 13.9821 6.01448 13.7454 5.99826 13.4698L5.49826 4.96978C5.48205 4.69411 5.24543 4.48379 4.96976 4.5C4.6941 4.51622 4.48377 4.75283 4.49999 5.0285ZM11.0302 4.50086C10.7546 4.48465 10.5179 4.69497 10.5017 4.97064L10.0017 13.4706C9.98552 13.7463 10.1958 13.9829 10.4715 13.9991C10.7472 14.0154 10.9838 13.805 11 13.5294L11.5 5.02936C11.5162 4.75369 11.3059 4.51708 11.0302 4.50086ZM8 4.5C7.72386 4.5 7.5 4.72386 7.5 5V13.5C7.5 13.7761 7.72386 14 8 14C8.27615 14 8.5 13.7761 8.5 13.5V5C8.5 4.72386 8.27615 4.5 8 4.5Z"
              fill="black"
            />
          </svg>
        </td>
      </tr>
      <tr>
        <td colSpan={6}>
          <hr />
        </td>
      </tr>
    </Fragment>
  );
};

export default OrderDetail;
