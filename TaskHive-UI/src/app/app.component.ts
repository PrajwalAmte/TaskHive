import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ThemeService } from './core/services/theme.service';
import { HeaderComponent } from './core/components/header/header.component';
import { CommandBarComponent } from './shared/components/command-bar/command-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    CommandBarComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class App implements OnInit {
  constructor(
    private themeService: ThemeService,
    private router: Router
  ) {}

  ngOnInit() {
    // Initialize the theme based on user preference or system settings
    this.themeService.initTheme();
    
    // Navigate to tasks list by default
    this.router.navigate(['/tasks']);
  }
}