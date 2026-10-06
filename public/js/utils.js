const API = '/api/pessoas';

const CAMPOS = [
  { id: 'cpf', rotulo: 'CPF (somente números)', tipo: 'text', max: 14 },
  { id: 'nome', rotulo: 'Nome', tipo: 'text' },
  { id: 'sobrenome', rotulo: 'Sobrenome', tipo: 'text' },
  { id: 'email', rotulo: 'E-mail', tipo: 'email' },
  { id: 'idade', rotulo: 'Idade', tipo: 'number' },
  { id: 'telefone', rotulo: 'Telefone', tipo: 'text' },
  { id: 'rua', rotulo: 'Rua', tipo: 'text' },
  { id: 'bairro', rotulo: 'Bairro', tipo: 'text' },
  { id: 'cidade', rotulo: 'Cidade', tipo: 'text' },
  { id: 'estado', rotulo: 'Estado (UF)', tipo: 'text', max: 2 },
  { id: 'rg', rotulo: 'RG', tipo: 'text' }
];

function soDigitos(valor) {
  return String(valor || '').replace(/\D/g, '');
}

function formatarCpf(cpf) {
  const d = soDigitos(cpf);
  if (d.length !== 11) return cpf;
  return d.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

function montarCampos(container) {
  container.innerHTML = CAMPOS.map(c => `
    <div>
      <label for="${c.id}">${c.rotulo}</label>
      <input type="${c.tipo}" id="${c.id}" name="${c.id}" ${c.max ? `maxlength="${c.max}"` : ''} required>
    </div>`).join('');
}


function lerCampos() {
  const dados = {};
  CAMPOS.forEach(c => { dados[c.id] = document.getElementById(c.id).value.trim(); });
  dados.cpf = soDigitos(dados.cpf);
  dados.idade = Number(dados.idade);
  dados.estado = dados.estado.toUpperCase();
  return dados;
}

function preencherCampos(pessoa) {
  CAMPOS.forEach(c => { document.getElementById(c.id).value = pessoa[c.id] ?? ''; });
}


async function buscarPorCpf(cpf) {
  const resp = await fetch(`${API}?cpf=${encodeURIComponent(soDigitos(cpf))}`);
  if (!resp.ok) throw new Error('Erro ao consultar o servidor.');
  return resp.json();
}

function mostrarMensagem(el, texto, tipo) {
  el.textContent = texto;
  el.className = `mensagem ${tipo}`;
}
