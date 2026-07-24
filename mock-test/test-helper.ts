import { HearingResults, DocumentIndicesItem } from '../src/app/core/model';
import { Actions } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { Observable } from 'rxjs'; // tslint:disable-line

export const hearingDetails: any = {
  hearing: {
    courtCentre: {
      id: '9b583616-049b-30f9-a14f-028a53b7cfe8',
      name: 'Liverpool Crown Court',
      roomId: 'fbe3ca1a-6be6-3bd5-86e8-fc879aa5e3e7',
      roomName: 'Crown Court 5-3'
    },
    defendantAttendance: [
      {
        attendanceDays: ['2018-07-17', '2018-07-18', '2018-07-19', '2018-07-21', '2018-07-22'],
        defendants: ['914633fa-68f9-43eb-82c6-97a8a80277e0'],
        firstName: 'Winifred',
        id: '8b607ee6-0fd3-4b8a-bcc2-92760acf8516',
        lastName: 'Ingram',
        status: 'QC',
        title: 'Mr'
      },
      {
        attendanceDays: ['2018-07-17', '2018-07-18', '2018-07-19', '2018-07-21', '2018-07-22'],
        defendants: ['0150d872-1ddf-442a-95a3-ff63e34d49ab'],
        firstName: 'Devin',
        id: '5ac95092-1a14-4ccc-bbaa-9d6bf04eafeb',
        lastName: 'Moreno',
        status: 'QC',
        title: 'Mr'
      }
    ],
    hasSharedResults: true,
    hearingDays: [
      {
        listedDurationMinutes: 1,
        listingSequence: 0,
        sittingDay: '2019-06-04T08:00:00.000Z'
      },
      {
        listedDurationMinutes: 360,
        listingSequence: 0,
        sittingDay: '2019-06-05T09:30:00.000Z'
      },
      {
        listedDurationMinutes: 360,
        listingSequence: 0,
        sittingDay: '2019-06-06T09:30:00.000Z'
      },
      {
        listedDurationMinutes: 360,
        listingSequence: 0,
        sittingDay: '2019-06-08T09:30:00.000Z'
      },
      {
        listedDurationMinutes: 2,
        listingSequence: 0,
        sittingDay: '2019-06-09T14:00:00.000Z'
      }
    ],
    hearingLanguage: 'ENGLISH',
    id: '3e1f5ce9-f275-415f-86a5-b147828be972',
    judiciary: [
      {
        firstName: 'Tim',
        judicialId: '00ac8ed3-b432-3bdd-8ebb-ebcb2ba10a00',
        judicialRoleType: {
          judicialRoleTypeId: '00ac8ed3-b432-3bdd-8ebb-ebcb2ba10a00',
          judiciaryType: 'DJ'
        },
        lastName: 'Daber',
        title: 'Mr'
      }
    ],
    jurisdictionType: 'CROWN',
    prosecutionCases: [
      {
        caseStatus: 'READY_FOR_REVIEW',
        defendants: [
          {
            id: '0150d872-1ddf-442a-95a3-ff63e34d49ab',
            offences: [
              {
                convictionDate: '2019-06-04',
                count: 0,
                endDate: '2018-08-01',
                id: '7f2d9506-e699-4e7b-9d07-699bc85d6918',
                judicialResults: [
                  {
                    category: 'FINAL',
                    cjsCode: '3047',
                    courtClerk: {
                      firstName: 'Anne',
                      lastName: 'Green',
                      userId: '801117ca-4993-41f8-94dd-0bb844b883a7'
                    },
                    delegatedPowers: {
                      firstName: 'Anne',
                      lastName: 'Green',
                      userId: '801117ca-4993-41f8-94dd-0bb844b883a7'
                    },
                    isAdjournmentResult: false,
                    isAvailableForCourtExtract: true,
                    isConvictedResult: false,
                    isDeleted: false,
                    isFinancialResult: false,
                    judicialResultId: 'c6fd2341-d9b4-433e-9203-2b417748debf',
                    judicialResultPrompts: [
                      {
                        isAvailableForCourtExtract: true,
                        label: 'Protected person',
                        promptSequence: 1,
                        usergroups: ['Court Clerks', 'Police Admin'],
                        value: 'John Smith',
                        welshLabel: ''
                      },
                      {
                        isAvailableForCourtExtract: true,
                        label: 'Protected persons address',
                        promptSequence: 2,
                        usergroups: ['Court Clerks', 'Police Admin'],
                        value: 'Flat 5, Holborn Street',
                        welshLabel: ''
                      },
                      {
                        isAvailableForCourtExtract: true,
                        label: 'Order details',
                        promptSequence: 3,
                        usergroups: [
                          'Court Clerks',
                          'Probation Admin',
                          'Police Admin',
                          'Victims & Witness Care Admin'
                        ],
                        value: 'No Order Details',
                        welshLabel: ''
                      },
                      {
                        isAvailableForCourtExtract: true,
                        label: 'Period of order',
                        promptSequence: 4,
                        usergroups: [
                          'Court Clerks',
                          'Probation Admin',
                          'Police Admin',
                          'Victims & Witness Care Admin'
                        ],
                        value: '10 Years, 0 Months, 0 Weeks, 0 Days',
                        welshLabel: ''
                      },
                      {
                        isAvailableForCourtExtract: true,
                        label: 'Conviction / acquittal',
                        promptSequence: 8,
                        usergroups: [
                          'Court Clerks',
                          'Probation Admin',
                          'Police Admin',
                          'Victims & Witness Care Admin'
                        ],
                        value: 'Convicted',
                        welshLabel: ''
                      }
                    ],
                    label: 'Restraining order for period',
                    lastSharedDateTime: '2019-01-15',
                    orderedDate: '2019-06-04',
                    orderedHearingId: '3e1f5ce9-f275-415f-86a5-b147828be972',
                    rank: 1,
                    usergroups: []
                  }
                ],
                modeOfTrial: 'EWAY',
                offenceCode: 'OF61131',
                offenceDefinitionId: '6abe3e81-1de0-4c42-b0d2-2dc38f5c44c5',
                offenceLegislation:
                  'Contrary to section 20 of the Offences Against the    Person Act 1861.',
                offenceLegislationWelsh: 'Yn groes i adran 20 Deddf Troseddau Corfforol 1861.',
                offenceTitle: 'Wound / inflict grievous bodily harm without intent',
                offenceTitleWelsh: 'Clwyfo / peri niwed corfforol difrifol heb fwriadu',
                plea: {
                  delegatedPowers: {
                    firstName: 'Anne',
                    lastName: 'Green',
                    userId: '222768ad-c607-419f-81d5-96a49613475a'
                  },
                  offenceId: '7f2d9506-e699-4e7b-9d07-699bc85d6918',
                  originatingHearingId: '3e1f5ce9-f275-415f-86a5-b147828be972',
                  pleaDate: '2019-06-04',
                  pleaValue: 'GUILTY'
                },
                startDate: '2010-08-01',
                wording:
                  'on 01/08/2009 at  the County public house, unlawfully and maliciously wounded, John Smith'
              },
              {
                convictionDate: '2019-06-04',
                count: 0,
                endDate: '2018-08-01',
                id: '52d62a5a-2e24-410c-8785-83597508014a',
                modeOfTrial: 'EWAY',
                offenceCode: 'OF61131',
                offenceDefinitionId: '6abe3e81-1de0-4c42-b0d2-2dc38f5c44c5',
                offenceLegislation:
                  'Contrary to section 20 of the Offences Against the    Person Act 1861.',
                offenceLegislationWelsh: 'Yn groes i adran 20 Deddf Troseddau Corfforol 1861.',
                offenceTitle: 'Wound / inflict grievous bodily harm without intent',
                offenceTitleWelsh: 'Clwyfo / peri niwed corfforol difrifol heb fwriadu',
                plea: {
                  delegatedPowers: {
                    firstName: 'Anne',
                    lastName: 'Green',
                    userId: '222768ad-c607-419f-81d5-96a49613475a'
                  },
                  offenceId: '52d62a5a-2e24-410c-8785-83597508014a',
                  originatingHearingId: '3e1f5ce9-f275-415f-86a5-b147828be972',
                  pleaDate: '2019-06-04',
                  pleaValue: 'GUILTY'
                },
                startDate: '2010-08-01',
                wording:
                  'on 01/08/2009 at  the County public house, unlawfully and maliciously wounded, John Smith'
              }
            ],
            personDefendant: {
              bailStatus: 'UNCONDITIONAL',
              personDetails: {
                address: {
                  address1: '222 Furze Road',
                  address2: 'Exeter',
                  address3: 'England',
                  address4: 'UK'
                },
                dateOfBirth: '1983-05-23',
                firstName: 'Marty',
                gender: 'MALE',
                interpreterLanguageNeeds: 'English',
                lastName: 'Upton',
                nationalityCode: 'GBR',
                nationalityDescription: 'British',
                nationalityId: '49433158-3542-49c8-a9af-581a0e746152'
              }
            },
            prosecutionCaseId: 'da946803-373e-4d63-b2b4-372c4888685e'
          }
        ],
        id: 'da946803-373e-4d63-b2b4-372c4888685e',
        initiationCode: 'C',
        prosecutionCaseIdentifier: {
          prosecutionAuthorityCode: 'CPS',
          prosecutionAuthorityId: '52b27284-0686-4894-b1c7-7d4b634cacdb',
          caseURN: '96GD6503919'
        }
      }
    ],
    prosecutionCounsels: [
      {
        attendanceDays: ['2018-07-17', '2018-07-18', '2018-07-19', '2018-07-21', '2018-07-22'],
        firstName: 'Marlon',
        id: '82f1dde1-8549-4204-886e-3af44ef495b9',
        lastName: 'Bryant',
        prosecutionCases: ['e8c61764-dd96-4b23-9cb5-6e685073b11a'],
        status: 'QC',
        title: 'Mr'
      }
    ],
    type: {
      description: 'Plea & Trial Preparation',
      id: '06b0c2bf-3f98-46ed-ab7e-56efaf9ecced'
    }
  },
  sharedTime: '2019-06-04T09:50:40.299Z'
};

