function onlyNumbers(s: string) {
  return s.replace(/\D/g, "");
}

const formatter = {
  extract: { onlyNumbers },
};

export default formatter;
