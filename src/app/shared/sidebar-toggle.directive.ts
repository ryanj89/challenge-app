import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appSidebar] button'
})
export class SidebarToggleDirective {
  @HostBinding('class.toggled') isToggled = false;

  @HostListener('click') toggleOpen() {
    this.isToggled = !this.isToggled;
  }
}