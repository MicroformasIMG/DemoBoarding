import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentVerifierComponent } from './document-verifier.component';

describe('DocumentVerifierComponent', () => {
  let component: DocumentVerifierComponent;
  let fixture: ComponentFixture<DocumentVerifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentVerifierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentVerifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
