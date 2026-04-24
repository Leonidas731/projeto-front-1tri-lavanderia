function validarELogar() {
    const email = document.querySelector(".email").value.trim();
    const senha = document.querySelector(".senha").value.trim();
    
    if (email === "" || senha === "") {
        alert("Por favor, preencha todos os campos!");
        return;
    }
    
    logar();
}


function log() {
    console.log("Função logar() foi chamada");
    console.log("URL de redirecionamento: ../logindocolaborador/funcionarioindex.html");
    
    // Teste 1: Verifica se a URL está correta
    const url = "../logindocolaborador/funcionarioindex.html";
    console.log("Tentando redirecionar para: " + url);
    
    // Teste 2: Tenta o redirecionamento
    try {
        window.location.href = url;
        console.log("Redirecionamento executado");
    } catch(error) {
        console.error("Erro ao redirecionar: " + error);
    }
}