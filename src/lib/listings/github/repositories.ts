import { z } from 'zod';
import { compareText } from '../model.ts';

const repository = z.object({
  name: z.string().min(1), html_url: z.httpUrl(), description: z.string().nullable(),
  owner: z.object({ login: z.string() }), topics: z.array(z.string()),
});

export async function repositories(config: { organization: string; repositories: string[]; topics: string[] }, request: typeof fetch = fetch) {
  const org = config.organization;
  const selected = await Promise.all(config.repositories.map(async name => {
    const url = `https://api.github.com/repos/${encodeURIComponent(org)}/${encodeURIComponent(name)}`;
    const response = await request(url, { headers: { Accept: 'application/vnd.github+json' }, signal: AbortSignal.timeout(30000) });
    if (!response.ok) throw new Error(`Allowlisted repository ${org}/${name}: HTTP ${response.status}`);
    const repo = repository.parse(await response.json());
    if (repo.owner.login.toLowerCase() !== org.toLowerCase() || repo.name.toLowerCase() !== name.toLowerCase()) {
      throw new Error(`Allowlisted repository moved: ${org}/${name}`);
    }
    return { id: repo.name.toLowerCase(), name: repo.name, url: repo.html_url, description: repo.description, tags: repo.topics };
  }));
  selected.sort((a, b) => compareText(a.id, b.id));
  const byTopic = Object.fromEntries(config.topics.map(topic => [topic, selected.filter(repo => repo.tags.includes(topic))]));
  return { selected, byTopic };
}
