import Link from "next/link";
import { useState } from "react";

const ProductPageDescAndRating = ({desc}) => {
  const [currentTab, setCurrentTab] = useState("description");

  const setToDescription = () => {
    setCurrentTab("description");
  };
  const setToRating = () => {
    setCurrentTab("rating");
  };
  return (
    <div>
      <span
        style={{ color: "white", background: "green" }}
        onClick={setToDescription}
      >
        الوصف
      </span>
      <span
        style={{ color: "white", background: "magenta" }}
        onClick={setToRating}
      >
        تقييم المنتج
      </span>
      <div style={{margin: "1rem"}}>
        {currentTab === "description" ? (
          <p>{desc.replace(/(<([^>]+)>)/gi, "").replace(/\&nbsp;/g, "")}</p>
        ) : (
          <>
            <h5>تقييم الزبائن</h5>
            <span>
              يجب 
              <Link href={"/signup"}>
                <span style={{borderBottom: "1px solid black", cursor: "pointer"}}> تسجيل الدخول</span>
              </Link>{" "}
              لاضافة تقييم
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductPageDescAndRating;
