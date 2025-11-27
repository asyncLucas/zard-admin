import { Component } from '@angular/core';

@Component({
  selector: 'app-splash-screen',
  standalone: true,
  template: `
    <div class="flex items-center justify-center min-h-screen bg-black ">
      <div class="flex flex-col items-center">
        <img
          src="logo.png"
          width="130"
          height="24"
          alt="logo"
          class="mb-12"
        />
        <img src="assets/three-dots.svg" alt="three-dots" />
      </div>
    </div>
  `,
})
export class SplashScreenComponent {}
