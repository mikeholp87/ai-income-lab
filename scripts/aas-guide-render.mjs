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
  'trakkr-codex-visibility-workflow': ['0jzTOUv_B04'],
  'treg-inside-grokbot': ['9A2StjrxOms'],
};

const decode = text => text.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const escape = text => String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const QUICK_ANSWERS = {
  'ai-threejs-rocket-demo': 'Start from a source prompt you can read, generate a single-file rocket scene, inspect the HTML preview, then add zoom and rotation. The original prompt is not reproduced here. What I built is a visual coding exercise, not a physics-validated simulator, and the camera controls are the part you can learn from and reuse.',
  'chatgpt-images-sketch-workflow': 'Sketch a scene, generate the image, then make one local edit and look over the whole result. In my test a rough sketch of two windows, a chair and a pet came back in the right layout in about 25 seconds, and marking a spot and asking for a dog added one there. Check placement, reference fidelity and anything that changed without being asked.',
  'claude-code-task-manager': 'I built a Windows and Linux task manager in Claude Code in about three hours by asking a chat model for a detailed build prompt, then checking the numbers against another system monitor. Start with a small brief, verify each metric against a tool you trust, and only package the app once the values hold up. The source is on GitHub if you would rather build my version than prompt your own.',
  'cleanyourtv-claude-code': 'Check that your TV runs Android TV or Google TV, turn on USB debugging, paste the CleanYourTV prompt into Claude Code and let it back up the TV before it changes anything. On my TCL it disabled the apps I don\'t use and installed a much cleaner, faster home screen, but several remote buttons stopped working. Keep the restore command handy and test every button before you call it done.',
  'crowdreply-mcp-codex': 'Connect CrowdReply to Codex from the MCP Connection page in your CrowdReply account, pull one dataset such as citation records into a saved report, then ask Codex for an implementation plan before it touches your pages. A dashboard sample, a marketplace listing or a pushed commit is not the same as measured uplift in AI answers.',
  'deepseek-harness-first-test': 'DeepSeek Harness is a preview agent interface, not a model. When I tested it, DeepSeek\'s own API failed with an insufficient balance error, an OpenCode route failed with "model is unavailable", and an OpenRouter key worked. The two-stroke engine HTML it built was still buggy after I asked for fixes.',
  'ghostty-debian-configuration': 'Use current distro docs to install Ghostty, put your settings in ~/.config/ghostty/config.ghostty as key = value lines, then reload with Ctrl+Shift+, and open a fresh window to confirm. The memory numbers I saw against Konsole come from one session on my laptop, not a benchmark.',
  'herdr-desktop-app': 'Install the current official Herdr desktop app, open one repository as a space, and run agents in separate tabs. Closing the window is not the same as stopping herdr-core. The memory figure I saw in my video is one reading on my machine, not a benchmark.',
  'jev-skills-router-setup': 'Jev is TypeSafe\'s model for fast, structured decisions, not a chat model for your coding agent. I installed the TypeSafe skill, hit a browser-skill failure that turned out to be a missing API key, then ran Codex through a community router. Confirm real requests in the TypeSafe console before trusting any setup.',
  'muse-code-setup': 'I tried to run Muse Wonder inside OpenCode with a Meta Model API key and kept getting an invalid API key error. Installing Meta\'s own Muse Code CLI and signing in through the browser worked within a couple of minutes. I started a project audit on camera, but the video ends before it finished.',
  'opendesign-linux-slides': 'Follow the recorded Linux source setup, make one first design, then export a standalone HTML deck. On Linux that means cloning the official repo, using Node 24 with Corepack, then running pnpm tools-dev run web. Local agents, BYOK keys and hosted credits are billed separately, so a free desktop app is not free inference.',
  'rea-video-editor-prototype': 'I connected REA to my coding agents with its one-line npx setup command, then asked Claude Code to rebuild Kdenlive, my usual video editor. After hours of work it produced a prototype called Cutline. Importing, timeline dragging and splitting worked, but playback was glitchy, effects didn\'t work and pane resizing was broken.',
  'trakkr-codex-visibility-workflow': 'Connect Trakkr\'s hosted MCP server to Codex, pull the action list into a report, and read it before you let Codex edit anything. Keep AI visibility, crawler visits, citations and real visitors as separate numbers. An assistant naming your brand is not a click, and a fix list is not a result.',
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
