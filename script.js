const launches = [
  {
    id: 'openai-codex',
    title: 'OpenAI expands Codex into a broader software-workflow agent',
    category: 'model',
    impact: 'HIGH',
    time: '2026-04-16T12:00:00Z',
    builderScore: 95,
    summary: 'OpenAI says Codex now supports background computer use, more tools and plugins, image generation, memory, repeatable work, multiple terminal tabs, SSH devboxes, and an in-app browser.',
    whyItMatters: 'This shifts coding AI from autocomplete toward desktop-native task execution and recurring workflows.',
    metrics: ['3M+ weekly developers', '90+ new plugins', 'Background computer use'],
    source: 'https://openai.com/index/codex-for-almost-everything/',
    sourceLabel: 'OpenAI'
  },
  {
    id: 'anthropic-opus-47',
    title: 'Anthropic launches Claude Opus 4.7 as a direct upgrade for difficult coding and long-running tasks',
    category: 'model',
    impact: 'HIGH',
    time: '2026-04-16T11:30:00Z',
    builderScore: 93,
    summary: 'Anthropic positions Opus 4.7 as stronger than 4.6 on advanced software engineering, instruction following, higher-resolution vision, self-verification, and file-system memory.',
    whyItMatters: 'Better long-horizon reliability matters more than leaderboard spikes for real agent workflows.',
    metrics: ['GA now', 'Up to 2,576px long-edge images', '$5/$25 per 1M tokens'],
    source: 'https://www.anthropic.com/news/claude-opus-4-7',
    sourceLabel: 'Anthropic'
  },
  {
    id: 'github-rubber-duck',
    title: 'GitHub Copilot CLI adds Rubber Duck cross-model review',
    category: 'tooling',
    impact: 'MEDIUM',
    time: '2026-04-06T10:00:00Z',
    builderScore: 91,
    summary: 'GitHub introduced an experimental second-opinion reviewer that pairs a different model family with the primary coding agent to catch planning and implementation mistakes.',
    whyItMatters: 'Cross-model review is emerging as a practical pattern for reducing compounding agent errors on multi-file tasks.',
    metrics: ['74.7% of Sonnet→Opus gap closed', '+3.8% on difficult tasks', 'SWE-Bench Pro referenced'],
    source: 'https://github.blog/ai-and-ml/github-copilot/github-copilot-cli-combines-model-families-for-a-second-opinion/',
    sourceLabel: 'GitHub Blog'
  },
  {
    id: 'emergent-wingman',
    title: 'Emergent enters the autonomous agent race through chat-based task automation',
    category: 'startup',
    impact: 'MEDIUM',
    time: '2026-04-15T15:00:00Z',
    builderScore: 80,
    summary: 'TechCrunch reports Emergent is pushing Wingman, an OpenClaw-like assistant that lets users automate tasks through chat interfaces like WhatsApp and Telegram.',
    whyItMatters: 'The startup angle confirms agent UX is moving beyond IDEs into consumer and ops channels.',
    metrics: ['Chat-based automation', 'WhatsApp + Telegram', 'OpenClaw-like positioning'],
    source: 'https://techcrunch.com/2026/04/15/indias-vibe-coding-startup-emergent-enters-openclaw-like-ai-agent-space/',
    sourceLabel: 'TechCrunch'
  },
  {
    id: 'open-agents-trending',
    title: 'Vercel open-agents appears on GitHub Trending',
    category: 'open-source',
    impact: 'MEDIUM',
    time: '2026-04-16T09:00:00Z',
    builderScore: 84,
    summary: 'GitHub Trending is surfacing open-agents, alongside other agent and memory tooling, signaling continued demand for open orchestration patterns.',
    whyItMatters: 'Open-source infra keeps becoming the fastest way to test new agent UX patterns without waiting on platform vendors.',
    metrics: ['Community signal', 'Open-source orchestration', 'Builder adoption'],
    source: 'https://github.com/trending/typescript',
    sourceLabel: 'GitHub Trending'
  },
  {
    id: 'hf-daily-papers',
    title: 'Hugging Face daily papers reinforce the agent-research pipeline',
    category: 'open-source',
    impact: 'LOW',
    time: '2026-04-16T08:00:00Z',
    builderScore: 70,
    summary: 'The April 16 Hugging Face papers feed highlights active work around multi-agent research, file-system-based agents, and information-seeking benchmarks.',
    whyItMatters: 'Research and tooling are moving together — practical agents now borrow directly from very recent evaluation and search work.',
    metrics: ['Daily paper feed', 'Agent benchmarks', 'Search/research workflows'],
    source: 'https://huggingface.co/papers/date/2026-04-16',
    sourceLabel: 'Hugging Face'
  }
];

const buildSignals = [
  'Background computer use is becoming a default expectation for premium coding agents.',
  'Cross-model review loops look like a durable product feature, not a benchmark trick.',
  'File-system memory and multi-session continuity are becoming core differentiators.',
  'Open-source builders still move fastest on orchestration, prompting, and workflow wrappers.'
];

const communityWatch = [
  'Hacker News front page is heavily discussing both Claude Opus 4.7 and OpenAI\'s expanded Codex launch.',
  'GitHub Trending shows continuing momentum for agent UX, memory, and orchestration repos.',
  'Hugging Face paper feeds are increasingly full of agent benchmark and research-task papers rather than pure chat-model increments.'
];

