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

const formatter = {
  extract: { onlyNumbers },
  text: { capitalize: capitalizeText },
};

export default formatter;
