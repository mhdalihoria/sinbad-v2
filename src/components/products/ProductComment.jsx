import { Avatar, Box } from "@mui/material";
import { FlexBox } from "components/flex-box";
import BazaarRating from "components/BazaarRating";
import { H4, H5, H6, Paragraph, Span } from "components/Typography";
import { getDateDifference } from "lib";

// ===========================================================

// ===========================================================

const ProductComment = (props) => {
  const { title, message, grade, full_name, updated_at, imgUrl } = props;
  return (
    <Box mb={4} maxWidth="600px">
      <FlexBox alignItems="center" mb={2}>
        {/* <Avatar
          src={imgUrl}
          sx={{
            width: 48,
            height: 48,
          }}
        /> */}
        <Box ml={2}>
          <H4 mb={0.5}>{full_name}</H4>
          <FlexBox alignItems="center">
            <BazaarRating value={grade} color="warn" readOnly />
            <H6 mx={1.25}>{grade}</H6>
            <Span>({getDateDifference(updated_at)})</Span>
          </FlexBox>
        </Box>
      </FlexBox>
      <Box ml={2}>
        <H6 mb={0.5}>{title}</H6>
        <Paragraph color="grey.700">{message}</Paragraph>
      </Box>
    </Box>
  );
};
export default ProductComment;
