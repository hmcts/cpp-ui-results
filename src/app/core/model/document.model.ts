import { DocumentCategory } from './document-category.model';
import { MaterialsItem } from './materials-item.model';

export interface Document {
  name: string;
  courtDocumentId: string;
  documentTypeId: string;
  isRemoved?: string;
  mimeType?: string;
  documentCategory: DocumentCategory;
  materials: MaterialsItem[];
  documentTypeDescription?: string;
}
