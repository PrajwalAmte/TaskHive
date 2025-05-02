import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-filters.component.html',
  styleUrls: ['./task-filters.component.css']
})
export class TaskFiltersComponent {
  @Output() filterChange = new EventEmitter<{ type: string, value: string }>();
  
  priorities: string[] = ['ALL', 'HIGH', 'MEDIUM', 'LOW'];
  categories: string[] = ['ALL', 'Work', 'Personal', 'Health', 'Finance', 'Education', 'Other'];
  selectedPriority: string = 'ALL';
  selectedCategory: string = 'ALL';
  searchQuery: string = '';
  
  applyPriorityFilter(): void {
    this.filterChange.emit({ type: 'priority', value: this.selectedPriority });
  }
  
  applyCategoryFilter(): void {
    this.filterChange.emit({ type: 'category', value: this.selectedCategory });
  }
  
  applySearchFilter(): void {
    if (this.searchQuery.trim()) {
      this.filterChange.emit({ type: 'search', value: this.searchQuery });
    }
  }
  
  clearFilters(): void {
    this.selectedPriority = 'ALL';
    this.selectedCategory = 'ALL';
    this.searchQuery = '';
    this.filterChange.emit({ type: 'clear', value: '' });
  }
}