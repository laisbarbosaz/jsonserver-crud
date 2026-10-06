const form = document.getElementById('formulario');
const msg = document.getElementById('mensagem');
montarCampos(document.getElementById('campos'));

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const dados = lerCampos();

  if (dados.cpf.length !== 11) {
    return mostrarMensagem(msg, 'O CPF tem que ter 11 números.', 'erro');
  }

  try {
    const existentes = await buscarPorCpf(dados.cpf);
    if (existentes.length > 0) {
      return mostrarMensagem(msg, 'Já existe uma pessoa registrada com esse CPF.', 'erro');
    }

    const resp = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    });
    if (!resp.ok) throw new Error();

    mostrarMensagem(msg, 'Pessoa cadastrada com sucesso!', 'ok');
    form.reset();
  } catch {
    mostrarMensagem(msg, 'Erro ao cadastrar. Tente novamente.', 'erro');
  }
});
