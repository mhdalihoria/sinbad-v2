import { Box, Button, Input, styled } from "@mui/material";
import { H2 } from "components/Typography";

const { default: usePostFetch } = require("components/fetch/usePostFetch");
const { useState } = require("react");

const HeaderStyle = styled(H2)({
  textAlign: "center",
  fontSize: "2rem",
  marginBottom: "1rem",
});
const ErrorTxtStyle = styled(H2)(({theme}) => ({
  textAlign: "center",
  fontSize: "1rem",
  marginBottom: "1rem",
  color: theme.palette.primary.main
}))

const CodeConfirmationWrapper = styled(Box)({
  height: "300px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
});

const InputStyle = styled(Input)({
  padding: "10px 25px",
  fontSize: "1rem",
  letterSpacing: "1px",
});
const ButtonStyle = styled(Button)(({ theme }) => ({
  padding: "10px 25px",
  marginLeft: "1rem",
  fontSize: "1rem",
  background: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));

const ConfirmCode = ({ token, setStage }) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const handleChange = (event) => {
    setInput(event.target.value);
  };
  const handleSubmit = async () => {
    const {data} = await usePostFetch(
      "https://sinbad-store.com/api/v2/activate",
      {
        "X-localization": "ar",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      JSON.stringify({ code: input })
    );
    console.log(data);
    if (data.status) setStage(2);
    if (!data.status) setError(data.message);
  };

  return (
    <CodeConfirmationWrapper>
      <HeaderStyle>Confirm Your Account</HeaderStyle>
      {error !== "" && <ErrorTxtStyle>{error}</ErrorTxtStyle>}
      <div>
        <InputStyle
          type="text"
          placeholder="Activation code here"
          value={input}
          name={"input"}
          onChange={handleChange}
        />
        <ButtonStyle onClick={handleSubmit}>Submit</ButtonStyle>
      </div>
      <span>Didn't get code? <span onClick={()=>console.log("code resent!")} style={{cursor: "pointer", textDecoration: "underline"}}>click here</span></span>
    </CodeConfirmationWrapper>
  );
};
9
export default ConfirmCode;
