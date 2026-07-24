import { Location } from '@angular/common';

export interface APIEndPoints {
  readonly progressionQuery: string;
  readonly progressionCommand: string;
  readonly resultQuery: string;
}

export const apiEndPoints: APIEndPoints = {
  progressionCommand: '/progression-command-api/command/api/rest/progression',
  progressionQuery: '/progression-query-api/query/api/rest/progression',
  resultQuery: '/results-query-api/query/api/rest/results/results',
};

export const downloadResponse = (response: any) =>
  new Blob([response], { type: 'application/pdf' });

/**
 * Use this method to construct a specific endpoint url needed.
 * The base end points for each service has been made available and are strongly typed to the first parameter
 * @example Result service using progression end point to download court pdf documents.
 */
export const constructApiEndPointUrl = <U extends keyof APIEndPoints>(
  apiCallBase: U,
  ...urlParts: string[]
) => {
  const baseUrl = apiEndPoints[apiCallBase];
  return urlParts.reduce((url, part) => {
    part = part.replace(/\s*\\+/g, '/').replace(/\s*\/{2,}/g, '/');
    return Location.joinWithSlash(url, part);
  }, baseUrl);
};
