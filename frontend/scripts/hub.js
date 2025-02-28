document.addEventListener("DOMContentLoaded", function () {
    // Pegamos o usuário salvo no localStorage
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

    // Verificamos se existe um usuário logado
    if (usuarioLogado && usuarioLogado.nome) {
        document.getElementById("userName").textContent = usuarioLogado.nome;
        document.getElementById("userName-aside").textContent = usuarioLogado.nome;
    } else {
        document.getElementById("userName").textContent = "Usuário";
        document.getElementById("userName-aside").textContent = "Usuário";
    }
});

// Logout
document.getElementById("logout").addEventListener("click", function() {
    localStorage.removeItem("usuarioLogado"); // Remove o usuário logado
    window.location.href = "index.html"; // Redireciona para a página inicial
});


const status = document.getElementById("textoStatus");
const botao = document.getElementById("perfil");

botao.addEventListener("click", () => {
    status.classList.toggle("afk");

    if (status.classList.
        contains("afk")) {
        status.textContent = "• Ausente";
    } else {
        status.textContent = "• Online";
    }
})