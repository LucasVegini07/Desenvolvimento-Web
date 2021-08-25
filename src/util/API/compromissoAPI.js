// let api = "http://localhost:8080/api";

import axios from "axios";

export const registerCompromisso = async (compromisso, data, contato) => {
  let formData = new FormData();
  compromisso = { ...compromisso, data: data };

  let usuario = { id: localStorage.getItem("id_usuario") };

  formData.append("compromisso", JSON.stringify(compromisso));
  formData.append("contato", JSON.stringify(contato));
  formData.append("usuario", JSON.stringify(usuario));

  return await axios
    .post("http://localhost:8085/compromisso", formData)
    .then((res) => res)
    .catch((err) => err.response);
};

export const getCompromisso = async () => {
  let formData = new FormData();

  return await axios
    .get(
      `http://localhost:8085/compromisso/busca-todos/${localStorage.getItem(
        "id_usuario"
      )}`,
      formData
    )
    .then((res) => res)
    .catch((err) => err.response);
};

export const getCompromissoByData = async (dataInicio, dataFim) => {
  let formData = new FormData();

  return await axios
    .get(
      `http://localhost:8085/compromisso/filter-between/${localStorage.getItem(
        "id_usuario"
      )}/${dataInicio}/${dataFim}`,
      formData
    )
    .then((res) => res)
    .catch((err) => err.response);
};

export const getCompromissoByContatoName = async (contato) => {
  let formData = new FormData();

  return await axios
    .get(
      `http://localhost:8085/compromisso/filter-by-contato-name/${localStorage.getItem(
        "id_usuario"
      )}/${contato}`,
      formData
    )
    .then((res) => res)
    .catch((err) => err.response);
};
