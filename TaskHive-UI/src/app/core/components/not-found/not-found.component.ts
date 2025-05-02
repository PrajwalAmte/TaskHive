import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent {
  errorMessages: string[] = [
    'ERR: Page not found',
    'Command not recognized',
    '404: Resource unavailable',
    'cd: No such file or directory'
  ];
  
  randomError: string = this.getRandomError();
  
  private getRandomError(): string {
    const randomIndex = Math.floor(Math.random() * this.errorMessages.length);
    return this.errorMessages[randomIndex];
  }
}