import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { styled } from "@mui/material";

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

export default function ImgMediaCard({ imgUrl }) {
  return (
    <Card sx={{ maxWidth: 200, padding: "1rem" }}>
      <div style={{display: "flex", justifyContent:"center"}}>
        <Image
          alt="Icon"
          height="128"
          width="128"
          src={imgUrl}
        />
      </div>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lorem Ipsum
        </Typography>
      </CardContent>
      <CardActions>
        <DownloadButton size="small">Download</DownloadButton>
      </CardActions>
    </Card>
  );
}
