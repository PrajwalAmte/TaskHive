import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError(error => {
      let errorMessage = 'An unknown error occurred';
      
      if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Server-side error
        if (error.status === 0) {
          errorMessage = 'Server unavailable. Please check your connection and try again.';
        } else {
          errorMessage = `Error ${error.status}: ${error.error?.message || error.statusText}`;
        }
      }
      
      // Log the error
      console.error('API Error:', error);
      
      // Pass the error message along with the error
      return throwError(() => new Error(errorMessage));
    })
  );
};