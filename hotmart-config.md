# Hotmart — Configuração do Produto
## Raíces de Fe | Mercado: México + Colômbia

---

## PRODUTO PRINCIPAL

| Campo | Valor |
|---|---|
| Nome | Raíces de Fe |
| Preço | USD 9,90 |
| Moeda | USD |
| Garantia | 7 dias (padrão Hotmart) — **TODO: confirmar com COO se deve ser 90 dias** |
| Formato | Digital / Acesso imediato |
| Idioma | Español |

> ⚠️ **ATENÇÃO — Garantia:** Copy e página de vendas usam "90 dias". Hotmart permite configurar até 30 dias para garantia gerenciada. Para 90 dias, a garantia precisa ser gerenciada manualmente. **Confirmar com COO qual modelo usar antes de ativar.**

---

## ORDER BUMP 1

| Campo | Valor |
|---|---|
| Nome | Plan de Blindaje Digital Cristiano |
| Headline | ¿Y si lo que ve en el celular destruye lo que construyes en casa? |
| Preço | USD 4,90 |
| Posição | OB1 — exibir após confirmação do produto principal |

---

## ORDER BUMP 2

| Campo | Valor |
|---|---|
| Nome | Código de Honor para Hijos Cristianos |
| Headline | Fe sin carácter no se sostiene. |
| Preço | USD 3,90 |
| Posição | OB2 — exibir abaixo do OB1 no mesmo checkout |

---

## UPSELL — FE INQUEBRANTABLE

| Campo | Valor |
|---|---|
| Nome | Fe Inquebrantable |
| Preço | USD 17,90 |
| Exibição | Imediatamente após confirmação de pagamento (antes da página de obrigado) |
| URL Upsell | `raices-de-fe/upsell.html` (hospedar no VPS) |

---

## PIXEL META — EVENTOS POR ETAPA

| Página | Evento | Parâmetros |
|---|---|---|
| Página de vendas | `PageView` | — |
| Página de vendas | `ViewContent` | value: 9.90, currency: 'USD' |
| Checkout (botão CTA) | `InitiateCheckout` | value: 9.90, currency: 'USD' |
| Compra confirmada | `Purchase` | value: 9.90, currency: 'USD' |
| Upsell aceito | `Purchase` | value: 17.90, currency: 'USD', content_name: 'Fe Inquebrantable' |

---

## WEBHOOKS HOTMART → N8N

Configurar no painel Hotmart → Ferramentas → Webhooks:

| Evento | URL Destino |
|---|---|
| `PURCHASE_COMPLETE` | `https://SEU_N8N/webhook/hotmart-raices` |
| `PURCHASE_BILLET_PRINTED` | `https://SEU_N8N/webhook/hotmart-raices` |
| `REFUND_REQUESTED` | `https://SEU_N8N/webhook/hotmart-raices-reembolso` |
| `CHECKOUT_ABANDONED` | `https://SEU_N8N/webhook/hotmart-raices` |

---

## UTM PADRÃO — LINKS DE ANÚNCIO

```
?utm_source=meta&utm_medium=paid&utm_campaign={{campaign.name}}&utm_content={{ad.name}}&utm_term={{adset.name}}
```

Aplicar no link da página de vendas nos anúncios do Meta.

---

## CHECKLIST DE CONFIGURAÇÃO HOTMART

- [ ] Criar produto: Raíces de Fe — USD 9,90
- [ ] Confirmar garantia (7 ou 90 dias) com COO
- [ ] Configurar OB1: Plan de Blindaje Digital — USD 4,90
- [ ] Configurar OB2: Código de Honor — USD 3,90
- [ ] Configurar upsell: Fe Inquebrantable — USD 17,90
- [ ] Hospedar `upsell.html` no VPS e vincular ao produto no Hotmart
- [ ] Substituir `YOUR_PIXEL_ID` nas duas páginas HTML pelo ID real
- [ ] Substituir `YOUR_HOTMART_CHECKOUT_LINK` pelo link real
- [ ] Substituir `YOUR_HOTMART_UPSELL_LINK` pelo link real
- [ ] Substituir `YOUR_THANKYOU_PAGE_LINK` pela página de obrigado
- [ ] Configurar webhooks no Hotmart → N8N
- [ ] Testar fluxo completo (compra teste + reembolso teste)
