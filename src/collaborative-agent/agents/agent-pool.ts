import type { Agent, AgentType } from '../types';

export const AgentPool: Record<AgentType, Agent> = {
  oracle: {
    id: 'oracle',
    category: 'oracle',
    expertise: ['architecture', 'debugging', 'system-design', 'complex-logic', 'best-practices'],
    description: 'Architecture and system design specialist. Excels at understanding requirements, designing system architecture, identifying edge cases, and ensuring best practices.'
  },
  
  visualEngineering: {
    id: 'visualEngineering',
    category: 'visual-engineering',
    expertise: ['frontend', 'ui-ux', 'react', 'tailwind', 'animations', 'css', 'responsive-design'],
    description: 'UI/UX and frontend implementation specialist. Excels at creating beautiful interfaces, implementing React components, styling with Tailwind, and adding animations.'
  },
  
  ultrabrain: {
    id: 'ultrabrain',
    category: 'ultrabrain',
    expertise: ['algorithms', 'optimization', 'hard-problems', 'performance', 'data-structures'],
    description: 'Complex logic and optimization specialist. Excels at solving difficult algorithmic problems, optimizing performance, and handling complex state management.'
  },
  
  explore: {
    id: 'explore',
    category: 'explore',
    expertise: ['codebase-analysis', 'pattern-finding', 'research', 'documentation'],
    description: 'Codebase research and pattern analysis specialist. Excels at exploring existing code, finding relevant patterns, and understanding how features are currently implemented.'
  },

  artistry: {
    id: 'artistry',
    category: 'artistry',
    expertise: ['creative-solutions', 'unconventional-approaches', 'innovation', 'design-patterns'],
    description: 'Creative problem-solving specialist. Excels at finding unconventional solutions, innovative approaches, and thinking outside the box when standard patterns fail.'
  }
};

export function getAgent(type: AgentType): Agent {
  return AgentPool[type];
}

export function getAllAgents(): Agent[] {
  return Object.values(AgentPool);
}

export function getSkillsForAgent(type: AgentType): string[] {
  switch (type) {
    case 'visualEngineering':
      return ['frontend-ui-ux'];
    case 'oracle':
    case 'ultrabrain':
    case 'explore':
    case 'artistry':
    default:
      return [];
  }
}

export function selectAgentsForTask(task: string): AgentType[] {
  const taskLower = task.toLowerCase();
  const selected: AgentType[] = [];
  
  selected.push('oracle');
  
  if (taskLower.match(/ui|ux|interface|component|style|css|design|button|modal|card|animation|theme|dark mode|layout/)) {
    selected.push('visualEngineering');
  }
  
  if (taskLower.match(/algorithm|optimize|performance|complex|state management|websocket|real-time|sync/)) {
    selected.push('ultrabrain');
  }
  
  if (taskLower.match(/refactor|modify|update|change|existing|current|integrate/)) {
    selected.push('explore');
  }
  
  if (selected.length === 1) {
    selected.push('visualEngineering');
  }
  
  return selected;
}
