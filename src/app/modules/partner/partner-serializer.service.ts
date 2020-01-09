import { Injectable } from '@angular/core';
import { Partner } from './partner';
import { CategorySerializerService } from '../category/category-serializer.service';

@Injectable({
  providedIn: 'root'
})
export class PartnerSerializerService {

  constructor(
    private categorySerializer: CategorySerializerService
  ) { }

  getPartner(partnerResponse: any) {
    if (!partnerResponse) {
      return null;
    }
    const partner = new Partner();
    partner.id = parseInt(partnerResponse.id, 0);
    partner.name = partnerResponse.attributes.name;
    partner.code = partnerResponse.attributes.code;
    return partner;
  }
}
