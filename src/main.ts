import { bootstrapApplication } from '@angular/platform-browser';
import { appRoutes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(appRoutes)]
});
