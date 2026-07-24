import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DocumentVariantsComponent } from './document-variants.component';
import { documents } from '@test-helpers';
import { TranslateMockPipe } from './../../../mock/translate-mock.pipe';
import { TranslatePipe } from '@ngx-translate/core';

describe('DocumentVariantsComponent', () => {
  let component: DocumentVariantsComponent;
  let fixture: ComponentFixture<DocumentVariantsComponent>;

  beforeEach(() => {
    fixture = TestBed.overrideComponent(DocumentVariantsComponent, {
      remove: {
        imports: [TranslatePipe]
      },
      add: {
        imports: [TranslateMockPipe]
      }
    }).createComponent(DocumentVariantsComponent);
    fixture.componentRef.setInput('documentIndices', documents);
    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the template with the values expected', () => {
    expect(fixture).toMatchSnapshot();
  });

  it('On download documents should call emit', () => {
    spyOn(component.downloadDocument, 'emit');
    component.onDownloadDocument('matId');
    expect(component.downloadDocument.emit).toHaveBeenCalled();
  });
});
