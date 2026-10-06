// PUT - buscar por CPF e editar
const msg = document.getElementById('mensagem');
const cardEdicao = document.getElementById('cardEdicao');
let idAtual = null;
montarCampos(document.getElementById('campos'));

document.getElementById('formBusca').addEventListener('submit', async (e) => {
  e.preventDefault();
  try {
    const lista = await buscarPorCpf(document.getElementById('buscaCpf').value);
    if (lista.length === 0) {
      cardEdicao.classList.add('oculto');
      return mostrarMensagem(msg, 'Nenhuma pessoa encontrada com esse CPF.', 'erro');
    }
    idAtual = lista[0].id;
    preencherCampos(lista[0]);
    cardEdicao.classList.remove('oculto');
    msg.className = 'mensagem';
  } catch {
    mostrarMensagem(msg, 'Erro ao buscar.', 'erro');
  }
});

document.getElementById('formulario').addEventListener('submit', async (e) => {
  e.preventDefault();
  const dados = lerCampos();
  if (dados.cpf.length !== 11) {
    return mostrarMensagem(msg, 'O CPF deve ter 11 números.', 'erro');
  }
  try {
    const outros = (await buscarPorCpf(dados.cpf)).filter(p => p.id !== idAtual);
    if (outros.length > 0) {
      return mostrarMensagem(msg, 'Já existe outra pessoa com esse CPF.', 'erro');
    }
    const resp = await fetch(`${API}/${idAtual}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    });
    if (!resp.ok) throw new Error();
    mostrarMensagem(msg, 'Registro atualizado com sucesso!', 'ok');
  } catch {
    mostrarMensagem(msg, 'Erro ao atualizar.', 'erro');
  }
});
