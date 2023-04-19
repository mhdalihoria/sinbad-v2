import { useTheme } from "@mui/material";
import { PulseLoader } from "react-spinners";

const override = {
  display: "block",
  borderColor: "red",
};

export default function Loader({loading, size}) {
  const theme = useTheme();

  return (

      <PulseLoader
        color={theme.palette.primary.main}
        loading={loading}
        cssOverride={override}
        size={size}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
  );
}
