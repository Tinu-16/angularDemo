import { Component } from '@angular/core';
import { SearchSummary } from './search-summary/search-summary';
import { SearchDetails } from './search-details/search-details';

@Component({
  selector: 'app-search-result',
  imports: [SearchSummary,SearchDetails],
  templateUrl: './search-result.html',
  styleUrl: './search-result.scss',
})
export class SearchResult {

}
