function validarELogar2() {
    const email = document.querySelector(".email").value.trim();
    const senha = document.querySelector(".senha").value.trim();
    
    if (email === "" || senha === "") {
        alert("Por favor, preencha todos os campos!");
        return;
    }
    
    logar();
}
