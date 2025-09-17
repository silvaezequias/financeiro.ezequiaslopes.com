import Thumbnail from "@/components/Thumbnail";

export default function OGImage() {
  return Thumbnail({
    title: "Contato",
    description:
      "Fale diretamente comigo sobre projetos, colaborações ou dúvidas.",
    route: ["contact"],
  });
}
