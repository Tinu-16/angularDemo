import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDetails } from './search-details';

describe('SearchDetails', () => {
  let component: SearchDetails;
  let fixture: ComponentFixture<SearchDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
