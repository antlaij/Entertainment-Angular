import { Component, ElementRef, OnInit, Renderer2, effect, inject, signal } from '@angular/core';
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
export class AppComponent implements OnInit {
  renderer = inject(Renderer2);
  el = inject(ElementRef);

  title = 'Entertainment';
  themeMode = signal<ThemeMode>('dark');

  sideBarNenus = [
    { name: 'RTHK', icon: 'bx bx-radio', link: 'rthk' },
    { name: 'RTHK', icon: 'bx bxs-playlist', link: 'rthk' },
    { name: 'RTHK', icon: 'bx bxs-playlist', link: 'rthk' },
  ];

  constructor() {
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

  ngOnInit() {

  let sidebar = document.querySelector(".sidebar");
  let closeBtn = document.querySelector("#btn");
  let searchBtn = document.querySelector(".bx-search");
  closeBtn!.addEventListener("click", ()=>{
    sidebar!.classList.toggle("open");
    menuBtnChange();//calling the function(optional)
  });
  searchBtn!.addEventListener("click", ()=>{ // Sidebar open when you click on the search iocn
    sidebar!.classList.toggle("open");
    menuBtnChange(); //calling the function(optional)
  });
  // following are the code to change sidebar button(optional)
  function menuBtnChange() {
   if(sidebar!.classList.contains("open")){
     closeBtn!.classList.replace("bx-menu", "bx-menu-alt-right");//replacing the iocns class
   }else {
     closeBtn!.classList.replace("bx-menu-alt-right","bx-menu");//replacing the iocns class
   }
  }
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
