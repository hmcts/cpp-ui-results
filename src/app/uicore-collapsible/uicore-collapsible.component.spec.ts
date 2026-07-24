import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UiCoreCollapsibleComponent } from './uicore-collapsible.component';
import { provideHttpClient } from '@angular/common/http';

describe('UiCoreCollapsibleComponent', () => {
  let fixture: ComponentFixture<TestUiCoreCollapsibleComponent>;
  const mainContainerSelector = '.content-container';
  const collapsibleButtonSelector = '#btn-collapsible-change';

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [UiCoreCollapsibleComponent, TestUiCoreCollapsibleComponent],
      providers: [provideHttpClient()],
      teardown: { destroyAfterEach: false }
    }).createComponent(TestUiCoreCollapsibleComponent);
    fixture.detectChanges();
  });

  it('should compile correctly', () => {
    expect(fixture).toMatchSnapshot();
  });

  describe('when it is collapsed', () => {
    beforeEach(() => {
      fixture.componentInstance.isCollapsedInput = true;
    });

    it('should be collapsed', () => {
      fixture.detectChanges();
      const contentContainer = fixture.debugElement.query(By.css(mainContainerSelector));
      expect(contentContainer.classes['collapsed']).toBeTruthy();
    });

    it('has the correct collapsed button text', () => {
      fixture.componentInstance.collapsedButtonText = 'Show Reason';
      fixture.detectChanges();
      expect(fixture).toMatchSnapshot();
    });
  });

  describe('when it is not collapsed', () => {
    beforeEach(() => {
      fixture.componentInstance.isCollapsedInput = false;
    });

    it('should not be collapsed', () => {
      fixture.detectChanges();
      const contentContainer = fixture.debugElement.query(By.css(mainContainerSelector));
      expect(contentContainer.classes['collapsed']).toBeFalsy();
    });

    it('has the correct close button text', () => {
      fixture.componentInstance.uncollapsedButtonText = 'Hide reason';
      fixture.detectChanges();
      expect(fixture).toMatchSnapshot();
    });

    it('it should show the change button', () => {
      fixture.componentInstance.showChangeButton = true;
      fixture.detectChanges();
      const changeButton = fixture.debugElement.query(By.css(collapsibleButtonSelector));
      expect(changeButton).not.toBeNull();
    });

    it('it should hide the change button', () => {
      fixture.componentInstance.showChangeButton = false;
      fixture.detectChanges();
      const changeButton = fixture.debugElement.query(By.css(collapsibleButtonSelector));
      expect(changeButton).toBeNull();
    });

    it('it should show as a warning collapsible', () => {
      fixture.componentInstance.warning = true;
      fixture.detectChanges();
      const contentContainer = fixture.debugElement.query(By.css(mainContainerSelector));
      expect(contentContainer.classes['warning']).toBeTruthy();
    });

    it('it should show as a default collapsible', () => {
      fixture.componentInstance.warning = false;
      fixture.detectChanges();
      const contentContainer = fixture.debugElement.query(By.css(mainContainerSelector));
      expect(contentContainer.classes['warning']).toBeFalsy();
    });
  });

  @Component({
    selector: 'uicore-collapsible-test',
    template: ` <uicore-collapsible
      [collapsedButtonText]="collapsedButtonText"
      [showChangeButton]="showChangeButton"
      [isCollapsedInput]="isCollapsedInput"
      [warning]="warning"
      [uncollapsedButtonText]="uncollapsedButtonText"
    >
      <strong>Reason for change</strong>
      <p>body text...</p>
    </uicore-collapsible>`,
    imports: [UiCoreCollapsibleComponent]
  })
  class TestUiCoreCollapsibleComponent {
    isCollapsedInput: boolean;
    showChangeButton: boolean;
    warning: boolean;
    collapsedButtonText: string = 'Show reason';
    uncollapsedButtonText: string = 'Hide reason';
  }
});
