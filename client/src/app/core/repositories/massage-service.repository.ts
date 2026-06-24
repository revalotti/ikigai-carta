import { Injectable, inject } from '@angular/core';
import { Observable, from, map } from 'rxjs';
import { MassageService } from '../models/massage-service.model';
import { SupabaseService } from '../services/supabase.service';
import { toMassageService } from './massage-service.mapper';

@Injectable({ providedIn: 'root' })
export class MassageServiceRepository {
  private client = inject(SupabaseService).client;

  getAll(): Observable<MassageService[]> {
    return from(
      this.client
        .from('massage_services')
        .select('*')
        .order('created_at', { ascending: true }),
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return (data ?? []).map(toMassageService);
      }),
    );
  }
}
