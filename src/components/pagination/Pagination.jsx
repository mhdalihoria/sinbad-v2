import { styled } from "@mui/material";
import React from "react";

const PaginationContainer = styled("ul")(({ theme }) => ({
  display: "flex",
  gap: "15px",
  flexWrap: "wrap",
  marginLeft: "1rem",

}));
const PaginationButton = styled("button", {
  //we write the following lines to add the "currentPage" prop as well as the "number" prop to the MUI styled component
  shouldForwardProp: (prop) => prop !== "currentPage" && prop !== "number"
})(({ theme, currentPage, number }) => ({
  background: currentPage === number ? theme.palette.primary.contrastText: theme.palette.primary.main,
  color: currentPage === number ? theme.palette.primary.main: theme.palette.primary.contrastText,
  fontWeight: "600",
  width: "30px",
  height: "30px",
  textAlign: "center",
  borderRadius: "3px",
  cursor: "pointer",
  border: currentPage === number ? `1px solid ${theme.palette.primary.main}`: `none`,
  
  "&:hover": {
    opacity: "0.7",
  },
}));

const Pagination = ({
  reviewsPerPage,
  totalReviews,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalReviews / reviewsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <PaginationContainer>
        {pageNumbers.map((number) => {
          return (
            <li key={number}>
              <PaginationButton
                currentPage={currentPage}
                number={number}
                onClick={() => paginate(number)}
              >
                {number}
              </PaginationButton>
            </li>
          );
        })}
      </PaginationContainer>
    </nav>
  );
};

export default Pagination;
