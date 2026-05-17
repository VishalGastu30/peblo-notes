import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const MODEL = "llama3-70b-8192";
const MAX_TOKENS = 1024;

const SYSTEM_PROMPT = `You are a precise, intelligent writing assistant embedded in Peblo Notes — 
a premium AI-powered notes workspace. Your outputs must be concise, professional, and immediately useful. 
Never add fluff, preamble, or explanatory text. Return exactly what is asked.`;

function stripHtml(html: string): string {
  // Simple regex to strip HTML tags for AI processing
  return html.replace(/<[^>]*>?/gm, '');
}

export async function generateSummary(content: string): Promise<{ summary: string; tokensUsed: number }> {
  const plainText = stripHtml(content);
  if (plainText.split(/\s+/).filter(Boolean).length < 50) {
    throw new Error('Note is too short to summarize. Add at least 50 words of content.');
  }

  const response = await groq.chat.completions.create({
    model: MODEL,
    max_tokens: MAX_TOKENS,
    temperature: 0.5,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      {
        role: 'user',
        content: `Summarize the following note in 2–4 sentences. Be precise and capture the core intent. 
Output ONLY the summary text, no labels or formatting.\n\n---\n${plainText}`
      }
    ]
  });

  const summary = response.choices[0]?.message?.content?.trim() || '';
  const tokensUsed = response.usage?.total_tokens || 0;
  
  return { summary, tokensUsed };
}

export async function extractActionItems(content: string): Promise<{ actionItems: string[]; tokensUsed: number }> {
  const plainText = stripHtml(content);
  
  const response = await groq.chat.completions.create({
    model: MODEL,
    max_tokens: MAX_TOKENS,
    temperature: 0.1,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      {
        role: 'user',
        content: `Extract all action items, tasks, and to-dos from this note. 
Return them as a JSON array of strings: ["action 1", "action 2"]. 
If no clear action items exist, return []. 
Output ONLY the JSON array, nothing else.\n\n---\n${plainText}`
      }
    ]
  });

  const text = response.choices[0]?.message?.content?.trim() || '[]';
  
  // Try to parse JSON. Sometimes LLMs return markdown blocks.
  let actionItems: string[] = [];
  try {
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    const jsonStr = jsonMatch ? jsonMatch[0] : text;
    actionItems = JSON.parse(jsonStr);
  } catch (error) {
    console.error('Failed to parse AI action items output:', text);
  }

  const tokensUsed = response.usage?.total_tokens || 0;
  return { actionItems, tokensUsed };
}

export async function suggestTitle(content: string): Promise<{ suggestedTitle: string; alternatives: string[]; tokensUsed: number }> {
  const plainText = stripHtml(content);
  
  const response = await groq.chat.completions.create({
    model: MODEL,
    max_tokens: MAX_TOKENS,
    temperature: 0.7,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      {
        role: 'user',
        content: `Suggest 3 concise, compelling titles for this note. 
Return as JSON: {"primary": "Title 1", "alternatives": ["Title 2", "Title 3"]}
Titles should be informative and specific, 3–8 words each.
Output ONLY the JSON, nothing else.\n\n---\n${plainText}`
      }
    ]
  });

  const text = response.choices[0]?.message?.content?.trim() || '{}';
  
  let suggestedTitle = 'Untitled Note';
  let alternatives: string[] = [];
  
  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const jsonStr = jsonMatch ? jsonMatch[0] : text;
    const parsed = JSON.parse(jsonStr);
    suggestedTitle = parsed.primary || suggestedTitle;
    alternatives = Array.isArray(parsed.alternatives) ? parsed.alternatives : [];
  } catch (error) {
    console.error('Failed to parse AI suggest title output:', text);
  }

  const tokensUsed = response.usage?.total_tokens || 0;
  return { suggestedTitle, alternatives, tokensUsed };
}
