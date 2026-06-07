# Manychat — Sequência de Recuperação de Vendas
## Produto: Raíces de Fe | Mercado: México + Colômbia

---

## CONFIGURAÇÃO GERAL

- **Trigger:** Webhook do Hotmart (abandono de checkout / InitiateCheckout sem Purchase)
- **Desativar sequência:** Ao receber evento de Purchase (tag: `comprou_raices_de_fe`)
- **Canal:** WhatsApp

---

## MENSAGEM 1 — 15 minutos após abandono

**Delay:** 15 minutos  
**Condição de envio:** NÃO tem tag `comprou_raices_de_fe`

```
Hola 👋 Vi que empezaste a registrarte para Raíces de Fe pero algo pasó.

Tu acceso sigue guardado. ¿Lo terminamos?

👉 [LINK DO CHECKOUT]
```

---

## MENSAGEM 2 — 2 horas após abandono

**Delay:** 2 horas (contado a partir do trigger, não da mensagem 1)  
**Condição de envio:** NÃO tem tag `comprou_raices_de_fe`

```
Una pregunta rápida: ¿hay algo que te detuvo?

Raíces de Fe es el programa que ayuda a que tu hijo entienda por qué cree — no solo que cree. 52 sesiones. $9.90 una sola vez.

Si tienes dudas, estamos aquí. Si quieres continuar: 👉 [LINK DO CHECKOUT]
```

---

## MENSAGEM 3 — 24 horas após abandono (ÚLTIMA)

**Delay:** 24 horas (contado a partir do trigger)  
**Condição de envio:** NÃO tem tag `comprou_raices_de_fe`

```
Último aviso, y lo digo con cariño 💛

El precio de lanzamiento de Raíces de Fe cierra pronto. Y si por alguna razón el material no es lo que esperabas, tienes 90 días para pedir tu dinero de vuelta — sin preguntas.

Cero riesgo. 👉 [LINK DO CHECKOUT]
```

---

## TAGS NECESSÁRIAS NO MANYCHAT

| Tag | Evento | Uso |
|---|---|---|
| `visitou_raices` | PageView da página de vendas | Segmentação |
| `iniciou_checkout_raices` | InitiateCheckout | Trigger da sequência |
| `comprou_raices_de_fe` | Purchase confirmado | Desativar sequência |

---

## FLUXO N8N — INTEGRAÇÃO

### Webhook Hotmart → Manychat

```
Trigger: POST /webhook/hotmart-raices

Condições:
  - event = "PURCHASE_COMPLETE"     → adicionar tag: comprou_raices_de_fe
  - event = "PURCHASE_BILLET_PRINTED" → iniciar sequência (15min/2h/24h)
  - event = "CHECKOUT_ABANDONED"    → iniciar sequência (15min/2h/24h)

Payload para Manychat:
  - subscriber_phone: {{customer.phone}}
  - tag: comprou_raices_de_fe | iniciou_checkout_raices
```

---

## CHECKLIST DE ATIVAÇÃO

- [ ] Criar flow no Manychat com 3 mensagens e delays corretos
- [ ] Configurar condição de stop (tag: comprou_raices_de_fe)
- [ ] Substituir [LINK DO CHECKOUT] pelo link real do Hotmart
- [ ] Criar webhook no n8n para receber eventos do Hotmart
- [ ] Testar fluxo completo antes de ativar em produção
- [ ] Documentar IDs dos flows criados

---

## ⚠️ NOTAS IMPORTANTES

- Nunca ativar a sequência sem testar o stop por tag — risco de enviar mensagem para quem já comprou
- LATAM: checar se o número está no formato correto (+52 México / +57 Colômbia)
- WhatsApp Business API: verificar template aprovado se exigido pelo Manychat
