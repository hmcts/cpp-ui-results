export interface DocumentCategory {
  defendantDocument?: DefendantDocument;
  nowDocument?: NowDocument;
}
export interface DefendantDocument {
  defendants: string[];
  prosecutionCaseId: string;
}

export interface NowDocument {
  prosecutionCases: string[];
  defendantId: string;
  orderHearingId: string;
}
