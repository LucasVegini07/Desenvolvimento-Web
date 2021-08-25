import React, { useState, useEffect } from "react";
import { Typography, TextField, Card, Button } from "@material-ui/core";
import * as contatoAPI from "../../util/API/contatoAPI";
import Warning from "../../components/Warning";
import Decision from "../../components/Decision";

import Header from "../../components/AppBar";

export default function Contato() {
  const [warningMessage, setWarningMessage] = useState("");
  const [openWarning, setOpenWarning] = useState(false);
  const [typeWarning, setTypeWarning] = useState("info");
  const [openDecision, setOpenDecision] = useState(false);
  const [titleDecision, setTitleDecision] = useState("");
  const [descriptionDecision, setDescriptionDecision] = useState("");
  const [handleConfirmDecision, setHandleConfirmDecision] = useState(() => {});

  const [contatos, setContatos] = useState([]);

  console.log("contatos: ", contatos);

  useEffect(() => {
    async function GetContatos() {
      await getContatos();
    }
    GetContatos();
  }, []);

  const [contato, setContato] = useState({
    nome: "",
    fone: "",
    email: "",
  });

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
    setHandleConfirmDecision(() => registerContato);
  }

  async function getContatos() {
    const response = await contatoAPI.getContatos();
    setContatos(response.data);
  }

  async function registerContato() {
    if (!contato.nome)
      return handleWarning("Nome não pode ser vazio!", "error");
    if (!contato.fone)
      return handleWarning("Telefone não pode ser vazio!", "error");
    if (!contato.email)
      return handleWarning("E-mail não pode ser vazio!", "error");

    await contatoAPI.registerContato(contato);

    handleWarning("Funcionário cadastrado com sucesso", "success");

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
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" style={{ color: "#fff", marginBottom: 64 }}>
          Gerenciar contatos
        </Typography>
      </div>
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
            Cadastrar contato
          </Typography>
          <div style={{ width: "70%" }}>
            <TextField
              variant="outlined"
              id="outlined-required"
              label="Nome do Contato"
              margin="dense"
              fullWidth
              style={{ marginBottom: 16 }}
              value={contato.nome}
              onChange={(event) =>
                setContato({ ...contato, nome: event.target.value })
              }
            />
            <TextField
              variant="outlined"
              id="outlined-required"
              label="Telefone"
              margin="dense"
              fullWidth
              style={{ marginBottom: 16 }}
              value={contato.fone}
              onChange={(event) =>
                setContato({ ...contato, fone: event.target.value })
              }
            />
            <TextField
              variant="outlined"
              id="outlined-required"
              label="E-mail"
              margin="dense"
              fullWidth
              style={{ marginBottom: 16 }}
              value={contato.email}
              onChange={(event) =>
                setContato({ ...contato, email: event.target.value })
              }
            />
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
        <div
          style={{
            width: "30%",
            height: "50vh",
            display: "flex",
            flexDirection: "column",
            borderRadius: 5,
            borderColor: "#fff",
            borderStyle: "solid",
            alignItems: "center",
            padding: 16,
          }}
        >
          <Typography variant="h6" style={{ color: "#fff", marginBottom: 32 }}>
            Contatos
          </Typography>

          {contatos.length > 0 &&
            contatos.map((contato) => {
              return (
                <div
                  style={{
                    width: "95%",
                    height: "8vh",
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: "#fff",
                    borderStyle: "solid",
                    margin: 8,
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <Typography
                      style={{
                        fontWeight: 700,
                        color: "#fff",
                        textAlign: "center",
                      }}
                    >
                      Nome
                      <Typography
                        style={{
                          color: "#fff",
                          textAlign: "center",
                        }}
                      >
                        {contato.nome}
                      </Typography>
                    </Typography>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <Typography
                      style={{
                        fontWeight: 700,
                        textAlign: "center",
                        color: "#fff",
                      }}
                    >
                      Telefone
                      <Typography
                        style={{
                          textAlign: "center",
                          color: "#fff",
                        }}
                      >
                        {contato.fone}
                      </Typography>
                    </Typography>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <Typography
                      style={{
                        fontWeight: 700,
                        textAlign: "center",
                        color: "#fff",
                      }}
                    >
                      E-mail
                      <Typography
                        style={{
                          textAlign: "center",
                          color: "#fff",
                        }}
                      >
                        {contato.email}
                      </Typography>
                    </Typography>
                  </div>
                </div>
              );
            })}
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
