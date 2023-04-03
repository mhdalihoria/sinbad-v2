import MegaMenu3 from "./MegaMenu3";
import StyledMegaMenu from "./StyledMegaMenu";
import BazaarCard from "components/BazaarCard";
import CategoryMenuItem from "../CategoryMenuItem";

// =======================================================================

// =======================================================================

const MegaMenu2 = ({
  data
}) => {
  return <StyledMegaMenu>
      <BazaarCard elevation={2} sx={{
      ml: "1rem",
      py: "0.5rem"
    }}>
        {data?.map(item => <CategoryMenuItem href={item.category_url} key={item.category_slug} title={item.category_name} caret={!!item.subcategories}>
            {item.subcategories && <MegaMenu3 minWidth="560px" data={item.subcategories} />}
          </CategoryMenuItem>)}
      </BazaarCard>
    </StyledMegaMenu>;
};
export default MegaMenu2;