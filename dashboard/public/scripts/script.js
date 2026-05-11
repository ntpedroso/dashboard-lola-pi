document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById('sidebar');
  const btnOpen = document.getElementById('menu-toggle');
  const btnClose = document.getElementById('menu-close');
  const overlay = document.getElementById('sidebar-overlay');

  // Função central para alternar o menu
  const toggleMenu = () => {
    const isOpen = !sidebar.classList.contains('-translate-x-full');
    
    if (isOpen) {
      // FECHAR
      sidebar.classList.add('-translate-x-full');
      overlay.classList.add('opacity-0');
      setTimeout(() => overlay.classList.add('hidden'), 300); // Espera a animação sumir
    } else {
      // ABRIR
      overlay.classList.remove('hidden');
      // Pequeno delay para a animação de opacidade funcionar
      setTimeout(() => overlay.classList.remove('opacity-0'), 10);
      sidebar.classList.remove('-translate-x-full');
    }
  };

  // Eventos
  if (btnOpen && sidebar) {
    btnOpen.addEventListener('click', toggleMenu);
  }

  if (btnClose) {
    btnClose.addEventListener('click', toggleMenu);
  }

  // Fechar ao clicar no fundo escuro (muito bom para UX)
  if (overlay) {
    overlay.addEventListener('click', toggleMenu);
  }
});

//função para mostrar a data atual
function mostrarDataAtual() {
  const elementoData = document.getElementById('data-atual');

  if (elementoData) {
    const hoje = new Date();

    // Formata a data: 17 de abril de 2026
    const dataFormatada = hoje.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    elementoData.innerText = dataFormatada;
  }
}

// Chama a função assim que a página carregar
document.addEventListener('DOMContentLoaded', mostrarDataAtual);

// função para a barra de pesquisa
document.addEventListener('DOMContentLoaded', () => {
  const btnPesquisar = document.getElementById('btn-pesquisar');
  const inputPesquisar = document.getElementById('input-pesquisar');

  // Como você tem dois IDs "notif", vamos pegar o ícone de notificação real
  const imgNotif = document.querySelector('img[alt="Notificação"]');

  if (btnPesquisar && inputPesquisar) {
    btnPesquisar.addEventListener('click', (e) => {
      e.preventDefault();

      const estaFechado = inputPesquisar.classList.contains('w-0');
      const verificaTela = window.innerWidth >= 640;

      if (estaFechado) {
        // ABRIR
        inputPesquisar.classList.remove('w-0', 'opacity-0', 'p-0');
        inputPesquisar.classList.add('w-40', 'sm:w-80', 'md:w-100', 'opacity-100', 'px-3');

        if (!verificaTela && imgNotif) {
          // Esconde a notificação para sobrar espaço no mobile
          if (imgNotif) imgNotif.classList.add('hidden');
        }

        inputPesquisar.focus();
      } else {
        // FECHAR (Só fecha se estiver vazio)
        if (inputPesquisar.value === "") {
          inputPesquisar.classList.add('w-0', 'opacity-0', 'p-0');
          inputPesquisar.classList.remove('w-40', 'opacity-100', 'px-3');

          if (imgNotif) imgNotif.classList.remove('hidden');
        } else {
          console.log("Pesquisando por:", inputPesquisar.value);
        }
      }
    });

    // Fechar ao clicar fora
    document.addEventListener('click', (e) => {
      if (!btnPesquisar.contains(e.target) && !inputPesquisar.contains(e.target)) {
        if (!inputPesquisar.classList.contains('w-0') && inputPesquisar.value === "") {
          inputPesquisar.classList.add('w-0', 'opacity-0', 'p-0');
          inputPesquisar.classList.remove('w-40', 'opacity-100', 'px-3');
          if (imgNotif) imgNotif.classList.remove('hidden');
        }
      }
    });
  }
});
