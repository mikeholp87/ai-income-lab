// Library conventions for AAS written guides. `--patch` rewrites public HTML.
// Full manuscript regeneration still needs a corrected package directory; this
// module is the checked-in source of TOC labels, Quick answers and hub video IDs
// so the next batch does not recreate those bugs.

import { readFile, writeFile } from 'node:fs/promises';

export const NEW_GUIDE_SLUGS = [
  'ai-threejs-rocket-demo',
  'chatgpt-images-sketch-workflow',
  'claude-code-task-manager',
  'cleanyourtv-claude-code',
  'codex-seo-workflow',
  'crowdreply-mcp-codex',
  'deepseek-harness-first-test',
  'ghostty-debian-configuration',
  'grokbot-for-beginners',
  'grokbot-for-seo',
  'grokbot-virtual-office',
  'grokbot-vs-dots',
  'herdr-desktop-app',
  'herdr-guide',
  'jev-skills-router-setup',
  'muse-code-setup',
  'opendesign-linux-slides',
  'rea-video-editor-prototype',
  'run-a-blog-with-grokbot',
  'runable-audit-website',
  'trakkr-codex-visibility-workflow',
  'treg-inside-grokbot',
];

export const VIDEO_IDS_BY_SLUG = {
  'ai-threejs-rocket-demo': ['K2UeJZ_7mS0'],
  'chatgpt-images-sketch-workflow': ['c3AtpUbpXNA'],
  'claude-code-task-manager': ['phVQuQMojA8'],
  'cleanyourtv-claude-code': ['0iTOlQjNdhs'],
  'codex-seo-workflow': ['TuVL2x6IfDk'],
  'crowdreply-mcp-codex': ['9WPazkEp7VU'],
  'deepseek-harness-first-test': ['exXV5ehmsEU'],
  'ghostty-debian-configuration': ['YdvngsXEqo8'],
  'grokbot-for-beginners': ['gNcHbc2kdzw'],
  'grokbot-for-seo': ['6jDcOXSOT00'],
  'grokbot-virtual-office': ['wzC2r426KWs'],
  'grokbot-vs-dots': ['vauqktcB6ak', 'uTcTJd5JaZU'],
  'herdr-desktop-app': ['IV6q81wRay4'],
  'herdr-guide': ['VE66JDHoS6Y'],
  'jev-skills-router-setup': ['wakl0ayO_fk'],
  'muse-code-setup': ['mPHM81X1oqc'],
  'opendesign-linux-slides': ['rMRsVyIsZCU'],
  'rea-video-editor-prototype': ['UAPaM6KrC-M'],
  'run-a-blog-with-grokbot': ['wLIiTkra7uM'],
  'runable-audit-website': ['qQVAnp4-EpI'],
  'trakkr-codex-visibility-workflow': ['0jzTOUv_B04'],
  'treg-inside-grokbot': ['9A2StjrxOms'],
};

