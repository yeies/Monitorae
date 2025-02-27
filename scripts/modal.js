// Obter o modal
var modal = document.getElementById("modalCadastro");

// Obter o botão que abre o modal
var btn = document.getElementById("openCadastro");

// Obter o <span> que fecha o modal
var span = document.getElementById("closeCadastro");

// Função para abrir o modal com transição
btn.onclick = function() {
    // Exibe o modal inicialmente
    modal.style.display = "flex"; 
    
    // Adiciona um pequeno atraso para garantir que o layout seja renderizado antes da animação
    setTimeout(function() {
        // Aplica a animação de transição para o modal
        modal.style.opacity = 1; // Torna visível
        modal.querySelector('.modal-content').style.transform = "translateY(0)"; // Move para a posição original
    }, 10); // 10ms de delay para garantir que o layout tenha tempo de ser carregado
};

// Função para fechar o modal com transição
span.onclick = function() {
    // Adiciona transição de saída
    modal.style.opacity = 0; // Torna invisível
    modal.querySelector('.modal-content').style.transform = "translateY(-50px)"; // Move para fora da tela
    
    // Aguarda o tempo da animação para esconder completamente o modal
    setTimeout(function() {
        modal.style.display = "none"; // Esconde o modal
    }, 250); // O tempo do setTimeout deve ser igual ao da animação
};

// Fechar o modal ao clicar fora dele
window.onclick = function(event) {
    if (event.target == modal) {
        // Adiciona transição de saída
        modal.style.opacity = 0; // Torna invisível
        modal.querySelector('.modal-content').style.transform = "translateY(-50px)"; // Move para fora da tela
        
        // Aguarda o tempo da animação para esconder completamente o modal
        setTimeout(function() {
            modal.style.display = "none"; // Esconde o modal
        }, 250); // O tempo do setTimeout deve ser igual ao da animação
    }
}

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