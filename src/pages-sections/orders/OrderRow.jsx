import Link from "next/link";
import { format } from "date-fns";
import { East } from "@mui/icons-material";
import { Box, Chip, IconButton, Typography } from "@mui/material";
import TableRow from "components/TableRow";
import { H5 } from "components/Typography";
import { currency } from "lib";
// =================================================

const OrderRow = ({ order }) => {
  const getColor = (status) => {
    switch (status) {
      // case "Pending":
      //   return "secondary";
      // case "Processing":
      //   return "secondary";
      case "Credit":
        return "success";
      case "Debit":
        return "error";
      default:
        return "";
    }
  };
  return (
    <TableRow
    sx={{
      my: "1rem",
      padding: "6px 18px",
    }}
  >
    <H5 m={0} textAlign="left">
      {currency(order.amount)}
    </H5>
    <Typography className="pre" m={0.75} textAlign="left">
      {format(new Date(order.payment_date), "MMM dd, yyyy")}
    </Typography>

    <Box m={0.75}>
      <Chip
        size="small"
        label={order.debit}
        sx={{
          p: "0.25rem 0.5rem",
          fontSize: 12,
          color: !!getColor(order.debit)
            ? `${getColor(order.debit)}.900`
            : "inherit",
          backgroundColor: !!getColor(order.debit)
            ? `${getColor(order.debit)}.100`
            : "none",
        }}
      />
    </Box>

    <Typography m={0.75} textAlign="left">
      {order.note}
    </Typography>

    <Typography m={0.75} textAlign="left">
      {currency(order.archive)}
    </Typography>

    {/* <Typography
      color="grey.600"
      textAlign="center"
      sx={{
        flex: "0 0 0 !important",
        display: {
          xs: "none",
          md: "block",
        },
      }}
    >
      <IconButton>
        <East
          fontSize="small"
          color="inherit"
          sx={{
            transform: ({ direction }) =>
              `rotate(${direction === "rtl" ? "180deg" : "0deg"})`,
          }}
        />
      </IconButton>
    </Typography> */}
  </TableRow>
  );
};
export default OrderRow;
