import React, { useState, useEffect } from "react";
import history from "../../history";
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import Menu from "./Menu";

export default function Home(props) {
  return (
    <div style={{ width: "100%", marginBottom: 56 }}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <div
            style={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Button
              onClick={() => history.push("/home")}
              color="#fff"
              variant="outlined"
            >
              AGENDA - DSW
            </Button>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h6" style={{ color: "#fff" }}>
                Lucas
              </Typography>
              <Menu></Menu>
              <Button
                onClick={() => history.push("/login")}
                color="#fff"
                variant="outlined"
              >
                Logout
              </Button>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
