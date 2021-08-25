import React, { useState, useEffect } from "react";
import { Typography, TextField, Button, Grid, Paper } from "@material-ui/core";
import history from "../../history";
import * as usuarioAPI from "../../util/API/usuarioAPI";
import Warning from "../../components/Warning";

export default function Login() {
  const [warningMessage, setWarningMessage] = useState("");
  const [openWarning, setOpenWarning] = useState(false);
  const [typeWarning, setTypeWarning] = useState("info");
  const [username, setUsername] = useState("");
  const [senha, setSenha] = useState("");
  function handleWarning(message, type) {
    setOpenWarning(true);
    setWarningMessage(message);
    setTypeWarning(type);
  }

  function onCloseWarning() {
    setOpenWarning(false);
  }

  async function login() {
    if (!username) return handleWarning("E-mail não pode ser vazio!", "error");
    if (!senha) return handleWarning("Senha não pode ser vazio!", "error");

    const response = await usuarioAPI.autentica(username, senha);

    if (!response.data)
      return handleWarning("Nome de usuário e/ou senha inválido!", "error");

    localStorage.setItem("id_usuario", response.data);

    handleWarning("Login feito com sucesso!", "success");

    setTimeout(() => {
      history.push("/home");
    }, 3000);
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "30%",
          height: "50%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
          borderRadius: "8px",
        }}
      >
        <Typography
          variant="h5"
          style={{
            textAlign: "justify",
            color: "#fff",
          }}
        >
          Desenvolvimento web
        </Typography>
        <Typography
          variant="body1"
          style={{
            fontWeight: 600,
            textAlign: "justify",
            color: "#fff",
          }}
        >
          Afonso Uéslei Böing
        </Typography>
        <Typography
          variant="body1"
          style={{
            fontWeight: 600,
            textAlign: "justify",
            color: "#fff",
          }}
        >
          Lucas Ramthum Vegini
        </Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "60%",
          }}
        >
          <TextField
            variant="outlined"
            id="outlined-required"
            label="Nome de usuário"
            margin="dense"
            fullWidth
            style={{ marginBottom: 16 }}
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <TextField
            label="Senha"
            variant="outlined"
            margin="dense"
            type="password"
            style={{ marginBottom: 16 }}
            fullWidth
            value={senha}
            onChange={(event) => setSenha(event.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginBottom: 16 }}
            onClick={login}
          >
            Entrar
          </Button>
          <Button
            variant="text"
            color="#fff"
            onClick={() => history.push("/register")}
          >
            Não tem conta? Cadastre-se
          </Button>
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
    </div>
  );
}
