/* Procedimentos por categoria */
const PROCEDIMENTOS = {
    corporal: [
        { id:'c1',  nome:'Massagem Relaxante',         detalhe:'60 min por sessão',         preco:'Sob consulta' },
        { id:'c2',  nome:'Drenagem Linfática Manual',  detalhe:'60 min por sessão',         preco:'Sob consulta' },
        { id:'c3',  nome:'Esfoliação Corporal',        detalhe:'45 min por sessão',         preco:'Sob consulta' },
        { id:'c4',  nome:'Hidratação Corporal',        detalhe:'45 min por sessão',         preco:'Sob consulta' },
        { id:'c5',  nome:'Radiofrequência Corporal',   detalhe:'Redução de medidas',        preco:'Sob consulta' },
        { id:'c6',  nome:'Pressoterapia',              detalhe:'Drenagem e circulação',     preco:'Sob consulta' },
        { id:'c7',  nome:'Ultrassom Cavitação',        detalhe:'Redução de gordura localizada', preco:'Sob consulta' },
        { id:'c8',  nome:'Bandagem Modeladora',        detalhe:'Contorno corporal',         preco:'Sob consulta' },
        { id:'c9',  nome:'Carboxiterapia Corporal',    detalhe:'Celulite e gordura',        preco:'Sob consulta' },
        { id:'c10', nome:'Laserterapia Corporal',      detalhe:'Cicatrizes e estrias',      preco:'Sob consulta' },
    ],
    facial: [
        { id:'f1',  nome:'Limpeza de Pele Personalizada', detalhe:'60 min — R$ 120 / sessão',  preco:'R$ 120' },
        { id:'f2',  nome:'Hidratação Facial',             detalhe:'45 min — R$ 100 / sessão',  preco:'R$ 100' },
        { id:'f3',  nome:'Dermaplaning',                  detalhe:'30 min — R$ 150 / sessão',  preco:'R$ 150' },
        { id:'f4',  nome:'Peeling Químico',               detalhe:'45 min — R$ 180 / sessão',  preco:'R$ 180' },
        { id:'f5',  nome:'Microagulhamento Facial',       detalhe:'60 min — R$ 300 / sessão',  preco:'R$ 300' },
        { id:'f6',  nome:'Criofrequência Facial',         detalhe:'45 min — R$ 250 / sessão',  preco:'R$ 250' },
        { id:'f7',  nome:'Fotobiomodulação Facial',       detalhe:'30 min — R$ 90 / sessão',   preco:'R$ 90'  },
        { id:'f8',  nome:'Hidragloss (lábios)',            detalhe:'30 min — R$ 200 / sessão',  preco:'R$ 200' },
        { id:'f9',  nome:'Tratamento Anti-idade',         detalhe:'75 min — R$ 400 / sessão',  preco:'R$ 400' },
        { id:'f10', nome:'Manchas Senis',                  detalhe:'60 min — R$ 350 / sessão',  preco:'R$ 350' },
        { id:'f11', nome:'Preenchedor (ácido hialurônico)',detalhe:'Sob avaliação — R$ 800',     preco:'R$ 800' },
        { id:'f12', nome:'Botox',                          detalhe:'Sob avaliação — R$ 600',     preco:'R$ 600' },
    ],
    ritual: [
        { id:'r1', nome:'Ritual Afrodite',  detalhe:'2h — Banho de chocolate + massagem relaxante + espumante', preco:'R$ 560' },
        { id:'r2', nome:'Ritual Ártemis',   detalhe:'1h30 — Hidrozonioterapia + drenodetox + drink',            preco:'R$ 360' },
        { id:'r3', nome:'Ritual Perséfone', detalhe:'1h30 — Esfoliação + hidratação + Photon Dome + máscara',   preco:'R$ 420' },
        { id:'r4', nome:'Ritual Atena',     detalhe:'3h — Banho de leite + drenodetox RF + máscara + espumante',preco:'R$ 620' },
        { id:'r5', nome:'Ritual Hera',      detalhe:'3h — Vinoterapia + pedras quentes + máscara + vinho',      preco:'R$ 790' },
    ],
    capilar: [
        { id:'k1', nome:'Intradermoterapia Capilar (Mesoterapia)', detalhe:'Ativos no couro cabeludo',       preco:'Sob avaliação' },
        { id:'k2', nome:'Microagulhamento Capilar',                detalhe:'Estímulo de colágeno',           preco:'Sob avaliação' },
        { id:'k3', nome:'Ozonioterapia Capilar',                   detalhe:'Anti-inflamatório e antifúngico',preco:'Sob avaliação' },
        { id:'k4', nome:'Alta Frequência Capilar',                 detalhe:'Circulação e bactericida',       preco:'Sob avaliação' },
        { id:'k5', nome:'Fotobiomodulação Capilar',                detalhe:'Luz LED / infravermelho',        preco:'Sob avaliação' },
    ],
};

const CAT_LABEL = {
    corporal: 'Tratamento Corporal',
    facial:   'Tratamento Facial',
    ritual:   'Ritual das Deusas',
    capilar:  'Terapia Capilar',
};


