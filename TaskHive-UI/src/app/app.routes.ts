import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '', 
    redirectTo: '/tasks', 
    pathMatch: 'full' 
  },
  { 
    path: 'tasks', 
    loadComponent: () => import('./features/tasks/pages/task-list/task-list.component').then(c => c.TaskListComponent)
  },
  { 
    path: 'tasks/create', 
    loadComponent: () => import('./features/tasks/pages/task-create/task-create.component').then(c => c.TaskCreateComponent)
  },
  { 
    path: 'tasks/edit/:id', 
    loadComponent: () => import('./features/tasks/pages/task-edit/task-edit.component').then(c => c.TaskEditComponent)
  },
  { 
    path: 'tasks/priority/:priority', 
    loadComponent: () => import('./features/tasks/pages/task-priority/task-priority.component').then(c => c.TaskPriorityComponent)
  },
  { 
    path: 'tasks/category/:category', 
    loadComponent: () => import('./features/tasks/pages/task-category/task-category.component').then(c => c.TaskCategoryComponent)
  },
  { 
    path: 'tasks/due-date/:date', 
    loadComponent: () => import('./features/tasks/pages/task-due-date/task-due-date.component').then(c => c.TaskDueDateComponent)
  },
  { 
    path: 'tasks/upcoming', 
    loadComponent: () => import('./features/tasks/pages/task-upcoming/task-upcoming.component').then(c => c.TaskUpcomingComponent)
  },
  { 
    path: '**', 
    loadComponent: () => import('./core/components/not-found/not-found.component').then(c => c.NotFoundComponent)
  }
];