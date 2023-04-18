import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { styled } from "@mui/material";

import Files from "../../../public/assets/images/files/doc.png";
import Driver from "../../../public/assets/images/files/driver.png";
import Programs from "../../../public/assets/images/files/programs.png";

const DownloadButton = styled(Button)(({ theme }) => ({
  background: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  border: `1px solid ${theme.palette.primary.main}`,
  width: "100%",

  "&:hover": {
    color: theme.palette.primary.main,
    background: theme.palette.primary.contrastText,
    border: `1px solid ${theme.palette.primary.main}`,
  },
}));

export default function ImgMediaCard({ type, name, id, file }) {
  const imageSelector = (type) => {
    switch (type) {
      case "Programs": {
        return Programs.src;
      }
      case "Files": {
        return Files.src;
      }
      case "Driver": {
        return Driver.src;
      }
      default:
        return "https://placehold.jp/200x200.png";
    }
  };

  const clickHandler = () => {
    console.log("hey");
  };

  return (
    <Card sx={{ maxWidth: 200, padding: "1rem" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Image alt={name} height="128" width="128" src={imageSelector(type)} />
      </div>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
      </CardContent>
      <CardActions>
        <DownloadButton size="small" onClick={clickHandler}>
          Download
        </DownloadButton>
      </CardActions>
    </Card>
  );
}