let modalCardAtual = null;        // elemento .card-pacote em edição
let modalSelecionados = new Set(); // ids temporários no modal
const cardEstado = new Map();      // card → Set<id> confirmados

/* FIltro*/
function filtrar(cat, btn) {
    document.querySelectorAll('.btn-filtro').forEach(b => b.classList.remove('ativo'));
    btn.classList.add('ativo');
    document.querySelectorAll('.secao-grupo').forEach(s => {
        if (cat === 'todos' || s.dataset.cat === cat) s.classList.remove('oculta');
        else s.classList.add('oculta');
    });
}

/* ABRIR MODAL
 */
function abrirModal(btn) {
    const card = btn.closest('.card-pacote');
    const cat  = card.dataset.cat;
    const nome = card.dataset.nome;
    const desc = card.dataset.desc;

    modalCardAtual = card;
    modalSelecionados = new Set(cardEstado.get(card) || []);

    // preenche cabeçalho
    document.getElementById('modalCat').textContent    = CAT_LABEL[cat] || cat;
    document.getElementById('modalTitulo').textContent = nome;
    document.getElementById('modalDesc').textContent   = desc;

    // cor 
    const caixa = document.getElementById('modalCaixa');
    caixa.className = 'modal-caixa modal-' + cat;

    // renderizar
    renderizarProcedimentos(cat);
    atualizarRodapeModal();

    // abrir overlay
    document.getElementById('modalOverlay').classList.add('aberto');
    document.body.style.overflow = 'hidden';
}

/* Lista*/
function renderizarProcedimentos(cat) {
    const corpo = document.getElementById('modalCorpo');
    const lista = PROCEDIMENTOS[cat] || [];

    corpo.innerHTML = `
        <p class="modal-grupo-titulo">Procedimentos disponíveis — ${CAT_LABEL[cat]}</p>
        <div class="proc-grid">
            ${lista.map(p => `
                <div class="proc-item ${modalSelecionados.has(p.id) ? 'selecionado' : ''}"
                    data-id="${p.id}" onclick="toggleProc(this, '${p.id}')">
                    <div class="proc-check">
                        ${modalSelecionados.has(p.id) ? '<i class="fas fa-check" style="font-size:8px"></i>' : ''}
                    </div>
                    <div class="proc-info">
                        <div class="proc-nome">${p.nome}</div>
                        <div class="proc-detalhe">${p.detalhe}</div>
                    </div>
                    <div class="proc-preco">${p.preco}</div>
                </div>
            `).join('')}
        </div>
    `;
}

/* 
TOGGLE PROCEDIMENTO */
function toggleProc(el, id) {
    if (modalSelecionados.has(id)) {
        modalSelecionados.delete(id);
        el.classList.remove('selecionado');
        el.querySelector('.proc-check').innerHTML = '';
    } else {
        modalSelecionados.add(id);
        el.classList.add('selecionado');
        el.querySelector('.proc-check').innerHTML = '<i class="fas fa-check" style="font-size:8px"></i>';
    }
    atualizarRodapeModal();
}

function atualizarRodapeModal() {
    const n = modalSelecionados.size;
    const cat = modalCardAtual ? modalCardAtual.dataset.cat : '';
    const lista = PROCEDIMENTOS[cat] || [];
    const nomes = lista.filter(p => modalSelecionados.has(p.id)).map(p => p.nome);

    document.getElementById('modalContador').textContent =
        n === 0 ? 'Nenhum procedimento selecionado'
                : n + ' procedimento' + (n > 1 ? 's' : '') + ' selecionado' + (n > 1 ? 's' : '');

    document.getElementById('modalNomesSel').textContent =
        nomes.length ? nomes.join(' · ') : 'Clique nos itens para selecionar';

    document.getElementById('btnConfirmarModal').disabled = (n === 0);
}

/* ══════════════════════════════════════════
   CONFIRMAR → SALVA NO CARD
══════════════════════════════════════════ */
function confirmarModal() {
    if (!modalCardAtual || modalSelecionados.size === 0) return;

    const cat  = modalCardAtual.dataset.cat;
    const lista = PROCEDIMENTOS[cat] || [];

    // salva estado
    cardEstado.set(modalCardAtual, new Set(modalSelecionados));

    // atualiza chips no card
    const container = modalCardAtual.querySelector('.card-procs-selecionados');
    const selecionados = lista.filter(p => modalSelecionados.has(p.id));
    const corClass = { corporal:'#5bb2a7', facial:'#9a7b9a', ritual:'#d4af37', capilar:'#5b8dc8' };
    const cor = corClass[cat] || '#5bb2a7';

    container.innerHTML = selecionados.map(p => `
        <span class="chip-proc" style="background:${cor}18;border-color:${cor};color:${cor}">
            <i class="fas fa-check" style="font-size:9px"></i>
            ${p.nome}
        </span>
    `).join('') || '<span style="font-size:12px;color:#aaa;font-style:italic">Nenhum procedimento selecionado</span>';

    // atualiza botão personalizar
    const btnP = modalCardAtual.querySelector('.btn-personalizar');
    if (selecionados.length > 0) {
        btnP.classList.add('tem-selecao');
        btnP.innerHTML = `<i class="fas fa-edit"></i> Editar (${selecionados.length})`;
    } else {
        btnP.classList.remove('tem-selecao');
        btnP.innerHTML = `<i class="fas fa-sliders-h"></i> Personalizar`;
    }

    fecharModal();
    atualizarPainelSelecao();
}

