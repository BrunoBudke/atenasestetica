const PROCEDIMENTOS = {
    corporal: ["Massagem Relaxante","Drenagem Linfática","Esfoliação Corporal","Pressoterapia","Radiofrequência Corporal","Ultrassom Cavitacional","Criolipólise","Endermologia"],
    facial:   ["Limpeza de Pele Personalizada","Hidratação Facial","Dermaplaning","Preenchedor","Hidragloss","Botox","Criofrequência Facial","Microagulhamento Facial","Peeling Químico","Fotobiomodulação Facial","Manchas Senis","Tratamento Anti-idade"],
    ritual:   ["Ritual Afrodite (2h)","Ritual Ártemis (1h30)","Ritual Perséfone (1h30)","Ritual Atena (3h)","Ritual Hera (3h)"],
    capilar:  ["Intradermoterapia Capilar","Microagulhamento Capilar","Ozonioterapia Capilar","Alta Frequência Capilar","Fotobiomodulação Capilar"]
};

const PACOTES = {
    corporal: ["Pacote 4 Sessões – Massagem","Pacote 6 Sessões – Drenagem","Pacote Completo Corporal"],
    facial:   ["Pacote 4 Sessões – Limpeza","Pacote Rejuvenescimento","Pacote Anti-idade Premium"],
    ritual:   ["Pacote 2 Rituais à Escolha","Pacote das Deusas (todos)"],
    capilar:  ["Pacote 6 Sessões Capilares","Pacote Crescimento Capilar"]
};

let colaboradores = [
    { id:1, nome:"Ana Paula",    cargo:"Esteticista Sênior",  esps:["Facial","Corporal","Rituais"],  cor:"#5bb2a7", ag:12 },
    { id:2, nome:"Juliana Reis", cargo:"Biomédica Esteticista",esps:["Botox","Preenchedor","Microagulhamento"],cor:"#9a7b9a", ag:8  },
    { id:3, nome:"Camila Torres",cargo:"Terapeuta Holística",  esps:["Rituais","Massagem","Capilar"],          cor:"#d4af37", ag:15 },
    { id:4, nome:"Fernanda Lima",cargo:"Especialista Capilar", esps:["Capilar","Alta Frequência","Laser"],     cor:"#e07a5f", ag:6  },
];

let agendamentos = [
    { id:1, nome:"Mariana Souza",   tipo:"individual", pacote:"",                          procedimento:"Hidratação Facial",       colaboradora:"Ana Paula",    data:"2026-05-05", hora:"10:00", valor:"100,00", status:"confirmado", obs:"" },
    { id:2, nome:"Beatriz Costa",   tipo:"pacote",     pacote:"Pacote 4 Sessões – Limpeza",procedimento:"Limpeza de Pele Personalizada",colaboradora:"Ana Paula",data:"2026-05-05", hora:"11:00", valor:"360,00", status:"pendente",   obs:"Pele sensível" },
    { id:3, nome:"Larissa Mendes",  tipo:"individual", pacote:"",                          procedimento:"Ritual Hera (3h)",        colaboradora:"Camila Torres", data:"2026-05-06", hora:"14:00", valor:"790,00", status:"confirmado", obs:"Primeira vez" },
    { id:4, nome:"Patricia Gomes",  tipo:"individual", pacote:"",                          procedimento:"Botox",                  colaboradora:"Juliana Reis",  data:"2026-05-07", hora:"09:00", valor:"600,00", status:"pendente",   obs:"" },
];

let idCounter = 5;
let delIdx = null;

/* ══ LOGIN ══ */
function fazerLogin() {
    const u = document.getElementById('login-user').value.trim();
    const p = document.getElementById('login-pass').value;
    if (u === 'admin' && p === 'atenas2026') {
        document.getElementById('tela-login').classList.add('oculto');
        renderAll();
    } else {
        document.getElementById('login-erro').style.display = 'flex';
    }
}
document.addEventListener('keydown', e => {
    if (e.key === 'Enter') fazerLogin();
});

function sair() {
    document.getElementById('tela-login').classList.remove('oculto');
    document.getElementById('login-user').value = '';
    document.getElementById('login-pass').value = '';
    document.getElementById('login-erro').style.display = 'none';
}

/* ══ NAVEGAÇÃO ══ */
function mudarPagina(id, el) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('ativa'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('ativo'));
    document.getElementById('page-'+id).classList.add('ativa');
    if(el) el.classList.add('ativo');
    if(id==='agendamentos') renderTabela();
    if(id==='colaboradores') renderColabs();
    if(id==='dashboard') renderDash();
}

