const msg = document.getElementById('mensagem');
const cardExclusao = document.getElementById('cardExclusao');
let pessoaAtual = null;

document.getElementById('formBusca').addEventListener('submit', async (e) => {
  e.preventDefault();
  try {
    const lista = await buscarPorCpf(document.getElementById('buscaCpf').value);
    if (lista.length === 0) {
      cardExclusao.classList.add('oculto');
      return mostrarMensagem(msg, 'Nenhuma pessoa encontrada com esse CPF.', 'erro');
    }
    pessoaAtual = lista[0];
    document.getElementById('dadosPessoa').innerHTML =
      `<strong>${pessoaAtual.nome} ${pessoaAtual.sobrenome}</strong><br>` +
      `CPF: ${formatarCpf(pessoaAtual.cpf)}<br>E-mail: ${pessoaAtual.email}<br>` +
      `Cidade: ${pessoaAtual.cidade}/${pessoaAtual.estado}`;
    cardExclusao.classList.remove('oculto');
    msg.className = 'mensagem';
  } catch {
    mostrarMensagem(msg, 'Erro ao buscar.', 'erro');
  }
});

document.getElementById('btnExcluir').addEventListener('click', async () => {
  if (!pessoaAtual || !confirm('Tem certeza que deseja excluir este registro?')) return;
  try {
    const resp = await fetch(`${API}/${pessoaAtual.id}`, { method: 'DELETE' });
    if (!resp.ok) throw new Error();
    cardExclusao.classList.add('oculto');
    document.getElementById('buscaCpf').value = '';
    pessoaAtual = null;
    mostrarMensagem(msg, 'Registro excluído!', 'ok');
  } catch {
    mostrarMensagem(msg, 'Erro ao excluir.', 'erro');
  }
});
