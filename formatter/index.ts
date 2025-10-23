function onlyNumbers(s: string) {
  return s.replace(/\D/g, "");
}

function capitalizeText(text: string) {
  if (!text) return "";

  let capitalizedText: string[] = [];
  const splittedText = text.toLocaleLowerCase().split(" ");

  splittedText.forEach((token) => {
    capitalizedText.push(token.charAt(0).toUpperCase() + token.slice(1));
  });

  return capitalizedText.join(" ");
}

const formatCurrency = (value: number, currency: string = "BRL") => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency,
  }).format(value / 100);
};

const formatter = {
  extract: { onlyNumbers },
  text: { capitalize: capitalizeText },
  number: { currency: formatCurrency },
};

export default formatter;
