import type { StateMachine } from '../core/state-machine';
import type { Plan, ExecutionStep } from '../types';

export class ExecutionPhase {
  private stateMachine: StateMachine;
  private workspacePath: string;

  constructor(stateMachine: StateMachine, workspacePath: string) {
    this.stateMachine = stateMachine;
    this.workspacePath = workspacePath;
  }

  async execute(plan: Plan): Promise<void> {
    this.stateMachine.transition('executing');
    
    const executedSteps = new Set<string>();
    
    while (executedSteps.size < plan.steps.length) {
      const readySteps = plan.steps.filter(step => 
        !executedSteps.has(step.id) &&
        step.dependencies.every(dep => executedSteps.has(dep))
      );

      if (readySteps.length === 0 && executedSteps.size < plan.steps.length) {
        throw new Error('Circular dependency detected');
      }

      for (const step of readySteps) {
        await this.executeStep(step, plan.assignments[step.id]);
        executedSteps.add(step.id);
      }
    }

    this.stateMachine.transition('completed');
  }

  private async executeStep(step: any, agentType: string): Promise<void> {
    console.log(`[Execution] ${agentType} executing: ${step.description}`);
    
    const executionStep: ExecutionStep = {
      stepId: step.id,
      agent: agentType as any,
      status: 'in_progress',
      timestamp: Date.now()
    };
    
    this.stateMachine.addExecutionLog(executionStep);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    executionStep.status = 'completed';
    executionStep.output = `Completed ${step.description}`;
    
    console.log(`[Execution] ✓ ${step.id} complete`);
  }
}
