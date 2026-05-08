// ==================== DADOS INICIAIS ====================
let pedidos = [
    {
        id: "P001",
        titulo: "Camisetas e Shorts",
        subtitulo: "20/03/2026 • Em lavagem",
        cor: "blue",
        detalhes: {
            pecas: "8 peças",
            valor: "R$ 42,00",
            endereco: "Rua das Flores, 123 - Centro",
            status: "Em lavagem",
            previsao: "22/03/2026"
        }
    },
    {
        id: "P002",
        titulo: "Jeans e Calças",
        subtitulo: "18/03/2026 • Pronto",
        cor: "blue",
        detalhes: {
            pecas: "5 peças",
            valor: "R$ 68,00",
            endereco: "Av. Paulista, 456 - Bela Vista",
            status: "Pronto",
            previsao: "Entregue hoje"
        }
    },
    {
        id: "P003",
        titulo: "Lençóis e Toalhas",
        subtitulo: "15/03/2026 • Lavando",
        cor: "blue",
        detalhes: {
            pecas: "12 peças",
            valor: "R$ 55,00",
            endereco: "Rua Augusta, 789",
            status: "Lavando",
            previsao: "21/03/2026"
        }
    },
    {
        id: "P004",
        titulo: "Vestidos e Blusas",
        subtitulo: "12/03/2026 • Entregue",
        cor: "blue",
        detalhes: {
            pecas: "6 peças",
            valor: "R$ 89,00",
            endereco: "Rua Oscar Freire, 1010",
            status: "Entregue",
            previsao: "Entregue em 16/03"
        }
    }
];

// ==================== RENDERIZAR PEDIDOS ====================
function renderizarPedidos(pedidosFiltrados) {
    const container = document.getElementById('pedidos-container');
    container.innerHTML = '';

    pedidosFiltrados.forEach(pedido => {
        const cardHTML = `
            <div class="card">
                <div class="w-16 h-16 bg-blue-500 rounded-2xl flex-shrink-0 shadow-inner"></div>
                <div class="flex-1 min-w-0">
                    <p class="font-semibold text-xl text-white truncate">${pedido.titulo}</p>
                    <p class="text-zinc-400 text-base mt-1">${pedido.subtitulo}</p>
                </div>
                <button onclick="verDetalhes('${pedido.id}')" 
                        class="w-12 h-12 bg-emerald-500 hover:bg-emerald-600 transition-colors rounded-2xl flex items-center justify-center shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5 16.477 5 20.268 7.943 21.542 12 20.268 16.057 16.477 19 12 19 7.523 19 3.732 16.057 2.458 12z" />
                    </svg>
                </button>
            </div>
        `;
        container.innerHTML += cardHTML;
    });

    if (pedidosFiltrados.length === 0) {
        container.innerHTML = `
            <div class="text-center py-12 text-zinc-400">
                <p class="text-6xl mb-4">🔍</p>
                <p class="text-lg">Nenhum pedido encontrado</p>
            </div>
        `;
    }
}

// ==================== FILTRAR PEDIDOS ====================
function filtrarPedidos() {
    const termo = document.getElementById('search-input').value.toLowerCase().trim();
    
    const filtrados = pedidos.filter(p =>
        p.titulo.toLowerCase().includes(termo) ||
        p.subtitulo.toLowerCase().includes(termo)
    );
    
    renderizarPedidos(filtrados);
}

