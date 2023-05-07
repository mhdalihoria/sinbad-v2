import { styled, useTheme } from "@mui/material";
import Link from "next/link";
import { useState } from "react";

const SectionTitle = styled("span")(({ theme }) => ({
  color: theme.palette.grey[500],
  background: "white",
  border: `1px solid ${theme.palette.grey[500]}`,
  borderRadius: "10px",
  padding: "5px 10px",
  marginLeft: "1em",
  marginBottom: "1em",
  display: "inline-block",
  cursor: "pointer",

  "&:hover": {
    color: theme.palette.primary.main,
    background: theme.palette.primary.contrastText,
    border: `1px solid ${theme.palette.primary.main}`,
  },

  "&:active": {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    border: `1px solid ${theme.palette.primary.main}`,
    boxShadow: "inset -7px -7px 12px 0px rgba(0,0,0,0.40)",
  },
}));

const ProductPageDescAndRating = ({ desc }) => {
  const [currentTab, setCurrentTab] = useState("description");
  const theme = useTheme();

  const active = {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    border: `1px solid ${theme.palette.primary.main}`,
  };

  const setToDescription = () => {
    setCurrentTab("description");
  };
  const setToRating = () => {
    setCurrentTab("rating");
  };
  return (
    <div
      style={{
        border: `1px solid ${theme.palette.grey[500]}`,
        borderRadius: "5px",
        marginTop: "3rem",
        marginBottom: "2rem",
        paddingTop: "1rem",
      }}
    >
      <div style={{ maxWidth: "220px", margin: "1rem auto" }}>
        <SectionTitle
          style={currentTab === "description" ? active : {}}
          onClick={setToDescription}
        >
          الوصف
        </SectionTitle>
        <SectionTitle
          style={currentTab !== "description" ? active : {}}
          onClick={setToRating}
        >
          تقييم المنتج
        </SectionTitle>
      </div>
      <div style={{ margin: "1rem" }}>
        {currentTab === "description" ? (
          <p>{desc.replace(/(<([^>]+)>)/gi, "").replace(/\&nbsp;/g, "")}</p>
        ) : (
          <>
            <h5>تقييم الزبائن</h5>
            <span>
              يجب
              <Link href={"/signup"}>
                <span
                  style={{ borderBottom: "1px solid black", cursor: "pointer" }}
                >
                  {" "}
                  تسجيل الدخول
                </span>
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
