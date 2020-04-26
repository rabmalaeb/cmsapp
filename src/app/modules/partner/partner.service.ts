import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { PartnerSerializerService } from './partner-serializer.service';
import { map } from 'rxjs/operators';
import {
  createFormDataFromObject,
  addPutMethodToFormData
} from 'src/app/shared/utils/general';
import { PartnerRequest } from './partner';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {
  constructor(
    private httpService: HttpService,
    private partnerSerializer: PartnerSerializerService
  ) {}

  getPartners(partnerRequest: PartnerRequest) {
    return this.httpService.get('partners', partnerRequest).pipe(
      map(({ data: { items, paginator } }) => {
        return {
          items: items.map(item => this.partnerSerializer.getPartner(item)),
          paginator
        };
      })
    );
  }

  getPartner(id: number) {
    return this.httpService.get(`partners/${id}`, {}).pipe(
      map(({ data }) => {
        return this.partnerSerializer.getPartner(data);
      })
    );
  }

  addPartner(params: PartnerRequest) {
    const formData = createFormDataFromObject(params);
    return this.httpService.post('partners', formData).pipe(
      map(({ data }) => {
        return this.partnerSerializer.getPartner(data);
      })
    );
  }

  updatePartner(id: number, params: PartnerRequest) {
    const formData = createFormDataFromObject(params);
    addPutMethodToFormData(formData);
    return this.httpService.post(`partners/${id}`, formData).pipe(
      map(({ data }) => {
        return this.partnerSerializer.getPartner(data);
      })
    );
  }

  deletePartner(id: number) {
    return this.httpService.delete(`partners/${id}`).pipe(
      map(response => {
        return response.map(data => this.partnerSerializer.getPartner(data));
      })
    );
  }
}
