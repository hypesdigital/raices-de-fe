/**
 * Gerador de PDF — Raíces de Fe
 * Stack: Puppeteer (Chromium headless)
 * Uso: node generate-pdf.js [arquivo] [saida]
 *
 * Exemplos:
 *   node generate-pdf.js semanas-1-4.html
 *   node generate-pdf.js semanas-1-4.html output/raices-de-fe-semanas-1-4.pdf
 */

const puppeteer = require('puppeteer');
const path      = require('path');
const fs        = require('fs');

// ────────────────────────────────────────────
// Config
// ────────────────────────────────────────────
const INPUT_FILE  = process.argv[2] || 'semanas-1-4.html';
const OUTPUT_FILE = process.argv[3] || path.join('output', path.basename(INPUT_FILE, '.html') + '.pdf');

const PDF_OPTIONS = {
  format:          'A4',
  printBackground: true,
  margin:          { top: 0, right: 0, bottom: 0, left: 0 },
  displayHeaderFooter: false,
};

// ────────────────────────────────────────────
// Main
// ────────────────────────────────────────────
async function generatePDF() {
  const htmlPath = path.resolve(__dirname, INPUT_FILE);
  const outPath  = path.resolve(__dirname, OUTPUT_FILE);

  if (!fs.existsSync(htmlPath)) {
    console.error(`❌ Arquivo não encontrado: ${htmlPath}`);
    process.exit(1);
  }

  // Garantir que pasta de saída existe
  const outDir = path.dirname(outPath);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  console.log(`\n📄 Gerando PDF...`);
  console.log(`   Entrada : ${htmlPath}`);
  console.log(`   Saída   : ${outPath}\n`);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',  // VPS: evita crash por memória
      '--font-render-hinting=none',
    ],
  });

  try {
    const page = await browser.newPage();

    // Esperar fontes + assets carregarem
    await page.goto(`file://${htmlPath}`, {
      waitUntil: 'networkidle0',
      timeout:   30000,
    });

    // Aguardar Google Fonts (extra safety)
    await page.waitForTimeout(1500);

    // Gerar PDF
    await page.pdf({
      path: outPath,
      ...PDF_OPTIONS,
    });

    const stats   = fs.statSync(outPath);
    const sizeMB  = (stats.size / 1024 / 1024).toFixed(2);

    console.log(`✅ PDF gerado com sucesso!`);
    console.log(`   Tamanho : ${sizeMB} MB`);
    console.log(`   Arquivo : ${outPath}\n`);

  } finally {
    await browser.close();
  }
}

generatePDF().catch(err => {
  console.error('❌ Erro ao gerar PDF:', err.message);
  process.exit(1);
});
