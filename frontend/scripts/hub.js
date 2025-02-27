document.addEventListener("DOMContentLoaded", function () {
    // Pegamos o usuário salvo no localStorage
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

    // Verificamos se existe um usuário logado
    if (usuarioLogado && usuarioLogado.nome) {
        document.getElementById("user-name").textContent = usuarioLogado.nome;
    } else {
        document.getElementById("user-name").textContent = "null";
    }
});

// Logout
document.getElementById("logout").addEventListener("click", function() {
    localStorage.removeItem("usuarioLogado"); // Remove o usuário logado
    window.location.href = "index.html"; // Redireciona para a página inicial
});

// Função para abrir e fechar o menu em telas menores
function toggleMenu() {
    let navLinks = document.querySelector(".nav-links");
    navLinks.classList.toggle("active");
}