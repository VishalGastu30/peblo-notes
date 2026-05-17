export class RateLimitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RateLimitError';
  }
}

interface RateLimitData {
  hour: number;
  day: number;
  lastResetHour: number;
  lastResetDay: number;
}

// In-memory store for MVP. For production, use Upstash Redis.
const rateLimitStore = new Map<string, RateLimitData>();

const AI_LIMIT_PER_HOUR = 20;
const AI_LIMIT_PER_DAY = 200;

export async function checkAiRateLimit(userId: string): Promise<void> {
  const now = new Date();
  const currentHour = now.getHours();
  const currentDay = now.getDate(); // Uses day of month for simplicity in MVP

  let data = rateLimitStore.get(userId);

  if (!data) {
    data = {
      hour: 0,
      day: 0,
      lastResetHour: currentHour,
      lastResetDay: currentDay,
    };
  }

  // Reset hourly limit if hour has changed
  if (data.lastResetHour !== currentHour) {
    data.hour = 0;
    data.lastResetHour = currentHour;
  }

  // Reset daily limit if day has changed
  if (data.lastResetDay !== currentDay) {
    data.day = 0;
    data.lastResetDay = currentDay;
  }

  if (data.hour >= AI_LIMIT_PER_HOUR) {
    throw new RateLimitError(`AI usage limit reached for this hour (${AI_LIMIT_PER_HOUR} calls). Please try again later.`);
  }

  if (data.day >= AI_LIMIT_PER_DAY) {
    throw new RateLimitError(`AI usage limit reached for today (${AI_LIMIT_PER_DAY} calls). Please try again tomorrow.`);
  }

  data.hour += 1;
  data.day += 1;
  
  rateLimitStore.set(userId, data);
}
