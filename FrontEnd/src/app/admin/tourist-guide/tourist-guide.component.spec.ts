import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TouristGuideComponent } from './tourist-guide.component';

describe('TouristGuideComponent', () => {
  let component: TouristGuideComponent;
  let fixture: ComponentFixture<TouristGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TouristGuideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TouristGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