// ==================== NOVO PEDIDO ====================
function novoPedido() {
    const titulosAleatorios = ["Saias e Blusas", "Toalhas de Banho", "Moletons e Casacos", "Roupas de Cama", "Tênis e Meias"];
    const statusAleatorios = ["Em lavagem", "Pronto", "Lavando", "Entregue"];
    const datas = ["21/03/2026", "22/03/2026", "23/03/2026"];

    const novo = {
        id: "P" + String(Math.floor(Math.random() * 900) + 100),
        titulo: titulosAleatorios[Math.floor(Math.random() * titulosAleatorios.length)],
        subtitulo: datas[Math.floor(Math.random() * datas.length)] + " • " + statusAleatorios[Math.floor(Math.random() * statusAleatorios.length)],
        cor: "blue",
        detalhes: {
            pecas: Math.floor(Math.random() * 15) + 3 + " peças",
            valor: "R$ " + (Math.floor(Math.random() * 120) + 25) + ",00",
            endereco: "Rua Exemplo, " + Math.floor(Math.random() * 999) + " - Bairro",
            status: statusAleatorios[Math.floor(Math.random() * statusAleatorios.length)],
            previsao: "Entrega em 3 dias"
        }
    };

    pedidos.unshift(novo);
    renderizarPedidos(pedidos);

    // Notificação
    const notificacao = document.createElement('div');
    notificacao.className = 'fixed bottom-6 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-8 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-sm font-medium z-50';
    notificacao.innerHTML = `✅ Novo pedido #${novo.id} criado!`;
    document.body.appendChild(notificacao);

    setTimeout(() => {
        notificacao.style.opacity = '0';
        setTimeout(() => notificacao.remove(), 500);
    }, 2500);
}

// ==================== MODAL ====================
function verDetalhes(id) {
    const pedido = pedidos.find(p => p.id === id);
    if (!pedido) return;

    document.getElementById('modal-titulo').textContent = `Pedido ${pedido.id}`;

    const conteudo = `
        <div class="bg-zinc-800 rounded-2xl p-6 space-y-5">
            <div class="flex justify-between items-center">
                <span class="text-zinc-400">Status</span>
                <span class="px-5 py-1 bg-emerald-400 text-emerald-950 text-xs font-bold rounded-full">${pedido.detalhes.status}</span>
            </div>
            <div class="grid grid-cols-2 gap-6 text-sm">
                <div>
                    <p class="text-zinc-400">Peças</p>
                    <p class="text-2xl font-semibold">${pedido.detalhes.pecas}</p>
                </div>
                <div>
                    <p class="text-zinc-400">Valor total</p>
                    <p class="text-2xl font-semibold">${pedido.detalhes.valor}</p>
                </div>
            </div>
            <div>
                <p class="text-zinc-400 text-sm">Endereço de entrega</p>
                <p class="text-white mt-1">${pedido.detalhes.endereco}</p>
            </div>
            <div>
                <p class="text-zinc-400 text-sm">Previsão</p>
                <p class="text-white mt-1">${pedido.detalhes.previsao}</p>
            </div>
        </div>
    `;

    document.getElementById('modal-conteudo').innerHTML = conteudo;
    document.getElementById('modal').classList.remove('hidden');
    document.getElementById('modal').classList.add('flex');
}

function fecharModal() {
    const modal = document.getElementById('modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

function confirmarRecebimento() {
    alert("✅ Pedido marcado como recebido! Obrigado por usar a Lavanderia Radical.");
    fecharModal();
}

// ==================== OUTRAS FUNÇÕES ====================
function filtrarPorClick() {
    const opcoes = ["Data mais recente", "Valor mais alto", "Status: Pronto", "Status: Em lavagem"];
    const escolha = opcoes[Math.floor(Math.random() * opcoes.length)];
    
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-6 right-6 bg-violet-600 text-white px-6 py-3 rounded-2xl shadow-xl text-sm z-50';
    toast.textContent = `Filtro aplicado: ${escolha}`;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.remove(), 2200);
}

function fakeTabClick(btn) {
    btn.style.transform = 'scale(0.95)';
    setTimeout(() => btn.style.transform = 'scale(1)', 150);
}

// ==================== INICIALIZAÇÃO ====================
function inicializar() {
    renderizarPedidos(pedidos);

    // Fechar modal clicando fora
    const modal = document.getElementById('modal');
    modal.addEventListener('click', (e) => {
        if (e.target === modal) fecharModal();
    });

    console.log('%c✅ Lavanderia Radical carregada com sucesso!', 'color:#22c55e; font-weight:bold');
}

window.onload = inicializar;