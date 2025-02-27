document.addEventListener("DOMContentLoaded", function () {
    const btnCadastro = document.querySelector("#modalCadastro button");
    const btnLogin = document.querySelector(".form button");
    const modal = document.getElementById("modalCadastro");
    const openCadastro = document.getElementById("openCadastro");
    const closeCadastro = document.getElementById("closeCadastro");

    // Abrir modal de cadastro
    openCadastro.addEventListener("click", function () {
        modal.style.display = "flex";
        setTimeout(() => {
            modal.style.opacity = "1";
            modal.querySelector('.modal-content').style.transform = "translateY(0)";
        }, 10);
    });

    // Fechar modal de cadastro
    closeCadastro.addEventListener("click", fecharModal);
    window.addEventListener("click", function (event) {
        if (event.target === modal) fecharModal();
    });

    function fecharModal() {
        modal.style.opacity = "0";
        modal.querySelector('.modal-content').style.transform = "translateY(-50px)";
        setTimeout(() => { modal.style.display = "none"; }, 250);
    }

    // Cadastro
    btnCadastro.addEventListener("click", function (event) {
        event.preventDefault();

        let nome = document.querySelector("#modalCadastro input[type='text']").value;
        let email = document.querySelector("#modalCadastro input[type='email']").value;
        let senha = document.querySelector("#modalCadastro input[type='password']").value;

        if (!nome || !email || !senha) {
            alert("Preencha todos os campos!");
            return;
        }

        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        let usuarioExiste = usuarios.some(user => user.email === email);

        if (usuarioExiste) {
            alert("E-mail já cadastrado!");
        } else {
            usuarios.push({ nome, email, senha });
            localStorage.setItem("usuarios", JSON.stringify(usuarios));
            alert("Cadastro realizado com sucesso!");
            fecharModal();
        }
    });

    // Login
    btnLogin.addEventListener("click", function () {
        let email = document.querySelector(".form input[type='text']").value;
        let senha = document.querySelector(".form input[type='password']").value;

        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        let usuarioValido = usuarios.find(user => user.email === email && user.senha === senha);

        if (usuarioValido) {
            alert("Login bem-sucedido!");
            localStorage.setItem("usuarioLogado", JSON.stringify(usuarioValido));
            window.location.href = "hub.html";
        } else {
            alert("Usuário ou senha incorretos!");
        }
    });

    // Função para alternar exibição de senha
    document.querySelectorAll(".toggle-password").forEach(span => {
        span.addEventListener("click", function () {
            let input = this.previousElementSibling;
            let icon = this.querySelector("i");

            if (input.type === "password") {
                input.type = "text";
                icon.classList.replace("fa-eye-slash", "fa-eye");
            } else {
                input.type = "password";
                icon.classList.replace("fa-eye", "fa-eye-slash");
            }
        });
    });
});
