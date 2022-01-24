import { Injectable } from '@angular/core';

// Application Classes
import { UrlBuilder } from '../shared/classes/url-builder';
import { QueryStringParameters } from '../shared/classes/query-string-parameters';
// Application Constants
import { Constants } from 'src/app/config/constants';

import { Entry } from '../@core/types/entry';
import { StringHelper } from '../helpers/string-helper';

@Injectable({
  providedIn: 'root'
})
export class ApiEndpointsService {

  strHelper: StringHelper;

  constructor(private constants: Constants) {
    this.strHelper = new StringHelper();
  }

  /* #region URL CREATOR */
  // URL
  private createUrl(
    action: string,
    isMockAPI: boolean = false
  ): string {
    const urlBuilder: UrlBuilder = new UrlBuilder(
      isMockAPI ? this.constants.API_MOCK_ENDPOINT :
      this.constants.API_ENDPOINT,
      action
    );
    return urlBuilder.toString();
  }
  // URL WITH QUERY PARAMS
  private createUrlWithQueryParameters(
    action: string,
    queryStringHandler?:
      (queryStringParameters: QueryStringParameters) => void
  ): string {
    const urlBuilder: UrlBuilder = new UrlBuilder(
      this.constants.API_ENDPOINT,
      action
    );
    // Push extra query string params
    if (queryStringHandler) {
      queryStringHandler(urlBuilder.queryString);
    }
    return urlBuilder.toString();
  }

  // URL WITH PATH VARIABLES
  public createUrlWithPathVariables(
    action: string,
    pathVariables: any[] = []
  ): string {
    let encodedPathVariablesUrl: string = '';
    // Push extra path variables
    for (const pathVariable of pathVariables) {
      if (pathVariable !== null) {
        encodedPathVariablesUrl +=
          `/${encodeURIComponent(pathVariable.toString())}`;
      }
    }
    const urlBuilder: UrlBuilder = new UrlBuilder(
      this.constants.API_ENDPOINT,
      `${action}${encodedPathVariablesUrl}`
    );
    return urlBuilder.toString();
  }

  public createUrlWithPathAndQueryParameters(
    action: string,
    pathVariables?: any[],
    queryStringHandler?: (queryStringParameters: QueryStringParameters) => void
) : string {

    //  Create path
    let encodedPathVariablesUrl: string = '';
    // Push extra path variables
    if(pathVariables) {
        for (const pathVariable of pathVariables) {
            if (pathVariable !== null) {
            encodedPathVariablesUrl +=
                `/${encodeURIComponent(pathVariable.toString())}`;
            }
        }
    }

    const urlBuilder: UrlBuilder = new UrlBuilder(
        this.constants.API_ENDPOINT,
        `${action}${encodedPathVariablesUrl}`
    );

    if (queryStringHandler) {
        queryStringHandler(urlBuilder.queryString);
    }

    //  Create query parameter
    return urlBuilder.toString();
}
  /* #endregion */

  /**
   *    START YOUR OWN ENDPOINTS HERE
   */

  /**
   * ENTRY ENDPOINTS
   **/
  public getAllEntryBrief(): string {
    return this.createUrl('entries-brief');
  }

  public getEntriesEndpoint(page_index: number, page_size: number): string {
    return this.createUrlWithQueryParameters(
      'entries',
      (qs: QueryStringParameters) => {
        qs.push('page_index', page_index);
        qs.push('page_size', page_size);
      }
    );
  }

  public getEntryEndpoint(post_id: number) {
    return this.createUrlWithQueryParameters(
      'entry',
      (qs: QueryStringParameters) => {
        qs.push('post_id', post_id)
      }
    )
  }

  public getTotalEntriesEndpoint(): string {
    return this.createUrlWithQueryParameters(
      'total_entries'
    );
  }

  public postNewEntry(): string {
    return this.createUrl('post-insert');
  }

  public deleteEntry(entry_id: number) : string {
    return this.createUrlWithPathVariables(
      'delete-entry',
      [ entry_id ]
    );
  }

  /**
   *  CATEGORY ENDPOINTS
   */
  public getAllTermsEndpoint(): string {
    return this.createUrlWithQueryParameters(
      'terms'
    );
  }

  public postNewCategory(): string {
    return this.createUrl('post-term');
  }

  public updateCategory(): string {
    return this.createUrl('update-term');
  }

  public deleteCategory(term_id: number) : string {
    return this.createUrlWithPathVariables(
      'delete-term',
      [ term_id ]
    );
  }

  /**
   *  POST-CATEGORY RELATIONSHIP
   */
  public getPostCategories(postid: number): string {
    return this.createUrlWithPathAndQueryParameters(
      'term-relationship',
      ['post-category', postid]
    );
  }

  public modifyPostCategories(postid: number, categories: number[] | String): string {
    let cats: String = "";
    console.log("We have", categories);
    if(!(categories instanceof String))
      for(const cate in categories) {
        cats += categories[cate] + ',';
      }

    if(categories instanceof String)
      cats = categories;
    console.log("so???", cats);
    return this.createUrlWithPathAndQueryParameters(
      'term-relationship',
      ['modify', postid],
      (qs: QueryStringParameters) => {
          qs.push('category_ids', cats)
      }
    );
  }
}
