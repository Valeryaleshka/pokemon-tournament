import {Directive, ElementRef, inject, Renderer2} from '@angular/core';

@Directive({
  selector: '[appZoomOnHover]',
  host: {
    '(mouseenter)': 'zoomIn()',
    '(mouseleave)': 'zoomOut()'
  }
})
export class ZoomOnHoverDirective {
  el = inject(ElementRef);
  renderer = inject(Renderer2);

  zoomIn() {
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'scale(1.05)');
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'transform 0.3s ease');
    this.renderer.setStyle(this.el.nativeElement, 'z-index', '10');
  }

  zoomOut() {
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'scale(1)');
    this.renderer.setStyle(this.el.nativeElement, 'z-index', '1');
  }
}
