import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PdkBackLink, PdkCore } from '@cpp/pdk';

@Component({
  selector: 'back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss'],
  imports: [PdkCore, RouterLink, PdkBackLink]
})
export class BackButtonComponent {
  readonly linkUrl = input<string>(undefined);
}
