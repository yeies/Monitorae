document.addEventListener("DOMContentLoaded", function() {
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    let usuarioLogado = usuarios[usuarios.length - 1]; 

    if (usuarioLogado && usuarioLogado.nome) {
        document.getElementById("welcome-message").textContent = `Bem-vindo(a), ${usuarioLogado.nome}!`;
    }
});

// Logout
document.getElementById("logout").addEventListener("click", function() {
    window.location.href = "index.html"; 
});

// Função para abrir e fechar o menu em telas menores
function toggleMenu() {
    let navLinks = document.querySelector(".nav-links");
    navLinks.classList.toggle("active");
}
