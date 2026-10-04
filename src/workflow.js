// A local template demonstration. No AI call, personal data collection, or sending.
export const examples = {
  enquiry: [
    { id: 'website', label: 'Website enquiry', name: 'Alex', topic: 'a new website', timing: 'next month', message: 'Hi, I’m Alex. I’m interested in a new website for next month. Could you send me the next steps?' },
    { id: 'booking', label: 'Consultation enquiry', name: 'Sam', topic: 'an automation consultation', timing: 'next week', message: 'Hi, I’m Sam. I’m interested in an automation consultation for next week. Could you send me the next steps?' },
  ],
  content: [
    { id: 'follow-up', label: 'Customer follow-up', topic: 'customer follow-up', audience: 'small business owners', takeaway: 'Review a draft before sending it', message: 'A content brief for small business owners about customer follow-up. Key takeaway: review a draft before sending it.' },
    { id: 'content-review', label: 'Content review', topic: 'content review', audience: 'independent creators', takeaway: 'Add your own experience before publishing', message: 'A content brief for independent creators about content review. Key takeaway: add your own experience before publishing.' },
  ],
};

export function previewDraft(kind, sampleId) {
  const sample = examples[kind]?.find(item => item.id === sampleId);
  if (!sample) throw new Error('Choose an available sample.');
  if (kind === 'content') return {
    fields: [['Topic', sample.topic], ['Audience', sample.audience]],
    text: `A useful starting point for ${sample.audience}: make ${sample.topic} part of your process.\n\n${sample.takeaway}. Start small, check the result, and improve one step at a time.`,
  };
  return {
    fields: [['Name', sample.name], ['Request', sample.topic], ['Timing', sample.timing]],
    text: `Hi ${sample.name}, thanks for getting in touch about ${sample.topic}. I’ve noted your timing: ${sample.timing}.\n\nCould you share a little more about what you need? I’ll review the details and suggest the next step.`,
  };
}
