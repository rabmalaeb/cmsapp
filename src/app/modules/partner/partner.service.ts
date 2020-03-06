import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { PartnerSerializerService } from './partner-serializer.service';
import { map } from 'rxjs/operators';
import { PartnerRequest } from './partner';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {

  constructor(
    private httpService: HttpService,
    private partnerSerializer: PartnerSerializerService,
  ) { }

  getPartners(partnerRequest: PartnerRequest) {
    return this.httpService.request('partners', partnerRequest).pipe(map(response => {
      return response.map(data => this.partnerSerializer.getPartner(data));
    }));
  }

  getPartner(id: number) {
    return this.httpService.request(`partners/${id}`, {}).pipe(map(({ data }) => {
      return this.partnerSerializer.getPartner(data);
    }));
  }

  addPartner(params) {
    return this.httpService.post('partners', { ...params }).pipe(map(({ data }) => {
      return this.partnerSerializer.getPartner(data);
    }));
  }

  updatePartner(id, params) {
    return this.httpService.put(`partners/${id}`, { ...params }).pipe(map(({ data }) => {
      return this.partnerSerializer.getPartner(data);
    }));
  }

  deletePartner(id: number) {
    return this.httpService.delete(`partners/${id}`).pipe(map(response => {
      return response.map(data => this.partnerSerializer.getPartner(data));
    }));
  }
}
