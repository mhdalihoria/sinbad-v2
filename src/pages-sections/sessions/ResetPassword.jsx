import { Box, Button, Input, styled } from "@mui/material";
import { H2 } from "components/Typography";
import usePostFetch from "components/fetch/usePostFetch";
import { useState } from "react";

const HeaderStyle = styled(H2)({
  textAlign: "center",
  fontSize: "2rem",
  marginBottom: "1rem",
});
const ErrorTxtStyle = styled(H2)(({ theme }) => ({
  textAlign: "center",
  fontSize: "1rem",
  marginBottom: "1rem",
  color: theme.palette.primary.main,
}));

const CodeConfirmationWrapper = styled(Box)({
  height: "300px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
});

const InputStyle = styled(Input)({
  padding: "10px 20px",
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

const ResetPassword = ({ token, setToken }) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const handleChange = (event) => {
    setInput(event.target.value);
  };
  const handleSubmit = async () => {
    const { data } = await usePostFetch(
      "https://sinbad-store.com/api/v2/reset-password",
      {
        "X-localization": "ar",
        "Content-Type": "application/json",
        Authorization: `Bearer oUTWx6fGaSVBZLJAseilg9TBk8Il4xLWrD6r7jLuZtOHFhEmS4T2f7nR3Kd5`,
      },
      JSON.stringify({ username: input })
    );
    console.log(data);
    
  };

  return (
    <CodeConfirmationWrapper>
      <HeaderStyle>Reset your Password</HeaderStyle>
      {error !== "" && <ErrorTxtStyle>{error}</ErrorTxtStyle>}
      <div>
        <InputStyle
          type="text"
          placeholder="Your Mobile Number Here"
          value={input}
          name={"input"}
          onChange={handleChange}
        />
        <ButtonStyle onClick={handleSubmit}>Continue</ButtonStyle>
      </div>
      <span></span>
    </CodeConfirmationWrapper>
  );
};

export default ResetPassword;
