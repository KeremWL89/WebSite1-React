import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function MediaCard(props) {
  const { link, img, uname, desc } = props;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 280 }} image={img} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {uname}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {desc}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" href={link}>
          <Typography variant="body2" color={"black"}>
            {" "}
            Ziyaret et{" "}
          </Typography>
        </Button>
      </CardActions>
    </Card>
  );
}
