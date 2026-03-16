
  document.addEventListener('DOMContentLoaded', () => {

const inputs = Array.from(document.querySelectorAll("input.calc"));

function recalcularTodasLinhas() {
  const linhas = document.querySelectorAll('table tbody tr');

  linhas.forEach(linha => {

    const inputsLinha = Array.from(linha.querySelectorAll('input.calc'));
    if (inputsLinha.length === 0) return;

    let campoTotal = linha.querySelector('.total');
    if (!campoTotal) {
      const tds = linha.querySelectorAll('td');
      campoTotal = tds[tds.length - 1];
    }

    let soma = 0;

    inputsLinha.forEach(inp => {
      const valor = parseFloat(inp.value.replace(",", ".")) || 0;
      soma += valor;
    });

    const unidade = linha.dataset.unit || '';
    campoTotal.textContent = unidade ? soma + unidade : soma;

  });
}

document.body.addEventListener("input", e => {
  if (e.target.matches("input.calc")) recalcularTodasLinhas();
});


inputs.forEach((inp, index) => {

  inp.addEventListener("keydown", e => {

    const cols = 7;

    switch(e.key){

      case "ArrowRight":
        if(inputs[index+1]) inputs[index+1].focus();
        e.preventDefault();
      break;

      case "ArrowLeft":
        if(inputs[index-1]) inputs[index-1].focus();
        e.preventDefault();
      break;

      case "ArrowDown":
      case "Enter":
        if(inputs[index+cols]) inputs[index+cols].focus();
        e.preventDefault();
      break;

      case "ArrowUp":
        if(inputs[index-cols]) inputs[index-cols].focus();
        e.preventDefault();
      break;

    }

  });

});

recalcularTodasLinhas();

});
