import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CHECKIN } from './../graphql/graphql.queries';

@Injectable({
  providedIn: 'root',
})
export class CheckinService {
  constructor(private apollo: Apollo) {}

  checkin(
    bookingCode: string,
    familyName: string
  ): Observable<{ status: number; code:number, discription:string }> {
    return this.apollo
      .mutate({
        mutation: CHECKIN,
        variables: { bookingCode, familyName },
      })
      .pipe(
        map((result: any) => {
          // Handle the response based on status and message
          const { status, code, discription} =
            result?.data?.checkin || {};
          if (status === 200) {
            // Success scenario
            return { status, code, discription: 'Check-in successful' };
          } else {
            // Error scenario
            return { status, code, discription };
          }
        })
      );
  }
}