const opportunity = {
  title: 'Cross-model QA layer for AI coding agents',
  opportunity: 'Teams using coding agents now need a lightweight way to inspect, compare, and gate agent output before merge or deploy.',
  whyNow: 'OpenAI, Anthropic, and GitHub all pushed the market toward longer-running, higher-autonomy coding workflows this week, while GitHub explicitly validated the value of second-opinion review.',
  businessModel: 'SaaS for engineering teams with usage-based pricing per reviewed task or per repository.',
  targetMarket: 'Startups, agencies, and platform teams already experimenting with Claude Code, Codex, Copilot CLI, OpenCode, or custom internal agents.',
  moat: 'Workflow integrations, audit trails, review datasets, and policy templates specific to multi-agent engineering pipelines.',
  effort: 'Medium',
  growth: 'Could start as a focused B2B tool and expand into an agent governance layer.',
  firstSteps: [
    'Ship a GitHub App or CLI wrapper that sends plans, diffs, and tests to a second model before merge.',
    'Start with a single killer workflow: review PRs opened by coding agents.',
    'Collect failure patterns and turn them into reusable guardrails and policy packs.'
  ],
  ratings: {
    feasibility: 'High',
    profitability: 'High',
    timing: 'High'
  }
};

const impactOrder = { HIGH: 3, MEDIUM: 2, LOW: 1 };

const cardGrid = document.getElementById('card-grid');
const filterEl = document.getElementById('category-filter');
const sortEl = document.getElementById('sort-mode');
const resultsCopy = document.getElementById('results-copy');

function fmtDate(iso) {
  return new Date(iso).toLocaleString(undefined, {
    month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZone: 'UTC', timeZoneName: 'short'
  });
}

function renderStats(items) {
  const total = items.length;
  const highImpact = items.filter(item => item.impact === 'HIGH').length;
  const avgBuilder = Math.round(items.reduce((acc, item) => acc + item.builderScore, 0) / items.length);
  document.getElementById('hero-stats').innerHTML = [
    ['Signals tracked', total],
    ['High-impact launches', highImpact],
    ['Avg. builder usefulness', `${avgBuilder}/100`]
  ].map(([label, value]) => `
    <div class="stat">
      <div class="label">${label}</div>
      <div class="value">${value}</div>
    </div>
  `).join('');
}

function renderLists() {
  document.getElementById('build-signals').innerHTML = buildSignals.map(item => `<li>${item}</li>`).join('');
  document.getElementById('community-watch').innerHTML = communityWatch.map(item => `<li>${item}</li>`).join('');
}

function renderOpportunity() {
  document.getElementById('opportunity-card').innerHTML = `
    <h3>${opportunity.title}</h3>
    <p><strong>Opportunity:</strong> ${opportunity.opportunity}</p>
    <p><strong>Why now:</strong> ${opportunity.whyNow}</p>
    <p><strong>Business model:</strong> ${opportunity.businessModel}</p>
    <p><strong>Target market:</strong> ${opportunity.targetMarket}</p>
    <p><strong>Competition / moat:</strong> ${opportunity.moat}</p>
    <p><strong>Effort to build:</strong> ${opportunity.effort}</p>
    <p><strong>Growth potential:</strong> ${opportunity.growth}</p>
    <div class="rating-row">
      <span class="rating-pill">Feasibility: ${opportunity.ratings.feasibility}</span>
      <span class="rating-pill">Profitability: ${opportunity.ratings.profitability}</span>
      <span class="rating-pill">Timing: ${opportunity.ratings.timing}</span>
    </div>
    <strong>First steps</strong>
    <ul>${opportunity.firstSteps.map(step => `<li>${step}</li>`).join('')}</ul>
  `;
}

function renderSources() {
  const unique = [...new Map(launches.map(item => [item.source, item])).values()];
  document.getElementById('sources-list').innerHTML = unique.map(item => `<li><a href="${item.source}">${item.sourceLabel}</a></li>`).join('');
}

function sortItems(items, mode) {
  const next = [...items];
  if (mode === 'time') return next.sort((a, b) => new Date(b.time) - new Date(a.time));
  if (mode === 'builders') return next.sort((a, b) => b.builderScore - a.builderScore);
  return next.sort((a, b) => {
    const impactDiff = impactOrder[b.impact] - impactOrder[a.impact];
    if (impactDiff) return impactDiff;
    return b.builderScore - a.builderScore;
  });
}

function renderCards() {
  const filter = filterEl.value;
  const mode = sortEl.value;
  const filtered = launches.filter(item => filter === 'all' || item.category === filter);
  const sorted = sortItems(filtered, mode);
  resultsCopy.textContent = `${sorted.length} signal${sorted.length === 1 ? '' : 's'} shown`;
  cardGrid.innerHTML = sorted.map(item => `
    <article>
      <div class="badges">
        <span class="badge ${item.impact.toLowerCase()}">${item.impact} impact</span>
        <span class="badge">${item.category}</span>
        <span class="badge">Builder score ${item.builderScore}</span>
      </div>
      <h3>${item.title}</h3>
      <div class="card-meta">
        <span>${fmtDate(item.time)}</span>
        <span>${item.sourceLabel}</span>
      </div>
      <p>${item.summary}</p>
      <p><strong>Why it matters:</strong> ${item.whyItMatters}</p>
      <ul>${item.metrics.map(metric => `<li>${metric}</li>`).join('')}</ul>
      <div class="card-links">
        <a href="${item.source}">Source</a>
      </div>
    </article>
  `).join('');
}

filterEl.addEventListener('change', renderCards);
sortEl.addEventListener('change', renderCards);

renderStats(launches);
renderLists();
renderOpportunity();
renderSources();
renderCards();
