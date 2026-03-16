
  document.addEventListener("DOMContentLoaded", () => {

  // -------- SOMAR AUTOMATICAMENTE --------
  function recalcular() {
    document.querySelectorAll("tbody tr").forEach((linha) => {
      const inputs = linha.querySelectorAll("input.calc");
      if (!inputs.length) return;

      let total = 0;
      inputs.forEach(inp => {
        const val = parseFloat((inp.value || "0").replace(",", ".")) || 0;
        total += val;
      });

      const unidade = linha.dataset.unit || "";
      const campo = linha.querySelector(".total");
      campo.textContent = unidade ? `${total}${unidade}` : total;
    });
  }

  document.body.addEventListener("input", e => {
    if (e.target.matches("input.calc")) {
      salvarLocal(e.target);
      recalcular();
    }
  });

// -----------------------------
// NAVEGAÇÃO TIPO PLANILHA
// -----------------------------

const inputs = Array.from(document.querySelectorAll("input.calc"));
const cols = 7; // quantidade de colunas

inputs.forEach((inp, index) => {

  // selecionar automaticamente
  inp.addEventListener("focus", () => {
    inp.select();
  });

  inp.addEventListener("keydown", (e) => {

    switch (e.key) {

      case "ArrowRight":
        if (inputs[index + 1]) inputs[index + 1].focus();
        e.preventDefault();
        break;

      case "ArrowLeft":
        if (inputs[index - 1]) inputs[index - 1].focus();
        e.preventDefault();
        break;

      case "ArrowDown":
        if (inputs[index + cols]) inputs[index + cols].focus();
        e.preventDefault();
        break;

      case "ArrowUp":
        if (inputs[index - cols]) inputs[index - cols].focus();
        e.preventDefault();
        break;

      case "Enter":
        if (inputs[index + cols]) inputs[index + cols].focus();
        e.preventDefault();
        break;

    }

  });

});

  // -------- SALVAR AUTOMATICAMENTE (LOCALSTORAGE) --------
  function gerarID(linha, coluna) {
    return `campo_l${linha}_c${coluna}`;
  }

  const linhas = document.querySelectorAll("tbody tr");
  linhas.forEach((tr, linhaI) => {
    const inputs = tr.querySelectorAll("input.calc");

    inputs.forEach((inp, colI) => {
      const id = gerarID(linhaI, colI);
      inp.dataset.id = id;

      const salvo = localStorage.getItem(id);
      if (salvo !== null) inp.value = salvo;
    });
  });

  function salvarLocal(inp) {
    localStorage.setItem(inp.dataset.id, inp.value);
  }

  // carregar totals ao abrir
  recalcular();

  
});
