import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExperiencePage } from './addExperience.page';

describe('AddExperiencePage', () => {
  let component: AddExperiencePage;
  let fixture: ComponentFixture<AddExperiencePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddExperiencePage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExperiencePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
