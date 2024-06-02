import { DOCUMENT, NgClass } from '@angular/common';
import { Component, ElementRef, Inject, Renderer2, ViewChild, computed, effect, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// type ThemeMode = 'dark' | 'light' | 'os-default';

const ThemeMOdes = ['dark', 'light', 'os-default'] as const;
type ThemeMode = typeof ThemeMOdes[number];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  renderer = inject(Renderer2);
  el = inject(ElementRef);

  @ViewChild('sideMenuIcon', { static: true })
  // private sideMenuIcon: ElementRef;
  title = 'Entertainment';
  themeMode = signal<ThemeMode>('dark');

  isSideMenuClosed = signal<boolean>(true);
  menuCloseBtnClass = computed(() => this.isSideMenuClosed()?`bx bx-menu`:`bx bx-menu-alt-right`);

  sideBarNenus = [
    { name: 'RTHK', icon: 'bx bx-radio', link: 'rthk' },
    { name: 'RTHK', icon: 'bx bxs-playlist', link: 'rthk' },
    { name: 'RTHK', icon: 'bx bxs-playlist', link: 'rthk' },
  ];

  constructor(@Inject(DOCUMENT) private document: Document) {
    // Register a new effect.
    effect(() => {
      // Get root html tag from current element
      // const htmlTag = this.el.nativeElement.parentElement.parentElement;

      const htmlTag = this.document.documentElement;
      // Remove all theme from class attribute
      ThemeMOdes.forEach( theme => {
        this.renderer.removeClass(htmlTag, theme);
      })
      this.renderer.addClass(htmlTag, this.themeMode());
    });
  }

 sideMenuIconOnClick() {
  this.isSideMenuClosed.update(currentValue => !currentValue);
 }

  onThemeModeChange = (evt: Event) => {
    evt.stopPropagation();
    const target = evt.currentTarget as HTMLElement;
    const selectedThem = target.dataset['currentTheme'];
    this.themeMode.set(selectedThem as ThemeMode);
  };

}
