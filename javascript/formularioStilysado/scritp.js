function ativar() {
    const nome = document.getElementById("nome");
    const email = document.getElementById("email");
    const cpf = document.getElementById("cpf");
    const primeiraSenha = document.getElementById("senha");
    const segundaSenha = document.getElementById("comfirmarSenha");
    const mensagem = document.getElementById("caixaMensagem");
    const form = document.getElementById("formActive");

    if (primeiraSenha.value === segundaSenha.value) {
        mensagem.innerHTML = "<h1>O formulário foi enviado com sucesso</h1>";
        resetForm()
        return true;
    } else {
        alert("Os campos de senha não batem tente novamente");
    }
    console.log(mensagem)

    return false;

}

function formActive(event) {
    event.preventDefault();

    ativar();
}
function resetForm() {
    form.reset();
}
