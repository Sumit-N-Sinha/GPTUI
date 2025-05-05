import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations, provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
// import { providePrimeNG } from 'primeng/config';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration()
    ,provideAnimations(),
    // provideNoopAnimations(),
    provideAnimationsAsync()
  ]
};
