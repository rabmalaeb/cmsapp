import { Injectable } from '@angular/core';
import { Partner, EmailWhiteLabel } from './partner';
import { CategorySerializerService } from '../category/category-serializer.service';

@Injectable({
  providedIn: 'root'
})
export class PartnerSerializerService {
  constructor(private categorySerializer: CategorySerializerService) {}

  getPartner(partnerResponse: any) {
    if (!partnerResponse) {
      return null;
    }
    const partner = new Partner();
    partner.id = parseInt(partnerResponse.id, 0);
    partner.name = partnerResponse.attributes.name;
    partner.code = partnerResponse.attributes.code;
    partner.emailWhiteLabel = new EmailWhiteLabel();
    if (partnerResponse.relationships && partnerResponse.relationships.emailWhiteLabel) {
      partner.emailWhiteLabel.partnerName =
        partnerResponse.relationships.emailWhiteLabel.partnerName;
      partner.emailWhiteLabel.copyright =
        partnerResponse.relationships.emailWhiteLabel.copyright;
      partner.emailWhiteLabel.image =
        partnerResponse.relationships.emailWhiteLabel.image;
      partner.emailWhiteLabel.websiteUrl =
        partnerResponse.relationships.emailWhiteLabel.websiteUrl;
      partner.emailWhiteLabel.supportEmail =
        partnerResponse.relationships.emailWhiteLabel.supportEmail;
    }
    return partner;
  }
}
