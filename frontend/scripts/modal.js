document.addEventListener("DOMContentLoaded", function () {
    var modal = document.getElementById("modalCadastro");
    var btn = document.getElementById("openCadastro");
    var span = document.getElementById("closeCadastro");

    // Função para abrir o modal
    btn.onclick = function () {
        modal.style.display = "flex"; // Torna o modal visível
        setTimeout(() => {
            modal.style.opacity = "1";
            modal.querySelector('.modal-content').style.transform = "translateY(0)";
        }, 10); // Pequeno delay para animação funcionar
    };

    // Função para fechar o modal
    span.onclick = function () {
        fecharModal();
    };

    // Fecha ao clicar fora do modal
    window.onclick = function (event) {
        if (event.target == modal) {
            fecharModal();
        }
    };

    function fecharModal() {
        modal.style.opacity = "0";
        modal.querySelector('.modal-content').style.transform = "translateY(-50px)";
        setTimeout(() => {
            modal.style.display = "none";
        }, 250);
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const cadastroBtn = document.querySelector("#modalCadastro button"); // Botão de cadastro

    cadastroBtn.addEventListener("click", function() {
        const nome = document.querySelector("#modalCadastro input[type='text']").value;
        const email = document.querySelector("#modalCadastro input[type='email']").value;
        const senha = document.querySelector("#modalCadastro input[type='password']").value;

        if (nome === "" || email === "" || senha === "") {
            alert("Preencha todos os campos!");
            return;
        }

        // Verifica se o usuário já existe
        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        let usuarioExistente = usuarios.find(user => user.email === email);

        if (usuarioExistente) {
            alert("Este e-mail já está cadastrado!");
            return;
        }

        // Salva o novo usuário no LocalStorage
        usuarios.push({ nome, email, senha });
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        alert("Cadastro realizado com sucesso!");
        document.getElementById("modalCadastro").style.display = "none";
    });
});

document.querySelector(".form button").addEventListener("click", function() {
    const email = document.querySelector(".form input[type='text']").value;
    const senha = document.querySelector(".form input[type='password']").value;

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    let usuarioValido = usuarios.find(user => (user.email === email && user.senha === senha));

    if (usuarioValido) {
        alert("Login bem-sucedido!");
        window.location.href = "hub.html"; // Redireciona para o hub
    } else {
        alert("Usuário ou senha incorretos!");
    }
});

function togglePassword(inputId) {
    let input = document.getElementById(inputId);
    let icon = input.nextElementSibling.querySelector("i");

    if (input.type === "password") {
        input.type = "text";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye"); // Altera para olho aberto
    } else {
        input.type = "password";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash"); // Altera para olho fechado
    }
}
