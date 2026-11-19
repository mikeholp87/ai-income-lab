// Watch-page headings: YouTube titles with the hype removed, in sentence case.
// Only words on the common list are lowercased, so product names (GrokBot, DeepSeek) and words it
// has not seen keep their capitals. Product words like Code or Agent stay capitalized only straight
// after a proper noun: "Claude Code", "Hermes Agent", but "no code", "this AI agent".
const common = new Set(`
a about actual actually after agency agents already alternative an and answer anything app apps are articles as assistant at auto automate automated
automates automating automation automations autopilot available avatar avatars back banned beat before beginner's best beta better blog blowing
blueprint booking brain brand breakdown build builder building builds built business businesses but by can care cases challenged changed changer
changes channel chatbot cheaper cheapest chief classic clients clone close closed coding cold combos community competition competitor competitors
complete connect connection content cost course create created creates creators credit cron daily dashboard day days deals decided demo demos deploy
deployment descriptions desktop did do don't dropped each easier easiest easy ebook editor edits email emails empire engines entire entrepreneur
escape even ever every everything exactly face faceless fallback fallbacks faster fastest feature filming finally find finds finger first fix for
forever found free from full fully future game games generate generates generation generator get getting give got government grow guide hack happened
harness has have help here here's hobby host hour hours how hype if image impressive in incredible infographics insane insanely inside install instead
into invisible is it it's its job jobs join just know label landing launch lead leads let let's lets lifelike lifting limit limits live machine made
make makes making manage manager master me media memory method minutes missing model monetization monetized money month monthly more most much music
my need needs new nightmare no nobody's not now of official officially on one online only opensource operating optimize optimizer or our out
outperforming outreach over own page pages paid paused paying personal phone place plan platform posts power powerful presentation presentations
pretty private production productivity professional profitable providers public qualified quite race rank ranking rat real realistic really redesign
redesigned released replace replaced replaces repurposing requirements results review right rocket run safer save saved saves scale scaling scrape
scratch search second seconds security seekers self setup shorts should showing simple simulator single site skill skills so social sounds spy staff
started steal step stock stop strategy system talking team terminal tested than that the their them these think this thousands thumbnails to today
token too tool tools top topics track tracker tracking trading transcript tried try trying turn tutorial ultimate under unlimited unofficial up update
upgrade usage use used useful using verdict via video videos views viral visibility visible voice vs walkthrough wasting watch way we web website
websites week weekly were what when where which white who why will winning with without worked workflow works worth writes you you're your zero
`.split(/\s+/));
const productWords = new Set(['agent', 'bot', 'code', 'design', 'go', 'images', 'pro', 'routines', 'studio', 'analytics', 'banana']);
const spelling = { CHATGPT: 'ChatGPT', CLAUDE: 'Claude', N8N: 'n8n' };
const hype = /insane|happened|worth it|actually works|should care|changes everything|game changer|find out|here.s what i found/i;

export function watchHeading(title) {
  let text = title.replace(/\s*\(([^)]*)\)/g, (match, inner) => hype.test(inner) ? '' : match);
  text = text.replace(/(\s[-–—|]\s|…|\.{3}|[:?!])\s*([^-–—|…:?!]*)$/, (match, mark, tail) => hype.test(tail) ? (mark === '?' ? '?' : '') : match);
  text = text.replace(/\s+and it.?s (?:pretty |actually )?(?:insane|incredible|a game changer)(?=[!.]*$)/i, '');
  text = text.replace(/!+(?=\s+[A-Za-z])/g, ':').replace(/!+|(?:\.{3}|…)$/g, '').replace(/\s{2,}/g, ' ').trim();
  let start = true;
  let afterName = false;
  return text.replace(/[A-Za-z][A-Za-z0-9']*|[.?]/g, token => {
    if (token === '.' || token === '?') { start = token === '?'; afterName = false; return token; }
    let word = spelling[token] || token;
    if (word.length > 2 && word === word.toUpperCase() && (common.has(word.toLowerCase()) || productWords.has(word.toLowerCase()))) word = word[0] + word.slice(1).toLowerCase();
    const lower = word.toLowerCase();
    const plain = /^[A-Z][a-z']*$/.test(word);
    const keep = start || !plain || !(common.has(lower) || (productWords.has(lower) && !afterName));
    const result = keep ? word : lower;
    afterName = /^[A-Z]/.test(result) && !(word.length > 1 && word === word.toUpperCase()) && !(start && common.has(lower));
    start = false;
    return result;
  });
}
