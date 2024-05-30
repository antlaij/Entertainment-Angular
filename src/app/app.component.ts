import { Component, ElementRef, Renderer2, effect, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// type ThemeMode = 'dark' | 'light' | 'os-default';

const ThemeMOdes = ['dark', 'light', 'os-default'] as const;
type ThemeMode = typeof ThemeMOdes[number];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Entertainment';
  themeMode = signal<ThemeMode>('dark');

  constructor(private renderer: Renderer2, private el: ElementRef) {
    // Register a new effect.
    effect(() => {
      // Get root html tag from current element
      // const htmlTag = this.el.nativeElement.parentElement.parentElement;

      if(!document) return;

      const htmlTag = document.documentElement;
      // Remove all theme from class attribute
      ThemeMOdes.forEach( theme => {
        this.renderer.removeClass(htmlTag, theme);
      })
      this.renderer.addClass(htmlTag, this.themeMode());
    });
  }

  onThemeModeChange = (evt: Event) => {
    evt.stopPropagation();
    // console.log('evt.clientX', evt.clientX);
    // console.log('evt.target', evt.currentTarget);
    const target = evt.currentTarget as HTMLElement;
    console.log('target.dataset', target.dataset);
    console.log('target.dataset', target.dataset['currentTheme']);
    const selectedThem = target.dataset['currentTheme'];
    this.themeMode.set(selectedThem as ThemeMode);

    // if (this.themeMode() === 'dark') {
    //   this.themeMode.set('light');
    // } else if (this.themeMode() === 'light') {
    //   this.themeMode.set('dark');
    // }
  };

}
