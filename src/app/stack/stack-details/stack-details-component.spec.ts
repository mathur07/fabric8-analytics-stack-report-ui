import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {StackDetailsComponent} from './stack-details.component';

import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

// import { ModalModule } from 'ngx-modal';
import {TabsModule, AccordionModule} from 'ngx-bootstrap';

import {ModalModule} from 'ngx-bootstrap'


import { GlobalConstants } from '../constants/constants.service';

/** New UX */
// import {StackLevelModule} from '../stack-level/stack-level.module';
// import {ComponentLevelModule} from '../component-level/component-level.module';
import {FeedbackModule} from '../feedback/feedback.module';

import { Broadcaster } from 'ngx-base';


/** Stack Report Revamp - Latest */
import { ReportSummaryModule } from '../report-summary/report-summary.module';
import { CardDetailsModule } from '../card-details/card-details.module';
/** Stack Report Revamp - Latest */

const revampImports = [
  ReportSummaryModule,
  CardDetailsModule
];

describe ('StackDetailsComponent', () => {
    let component: StackDetailsComponent;
    let fixture: ComponentFixture<StackDetailsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                HttpModule,
                FormsModule,
                ModalModule.forRoot(),
                // StackLevelModule,
                // ComponentLevelModule,
                FeedbackModule,
                AccordionModule.forRoot(),
                TabsModule.forRoot(),
                ...revampImports
            ],
            declarations: [
                StackDetailsComponent
            ],
            providers: [
                Broadcaster
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StackDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
