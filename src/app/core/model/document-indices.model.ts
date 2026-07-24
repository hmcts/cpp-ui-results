import { Document } from './document.model';

export interface DocumentIndicesItem {
  caseIds: string[];
  hearingIds: string[];
  defendantIds: string[];
  type: string;
  category?: string;
  document: Document;
}