const decode = text => text.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const escape = text => String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const QUICK_ANSWERS = {
  'ai-threejs-rocket-demo': 'Start from a source prompt you can read, generate a single-file rocket scene, inspect the HTML preview, then add zoom and rotation. The original prompt is not reproduced here. This is a visual coding exercise, not a physics-validated simulator.',
  'chatgpt-images-sketch-workflow': 'Sketch a scene, generate the image, then make one local edit and inspect the whole result. Check object placement, reference fidelity and unintended changes. A polished image is not proof that every instruction was followed.',
  'claude-code-task-manager': 'Give Claude Code a small, verifiable task-manager brief, then check process names, units and packaging on the OS you actually use. The recording is a project walkthrough. It is not a complete installer test or a reproduced prompt.',
  'cleanyourtv-claude-code': 'Confirm the TV is Android or Google TV, back up settings, then follow the recorded CleanYourTV launcher change and retest every remote button. Several physical buttons stopped working on the TCL set in the recording. This is a device modification, not a cosmetic website setting.',
  'crowdreply-mcp-codex': 'Connect CrowdReply to Codex through MCP, pull one citation dataset, inspect its shape, then ask for an implementation plan before changing pages. Samples, marketplace listings and promotional claims are not measured ranking uplift.',
  'deepseek-harness-first-test': 'Treat DeepSeek Harness as a preview agent interface, not another name for the model. The recording hits provider errors, then a working OpenRouter route, and ends on a buggy HTML demo. Preview plugins and APIs continue to change.',
  'ghostty-debian-configuration': 'Use current distro docs to install Ghostty, edit the official key = value config files, then open a fresh terminal to confirm a reload. Memory comparisons in the recording are one-session observations, not a benchmark or a reason to call it the only terminal.',
  'herdr-desktop-app': 'Install the current official Herdr desktop app, open one repository as a space, and run agents in separate tabs. Closing the window is not the same as stopping herdr-core. The recorded memory reading is one observation, not a benchmark.',
  'jev-skills-router-setup': 'Install the recorded Jev skills, configure provider access, then inspect the returned request. Confidence estimates are not proof that the route was correct. A missing key is a separate problem from a completed installation.',
  'muse-code-setup': 'Record the failed OpenCode API route, then use the Meta Muse Code CLI path that actually responded. A working CLI test does not prove the third-party integration was fixed. Installer details that were not shown are omitted rather than guessed.',
  'opendesign-linux-slides': 'Follow the recorded Linux source setup, make one first design, then export a standalone HTML deck. Local agents, BYOK keys and hosted credits are billed separately, so a free desktop app is not free inference.',
  'rea-video-editor-prototype': 'Use the documented REA setup command, then treat the Kdenlive-inspired editor as a prototype. Playback, effects and pane resizing still had problems in the recording. This is not evidence that REA recreated a production editor.',
  'runable-audit-website': 'Write the business brief first, then review the generated MVP. The recording reaches a more focused homepage but does not finish Stripe or inquiry-email delivery. A complete-looking site is not a payment-ready business.',
  'trakkr-codex-visibility-workflow': 'Inspect tracked questions and MCP action lists, then keep AI visibility, crawler activity, citations and visits as separate events. An assistant naming a brand is not a click. Do not auto-publish the suggested fixes.',
};

export function headingText(html, id) {
  const match = html.match(new RegExp(`<h[1-6] id="${id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}">([\\s\\S]*?)</h[1-6]>`));
  if (!match) return '';
  return decode(match[1].replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();
}

export function rewriteToc(html) {
  return html.replace(/<nav class="toc" aria-label="On this page">([\s\S]*?)<\/nav>/, (block, inner) => {
    const next = inner.replace(/<a href="#([^"]+)">([^<]*)<\/a>/g, (_, id, label) => {
      const text = headingText(html, id) || label;
      return `<a href="#${id}">${escape(text)}</a>`;
    });
    return `<nav class="toc" aria-label="On this page">${next}</nav>`;
  });
}

export function insertQuickAnswer(html, answer) {
  if (!answer || /<strong>Quick answer:<\/strong>/.test(html)) return html;
  return html.replace(
    /(<nav class="toc" aria-label="On this page">[\s\S]*?<\/nav>\n)/,
    `$1<p><strong>Quick answer:</strong> ${escape(answer)}</p>\n`,
  );
}

export function applyLibraryConventions(html, slug) {
  return insertQuickAnswer(rewriteToc(html), QUICK_ANSWERS[slug]);
}

export function hubVideosFor(slug, claimed = VIDEO_IDS_BY_SLUG) {
  const own = claimed[slug] || [];
  return own.filter(id => {
    const owners = Object.entries(claimed).filter(([, ids]) => ids.includes(id)).map(([other]) => other);
    if (owners.length === 1) return owners[0] === slug;
    const canonical = Object.entries(VIDEO_IDS_BY_SLUG).find(([, ids]) => ids.includes(id))?.[0];
    return canonical === slug;
  });
}

export async function patchExistingGuides(root = new URL('../public/guides/', import.meta.url)) {
  const written = [];
  for (const slug of NEW_GUIDE_SLUGS) {
    const path = new URL(`${slug}.html`, root);
    const html = await readFile(path, 'utf8');
    const next = applyLibraryConventions(html, slug);
    if (next !== html) {
      await writeFile(path, next);
      written.push(slug);
    }
  }
  return written;
}

if (process.argv.includes('--patch')) {
  const written = await patchExistingGuides();
  console.log(written.length ? `patched ${written.join(', ')}` : 'no guide HTML changes');
}
