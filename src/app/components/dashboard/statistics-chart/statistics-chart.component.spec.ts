import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsChartComponent } from './statistics-chart.component';
import { HttpClientModule } from '@angular/common/http';

describe('StatisticsChartComponent', () => {
  let component: StatisticsChartComponent;
  let fixture: ComponentFixture<StatisticsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatisticsChartComponent, HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(StatisticsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
