import { Clerk } from './clerk';
import { Variant } from './variant';

export interface HearingDetails {
  id: string;
  personId: string;
  courtCentreName: string;
  courtCode: string;
  startDate: string;
  judgeName: string;
  prosecutorName: string;
  defenceName: string;
  clerks: Clerk[];
  variants: Variant[];
}
export interface HearingDetailsExtended extends HearingDetails {
  variantExtended?: VariantExtended[];
}

export interface VariantExtended extends Variant {
  alfrescoAssetId: string;
  fileName: string;
  materialAddedDate: string;
  materialId: string;
  mimeType: string;
}
