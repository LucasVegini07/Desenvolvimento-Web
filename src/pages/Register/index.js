import React, { useState } from "react";
import Warning from "../../components/Warning";
import Decision from "../../components/Decision";
import history from "../../history";
import { Typography, TextField, Button } from "@material-ui/core";
import * as usuarioAPI from "../../util/API/usuarioAPI";

export default function Register() {
  const [usuario, setUsuario] = useState({
    nome: "",
    username: "",
    senha: "",
  });

  const [confirmSenha, setConfirmSenha] = useState("");

  const [warningMessage, setWarningMessage] = useState("");
  const [openWarning, setOpenWarning] = useState(false);
  const [typeWarning, setTypeWarning] = useState("info");
  const [openDecision, setOpenDecision] = useState(false);
  const [titleDecision, setTitleDecision] = useState("");
  const [descriptionDecision, setDescriptionDecision] = useState("");
  const [handleConfirmDecision, setHandleConfirmDecision] = useState(() => {});

  function handleNotSure() {
    setOpenDecision(false);
  }

  function handleChangeDecision(title, description) {
    setTitleDecision(title);
    setDescriptionDecision(description);
    setOpenDecision(true);
    setHandleConfirmDecision(() => Register);
  }

  function handleWarning(message, type) {
    setOpenWarning(true);
    setWarningMessage(message);
    setTypeWarning(type);
  }

  function onCloseWarning() {
    setOpenWarning(false);
  }

  async function Register() {
    if (!usuario.nome)
      return handleWarning("Nome não pode ser vazio!", "error");
    if (!usuario.username)
      return handleWarning("Nome de usuário não pode ser vazio!", "error");

    if (!usuario.senha)
      return handleWarning("Senha não pode ser vazio!", "error");

    if (!confirmSenha)
      return handleWarning("Confirmar senha não pode ser vazio!", "error");

    if (usuario.senha !== confirmSenha)
      return handleWarning("Senhas devem ser iguais!", "error");

    const response = await usuarioAPI.registerUsuario(usuario);

    handleWarning("Cadastro feito com sucesso", "success");

    setTimeout(() => {
      history.push("/login");
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
          width: "20%",
          height: "60%",
          padding: 16,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: "8px",
        }}
      >
        <Typography variant="h5" style={{ fontWeight: 600, color: "#fff" }}>
          CADASTRE-SE
        </Typography>
        <TextField
          style={{ width: "100%" }}
          variant="outlined"
          label="Nome completo"
          margin="dense"
          fullWidth
          value={usuario.nome}
          onChange={(event) =>
            setUsuario({ ...usuario, nome: event.target.value })
          }
        />
        <TextField
          style={{ width: "100%" }}
          variant="outlined"
          label="Nome de usuário"
          margin="dense"
          fullWidth
          value={usuario.username}
          onChange={(event) =>
            setUsuario({ ...usuario, username: event.target.value })
          }
        />
        <TextField
          style={{ width: "100%" }}
          variant="outlined"
          label="Senha"
          type="password"
          margin="dense"
          fullWidth
          value={usuario.senha}
          onChange={(event) =>
            setUsuario({ ...usuario, senha: event.target.value })
          }
        />
        <TextField
          style={{ width: "100%" }}
          variant="outlined"
          label="Confirmar senha"
          type="password"
          margin="dense"
          fullWidth
          value={confirmSenha}
          onChange={(event) => setConfirmSenha(event.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() =>
            handleChangeDecision(
              "Cadastro",
              "Atenção! Você está se cadastrando no sistema, desaja continuar?"
            )
          }
        >
          Criar
        </Button>
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
