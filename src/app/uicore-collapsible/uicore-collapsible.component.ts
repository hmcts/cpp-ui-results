import { Component, input, output, signal } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'uicore-collapsible',
  templateUrl: './uicore-collapsible.component.html',
  styleUrls: ['./uicore-collapsible.component.scss'],
  imports: [NgClass]
})
export class UiCoreCollapsibleComponent {
  readonly isCollapsedInput = input(true);
  readonly warning = input(false);
  readonly collapsedButtonText = input('Show');
  readonly uncollapsedButtonText = input('Hide');
  readonly changeButtonText = input('Change');
  readonly showChangeButton = input(true);
  readonly hideShow = output<boolean>();
  readonly changeClicked = output<void>();

  readonly isCollapsed = signal(this.isCollapsedInput());

  toggleCollapse(): void {
    this.isCollapsed.set(!this.isCollapsed());
    this.hideShow.emit(this.isCollapsed());
  }

  change(): void {
    this.changeClicked.emit();
  }
}
