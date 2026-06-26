const fs = require('fs');
const path = require('path');

const filePath = '/Users/shubhamsah/Desktop/MoneyHi Reward App (standalone).html';
const content = fs.readFileSync(filePath, 'utf8');

// Find the template script tag content
const templateStart = content.indexOf('<script type="__bundler/template">');
if (templateStart === -1) {
  console.error('Template tag not found');
  process.exit(1);
}

const templateContentStart = content.indexOf('>', templateStart) + 1;
const templateContentEnd = content.indexOf('</script>', templateContentStart);
const templateJson = content.slice(templateContentStart, templateContentEnd).trim();

try {
  const templateHtml = JSON.parse(templateJson);
  const outPath = path.join(__dirname, 'extracted_template.html');
  fs.writeFileSync(outPath, templateHtml, 'utf8');
  console.log('Successfully extracted template to', outPath);
} catch (e) {
  console.error('Error parsing template JSON:', e);
}