/* ══ RENDER DASHBOARD ══ */
function renderDash() {
    document.getElementById('stat-total').textContent = agendamentos.length;
    document.getElementById('stat-pendentes').textContent = agendamentos.filter(a=>a.status==='pendente').length;
    document.getElementById('stat-confirmados').textContent = agendamentos.filter(a=>a.status==='confirmado').length;
    document.getElementById('stat-colabs').textContent = colaboradores.length;

    const tb = document.getElementById('tabela-dash');
    const prox = [...agendamentos].sort((a,b)=>a.data.localeCompare(b.data)).slice(0,6);
    tb.innerHTML = prox.length ? prox.map(a => `
        <tr>
            <td><strong>${a.nome}</strong>${a.pacote?`<br><small style="color:var(--lavanda);font-size:11px">${a.pacote}</small>`:''}</td>
            <td>${a.procedimento}</td>
            <td>${a.colaboradora}</td>
            <td>${fmtData(a.data)} às ${a.hora}</td>
            <td>${badgeStatus(a.status)}</td>
        </tr>`).join('') : `<tr><td colspan="5"><div class="vazio"><i class="far fa-calendar"></i>Nenhum agendamento</div></td></tr>`;
}

/* ══ RENDER TABELA ══ */
function renderTabela(lista) {
    const tb = document.getElementById('tabela-agendamentos');
    const arr = lista || agendamentos;
    tb.innerHTML = arr.length ? arr.map((a,i) => `
        <tr>
            <td><strong>${a.nome}</strong>${a.pacote?`<br><small style="color:var(--lavanda);font-size:11px">${a.pacote}</small>`:''}</td>
            <td>${a.procedimento}</td>
            <td>${a.colaboradora}</td>
            <td>${fmtData(a.data)}<br><small>${a.hora}</small></td>
            <td style="color:var(--verde);font-weight:600">R$ ${a.valor||'–'}</td>
            <td>${badgeStatus(a.status)}</td>
            <td>
                <div class="td-acoes">
                    <button class="btn-td btn-check" title="Marcar concluído" onclick="concluir(${a.id})"><i class="fas fa-check"></i></button>
                    <button class="btn-td btn-del"  title="Excluir" onclick="abrirDel(${a.id})"><i class="fas fa-trash"></i></button>
                </div>
            </td>
        </tr>`).join('') :
        `<tr><td colspan="7"><div class="vazio"><i class="far fa-calendar-times"></i>Nenhum resultado</div></td></tr>`;
}

function filtrarTabela() {
    const txt = document.getElementById('busca-input').value.toLowerCase();
    const st  = document.getElementById('filtro-status').value;
    const arr = agendamentos.filter(a =>
        (!txt || a.nome.toLowerCase().includes(txt) || a.procedimento.toLowerCase().includes(txt)) &&
        (!st  || a.status === st)
    );
    renderTabela(arr);
}

function concluir(id) {
    const ag = agendamentos.find(a=>a.id===id);
    if(ag){ ag.status = ag.status==='concluido' ? 'confirmado' : 'concluido'; }
    filtrarTabela(); renderDash();
    toast('Status atualizado!','sucesso');
}

function abrirDel(id) { delIdx = id; document.getElementById('modal-del').classList.add('aberto'); }
function fecharModal() { document.getElementById('modal-del').classList.remove('aberto'); }
function confirmarExclusao() {
    agendamentos = agendamentos.filter(a=>a.id!==delIdx);
    fecharModal(); filtrarTabela(); renderDash();
    toast('Agendamento excluído.','erro');
}

/* ══ RENDER COLABS ══ */
function renderColabs() {
    const grid = document.getElementById('colab-grid');
    grid.innerHTML = colaboradores.map(c => `
        <div class="colab-card">
            <div class="colab-avatar" style="background:${c.cor}">${c.nome[0]}</div>
            <h3>${c.nome}</h3>
            <p class="colab-cargo">${c.cargo}</p>
            <div class="colab-esps">${c.esps.map(e=>`<span class="esp-tag">${e}</span>`).join('')}</div>
            <div class="colab-stat">
                <strong>${c.ag}</strong>
                agendamentos realizados
            </div>
        </div>`).join('') +
        `<button class="btn-colab-add" onclick="addColab()">
            <i class="fas fa-user-plus"></i>
            Adicionar Colaboradora
        </button>`;
}

function addColab() {
    const nome = prompt('Nome da colaboradora:');
    if(!nome) return;
    const cargo = prompt('Cargo / especialidade:') || 'Esteticista';
    const cores = ['#5bb2a7','#9a7b9a','#d4af37','#e07a5f','#5b8dc8','#7a8c60'];
    colaboradores.push({ id: Date.now(), nome, cargo, esps:[], cor: cores[colaboradores.length % cores.length], ag:0 });
    renderColabs();
    popularSelectColabs();
    toast(`${nome} adicionada!`,'sucesso');
}

