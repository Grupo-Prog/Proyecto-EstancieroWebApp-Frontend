import { Component, inject, Input } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-back-button-component',
  standalone: true,
  imports: [],
  templateUrl: './back-button-component.html',
  styleUrl: './back-button-component.css',
})
export class BackButtonComponent {
  private location = inject(Location);

  @Input() label: string = 'VOLVER';
  goBack(): void {
    this.location.back();
  }
}
