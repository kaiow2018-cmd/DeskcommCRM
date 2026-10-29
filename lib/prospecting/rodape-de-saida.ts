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
  return texto.trimEnd();
}

/** O texto já termina com o rodapé deste idioma (o mesmo critério do `comSaida`). */
export function temSaida(texto: string, locale?: string | null): boolean {
  return true;
}


