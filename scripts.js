
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

  // -------- NAVEGAÇÃO POR SETAS + ENTER (descer reto) --------
document.querySelectorAll("input.calc").forEach(inp => {
  inp.addEventListener("keydown", (e) => {
    const td = inp.closest("td");
    const tr = inp.closest("tr");
    if (!td || !tr) return;

    const colIndex = td.cellIndex;
    let alvo = null;

    const key = e.key;

    // ENTER comporta-se como seta para baixo
    const descida = (key === "ArrowDown");
    const subida = (key === "ArrowUp");
    const esquerda = (key === "ArrowLeft");
    const direita = (key === "ArrowRight");

    if (descida) {
      let next = tr.nextElementSibling;
      while (next) {
        const cell = next.children[colIndex];
        if (cell) {
          const candidate = cell.querySelector("input.calc");
          if (candidate) {
            alvo = candidate;
            break;
          }
        }
        next = next.nextElementSibling;
      }
    }

    if (subida) {
      let prev = tr.previousElementSibling;
      while (prev) {
        const cell = prev.children[colIndex];
        if (cell) {
          const candidate = cell.querySelector("input.calc");
          if (candidate) {
            alvo = candidate;
            break;
          }
        }
        prev = prev.previousElementSibling;
      }
    }

    if (esquerda) {
      let left = colIndex - 1;
      while (left >= 0) {
        const cell = tr.children[left];
        if (cell) {
          const candidate = cell.querySelector("input.calc");
          if (candidate) {
            alvo = candidate;
            break;
          }
        }
        left--;
      }
    }

    if (direita) {
      let right = colIndex + 1;
      while (right < tr.children.length) {
        const cell = tr.children[right];
        if (cell) {
          const candidate = cell.querySelector("input.calc");
          if (candidate) {
            alvo = candidate;
            break;
          }
        }
        right++;
      }
    }

    if (alvo) {
      e.preventDefault();
      alvo.focus();
      alvo.select();
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
