import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor() {}

  success(message: string, duration: number = 3000): void {
    this.showNotification(message, 'success', duration);
  }

  error(message: string, duration: number = 5000): void {
    this.showNotification(message, 'error', duration);
  }

  info(message: string, duration: number = 3000): void {
    this.showNotification(message, 'info', duration);
  }

  private showNotification(message: string, type: 'success' | 'error' | 'info', duration: number): void {
    // Create notification element
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.className = 'notification';
    notification.classList.add(`${type}-notification`);
    
    // Style the notification
    notification.style.position = 'fixed';
    notification.style.top = '16px';
    notification.style.right = '16px';
    notification.style.padding = '12px 16px';
    notification.style.borderRadius = '4px';
    notification.style.backgroundColor = type === 'success' ? 'var(--success-color)' : 
                                        type === 'error' ? 'var(--error-color)' : 
                                        'var(--bg-secondary)';
    notification.style.color = type === 'info' ? 'var(--text-primary)' : 'white';
    notification.style.boxShadow = 'var(--shadow-md)';
    notification.style.zIndex = '1000';
    notification.style.fontFamily = 'Roboto Mono, monospace';
    notification.style.fontSize = '14px';
    notification.style.transition = 'all 0.3s ease';
    notification.style.opacity = '0';
    notification.style.transform = 'translateY(-20px)';
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
      notification.style.opacity = '1';
      notification.style.transform = 'translateY(0)';
    }, 10);
    
    // Remove after duration
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateY(-20px)';
      
      // Remove from DOM after animation
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, duration);
  }
}