/* ══════════════════════════════════════════
   FECHAR MODAL
══════════════════════════════════════════ */
function fecharModal() {
    document.getElementById('modalOverlay').classList.remove('aberto');
    document.body.style.overflow = '';
    modalCardAtual = null;
}

function fecharModalFora(e) {
    if (e.target === document.getElementById('modalOverlay')) fecharModal();
}

/* AGENDAR CARD INDIVIDUAL*/
function agendarCard(e, linkEl) {
    e.preventDefault();
    const card = linkEl.closest('.card-pacote');
    const nome = card.dataset.nome;
    const cat  = card.dataset.cat;
    const lista = PROCEDIMENTOS[cat] || [];
    const salvos = cardEstado.get(card) || new Set();
    const procs  = lista.filter(p => salvos.has(p.id)).map(p => p.nome);

    let msg = `Olá! Gostaria de saber mais sobre o *${nome}*`;
    if (procs.length) {
        msg += `\n\nProcedimentos de interesse:\n${procs.map(n => '• ' + n).join('\n')}`;
    }
    msg += '\n\nPoderia me ajudar a agendar?';

    window.open('https://wa.me/554195996832?text=' + encodeURIComponent(msg), '_blank');
}

/*(seleção múltipla)*/

let pacotesSelecionados = []; // { card, nome }

function atualizarPainelSelecao() {
    pacotesSelecionados = [];
    document.querySelectorAll('.card-pacote').forEach(card => {
        const salvos = cardEstado.get(card);
        if (salvos && salvos.size > 0) {
            pacotesSelecionados.push({ card, nome: card.dataset.nome });
        }
    });

    const painel   = document.getElementById('painelSelecao');
    const chips    = document.getElementById('painelChips');
    const contador = document.getElementById('painelContador');
    const btnAg    = document.getElementById('btnAgendar');

    if (pacotesSelecionados.length === 0) {
        painel.classList.remove('visivel');
        chips.innerHTML = '<span class="chip-vazio">Nenhum pacote personalizado ainda</span>';
        contador.textContent = '0 pacotes';
        btnAg.disabled = true;
        return;
    }

    painel.classList.add('visivel');
    btnAg.disabled = false;
    contador.textContent = pacotesSelecionados.length + ' pacote' + (pacotesSelecionados.length > 1 ? 's' : '') + ' personalizado' + (pacotesSelecionados.length > 1 ? 's' : '');

    chips.innerHTML = pacotesSelecionados.map((p, i) => `
        <span class="chip-pacote">
            <span>${p.nome}</span>
            <button class="chip-remove" onclick="removerPacote(${i})" title="Remover">✕</button>
        </span>
    `).join('');
}

function removerPacote(i) {
    const { card } = pacotesSelecionados[i];
    cardEstado.delete(card);
    // limpar chips-botão no card
    const container = card.querySelector('.card-procs-selecionados');
    if (container) container.innerHTML = '';
    const btnP = card.querySelector('.btn-personalizar');
    if (btnP) {
        btnP.classList.remove('tem-selecao');
        btnP.innerHTML = `<i class="fas fa-sliders-h"></i> Personalizar`;
    }
    atualizarPainelSelecao();
}

function limparSelecao() {
    pacotesSelecionados.forEach(({ card }) => {
        cardEstado.delete(card);
        const c = card.querySelector('.card-procs-selecionados');
        if (c) c.innerHTML = '';
        const b = card.querySelector('.btn-personalizar');
        if (b) { b.classList.remove('tem-selecao'); b.innerHTML = `<i class="fas fa-sliders-h"></i> Personalizar`; }
    });
    pacotesSelecionados = [];
    atualizarPainelSelecao();
}

function agendarSelecionados() {
    if (!pacotesSelecionados.length) return;
    let msg = 'Olá! Gostaria de agendar os seguintes pacotes:\n\n';
    pacotesSelecionados.forEach(({ card, nome }) => {
        const cat   = card.dataset.cat;
        const lista = PROCEDIMENTOS[cat] || [];
        const salvos = cardEstado.get(card) || new Set();
        const procs  = lista.filter(p => salvos.has(p.id)).map(p => '  • ' + p.nome);
        msg += `*${nome}*\n${procs.join('\n') || '  (sem procedimentos especificados)'}\n\n`;
    });
    msg += 'Poderia me ajudar a agendar?';
    window.open('https://wa.me/554195996832?text=' + encodeURIComponent(msg), '_blank');
}

/* Fechar ESC */
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') fecharModal();
});