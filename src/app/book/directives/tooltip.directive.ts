import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective {
  @Input() appTooltip = '';

  private tooltipHtml: HTMLDivElement | undefined;
  private timer: any;

  constructor(private el: ElementRef) { }

  ngOnDestroy(): void {
    if (!this.tooltipHtml) { 
      return; 
    }

    this.tooltipHtml.remove();
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.timer = setTimeout(() => {
      let x = this.el.nativeElement.getBoundingClientRect().left + this.el.nativeElement.offsetWidth / 2;
      let y = this.el.nativeElement.getBoundingClientRect().top - this.el.nativeElement.offsetHeight - 6;
      this.createTooltipPopup(x, y);
    }, 100)
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.timer) clearTimeout(this.timer);
    if (this.tooltipHtml) { this.tooltipHtml.remove() }
  }

  private createTooltipPopup(x: number, y: number) {
    let popup = document.createElement('div');
    popup.innerHTML = this.appTooltip;
    popup.setAttribute("class", "tooltip-container");
    popup.style.top = y.toString() + "px";
    popup.style.left = x.toString() + "px";
    document.body.appendChild(popup);
    this.tooltipHtml = popup;
    setTimeout(() => {
      if (this.tooltipHtml) this.tooltipHtml.remove();
    }, 5000);
  }
}
