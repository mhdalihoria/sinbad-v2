import { useState } from "react";
import { Box, Button, Input, styled } from "@mui/material";
import { H2 } from "components/Typography";
import usePostFetch from "components/fetch/usePostFetch";
import Loader from "components/loader-spinner/Loader";

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
  padding: "10px 25px",
  fontSize: "1rem",
  letterSpacing: "1px",
  widht: "100%",
});
const ButtonStyle = styled(Button)(({ theme }) => ({
  padding: "10px 25px",
  marginLeft: "1rem",
  fontSize: "1rem",
  background: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  width: "100%",
  margin: "2rem auto",
}));

const ConfirmCode = ({ token, setStage, number, setIsActivated }) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [codeResendLoader, setCodeResendLoader] = useState(false);
  const handleChange = (event) => {
    setInput(event.target.value);
  };
  const handleCodeResending = async () => {
    setCodeResendLoader(true);
    const { data } = await usePostFetch(
      "https://sinbad-store.com/api/v2/resend-code",
      {
        "X-localization": "ar",
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      JSON.stringify({ username: number })
    );
    console.log(data);
    if (!data.status) {
      setError(data.message);
      setCodeResendLoader(false);
    }
    if (data.status) {
      setCodeResendLoader(false);
    }
  };

  const handleAccountActivation = async () => {
    const { data } = await usePostFetch(
      "https://sinbad-store.com/api/v2/activate",
      {
        "X-localization": "ar",
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      JSON.stringify({ username: number, code: input })
    );
    console.log("confirm code", data);
    if (data.status) {
      setStage(2);
      setIsActivated(true)
    }
    if (!data.status) {
      setError(data.message);
    }
  };

  return (
    <CodeConfirmationWrapper>
      <HeaderStyle>Confirm Your Account</HeaderStyle>
      {error !== "" && <ErrorTxtStyle>{error}</ErrorTxtStyle>}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "350px",
        }}
      >
        <InputStyle
          type="text"
          placeholder="Activation code here"
          value={input}
          name={"input"}
          onChange={handleChange}
        />
        <ButtonStyle onClick={handleAccountActivation}>Submit</ButtonStyle>
      </div>
      {codeResendLoader ? (
        <span>
          <Loader size={5} loading={codeResendLoader} />
        </span>
      ) : (
        <span>
          Didn't get code?{" "}
          <span
            onClick={handleCodeResending}
            style={{ cursor: "pointer", textDecoration: "underline" }}
          >
            click here
          </span>
        </span>
      )}
    </CodeConfirmationWrapper>
  );
};

export default ConfirmCode;
