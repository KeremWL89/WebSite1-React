import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import "../Styles.css";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

export default function KAppBar() {
  const history = useNavigate();

  return (
    <div>
      <Box>
        <AppBar class="appBar" position="static" fontFamily={"Poetsen One"}>
          <Toolbar>
            <Button
              onClick={() => {
                history("/");
              }}
              color={"inherit"}
            >
              <Typography variant="h6" fontFamily={"Poetsen One"}>
                {" "}
                Kerem Berkkanoğlu
              </Typography>
            </Button>

            <Button
              color="inherit"
              onClick={() => {
                history("/Blog");
              }}
            >
              <Typography variant="paragraph" fontFamily={"Poetsen One"}>
                {" "}
                Blog
              </Typography>
            </Button>
            <Button
              color="inherit"
              onClick={() => {
                history("/BirNotBırak");
              }}
            >
              <Typography variant="paragraph" fontFamily={"Poetsen One"}>
                {" "}
                Bir not Bırak{" "}
              </Typography>
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
