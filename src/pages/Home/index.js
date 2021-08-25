import React, { useState, useEffect } from "react";
import Header from "../../components/AppBar";
import * as compromissoAPI from "../../util/API/compromissoAPI";
import CompromissoCard from "../../components/Cards/Compromisso";
import moment from "moment";
import DateFnsUtils from "@date-io/date-fns";

import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { AppBar, Tabs, Tab } from "@material-ui/core";

import {
  Typography,
  Grid,
  TextField,
  Card,
  makeStyles,
  Button,
  MenuItem,
} from "@material-ui/core";

export default function Home() {
  useEffect(() => {
    async function GetCompromissos() {
      await getCompromissos();
    }
    GetCompromissos();
  }, []);

  async function getCompromissos() {
    const response = await compromissoAPI.getCompromisso();
    setCompromissos(response.data);
  }

  async function cleanFiltro() {
    await getCompromissos();
    setFiltro("");
  }

  async function onSearch() {
    if (filtro === "Intervalo de dias") {
      let newDataInicio = moment(dataInicio).format("YYYY-MM-DD");
      let newDataFinal = moment(dataFinal).format("YYYY-MM-DD");

      const response = await compromissoAPI.getCompromissoByData(
        newDataInicio,
        newDataFinal
      );
      setCompromissos(response.data);
    } else {
      const response = await compromissoAPI.getCompromissoByContatoName(
        contatoName
      );
      setCompromissos(response.data);
    }
  }

  const [compromissos, setCompromissos] = useState([]);

  const [filtro, setFiltro] = useState("");

  const [dataInicio, setDataInicio] = useState(new Date());

  const [dataFinal, setDataFinal] = useState(new Date());

  const [contatoName, setContatoName] = useState("");

  const [filtros] = useState(["Intervalo de dias", "Nome de contato"]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <Header></Header>
      <Grid container alignItems="center" style={{ marginBottom: 8 }}>
        <Grid item xs={2} style={{ marginLeft: "20vh" }}>
          <TextField
            select
            variant="outlined"
            id="outlined-required"
            label="Filtrar por"
            margin="dense"
            fullWidth
            style={{ marginBottom: 16 }}
            value={filtro}
            onChange={(event) => setFiltro(event.target.value)}
          >
            {filtros &&
              filtros.map((filtro) => (
                <MenuItem key={filtro} value={filtro}>
                  {filtro}
                </MenuItem>
              ))}
          </TextField>
        </Grid>
        {filtro === "Nome de contato" && (
          <Grid item xs={2}>
            <TextField
              variant="outlined"
              id="outlined-required"
              label="Contato"
              style={{ marginLeft: 16 }}
              margin="dense"
              fullWidth
              value={contatoName}
              onChange={(event) => setContatoName(event.target.value)}
            />
          </Grid>
        )}
        {filtro === "Intervalo de dias" && (
          <>
            <Grid item xs={2}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  style={{ marginLeft: 16 }}
                  margin="normal"
                  fullWidth
                  inputVariant="outlined"
                  label="Dia do compromisso"
                  format="dd/MM/yyyy"
                  value={dataInicio}
                  onChange={setDataInicio}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={2}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  style={{ marginLeft: 32 }}
                  margin="normal"
                  fullWidth
                  inputVariant="outlined"
                  label="Dia do compromisso"
                  format="dd/MM/yyyy"
                  value={dataFinal}
                  onChange={setDataFinal}
                />
              </MuiPickersUtilsProvider>
            </Grid>
          </>
        )}
        {filtro && (
          <>
            <Grid item xs={1} style={{ marginLeft: 48 }}>
              <Button onClick={onSearch} variant="contained">
                Pesquisar
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Button onClick={cleanFiltro} variant="contained">
                Limpar campos
              </Button>
            </Grid>
          </>
        )}
      </Grid>
      <AppBar color="default" position="static" style={{ width: "80%" }}>
        <Tabs indicatorColor="primary" textColor="primary" variant="fullWidth">
          <Tab label="Compromissos" />
        </Tabs>
      </AppBar>
      {compromissos.length > 0 &&
        compromissos.map((compromisso) => (
          <CompromissoCard
            compromisso={compromisso}
            style={{ marginTop: 16 }}
          ></CompromissoCard>
        ))}
    </div>
  );
}