/* ══ FORMULÁRIO ══ */
function carregarProcedimentos() {
    const cat = document.getElementById('f-categoria').value;
    const sel = document.getElementById('f-procedimento');
    sel.innerHTML = cat
        ? ['<option value="">Selecionar procedimento…</option>', ...PROCEDIMENTOS[cat].map(p=>`<option>${p}</option>`)].join('')
        : '<option value="">Selecione a categoria primeiro…</option>';

    const bloco = document.getElementById('bloco-pacotes');
    const tipo  = document.getElementById('f-tipo').value;
    if(tipo==='pacote' && cat) {
        const tags = document.getElementById('tags-pacotes');
        tags.innerHTML = (PACOTES[cat]||[]).map(pk=>`<button class="tag-pacote" onclick="selecionarPacote(this,'${pk}')">${pk}</button>`).join('');
        bloco.style.display='block';
    } else { bloco.style.display='none'; }
}

function alterarTipo() {
    carregarProcedimentos();
}

let pacoteSel = '';
function selecionarPacote(el,pk) {
    document.querySelectorAll('.tag-pacote').forEach(t=>t.classList.remove('sel'));
    el.classList.add('sel');
    pacoteSel = pk;
}

function popularSelectColabs() {
    const sel = document.getElementById('f-colaboradora');
    sel.innerHTML = '<option value="">Selecionar…</option>' +
        colaboradores.map(c=>`<option>${c.nome}</option>`).join('');
}

function salvarAgendamento() {
    const nome = document.getElementById('f-nome').value.trim();
    const proc = document.getElementById('f-procedimento').value;
    const colab= document.getElementById('f-colaboradora').value;
    const data = document.getElementById('f-data').value;
    const hora = document.getElementById('f-hora').value;
    if(!nome||!proc||!colab||!data||!hora) {
        toast('Preencha todos os campos obrigatórios (*).','erro'); return;
    }
    agendamentos.push({
        id: idCounter++,
        nome,
        tipo:   document.getElementById('f-tipo').value || 'individual',
        pacote: pacoteSel,
        procedimento: proc,
        colaboradora: colab,
        data, hora,
        valor:  document.getElementById('f-valor').value || '–',
        status: document.getElementById('f-status').value,
        obs:    document.getElementById('f-obs').value
    });
    // incrementar ag da colaboradora
    const c = colaboradores.find(x=>x.nome===colab);
    if(c) c.ag++;
    pacoteSel = '';
    limparForm();
    renderDash();
    toast('Agendamento salvo com sucesso! ','sucesso');
    mudarPagina('agendamentos', document.querySelectorAll('.nav-item')[2]);
}

function limparForm() {
    ['f-nome','f-tel','f-email','f-valor','f-duracao','f-obs'].forEach(id=>document.getElementById(id).value='');
    ['f-tipo','f-categoria','f-procedimento','f-colaboradora','f-status'].forEach(id=>document.getElementById(id).selectedIndex=0);
    document.getElementById('f-data').value='';
    document.getElementById('f-hora').value='';
    document.getElementById('bloco-pacotes').style.display='none';
    pacoteSel='';
}

/* ══ UTILITÁRIOS ══ */
function badgeStatus(s) {
    const map = { pendente:'badge-pendente', confirmado:'badge-confirmado', cancelado:'badge-cancelado', concluido:'badge-concluido' };
    const lab = { pendente:'Pendente', confirmado:'Confirmado', cancelado:'Cancelado', concluido:'Concluído' };
    return `<span class="badge ${map[s]||''}">${lab[s]||s}</span>`;
}

function fmtData(d) {
    if(!d) return '–';
    const [y,m,dd] = d.split('-');
    return `${dd}/${m}/${y}`;
}

let toastTimer;
function toast(msg, tipo='sucesso') {
    const el = document.getElementById('toast');
    const ic = el.querySelector('i');
    document.getElementById('toast-msg').textContent = msg;
    el.className = `toast ${tipo} show`;
    ic.className = tipo==='sucesso' ? 'fas fa-check-circle' : 'fas fa-times-circle';
    clearTimeout(toastTimer);
    toastTimer = setTimeout(()=>el.classList.remove('show'), 3500);
}

function renderAll() {
    popularSelectColabs();
    renderDash();
    // data padrão = hoje
    const hoje = new Date().toISOString().split('T')[0];
    document.getElementById('f-data').value = hoje;
}