import FilterRequest from 'src/app/shared/request';

export class Partner {
  id: number;
  name: string;
  code: string;
  emailWhiteLabel: EmailWhiteLabel;
}

export class EmailWhiteLabel {
  partnerName: string;
  copyright: string;
  websiteUrl: string;
  image: File;
}

export class PartnerRequest extends FilterRequest {
  id?: number;
  name?: string;
  code?: string;
  partnerName?: string;
  copyright?: string;
  websiteUrl?: string;
  image?: File;
}
