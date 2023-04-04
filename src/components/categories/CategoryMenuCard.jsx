import { Box, styled } from "@mui/material";
// import navigations from "data/navigations";
import allCategories from "../../utils/__api__/categories";
import CategoryMenuItem from "./CategoryMenuItem";
import MegaMenu1 from "./mega-menu/MegaMenu1";
import MegaMenu2 from "./mega-menu/MegaMenu2";

// styled component
const Wrapper = styled(Box)(({ theme, position, open }) => ({
  left: 0,
  zIndex: 98,
  right: "auto",
  borderRadius: 4,
  padding: "0.5rem 0px",
  transformOrigin: "top",
  boxShadow: theme.shadows[2],
  position: position || "unset",
  transition: "all 250ms ease-in-out",
  transform: open ? "scaleY(1)" : "scaleY(0)",
  backgroundColor: theme.palette.background.paper,
  top: position === "absolute" ? "calc(100% + 0.7rem)" : "0.5rem",
}));

// ===============================================================

// ===============================================================
const categories = allCategories;

const CategoryMenuCard = (props) => {
  const { open, position } = props;
  const megaMenu = {
    MegaMenu1,
    MegaMenu2,
  };

    
  return (
    <Wrapper open={open} position={position}>
      {categories.data.map((item) => {
        let MegaMenu = item.subcategories !== [] ? megaMenu['MegaMenu2'] : megaMenu['MegaMenu1']
        const shouldHaveCaret = item.subcategories.length > 0 ? true : false
        return (
          <CategoryMenuItem
            key={item.id}
            href={item.category_url}
            // icon={
            //   "https://www.iconarchive.com/download/i103365/paomedia/small-n-flat/calendar.ico"
            // }
            title={item.category_name}
            caret={shouldHaveCaret}
          >
            <MegaMenu data={item.subcategories || {}} />
          </CategoryMenuItem>
        );
      })}
    </Wrapper>
  );
};
CategoryMenuCard.defaultProps = {
  position: "absolute",
};
export default CategoryMenuCard;
