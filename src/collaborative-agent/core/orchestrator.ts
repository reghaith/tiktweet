import type { CollaborationConfig } from '../types';
import { StateMachine } from './state-machine';
import { PlanningPhase } from '../phases/planning-phase';
import { ApprovalPhase } from '../phases/approval-phase';
import { ExecutionPhase } from '../phases/execution-phase';

export class CollaborativeOrchestrator {
  async collaborate(config: CollaborationConfig): Promise<void> {
    console.log('🎵 TikTweet Collaborative Agent\n');
    console.log(`Task: ${config.task}\n`);
    console.log(`Agents: ${config.agents.join(', ')}\n`);

    const stateMachine = new StateMachine(config.task, config.agents);
    
    stateMachine.onChange((state) => {
      console.log(`[Orchestrator] Phase: ${state.phase}`);
    });

    try {
      console.log('🤖 Starting collaborative planning...');
      const planningPhase = new PlanningPhase(stateMachine);
      const plan = await planningPhase.execute(config.task, config.agents);
      console.log('✅ Planning complete\n');

      if (!config.autoApprove) {
        const approvalPhase = new ApprovalPhase();
        const { approved, modifications } = await approvalPhase.waitForApproval(
          stateMachine.getState()
        );

        if (!approved) {
          if (modifications) {
            console.log('\n📝 Modifications requested:', modifications);
            return;
          } else {
            console.log('\n❌ Task cancelled');
            return;
          }
        }
      }

      console.log('\n🚀 Starting execution...');
      const executionPhase = new ExecutionPhase(stateMachine, config.workspacePath);
      await executionPhase.execute(plan);

      console.log('\n✅ Task completed successfully!');

    } catch (error) {
      console.error('\n❌ Collaboration failed:', error);
      stateMachine.transition('failed');
      throw error;
    }
  }
}