export const mockHearing1: HearingResults = {
  hearingId: '6843dd0b-6786-40d7-88ad-b01eb4cfd4a3',
  hearingType: '12SF751784',
  hearingDate: '2018-02-06',
  urns: ['96GD5317818'],
  defendant: {
    firstName: 'Raymond',
    lastName: 'Bardazzi',
    personId: 'a45f9340-2153-11e9-a44d-d19789f8880c'
  }
};

export const documents: DocumentIndicesItem[] = [
  {
    caseIds: ['da946803-373e-4d63-b2b4-372c4888685e'],
    category: 'NOW documents',
    defendantIds: ['0150d872-1ddf-442a-95a3-ff63e34d49ab'],
    document: {
      courtDocumentId: 'aa1de57b-fb73-40a4-9813-4a593f29e537',
      documentCategory: {
        nowDocument: {
          defendantId: '0150d872-1ddf-442a-95a3-ff63e34d49ab',
          orderHearingId: '3e1f5ce9-f275-415f-86a5-b147828be972',
          prosecutionCases: ['da946803-373e-4d63-b2b4-372c4888685e']
        }
      },
      documentTypeDescription: 'Court Final orders',
      documentTypeId: 'aa1de57b-fb73-40a4-9813-4a593f29e537',
      materials: [
        {
          generationStatus: 'generated',
          id: '0664ae95-069f-4afc-a02e-756519872f54',
          name: 'Restraining Order for a period',
          uploadDateTime: '2019-06-04T09:50:49.538Z',
          userGroups: ['Court Clerks', 'Police Admin']
        }
      ],
      name: 'Restraining Order for a period'
    },
    hearingIds: ['3e1f5ce9-f275-415f-86a5-b147828be972'],
    type: 'Court Final orders'
  }
];

export class TestActions extends Actions {
  constructor() {
    super(EMPTY);
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}

export function getActions() {
  return new TestActions();
}
