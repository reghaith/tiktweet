import type { StateMachine } from '../core/state-machine';
import type { Plan, PlanStep, AgentType, AgentAnalysis } from '../types';
import { getAgent } from '../agents/agent-pool';

export class PlanningPhase {
  private stateMachine: StateMachine;
  private agentAnalyses: Map<AgentType, AgentAnalysis> = new Map();

  constructor(stateMachine: StateMachine) {
    this.stateMachine = stateMachine;
  }

  async execute(taskDescription: string, agents: AgentType[]): Promise<Plan> {
    this.stateMachine.transition('analyzing');
    await this.gatherAnalyses(taskDescription, agents);
    
    this.stateMachine.transition('negotiating');
    await this.negotiate(taskDescription, agents);
    
    const plan = this.buildPlan(taskDescription, agents);
    this.stateMachine.transition('consensus', { plan });
    
    return plan;
  }

  private async gatherAnalyses(task: string, agents: AgentType[]): Promise<void> {
    for (const agentType of agents) {
      const agent = getAgent(agentType);
      const analysis = this.generateMockAnalysis(agentType, task, agent);
      this.agentAnalyses.set(agentType, analysis);
      console.log(`[${agentType}] Analysis complete`);
    }
  }

  private async negotiate(task: string, agents: AgentType[]): Promise<void> {
    console.log(`[Planning] ${agents.length} agents negotiating...`);
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  private buildPlan(task: string, agents: AgentType[]): Plan {
    const steps = this.generateSteps(task, agents);
    const assignments: Record<string, AgentType> = {};
    
    steps.forEach((step, index) => {
      assignments[step.id] = agents[index % agents.length];
    });

    return {
      id: `plan_${Date.now()}`,
      approach: `Collaborative approach using ${agents.join(' + ')}`,
      steps,
      assignments,
      consensus: true,
      agentSignatures: agents,
      createdAt: Date.now()
    };
  }

  private generateSteps(task: string, agents: AgentType[]): PlanStep[] {
    const taskLower = task.toLowerCase();
    const steps: PlanStep[] = [];
    
    if (taskLower.includes('component') || taskLower.includes('ui')) {
      steps.push({
        id: 'step-1',
        description: 'Analyze existing component patterns',
        dependencies: [],
        estimatedComplexity: 'low',
        filesToModify: ['src/components/']
      });
      steps.push({
        id: 'step-2',
        description: 'Create new component structure',
        dependencies: ['step-1'],
        estimatedComplexity: 'medium',
        filesToModify: ['src/components/NewComponent.tsx']
      });
      steps.push({
        id: 'step-3',
        description: 'Add styling and animations',
        dependencies: ['step-2'],
        estimatedComplexity: 'medium',
        filesToModify: ['src/components/NewComponent.tsx', 'src/index.css']
      });
    } else {
      steps.push({
        id: 'step-1',
        description: 'Analyze requirements and existing code',
        dependencies: [],
        estimatedComplexity: 'low',
        filesToModify: []
      });
      steps.push({
        id: 'step-2',
        description: 'Design implementation approach',
        dependencies: ['step-1'],
        estimatedComplexity: 'medium',
        filesToModify: []
      });
      steps.push({
        id: 'step-3',
        description: 'Implement solution',
        dependencies: ['step-2'],
        estimatedComplexity: 'high',
        filesToModify: ['src/']
      });
    }
    
    return steps;
  }

  private generateMockAnalysis(agentType: AgentType, task: string, agent: any): AgentAnalysis {
    return {
      agentType,
      understanding: `Task requires ${task}`,
      proposedApproach: `${agent.expertise[0]} approach`,
      keyConsiderations: ['Consider existing patterns', 'Follow project conventions'],
      potentialChallenges: ['Integration with existing code'],
      timestamp: Date.now()
    };
  }
}
