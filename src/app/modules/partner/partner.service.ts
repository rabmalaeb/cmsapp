import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { PartnerSerializerService } from './partner-serializer.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {

  constructor(
    private httpService: HttpService,
    private partnerSerializer: PartnerSerializerService,
  ) { }

  getPartners() {
    return this.httpService.request('partners', {}).pipe(map(response => {
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
