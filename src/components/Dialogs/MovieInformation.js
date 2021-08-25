import React from "react";

import {
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Divider
} from "@material-ui/core";

export default function Start(props) {

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      keepMounted
    >
      <DialogTitle id="customized-dialog-title" onClose={props.onClose}>
        {props.movie.title}
      </DialogTitle>
      <Divider></Divider>
      <DialogContent>
        <Grid container justify="flex-start">
          <Grid item xs={12}>
            <Typography variant="body1" style={{ marginBottom: 16 }}>
              <span style={{ fontWeight: "bold" }}>
                Release date:
              </span>{" "}
              {props.movie.release_date}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" style={{ marginBottom: 16 }}>
              <span style={{ fontWeight: "bold" }}>
                Director:
              </span>{" "}
              {props.movie.director}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" style={{ marginBottom: 16 }}>
              <span style={{ fontWeight: "bold" }}>
                Characters:
              </span>{" "}
              {`${props?.allPeopleObjetic[props?.movie?.characters[0]]?.name}, ${props?.allPeopleObjetic[props?.movie?.characters[1]]?.name}, ${props?.allPeopleObjetic[props?.movie?.characters[2]]?.name}`}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" style={{ marginBottom: 16 }}>
              <span style={{ fontWeight: "bold" }}>
                Director:
              </span>{" "}
              {props.movie.director}
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <Divider></Divider>
      <DialogActions>
        <Button onClick={props.onClose} color="white">
          Fechar
        </Button>
      </DialogActions>
    </Dialog >
  );
}
