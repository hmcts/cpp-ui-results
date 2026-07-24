import { Component, input, output } from '@angular/core';
import { DocumentIndicesItem } from '../../../core/model';

import { PdkCore, PdkGrid, PdkFileDownloadIconComponent } from '@cpp/pdk';
import { CapitalizePipe } from '../../../pipes/capitalize.pipe';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'document-variants',
  templateUrl: './document-variants.component.html',
  imports: [PdkCore, PdkGrid, PdkFileDownloadIconComponent, CapitalizePipe, TranslatePipe]
})
export class DocumentVariantsComponent {
  readonly documentIndices = input<DocumentIndicesItem[]>(undefined);
  readonly downloadDocument = output<string>();

  onDownloadDocument(materialId: string) {
    if (this.downloadDocument) {
      this.downloadDocument.emit(materialId);
    }
  }
}
