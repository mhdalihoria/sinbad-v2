import { useTheme } from "@mui/material";
import { PulseLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "5rem auto",
  borderColor: "red",
};

export default function Loader({loading}) {
  const theme = useTheme();

  return (

      <PulseLoader
        color={theme.palette.primary.main}
        loading={loading}
        cssOverride={override}
        size={15}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
  );
}
