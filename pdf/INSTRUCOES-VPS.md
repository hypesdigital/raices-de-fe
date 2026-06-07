# Instruções de Geração de PDF — VPS Hostinger

## 1. Instalar dependências (primeira vez)

```bash
cd /caminho/para/raices-de-fe/pdf
npm install
```

> O Puppeteer baixa automaticamente o Chromium (~300MB). Se a VPS for limitada,
> usar puppeteer-core + Chromium do sistema:
> ```bash
> apt-get install -y chromium-browser   # Ubuntu
> npm install puppeteer-core
> ```
> E ajustar `generate-pdf.js`: substituir `require('puppeteer')` por
> `require('puppeteer-core')` e adicionar `executablePath: '/usr/bin/chromium-browser'`
> no `puppeteer.launch()`.

---

## 2. Gerar o PDF — Semanas 1-4

```bash
node generate-pdf.js semanas-1-4.html
# Saída: output/raices-de-fe-semanas-1-4.pdf
```

Ou com nome de saída customizado:
```bash
node generate-pdf.js semanas-1-4.html output/raices-de-fe-semanas-1-4.pdf
```

---

## 3. Estrutura de arquivos esperada

```
pdf/
├── semanas-1-4.html          ← template semanas 1 a 4
├── generate-pdf.js           ← script Puppeteer
├── package.json
├── INSTRUCOES-VPS.md
└── output/
    └── raices-de-fe-semanas-1-4.pdf   ← gerado
```

---

## 4. Substituir ilustrações (quando disponíveis)

No HTML, cada `col-right` tem um comentário:
```html
<!-- ILUSTRACIÓN: descrição da cena -->
<div class="illus illus-night-stars">...</div>
```

Para substituir um placeholder por imagem real:
```html
<div class="col-right">
  <img src="imagens/s1-p1-stars.jpg"
       style="width:100%;height:100%;object-fit:cover;">
</div>
```

---

## 5. Ordem de produção (aguardar aprovação COO em cada bloco)

| Bloco | Arquivo | Status |
|---|---|---|
| Semanas 1-4 | `semanas-1-4.html` | ✅ Pronto para aprovação |
| Semanas 5-8 | `semanas-5-8.html` | ⏳ Aguardando aprovação S1-4 |
| Semanas 9-52 | `semanas-9-52.html` | ⏳ Aguardando aprovação bloco anterior |
| Bônus 1 (Guia Padres) | `bonus-1-guia-padres.html` | ⏳ |
| Bônus 2 | `bonus-2.html` | ⏳ |
| OB1 (Protección Digital) | `ob1-proteccion-digital.html` | ⏳ |
| OB2 (Código de Honor) | `ob2-codigo-honor.html` | ⏳ |
| Upsell (Fe Inquebrantable) | `upsell-fe-inquebrantable.html` | ⏳ |

---

## 6. Nomenclatura final dos arquivos PDF

```
raices-de-fe-semanas-1-8.pdf
raices-de-fe-semanas-9-16.pdf
... (blocos de 8 semanas)
raices-de-fe-bonus-1-guia-padres.pdf
raices-de-fe-ob1-proteccion-digital.pdf
raices-de-fe-ob2-codigo-honor.pdf
raices-de-fe-upsell-fe-inquebrantable.pdf
```
