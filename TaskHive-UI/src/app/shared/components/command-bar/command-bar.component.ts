import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-command-bar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './command-bar.component.html',
  styleUrls: ['./command-bar.component.css']
})
export class CommandBarComponent {
  commandInput: string = '';
  commandHistory: { command: string, output: string }[] = [];
  isExecuting: boolean = false;
  showHistory: boolean = false;
  
  constructor(private router: Router) {}
  
  executeCommand(): void {
    if (!this.commandInput.trim()) return;
    
    const command = this.commandInput.trim();
    this.isExecuting = true;
    let output = '';
    
    // Process command
    if (command === 'help' || command === '?') {
      output = this.showHelp();
    } else if (command === 'clear' || command === 'cls') {
      this.commandHistory = [];
      this.commandInput = '';
      this.isExecuting = false;
      return;
    } else if (command === 'list' || command === 'ls') {
      output = this.listTasks();
    } else if (command.startsWith('goto ') || command.startsWith('cd ')) {
      const target = command.split(' ')[1];
      output = this.navigate(target);
    } else if (command === 'add' || command === 'new') {
      this.router.navigate(['/tasks/create']);
      output = 'Navigating to task creation page...';
    } else if (command === 'upcoming') {
      this.router.navigate(['/tasks/upcoming']);
      output = 'Showing upcoming tasks...';
    } else if (command.startsWith('priority ')) {
      const priority = command.split(' ')[1].toUpperCase();
      if (['HIGH', 'MEDIUM', 'LOW'].includes(priority)) {
        this.router.navigate(['/tasks/priority', priority]);
        output = `Filtering tasks by ${priority} priority...`;
      } else {
        output = 'Error: Invalid priority. Use HIGH, MEDIUM, or LOW.';
      }
    } else if (command.startsWith('category ')) {
      const category = command.split(' ')[1];
      this.router.navigate(['/tasks/category', category]);
      output = `Filtering tasks by category: ${category}...`;
    } else if (command.startsWith('search ')) {
      const query = command.substring(7);
      output = `Searching for: ${query}...`;
      // Here you would implement the search logic
    } else if (command === 'today') {
      const today = new Date().toISOString().split('T')[0];
      this.router.navigate(['/tasks/due-date', today]);
      output = 'Showing tasks due today...';
    } else {
      output = `Command not found: ${command}. Type 'help' for available commands.`;
    }
    
    // Add to history
    this.commandHistory.unshift({ 
      command: command,
      output: output
    });
    
    // Reset input
    this.commandInput = '';
    this.isExecuting = false;
    this.showHistory = true;
  }
  
  showHelp(): string {
    return `
Available commands:
  help, ?             - Show this help message
  clear, cls          - Clear command history
  list, ls            - List all tasks
  goto <page>, cd <page> - Navigate to a page
  add, new            - Create a new task
  upcoming            - Show upcoming tasks
  priority <level>    - Filter tasks by priority (HIGH, MEDIUM, LOW)
  category <name>     - Filter tasks by category
  search <query>      - Search for tasks
  today               - Show tasks due today
    `;
  }
  
  listTasks(): string {
    this.router.navigate(['/tasks']);
    return 'Listing all tasks...';
  }
  
  navigate(target: string): string {
    switch (target.toLowerCase()) {
      case 'home':
      case 'tasks':
        this.router.navigate(['/tasks']);
        return 'Navigating to home page...';
      case 'create':
      case 'new':
        this.router.navigate(['/tasks/create']);
        return 'Navigating to task creation page...';
      case 'upcoming':
        this.router.navigate(['/tasks/upcoming']);
        return 'Navigating to upcoming tasks...';
      default:
        return `Unknown destination: ${target}`;
    }
  }
  
  toggleHistory(): void {
    this.showHistory = !this.showHistory;
  }
  
  get visibleHistory(): { command: string, output: string }[] {
    return this.commandHistory.slice(0, 5); // Show only last 5 commands
  }
}