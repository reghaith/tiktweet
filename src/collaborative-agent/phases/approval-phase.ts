import type { CollaborativeTask, ApprovalResult } from '../types';
import { createInterface } from 'readline';

export class ApprovalPhase {
  async waitForApproval(task: CollaborativeTask): Promise<ApprovalResult> {
    this.displayPlan(task);
    
    return new Promise((resolve) => {
      const rl = createInterface({
        input: process.stdin,
        output: process.stdout
      });

      rl.question('\nApprove (A), Modify (M), or Cancel (C)? ', (answer) => {
        const response = answer.trim().toLowerCase();
        
        if (response === 'a' || response === 'approve') {
          rl.close();
          resolve({ approved: true });
        } else if (response === 'm' || response === 'modify') {
          rl.question('Describe modifications: ', (modifications) => {
            rl.close();
            resolve({ approved: false, modifications });
          });
        } else {
          rl.close();
          resolve({ approved: false });
        }
      });
    });
  }

  private displayPlan(task: CollaborativeTask): void {
    const plan = task.plan!;
    
    console.log('\n' + '='.repeat(60));
    console.log('🤖 COLLABORATIVE AGENT PLAN');
    console.log('='.repeat(60));
    console.log(`\n📋 Task: ${task.description}`);
    console.log(`\n🎯 Approach: ${plan.approach}`);
    console.log(`\n✅ Consensus: ${plan.agentSignatures.join(', ')}`);
    
    console.log('\n📋 Execution Steps:');
    plan.steps.forEach((step, i) => {
      const assigned = plan.assignments[step.id];
      console.log(`\n  ${i + 1}. ${step.description}`);
      console.log(`     Agent: ${assigned}`);
      console.log(`     Complexity: ${step.estimatedComplexity}`);
    });

    console.log('\n' + '='.repeat(60));
  }
}
