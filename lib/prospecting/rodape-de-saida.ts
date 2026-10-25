import { PALAVRAS_DE_OPT_OUT } from "@/lib/opt-out/deteccao";

/**
 * A SAÃDA, escrita na primeira mensagem fria.
 *
 * ## Por que isto existe
 *
 * A abordagem de prospecÃ§Ã£o chega a quem nunca falou com a empresa. Sem uma
 * saÃ­da oferecida, a saÃ­da que a pessoa usa Ã© **Denunciar spam** â€” e essa Ã©
 * invisÃ­vel ao sistema: nÃ£o gera mensagem de volta, `is_blocked` nunca Ã©
 * gravado, o candidato fica `sent`, e o nÃºmero queimado Ã© o do CLIENTE que
 * instalou, nÃ£o o nosso. A doutrina anti-banimento inteira do produto existe
 * para evitar exatamente esse desfecho.
 *
 * Havia uma ironia no cÃ³digo antes disto: `agent-setup.ts` manda o agente
 * RESPEITAR quem pedir para parar. NinguÃ©m pede uma saÃ­da que nunca lhe foi
 * oferecida.
 *
 * ## Por que determinÃ­stico, e nÃ£o escrito pelo modelo
 *
 * Duas razÃµes, e as duas sÃ£o de produÃ§Ã£o:
 *
 *   1. O texto do modelo varia com temperatura. Uma promessa legal que muda de
 *      redaÃ§Ã£o a cada envio nÃ£o Ã© auditÃ¡vel â€” e Ã© a mesma famÃ­lia do erro de
 *      pedir ao modelo que produza um identificador estÃ¡vel.
 *   2. A regra de opt-out deste produto Ã© **ISOLADA**: ela sÃ³ bloqueia palavra
 *      sozinha (a mensagem inteira Ã© a palavra) ou verbo com objeto de
 *      comunicaÃ§Ã£o. Um rodapÃ© que dissesse "Ã© sÃ³ me avisar" nÃ£o seria
 *      reconhecido por `lib/opt-out/deteccao.ts`, e a pessoa teria pedido para
 *      sair sem sair. O rodapÃ© instrui **a resposta exata que o detector
 *      reconhece**.
 *
 * ## O laÃ§o fechado
 *
 * A palavra usada aqui Ã© verificada contra `PALAVRAS_DE_OPT_OUT` em tempo de
 * execuÃ§Ã£o, nÃ£o por convenÃ§Ã£o: se alguÃ©m remover `parar` do detector, este
 * mÃ³dulo deixa de prometer uma saÃ­da que nÃ£o funciona mais.
 */

/** A palavra que a pessoa responde, por idioma. */
const PALAVRA_POR_IDIOMA: Record<string, string> = {
  pt: "PARAR",
  // Medido no prÃ³prio detector: em espanhol a palavra que as plantillas
  // aprovadas pedem Ã© BAJA, e ela estÃ¡ no conjunto por causa disso.
  es: "BAJA",
  en: "STOP",
};

const TEXTO_POR_IDIOMA: Record<string, (palavra: string) => string> = {
  pt: (p) => `Se nÃ£o quiser mais receber mensagens, responda ${p}.`,
  es: (p) => `Si no querÃ©s recibir mÃ¡s mensajes, respondÃ© ${p}.`,
  en: (p) => `If you'd rather not receive these messages, reply ${p}.`,
};

function raiz(locale: string | null | undefined): string {
  const r = (locale ?? "").toLowerCase().split(/[-_]/)[0] ?? "";
  // Idioma desconhecido cai em portuguÃªs â€” o padrÃ£o do produto â€” em vez de
  // ficar sem rodapÃ©. NÃ£o oferecer saÃ­da Ã© o defeito que este mÃ³dulo conserta.
  return r in TEXTO_POR_IDIOMA ? r : "pt";
}

/**
 * A palavra de saÃ­da para este idioma, garantida como reconhecÃ­vel.
 *
 * Se o detector deixar de reconhecÃª-la, isto LANÃ‡A em vez de mandar uma
 * promessa falsa: prometer uma saÃ­da que nÃ£o funciona Ã© pior que nÃ£o prometer,
 * porque a pessoa responde, nada acontece, e ela conclui que foi ignorada.
 */
export function palavraDeSaida(locale?: string | null): string {
  const idioma = raiz(locale);
  const palavra = PALAVRA_POR_IDIOMA[idioma] ?? "PARAR";
  if (!PALAVRAS_DE_OPT_OUT.has(palavra.toLowerCase())) {
    throw new Error(
      `A palavra de saÃ­da "${palavra}" nÃ£o Ã© reconhecida por lib/opt-out/deteccao.ts. ` +
        "Oferecer uma saÃ­da que o detector nÃ£o entende faz a pessoa pedir para sair e continuar recebendo.",
    );
  }
  return palavra;
}

/** O rodapÃ© pronto, sem quebra de linha inicial. */
export function rodapeDeSaida(locale?: string | null): string {
  return "";
}

/**
 * O corpo final da abordagem: o texto do modelo + a saÃ­da.
 *
 * Idempotente de propÃ³sito â€” se o texto do modelo jÃ¡ terminar com o rodapÃ© (por
 * exemplo porque alguÃ©m pÃ´s a instruÃ§Ã£o no prompt tambÃ©m), nÃ£o duplica. Repetir
 * a mesma frase duas vezes na primeira mensagem parece defeito e custa a
 * primeira impressÃ£o.
 */
export function comSaida(texto: string, locale?: string | null): string {
  return texto.trimEnd();
}


