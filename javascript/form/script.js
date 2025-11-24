
function verificarSenha() {
    const senha = document.getElementById("senha");
    const senhaComfirmar = document.getElementById("ComfirmarSenha");
    const sim = document.getElementById("sim");
    const nao = document.getElementById("nao");

    if (senha != senhaComfirmar) {
        alert('Sua senha é diferente do segundo campo ')
    }
    if(sim && sim.checked){
        alert('Você é residente do Brasil')
    }else{
        if(nao&&nao.checked){
            alert('Você não é residente do Brasil')
            return true;
            // return true para permitir o envio do formulário caso uma das opções seja selecionada;
        }else{
            alert('Por favor, selecione uma das opções de residente do Brasil')
        }return false;
        // return false para evitar o envio do formulário caso nenhuma opção seja selecionada;
    }
}

function esecutar() {
    verificarSenha();

}
