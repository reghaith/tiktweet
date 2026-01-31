export type Phase = 
  | 'idle'
  | 'analyzing'
  | 'negotiating'
  | 'consensus'
  | 'awaiting_approval'
  | 'executing'
  | 'completed'
  | 'failed';

export type AgentType = 'oracle' | 'visualEngineering' | 'ultrabrain' | 'explore' | 'artistry';

export interface Agent {
  id: AgentType;
  category: string;
  expertise: string[];
  description: string;
}

export interface CollaborativeTask {
  id: string;
  description: string;
  phase: Phase;
  agents: AgentType[];
  plan: Plan | null;
  executionLog: ExecutionStep[];
  createdAt: number;
  updatedAt: number;
}

export interface Plan {
  id: string;
  approach: string;
  steps: PlanStep[];
  assignments: Record<string, AgentType>;
  consensus: boolean;
  agentSignatures: AgentType[];
  createdAt: number;
}

export interface PlanStep {
  id: string;
  description: string;
  dependencies: string[];
  estimatedComplexity: 'low' | 'medium' | 'high';
  filesToModify: string[];
}

export interface ExecutionStep {
  stepId: string;
  agent: AgentType;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  output?: string;
  error?: string;
  timestamp: number;
}

export interface NegotiationMessage {
  round: number;
  from: AgentType;
  to: AgentType | 'all';
  type: 'proposal' | 'challenge' | 'refinement' | 'agreement';
  content: string;
  timestamp: number;
}

export interface AgentAnalysis {
  agentType: AgentType;
  understanding: string;
  proposedApproach: string;
  keyConsiderations: string[];
  potentialChallenges: string[];
  timestamp: number;
}

export interface CollaborationConfig {
  task: string;
  agents: AgentType[];
  autoApprove?: boolean;
  workspacePath: string;
  projectContext?: ProjectContext;
}

export interface ProjectContext {
  name: string;
  root: string;
  type: string;
  techStack: string[];
}

export interface ApprovalResult {
  approved: boolean;
  modifications?: string;
}
