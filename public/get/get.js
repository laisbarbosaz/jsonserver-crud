// GET - listar todos e buscar por CPF
const tabela = document.getElementById('tabela');
const msg = document.getElementById('mensagem');

function desenhar(lista) {
  tabela.innerHTML = lista.map(p => `
    <tr>
      <td>${p.id}</td><td>${formatarCpf(p.cpf)}</td><td>${p.nome}</td><td>${p.sobrenome}</td>
      <td>${p.email}</td><td>${p.idade}</td><td>${p.telefone}</td><td>${p.rua}</td>
      <td>${p.bairro}</td><td>${p.cidade}</td><td>${p.estado}</td><td>${p.rg}</td>
    </tr>`).join('');
}

async function listarTodos() {
  try {
    const resp = await fetch(API);
    const lista = await resp.json();
    desenhar(lista);
    msg.className = 'mensagem';
    if (lista.length === 0) mostrarMensagem(msg, 'Nenhum registro encontrado, tente novamente...', 'erro');
  } catch {
    mostrarMensagem(msg, 'Erro ao carregar os registros.', 'erro');
  }
}

document.getElementById('formBusca').addEventListener('submit', async (e) => {
  e.preventDefault();
  const cpf = document.getElementById('buscaCpf').value;
  if (!soDigitos(cpf)) return listarTodos();
  try {
    const lista = await buscarPorCpf(cpf);
    desenhar(lista);
    if (lista.length === 0) mostrarMensagem(msg, 'Nenhuma pessoa encontrada, tente novamente..', 'erro');
    else mostrarMensagem(msg, 'Registro encontrado.', 'ok');
  } catch {
    mostrarMensagem(msg, 'Erro ao buscar.', 'erro');
  }
});

document.getElementById('limpar').addEventListener('click', () => {
  document.getElementById('buscaCpf').value = '';
  listarTodos();
});

listarTodos();
