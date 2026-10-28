// Media kit numbers for the last 28 days. Stats, gender, age and country match the YouTube Studio screenshots;
// device and discovery come from YouTube Analytics (vidIQ channel_analytics), September 30 to October 27. Update all of it together.
export const mediaKit = {
  period: 'September 29 to October 26, 2026',
  // Drop the PDF in public/ and set its path; the download button appears once it is set.
  pdf: '',
  screenshots: [
    { src: '/media-kit/studio-content.webp', width: 2200, height: 869, alt: 'YouTube Studio, long-form videos, last 28 days: 40.6K views, 138.5K thumbnail impressions, 6.4% click-through rate, 2:26 average view duration.' },
    { src: '/media-kit/studio-audience.webp', width: 2200, height: 1045, alt: 'YouTube Studio audience, last 28 days: 98.9% male, 68% aged 25 to 44, top countries United States, India, Indonesia, Brazil and Germany.' },
    { src: '/media-kit/studio-top-content.webp', width: 2200, height: 1083, alt: 'YouTube Studio top content, last 28 days, led by the Dots vs GrokBot test with 11,237 views.' },
  ],
  // Long-form videos only, as in the first screenshot.
  stats: [['138.5K', 'Thumbnail impressions'], ['6.4%', 'Click-through rate'], ['40.6K', 'Views'], ['2:26', 'Average view']],
  // Shares in percent. Age and gender are YouTube's share of signed-in viewers; the rest are shares of views.
  tabs: [
    { label: 'Gender', unit: 'viewers', headline: '99 of every 100 viewers are men.', rows: [['Men', 98.9], ['Women', 1.1]] },
    { label: 'Age', unit: 'viewers', headline: '68 of every 100 viewers are 25 to 44.', rows: [['25–34', 38.7], ['35–44', 29.5], ['45–54', 14], ['18–24', 13.7], ['55–64', 4.1], ['13–17', 0.1]] },
    { label: 'Country', unit: 'views', headline: '19 of every 100 views come from the US.', rows: [['United States', 18.5], ['India', 10.2], ['Indonesia', 5.8], ['Brazil', 4], ['Germany', 3.4], ['Other countries', 58.1]] },
    { label: 'Device', unit: 'views', headline: '58 of every 100 views are on a computer.', rows: [['Computer', 58.2], ['Phone', 38.4], ['TV', 2.1], ['Tablet', 1.3]] },
    { label: 'Discovery', unit: 'views', headline: '47 of every 100 views start with a YouTube search.', rows: [['YouTube search', 47.5], ['Home feed and subscriptions', 22.6], ['Other websites', 12.1], ['Direct or unknown', 6.7], ['Shorts feed', 5.6], ['Other YouTube pages', 5.5]] },
  ],
};

// Shares → exactly 100 dots (largest remainder), so rounding never draws 99 or 101.
export function dotCounts(shares) {
  const total = shares.reduce((sum, share) => sum + share, 0);
  const exact = shares.map(share => share / total * 100);
  const counts = exact.map(Math.floor);
  const missing = 100 - counts.reduce((sum, count) => sum + count, 0);
  exact.map((value, index) => [value - counts[index], index]).sort((a, b) => b[0] - a[0])
    .slice(0, missing).forEach(([, index]) => counts[index]++);
  return counts;
}
