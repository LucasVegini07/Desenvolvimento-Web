import React from "react";
import { Typography } from "@material-ui/core";
import moment from "moment";
import "moment/locale/pt-br";

export default function CardConsulta(props) {
  moment.locale("pt-br");

  return (
    <div
      style={{
        width: "80%",
        height: "8vh",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: moment(props.compromisso.data).isBefore(moment())
          ? "#52C41A"
          : "#cf6679",
        borderStyle: "solid",
        margin: 8,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div></div>
        <Typography
          style={{
            fontWeight: 700,
            color: "#fff",
            textAlign: "center",
          }}
        >
          Dia
          <Typography
            style={{
              color: "#fff",
              textAlign: "center",
            }}
          >
            {props.compromisso.data}
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
          Local
          <Typography
            style={{
              textAlign: "center",
              color: "#fff",
            }}
          >
            {props.compromisso.local}
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
          Contato
          <Typography
            style={{
              textAlign: "center",
              color: "#fff",
            }}
          >
            {props.compromisso.contato.nome}
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
          Descrição
          <Typography
            style={{
              textAlign: "center",
              color: "#fff",
            }}
          >
            {props.compromisso.descricao}
          </Typography>
        </Typography>
      </div>
    </div>
  );
}
