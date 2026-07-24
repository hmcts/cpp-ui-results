export interface ErrorSummaryFields {
  label: string;
  id: string;
}

export interface ErrorSummaryEvent {
  errors: any;
  fields: ErrorSummaryFields[];
}
