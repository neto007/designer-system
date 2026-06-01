import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  await page.goto('https://www.hackingarticles.in/nmap-for-pentester-host-discovery/', {
    waitUntil: 'networkidle2'
  });

  await page.pdf({
    path: 'pagina-completa.pdf',
    format: 'A4',
    printBackground: true
  });

  await browser.close();
})();
