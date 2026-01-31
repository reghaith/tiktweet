import type { CollaborativeTask, Phase, Plan, ExecutionStep } from '../types';

export class StateMachine {
  private state: CollaborativeTask;
  private listeners: Set<(state: CollaborativeTask) => void> = new Set();

  constructor(taskDescription: string, agents: string[]) {
    this.state = {
      id: `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      description: taskDescription,
      phase: 'idle',
      agents: agents as any,
      plan: null,
      executionLog: [],
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
  }

  transition(to: Phase, updates?: Partial<CollaborativeTask>): void {
    const oldPhase = this.state.phase;
    this.state = {
      ...this.state,
      phase: to,
      ...updates,
      updatedAt: Date.now()
    };
    
    console.log(`[StateMachine] ${oldPhase} → ${to}`);
    this.notify();
  }

  getState(): CollaborativeTask {
    return { ...this.state };
  }

  updatePlan(plan: Plan): void {
    this.state = {
      ...this.state,
      plan,
      updatedAt: Date.now()
    };
    this.notify();
  }

  addExecutionLog(step: ExecutionStep): void {
    this.state = {
      ...this.state,
      executionLog: [...this.state.executionLog, step],
      updatedAt: Date.now()
    };
    this.notify();
  }

  onChange(listener: (state: CollaborativeTask) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify(): void {
    this.listeners.forEach(listener => listener(this.getState()));
  }
}
