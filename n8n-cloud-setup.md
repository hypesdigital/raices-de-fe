# Setup n8n Cloud — Meta Conversions API
## Raíces de Fe | Pixel ID: 1380867890531576

---

## PASSO 1 — Criar conta gratuita

1. Acesse **https://app.n8n.cloud/register**
2. Crie a conta com o e-mail da operação
3. Escolha o plano **Free** (5.000 execuções/mês — suficiente para validação)
4. Anote o subdomínio gerado: `https://SEU-USUARIO.app.n8n.cloud`

---

## PASSO 2 — Adicionar variável de ambiente (token Meta)

1. No n8n Cloud → clique no ícone de **Settings** (engrenagem, canto inferior esquerdo)
2. Vá em **Variables**
3. Clique em **Add Variable**
4. Preencha:
   - **Key:** `META_API_TOKEN`
   - **Value:** `[token gerado no Meta Events Manager]`
5. Salve

> ⚠️ Nunca cole o token diretamente no workflow — use sempre a variável.

---

## PASSO 3 — Importar o workflow

1. No n8n Cloud → clique em **+ New Workflow** (ou **Workflows → Add Workflow**)
2. Clique no menu **⋯** (três pontos) → **Import from File**
3. Selecione o arquivo: `n8n-meta-conversions-api.json`
4. O workflow aparecerá com 5 nós conectados

---

## PASSO 4 — Ativar o webhook

1. No workflow importado, clique em **"Webhook Hotmart"** (primeiro nó)
2. Anote a **Production URL** exibida:
   ```
   https://SEU-USUARIO.app.n8n.cloud/webhook/hotmart-raices
   ```
3. Clique em **Active** (toggle no canto superior direito do workflow) para ativar
4. Status deve mudar para **Active** (verde)

> ⚠️ Use sempre a URL de **Production**, não a de Test.

---

## PASSO 5 — Configurar webhook no Hotmart

1. Acesse **Hotmart → Ferramentas → Webhooks**
2. Clique em **+ Adicionar webhook**
3. Preencha:
   - **URL:** `https://SEU-USUARIO.app.n8n.cloud/webhook/hotmart-raices`
   - **Eventos:** marcar `PURCHASE_COMPLETE`
   - **Versão:** deixar padrão
4. Salve e clique em **Testar** para confirmar que retorna `{"status":"ok"}`

---

## PASSO 6 — Teste de ponta a ponta

1. Faça uma compra teste de $0.01 no Hotmart (produto teste)
2. No n8n Cloud → **Executions** — verifique se a execução aparece como ✅
3. No Meta Events Manager → **Testar eventos** → verifique se o `Purchase` chegou
4. Checar pontuação de qualidade (aparece em 24–48h após primeiros eventos reais)

---

## FLUXO COMPLETO ATIVO

```
Compra no Hotmart
      ↓
Webhook → n8n Cloud (hotmart-raices)
      ↓
Filtrar: event = PURCHASE_COMPLETE
      ↓
Hashear: email + nome + telefone (SHA-256)
      ↓
POST Meta Conversions API v18
      ↓
Event "Purchase" registrado com user_data
      ↓
Meta deduplica com pixel do navegador (event_id)
```

---

## LIMITES DO PLANO GRATUITO

| Recurso | Limite Free |
|---|---|
| Workflows ativos | 5 |
| Execuções/mês | 5.000 |
| Retenção de logs | 24h |
| Timeout por execução | 5s |

Para o volume inicial de validação, o plano Free é suficiente.
Migrar para plano pago (~$20/mês) quando atingir 500+ compras/mês.

---

## TROUBLESHOOTING

| Erro | Causa provável | Fix |
|---|---|---|
| `{"error":{"code":190}}` | Token Meta inválido ou expirado | Gerar novo token no Events Manager |
| `skipped` no webhook | Hotmart enviou evento diferente de PURCHASE_COMPLETE | Normal para outros eventos |
| Execução não aparece | Webhook não está ativo | Checar toggle Active no workflow |
| `$vars.META_API_TOKEN undefined` | Variável não salva | Repetir Passo 2 |
