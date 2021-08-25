
import axios from "axios";

export const registerUsuario = async (usuario) => {
  let formData = new FormData();

  formData.append("usuario", JSON.stringify(usuario));

  return await axios

    .post(`http://localhost:8085/usuario`, formData)
    .then((res) => res)
    .catch((err) => err.response);
};

export const autentica = async (
  nome,
  senha
) => {
  let formData = new FormData();

  formData.append("nome", nome);
  formData.append("senha", senha);

  return await axios
    .post(`http://localhost:8085/autentica`, formData)
    .then((res) => res)
    .catch((err) => err.response);
};
