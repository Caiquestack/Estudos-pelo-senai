function ativar() {
  const nome = document.getElementById("nome");
  const email = document.getElementById("email");
  const cpf = document.getElementById("cpf");
  const primeiraSenha = document.getElementById("senha");
  const segundaSenha = document.getElementById("comfirmarSenha");
  const mensagem = document.getElementById("caixaMensagem");

  if (primeiraSenha.value === segundaSenha.value) {
    alert("O formulário foi enviado com sucesso");
    return true;
  } else {
    alert("Os campos de senha não batem tente novamente");
  }
  return false;
}

function formActive() {
  ativar();
}
function resetForm() {
  document.getElementById("formActive").reset();
}
