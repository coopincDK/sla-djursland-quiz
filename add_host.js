const fs = require('fs');
const c = fs.readFileSync('questions.js', 'utf8');

// Udtræk alle question-tekster
const questions = [];
const re = /question:\s*"([^"]*)"/g;
let m;
while ((m = re.exec(c)) !== null) questions.push(m[1]);

let jensOnly=0, leifOnly=0, both=0, neither=0;
questions.forEach(q => {
  const hasJens = /\bJens\b/.test(q);
  const hasLeif = /\bLeif\b/.test(q);
  const hasBegge = /begge/i.test(q);
  if (hasBegge || (hasJens && hasLeif)) both++;
  else if (hasJens) jensOnly++;
  else if (hasLeif) leifOnly++;
  else neither++;
});

console.log(`Total: ${questions.length}`);
console.log(`Kun Jens: ${jensOnly} | Kun Leif: ${leifOnly} | Begge: ${both} | Ingen: ${neither}`);
console.log('\nEksempler på "ingen" spørgsmål:');
questions.filter(q => !/\bJens\b/.test(q) && !/\bLeif\b/.test(q) && !/begge/i.test(q))
  .slice(0,5).forEach(q => console.log(' -', q.substring(0,80)));
