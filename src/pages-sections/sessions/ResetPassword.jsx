import { useState } from "react";
import { Box, Button, Input, styled } from "@mui/material";
import { H2 } from "components/Typography";
import usePostFetch from "components/fetch/usePostFetch";
import Loader from "components/loader-spinner/Loader";
import AssignNewPassword from "./AssignNewPassword";

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
  widht: "100%"
});
const ButtonStyle = styled(Button)(({ theme }) => ({
  padding: "10px 25px",
  marginLeft: "1rem",
  fontSize: "1rem",
  background: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  width: "100%",
  margin: "2rem auto"
}));

const ResetPassword = ({ token, setToken }) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [stage, setStage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (event) => {
    setInput(event.target.value);
  };
  const handleSubmitPhoneNum = async () => {
    setIsLoading(true)
    const { data } = await usePostFetch(
      "https://sinbad-store.com/api/v2/resend-code",
      {
        "X-localization": "ar",
        "Content-Type": "application/json",
      },
      JSON.stringify({ username: input, type: "reset" })
    );
    console.log(data);
    if(data) setIsLoading(false)
    if(data.status) setStage(1)
  };

  return (
    <>
      {stage === 0 && (
        <CodeConfirmationWrapper>
          {isLoading ? (
            <div style={{display: "flex", flexDirection: "column", justifyContent: "center", height: "100%"}}><Loader size={15} loading={isLoading} /></div>
          ) : (
            <>
              <HeaderStyle>Reset your Password</HeaderStyle>
              {error !== "" && <ErrorTxtStyle>{error}</ErrorTxtStyle>}
              <div style={{display: "flex", flexDirection: "column", justifyContent: "center", width: "350px"}}>
                <InputStyle
                  type="text"
                  placeholder="Your Mobile Number Here"
                  value={input}
                  name={"input"}
                  onChange={handleChange}
                />
                <ButtonStyle onClick={handleSubmitPhoneNum}>
                  Continue
                </ButtonStyle>
              </div>
              <span></span>
            </>
          )}
        </CodeConfirmationWrapper>
      )}
      {stage === 1 && <AssignNewPassword input={input}/>}
    </>
  );
};

export default ResetPassword;