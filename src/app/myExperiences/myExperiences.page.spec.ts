import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyExperiencesPage } from './myExperiences.page';

describe('Tab3Page', () => {
  let component: MyExperiencesPage;
  let fixture: ComponentFixture<MyExperiencesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyExperiencesPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyExperiencesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
