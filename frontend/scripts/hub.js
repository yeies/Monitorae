document.addEventListener("DOMContentLoaded", async function () {
    const token = localStorage.getItem("token");

    if (!token) {
        document.getElementById("user-name").textContent = "Usuário";
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/api/usuario-logado", {
            headers: { Authorization: `Bearer ${token}` }
        });

        const data = await response.json();
        if (data.nome) {
            document.getElementById("user-name").textContent = data.nome;
        } else {
            document.getElementById("user-name").textContent = "Usuário";
        }
    } catch (error) {
        console.error("Erro ao buscar usuário:", error);
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
