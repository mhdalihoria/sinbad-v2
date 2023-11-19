import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  useTheme,
  Alert,
  Snackbar,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { currency } from "lib";
import { format } from "date-fns";
import usePostFetch from "components/fetch/usePostFetch";
import { useAppContext } from "contexts/AppContext";

export default function BasicTable({ ordersData, isMarketer }) {
  const { data } = ordersData;
  const theme = useTheme();
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarData, setSnackbarData] = React.useState({
    variation: null,
    body: null,
  });
  console.log("isMarketer", isMarketer);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarData.variation }
          sx={{ width: "100%" }}
        >
          {snackbarData.body }
        </Alert>
      </Snackbar>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead style={{ background: theme.palette.primary.main }}>
            <TableRow>
              <TableCell
                style={{
                  color: theme.palette.primary.contrastText,
                  fontWeight: "700",
                }}
                align="center"
              >
                #
              </TableCell>
              <TableCell
                style={{
                  color: theme.palette.primary.contrastText,
                  fontWeight: "700",
                }}
                align="center"
              >
                Name
              </TableCell>
              <TableCell
                style={{
                  color: theme.palette.primary.contrastText,
                  fontWeight: "700",
                }}
                align="center"
              >
                Number
              </TableCell>
              <TableCell
                style={{
                  color: theme.palette.primary.contrastText,
                  fontWeight: "700",
                }}
                align="center"
              >
                Address
              </TableCell>
              <TableCell
                style={{
                  color: theme.palette.primary.contrastText,
                  fontWeight: "700",
                }}
                align="center"
              >
                Order Date
              </TableCell>
              <TableCell
                style={{
                  color: theme.palette.primary.contrastText,
                  fontWeight: "700",
                }}
                align="center"
              >
                Amount
              </TableCell>
              {isMarketer && (
                <TableCell
                  style={{
                    color: theme.palette.primary.contrastText,
                    fontWeight: "700",
                  }}
                  align="center"
                >
                  Comission
                </TableCell>
              )}
              <TableCell
                style={{
                  color: theme.palette.primary.contrastText,
                  fontWeight: "700",
                }}
                align="center"
              >
                Bill No.
              </TableCell>
              <TableCell
                style={{
                  color: theme.palette.primary.contrastText,
                  fontWeight: "700",
                }}
                align="center"
              >
                Transfer Doc
              </TableCell>
              <TableCell
                style={{
                  color: theme.palette.primary.contrastText,
                  fontWeight: "700",
                }}
                align="center"
              >
                Order State
              </TableCell>
              {data.some((item) => item.status === "تم الالغاء") && (
                <TableCell
                  style={{
                    color: theme.palette.primary.contrastText,
                    fontWeight: "700",
                  }}
                  align="center"
                >
                  Cancel Reason
                </TableCell>
              )}
              {data.some((item) => item.can_cancel === true) && (
                <TableCell
                  style={{
                    color: theme.palette.primary.contrastText,
                    fontWeight: "700",
                  }}
                  align="center"
                >
                  Cancel Order
                </TableCell>
              )}
              {data.some((item) => item.can_edit === true) && (
                <TableCell
                  style={{
                    color: theme.palette.primary.contrastText,
                    fontWeight: "700",
                  }}
                  align="center"
                >
                  Edit Order
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((order) => (
              <React.Fragment key={order.id}>
                <Row
                  order={order}
                  isMarketer={isMarketer}
                  snackbarOpen={snackbarOpen}
                  setSnackbarOpen={setSnackbarOpen}
                  setSnackbarData={setSnackbarData}
                />
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

const Row = ({
  order,
  isMarketer,
  snackbarOpen,
  setSnackbarOpen,
  setSnackbarData,
}) => {
  const theme = useTheme();
  const { userToken } = useAppContext();
  const orderID = order.id;
  const [open, setOpen] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [modalCancelInput, setModalCancelInput] = React.useState("");
  const [modalContentType, setModalContentType] = React.useState(null);
  const [loadingBtn, setLoadingBtn] = React.useState(false);

  const handleSubTableOpen = () => {
    setOpen(!open);
  };

  const handleModalCancelInputChange = (e) => {
    const { value } = e.target;
    setModalCancelInput(value);
  };

  const handleCancel = () => {
    setModalContentType("cancel");
    setOpenModal(true);
  };

  const handleCancelSubmit = async () => {
    setLoadingBtn(true);
    try {
      const headers = {
        "X-localization": "ar",
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      };

      const body = JSON.stringify({
        order_id: `${orderID}`,
        reason: modalCancelInput,
      });

      const request = await usePostFetch(
        "https://sinbad-store.com/api/v2/cancel-my-order",
        headers,
        body
      );
      const data = await request.data;
      if (request) {
        setLoadingBtn(false);
        setSnackbarOpen(true);
        if (data.success) {
          setSnackbarData({ variation: "success", body: data.message });
        } else {
          setSnackbarData({ variation: "error", body: data.message });
        }
      }
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleEdit = () => {
    setModalContentType("edit");
    setOpenModal(true);
  };

  const orderCommissionSum = order.order_details.reduce(
    (orderSum, orderDetail) => {
      return orderSum + orderDetail.commission;
    },
    0
  );

  return (
    <>
      <ModalComponent openModal={openModal} setOpenModal={setOpenModal}>
        {modalContentType === "cancel" && (
          <>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              You're about to cancel your order.
            </Typography>
            <Box>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Please Let Us Know Why
              </Typography>
              <TextField
                id="outlined-basic"
                label=""
                variant="outlined"
                name="modalCancelInput"
                value={modalCancelInput}
                onChange={handleModalCancelInputChange}
                sx={{ marginBottom: "1rem", marginTop: ".5rem" }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "end",
                width: "100%",
                gap: "10px",
              }}
            >
              <Button
                variant="text"
                onClick={() => setOpenModal(false)}
              >
                close
              </Button>
              {/* {loadingBtn ? (
                <LoadingButton loading variant="outlined">
                  Submit
                </LoadingButton>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCancelSubmit}
                >
                  Submit
                </Button>
              )} */}
              <LoadingButton
                loading={loadingBtn}
                color="primary"
                variant="outlined"
                onClick={handleCancelSubmit}
              >
                Submit
              </LoadingButton>
            </Box>
          </>
        )}
        {modalContentType === "edit" && (
          <>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Edit Your Orders.
            </Typography>
            <Box>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Please Let Us Know Why
              </Typography>
              {/* <TextField
                id="outlined-basic"
                label=""
                variant="outlined"
                name="modalCancelInput"
                value={modalCancelInput}
                onChange={handleModalCancelInputChange}
                sx={{ margin: "1rem 0" }}
              /> */}
            </Box>
            <Box sx={{ display: "flex", justifyContent: "end", width: "100%" }}>
              <Button>Submit</Button>
              <Button>Submit</Button>
            </Box>
          </>
        )}
      </ModalComponent>

      <TableRow>
        <TableCell
          onClick={() => handleSubTableOpen()}
          sx={{ cursor: "pointer" }}
        >
          {order.id}
        </TableCell>
        <TableCell
          onClick={() => handleSubTableOpen()}
          sx={{ cursor: "pointer" }}
        >
          {order.shipped_full_name}
        </TableCell>
        <TableCell
          onClick={() => handleSubTableOpen()}
          sx={{ cursor: "pointer" }}
        >
          {order.shipped_mobile}
        </TableCell>
        <TableCell
          onClick={() => handleSubTableOpen()}
          sx={{ cursor: "pointer" }}
        >
          {order.carrier}
        </TableCell>
        <TableCell
          onClick={() => handleSubTableOpen()}
          sx={{ cursor: "pointer" }}
        >
          {order.order_date}
        </TableCell>
        <TableCell
          onClick={() => handleSubTableOpen()}
          sx={{ cursor: "pointer" }}
        >
          {currency(order.total_price)}
        </TableCell>
        {isMarketer && (
          <TableCell
            onClick={() => handleSubTableOpen()}
            sx={{ cursor: "pointer" }}
          >
            {currency(orderCommissionSum)}
          </TableCell>
        )}
        <TableCell
          onClick={() => handleSubTableOpen()}
          sx={{ cursor: "pointer" }}
        >
          {order.bill_no}
        </TableCell>
        <TableCell
          onClick={() => handleSubTableOpen()}
          sx={{ cursor: "pointer" }}
        >
          {order.transfer_document}
        </TableCell>
        <TableCell
          onClick={() => handleSubTableOpen()}
          sx={{ cursor: "pointer" }}
        >
          {order.status}
        </TableCell>
        <TableCell
          onClick={() => handleSubTableOpen()}
          sx={{ cursor: "pointer" }}
        >
          {order.cancel_reason}
        </TableCell>
        <TableCell>
          {order.can_cancel ? (
            <Button
              sx={{ color: theme.palette.primary.main }}
              onClick={handleCancel}
            >
              cancel
            </Button>
          ) : (
            "no"
          )}
        </TableCell>
        <TableCell>
          {order.can_edit ? (
            <Button
              sx={{ color: theme.palette.secondary.main }}
              onClick={handleEdit}
            >
              edit
            </Button>
          ) : (
            "no"
          )}
        </TableCell>
      </TableRow>
      {open && (
        <TableRow>
          <TableCell colSpan={8}>
            <SubTable order={order} isMarketer={isMarketer} />
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

const SubTable = ({ order, isMarketer }) => {
  const theme = useTheme();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="sub-table">
        <TableHead style={{ background: theme.palette.primary.main }}>
          <TableRow>
            <TableCell
              style={{
                color: theme.palette.primary.contrastText,
                fontWeight: "700",
              }}
              align="center"
            >
              Prod Name
            </TableCell>
            <TableCell
              style={{
                color: theme.palette.primary.contrastText,
                fontWeight: "700",
              }}
              align="center"
            >
              Qnty
            </TableCell>
            <TableCell
              style={{
                color: theme.palette.primary.contrastText,
                fontWeight: "700",
              }}
              align="center"
            >
              Price
            </TableCell>
            {isMarketer && (
              <>
                <TableCell
                  style={{
                    color: theme.palette.primary.contrastText,
                    fontWeight: "700",
                  }}
                  align="center"
                >
                  Comission
                </TableCell>
                <TableCell
                  style={{
                    color: theme.palette.primary.contrastText,
                    fontWeight: "700",
                  }}
                  align="center"
                >
                  Delivery Comission
                </TableCell>
              </>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {order.order_details.map((data) => (
            <TableRow key={data.id}>
              <TableCell align="center">{data.product_name}</TableCell>
              <TableCell align="center">{data.quantity}</TableCell>
              <TableCell align="center">{currency(data.price)}</TableCell>
              {isMarketer && (
                <>
                  <TableCell align="center">
                    {currency(data.commission)}
                  </TableCell>
                  <TableCell align="center">
                    {currency(data.delivery_commission)}
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const ModalComponent = (props) => {
  const { openModal, setOpenModal, children } = props;
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 1,
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>{children}</Box>
    </Modal>
  );
};
