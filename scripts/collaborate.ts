#!/usr/bin/env tsx
import { CollaborativeOrchestrator, selectAgentsForTask } from '../src/collaborative-agent/index';

async function main() {
  const taskDescription = process.argv.slice(2).join(' ');
  
  if (!taskDescription) {
    console.error('Usage: npm run collaborate -- "your task description"');
    process.exit(1);
  }

  const orchestrator = new CollaborativeOrchestrator();
  const agents = selectAgentsForTask(taskDescription);

  await orchestrator.collaborate({
    task: taskDescription,
    agents,
    workspacePath: process.cwd(),
    autoApprove: process.env.AUTO_APPROVE === 'true'
  });
}

main().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
