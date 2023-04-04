import MegaMenu3 from "./MegaMenu3";
import StyledMegaMenu from "./StyledMegaMenu";
import BazaarCard from "components/BazaarCard";
import CategoryMenuItem from "../CategoryMenuItem";

// =======================================================================

// =======================================================================

const MegaMenu2 = ({ data }) => {
  const isArrOfObj = Object.prototype.toString.call(data) === "[object Array]";
  
  return (
    <StyledMegaMenu>
      <BazaarCard
        elevation={2}
        sx={{
          ml: "1rem",
          py: "0.5rem",
        }}
      >
        {isArrOfObj ? (
          data?.map((item) => (
            <CategoryMenuItem
              href={item.category_url}
              key={item.category_slug}
              title={item.category_name}
              caret={item.subcategories.length > 0}
            >
              {item.subcategories && (
                <MegaMenu2 minWidth="560px" data={item.subcategories} />
              )}
            </CategoryMenuItem>
          ))
        ) : (
          <CategoryMenuItem
            href={data.category_url}
            key={data.category_slug}
            title={data.category_name}
            caret={!!data.subcategories}
          >
            {data.subcategories && (
              <MegaMenu3 minWidth="560px" data={data.subcategories} />
            )}
          </CategoryMenuItem>
        )}
      </BazaarCard>
    </StyledMegaMenu>
  );
};
export default MegaMenu2;
