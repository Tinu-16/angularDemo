import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSummary } from './search-summary';

describe('SearchSummary', () => {
  let component: SearchSummary;
  let fixture: ComponentFixture<SearchSummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchSummary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchSummary);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
