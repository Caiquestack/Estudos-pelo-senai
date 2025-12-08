function menuShow() {
  let menuMobile = document.querySelector(".mobile-menu");
  let corFundoMenu = document.querySelector("header");
  let iconButton = document.querySelector(".butom-img"); // Seleciona o botão

  if (menuMobile.classList.contains("open")) {
    menuMobile.classList.remove("open");
    iconButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>`;
    // coloquei o innerHTML para trocar o icone do botão ja que é um linck direto dentro de uma teg sv ao inves do comando : docunmnt.querySelector('butom-img').src = 'caminho do icone' para mudar a imagem altomatacamente.
    corFundoMenu.style.backgroundColor = "rgb(67, 65, 65)";
    // quando volta ao normal o fundo volta a cor original
  } else {
    menuMobile.classList.add("open");
    iconButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>`;
    corFundoMenu.style.backgroundColor = "#000";
    // quando o menu abre o fundo fica preto
    // fiz essa diferenciação dde cor para melhor visualização do menu e seu entrendimento para os estudos
  }
}
