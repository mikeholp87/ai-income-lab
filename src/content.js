export const skoolAboutUrl = 'https://www.skool.com/ai-automation-station-7346/about';
export const skoolCommunityUrl = 'https://www.skool.com/ai-automation-station-7346';
export const designVersion = 'workflow-preview-v2';

export const campaignMessages = {
  default: { audience: 'For people ready to put AI to work', headline: 'Build your first useful AI workflow.', text: 'Practical courses, tutorials, and a private community to help you turn an idea into a system you can use.', example: 'enquiry', context: 'Start with one enquiry, one draft, and a person who reviews the result.' },
  business: { audience: 'For business owners and operators', headline: 'Give repetitive work a better process.', text: 'Learn practical AI automation with courses, tutorials, and a community you can return to when you need direction.', example: 'enquiry', context: 'Start with a task from your own business. Keep human review before anything reaches a customer.' },
  agency: { audience: 'For freelancers and agency builders', headline: 'Build something you can show a client.', text: 'Learn practical AI workflows, discuss your build, and turn a working example into a service you can explain.', example: 'enquiry', context: 'Use a sample enquiry to demonstrate the process. Validate it with a client’s requirements before offering it as a service.' },
  creator: { audience: 'For creators with more ideas than time', headline: 'Give your next idea more room to grow.', text: 'Learn repeatable content workflows with practical training and a private community to discuss your process.', example: 'content', context: 'Start with one content brief. Review the draft, add your voice, and adapt it for your audience.' },
};

export const pricingPlans = [
  { name: 'Standard', price: 29, fit: 'A starting point for your first workflow.', features: ['Community access', 'Courses and tutorials'] },
  { name: 'Premium', price: 49, fit: 'For learning beyond the foundations.', features: ['Everything in Standard', 'Advanced training'] },
  { name: 'VIP', price: 89, fit: 'For builders who want live support.', features: ['Everything in Premium', 'Weekly coaching and software deals', '6,400+ n8n templates'] },
];

export const buildPlan = [
  ['Week 1', 'Choose one task', 'Pick a small problem with a clear input and output.'],
  ['Week 2', 'Build a first version', 'Follow the training and test with sample data.'],
  ['Week 3', 'Review and improve', 'Check the result, handle mistakes, and discuss blockers.'],
  ['Week 4', 'Put it to work', 'Use it in your business or demonstrate it to a potential client.'],
];

export const faqGroups = [
  { title: 'Membership and billing', items: [
    ['Which plan should I choose?', 'Start with Standard for community access, courses, and tutorials. Premium adds advanced training. VIP adds weekly coaching, curated software deals, and the complete n8n template vault. You can upgrade later.'],
    ['Which plan includes weekly coaching?', 'Weekly coaching is included with VIP. Standard and Premium include community access, courses, and tutorials but do not include weekly coaching.'],
    ['Can I cancel or upgrade?', 'Yes. Plans are billed monthly in USD. You can cancel before your next billing period from your Skool account, or upgrade as your needs change.'],
  ] },
  { title: 'Time, tools, and getting started', items: [
    ['Do I need coding experience?', 'No. The training uses practical AI and no-code automation workflows with guided courses and tutorials.'],
    ['How much time and extra software will I need?', 'Set aside a few focused hours each week and adjust the suggested schedule to your project. Automation hosting, AI API usage, and other software subscriptions may cost extra and are not included in membership. Check your tutorial’s requirements before buying tools.'],
    ['What happens after I join?', 'Skool gives you immediate access to the community and the resources included in your selected plan. Start with the foundational material and introduce yourself to get direction on your first build.'],
    ['Is the example above an included lesson?', 'It is an interactive illustration using sample data, not a course preview or a live AI service. It formats a draft locally and does not send messages. Your first project will depend on your chosen training and tools.'],
    ['Why join instead of watching free tutorials?', 'Free tutorials can help you learn individual tools. Membership brings courses and a community together so you have a place to learn, discuss your build, and return with questions.'],
    ['Is a result guaranteed in 30 days?', 'No. The roadmap is a suggested schedule, not a guarantee of completion, income, or client acquisition. Progress depends on your project, experience, and the time you put in.'],
  ] },
];
