import React, { useState, useEffect } from "react";
import { Typography, TextField, MenuItem, Button } from "@material-ui/core";
import Warning from "../../components/Warning";
import Decision from "../../components/Decision";
import * as contatoAPI from "../../util/API/contatoAPI";
import * as compromissoAPI from "../../util/API/compromissoAPI";
import moment from "moment";

import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import Header from "../../components/AppBar";
import DateFnsUtils from "@date-io/date-fns";
import history from "../../history";

export default function Contato() {
  const [warningMessage, setWarningMessage] = useState("");
  const [openWarning, setOpenWarning] = useState(false);
  const [typeWarning, setTypeWarning] = useState("info");
  const [openDecision, setOpenDecision] = useState(false);
  const [titleDecision, setTitleDecision] = useState("");
  const [descriptionDecision, setDescriptionDecision] = useState("");
  const [handleConfirmDecision, setHandleConfirmDecision] = useState(() => {});

  const [contatos, setContatos] = useState([]);

  useEffect(() => {
    async function GetContatos() {
      await getContatos();
    }
    GetContatos();
  }, []);

  async function getContatos() {
    const response = await contatoAPI.getContatos();
    setContatos(response.data);
  }

  const handleDateChange = (date) => {
    setCompromisso({ ...compromisso, data: date });
  };

  const [compromisso, setCompromisso] = useState({
    descricao: "",
    data: new Date(),
    local: "",
  });

  const [contato, setContato] = useState({});

  function handleWarning(message, type) {
    setOpenWarning(true);
    setWarningMessage(message);
    setTypeWarning(type);
  }

  function onCloseWarning() {
    setOpenWarning(false);
  }

  function handleNotSure() {
    setOpenDecision(false);
  }

  function handleChangeDecision(title, description, type) {
    setTitleDecision(title);
    setDescriptionDecision(description);
    setOpenDecision(true);
    setHandleConfirmDecision(() => registerCompromisso);
  }

  async function registerCompromisso() {
    let newData = moment(compromisso.data, "YYYY-MM-DD");

    if (!contato.nome)
      return handleWarning("Contato não pode ser vazio!", "error");
    if (!compromisso.local)
      return handleWarning("Local não pode ser vazio!", "error");
    if (!compromisso.descricao)
      return handleWarning("Descrição não pode ser vazio!", "error");

    const response = await compromissoAPI.registerCompromisso(
      compromisso,
      newData,
      contato
    );

    handleWarning("Compromisso cadastrado com sucesso", "success");

    setTimeout(() => {
      history.push("/home");
    }, 2000);

    await getContatos();
  }

  return (
    <div
      style={{
        flexDirection: "column",
        display: "flex",
      }}
    >
      <Header></Header>

      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "30%",
            height: "50vh",
            display: "flex",
            flexDirection: "column",
            borderColor: "#fff",
            borderStyle: "solid",
            borderRadius: 5,
            alignItems: "center",
            justifyContent: "space-between",
            padding: 16,
          }}
        >
          <Typography variant="h6" style={{ color: "#fff" }}>
            Cadastrar compromisso
          </Typography>
          <div style={{ width: "70%" }}>
            <TextField
              select
              variant="outlined"
              id="outlined-required"
              label="Contato"
              margin="dense"
              fullWidth
              style={{ marginBottom: 16 }}
              value={contato.nome}
              onChange={(event) => setContato(event.target.value)}
            >
              {contatos &&
                contatos.map((contato) => (
                  <MenuItem key={contato.id} value={contato}>
                    {contato.nome}
                  </MenuItem>
                ))}
            </TextField>
            <TextField
              variant="outlined"
              id="outlined-required"
              label="Local"
              margin="dense"
              fullWidth
              style={{ marginBottom: 16 }}
              value={compromisso.local}
              onChange={(event) =>
                setCompromisso({ ...compromisso, local: event.target.value })
              }
            />
            <TextField
              variant="outlined"
              id="outlined-required"
              label="Descrição"
              margin="dense"
              fullWidth
              value={compromisso.descricao}
              onChange={(event) =>
                setCompromisso({
                  ...compromisso,
                  descricao: event.target.value,
                })
              }
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                style={{ marginBottom: 16 }}
                margin="normal"
                fullWidth
                inputVariant="outlined"
                label="Dia do compromisso"
                format="dd/MM/yyyy"
                value={compromisso.data}
                onChange={handleDateChange}
              />
            </MuiPickersUtilsProvider>
          </div>
          <div style={{ width: "70%" }}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() =>
                handleChangeDecision(
                  "Cadastrar contato",
                  "Ao confirmar, você estará cadastrando esse contato em sua lista. Deseja continuar?"
                )
              }
            >
              Cadastrar
            </Button>
          </div>
        </div>
      </div>
      {openWarning && (
        <Warning
          message={warningMessage}
          open={openWarning}
          typeMessage={typeWarning}
          onClose={onCloseWarning}
        />
      )}
      {openDecision && (
        <Decision
          open={openDecision}
          handleConfirm={handleConfirmDecision}
          notSure={handleNotSure}
          title={titleDecision}
          description={descriptionDecision}
        />
      )}
    </div>
  );
}
