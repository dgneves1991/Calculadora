document.addEventListener('DOMContentLoaded', () => {

const inputs = Array.from(document.querySelectorAll("input.calc"));

function recalcularTodasLinhas() {

  const linhas = document.querySelectorAll('table tbody tr');

  linhas.forEach(linha => {

    const inputsLinha = linha.querySelectorAll('input.calc');
    if (inputsLinha.length === 0) return;

    let soma = 0;

    inputsLinha.forEach(inp => {

      let valor = inp.value || "0";
      valor = valor.replace(",", ".");

      const numero = parseFloat(valor);
      if(!isNaN(numero)) soma += numero;

    });

    const campoTotal = linha.querySelector('.total');
    if(!campoTotal) return;

    const unidade = linha.dataset.unit || "";

    campoTotal.textContent = unidade ? soma + unidade : soma;

  });

}

document.body.addEventListener("input", e => {
  if (e.target.classList.contains("calc")) {
    recalcularTodasLinhas();
  }
});


// --------------------
// NAVEGAÇÃO COM TECLAS
// --------------------

const colunas = 7;

inputs.forEach((input, index) => {

  input.addEventListener("keydown", e => {

    let destino = null;

    if(e.key === "ArrowRight") destino = inputs[index + 1];
    if(e.key === "ArrowLeft") destino = inputs[index - 1];
    if(e.key === "ArrowDown" || e.key === "Enter") destino = inputs[index + colunas];
    if(e.key === "ArrowUp") destino = inputs[index - colunas];

    if(destino){
      destino.focus();
      e.preventDefault();
    }

  });

});

recalcularTodasLinhas();

});
