import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { PartnerSerializerService } from './partner-serializer.service';
import { map } from 'rxjs/operators';
import { PartnerRequest, Partner } from './partner';

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

  addPartner(params: Partner) {
    return this.httpService.post('partners', { ...params }).pipe(
      map(({ data }) => {
        return this.partnerSerializer.getPartner(data);
      })
    );
  }

  updatePartner(id: number, params: Partner) {
    return this.httpService.put(`partners/${id}`, { ...params }).pipe(
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
