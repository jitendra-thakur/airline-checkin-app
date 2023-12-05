import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GET_LABELS } from './../graphql/graphql.queries';

@Injectable({
  providedIn: 'root',
})
export class I18nLabelService {
  constructor(private apollo: Apollo) {}

  getLabels(language: string): Observable<any> {
    // Set the headers including Accept-Language
    const headers = {
      'Accept-Language': language,
    };
    return this.apollo
      .query({
        query: GET_LABELS,
        variables: { language },
        context: {
          headers,
        },
      })
      .pipe(
        map((result) => {
          // Extract labels from the GraphQL result
          if (result?.data) {
            return result.data;
          } else {
            throw new Error('Invalid response format');
          }
        })
      );
  }
}
