// A Copy button above each command block on reading pages. The button's own text reports the result.
export function addCopyButtons(doc, clipboard) {
  for (const block of doc.querySelectorAll('main pre')) {
    const button = doc.createElement('button');
    button.type = 'button';
    button.className = 'copy';
    button.textContent = 'Copy';
    button.setAttribute('aria-live', 'polite');
    button.addEventListener('click', async () => {
      try {
        await clipboard.writeText(block.textContent);
        button.textContent = 'Copied';
      } catch {
        button.textContent = 'Copy failed: select the text';
      }
      setTimeout(() => { button.textContent = 'Copy'; }, 2000);
    });
    block.before(button);
  }
}
