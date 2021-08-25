import axios from "axios";

export const registerContato = async (contato) => {
  let formData = new FormData();

  let usuario = { id: localStorage.getItem("id_usuario") };
  formData.append("contato", JSON.stringify(contato));
  formData.append("usuario", JSON.stringify(usuario));

  return await axios
    .post("http://localhost:8085/contato", formData)
    .then((res) => res)
    .catch((err) => err.response);
};

export const updateContato = async (contato) => {
  let formData = new FormData();
  formData.append("contato", JSON.stringify(contato));

  return await axios
    .put("http://localhost:8085/contato", formData)
    .then((res) => res)
    .catch((err) => err.response);
};

export const getContatos = async () => {

  return await axios
    .get(`http://localhost:8085/contato/${localStorage.getItem("id_usuario")}`)
    .then((res) => res)
    .catch((err) => err.response);
};
