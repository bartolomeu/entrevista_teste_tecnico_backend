exports.mailBodyText = (userName, pedidoID, itens) => {
  const msg = `Olá ${userName}\r\n
  Segue dados do pedido:${pedidoID}\r\n\r\n Itens: \r\n\r\n`;
  const itensFormatted = itens
    .map(
      (i) => `Nome Produto: ${i.nome}\r\n
    Quantidade: ${i.qtd}\r\n`
    )
    .join("\r\n");

  return msg + itensFormatted;
};
exports.mailBodyHtml = (userName, pedidoID, itens) => {
  const msg = `<h3>Olá ${userName}</h3>
  <h4>Segue dados do pedido:${pedidoID}</h4> <h4>Itens:</h4>`;
  const itensFormatted = itens
    .map(
      (i) => `<p>Nome Produto: ${i.nome}<br/>
    Quantidade: ${i.qtd}<p/>`
    )
    .join("");

  return msg + itensFormatted;
};
