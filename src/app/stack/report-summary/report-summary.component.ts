/** Vendor imports Go HERE */
import {
    Component,
    Input,
    Output,
    EventEmitter,
    OnChanges,
    OnInit,
    SimpleChanges
} from '@angular/core';
/** Vendor imports Go HERE */

import {
    ResultInformationModel,
    SecurityInformationModel,
    RecommendationsModel,
    ComponentInformationModel,
    StackLicenseAnalysisModel,
    UserStackInfoModel,
    GithubModel,
    OutlierInformationModel
} from '../models/stack-report.model';

import {
    MReportSummaryCard,
    MReportSummaryContent,
    MReportSummaryInfoEntry,
    MReportSummaryTitle
} from '../models/ui.model';
import { ReportSummaryUtils } from '../utils/report-summary-utils';

@Component({
    selector: 'analytics-report-summary',
    styleUrls: ['./report-summary.component.less'],
    templateUrl: './report-summary.component.html'
})
export class ReportSummaryComponent implements OnChanges {
    @Input() report: ResultInformationModel;
    @Output('onCardClick') onCardClick = new EventEmitter<any>();

    public reportSummaryCards: Array<MReportSummaryCard> = [];

    public reportSummaryContent: MReportSummaryContent;
    public reportSummaryTitle: MReportSummaryTitle;
    public reportSummaryDescription: string;
    public notification = null;
    private reportSummaryUtils = new ReportSummaryUtils();

    constructor() {
        this.notification = this.reportSummaryUtils.notification;
    }

    // tslint:disable-next-line:member-ordering
    public cardTypes: any = {
        SECURITY: 'security',
        INSIGHTS: 'insights',
        LICENSES: 'licenses',
        COMP_DETAILS: 'compDetails'
    };

    // tslint:disable-next-line:member-ordering
    public titleAndDescription: any = {
        [this.cardTypes.SECURITY]: {
            title: 'Dependencies with security issues in your stack',
            description: 'OSIO Analytics identifies security issues in your stack. Click this card to see further details of the security tasks affecting your stack.'
        },
        [this.cardTypes.INSIGHTS]: {
            title: 'Complementary dependencies that can augment your stack',
            description: 'OSIO Analytics identifies dependencies that are rarely used in similar stacks, and suggests alternate and additional dependencies that can enhance your stack. Click this card to see detailed suggestions on alternate and additional dependencies.'
        },
        [this.cardTypes.LICENSES]: {
            title: 'License details of dependencies in your stack',
            description: 'OSIO Analytics identifies the stack level license, the conflicting licenses, and the unknown licenses for your stack. Click this card to see detailed information on the conflicting and unknown licenses in your stack.'
        },
        [this.cardTypes.COMP_DETAILS]: {
            title: 'Dependency details of your manifest file',
            description: 'Dependencies analyzed based on versions and popularity. Click this card to see security, license and usage information for each dependency.'
        }
    };

    ngOnChanges(changes: SimpleChanges) {
        let summary: any = changes['report'];
        if (summary) {
            this.report = <ResultInformationModel>summary.currentValue;
            this.repaintView();
        }
    }

    public handleSummaryClick(card: MReportSummaryCard): void {
        if (card) {
            let cardType: string = card.identifier || '';
            this.onCardClick.emit({
                cardType: cardType,
                report: this.report
            });
        }
    }

    private getSecurityReportCard(): MReportSummaryCard {
        return this.reportSummaryUtils.getSecurityReportCard(this.report.user_stack_info);
    }

    private getInsightsReportCard(): MReportSummaryCard {
        return this.reportSummaryUtils.getInsightsReportCard(this.report.recommendation);
    }

    private getLicensesReportCard(): MReportSummaryCard {
        return this.reportSummaryUtils.getLicensesReportCard(this.report.user_stack_info);
    }

    private getComponentDetailsReportCard(): MReportSummaryCard {
        let componentDetailsCard: MReportSummaryCard = this.reportSummaryUtils.newCardInstance();

        componentDetailsCard.identifier = this.cardTypes.COMP_DETAILS;
        componentDetailsCard.reportSummaryTitle.titleIcon = 'fa fa-cube';
        componentDetailsCard.reportSummaryTitle.titleText = 'Dependency Details';
        componentDetailsCard.reportSummaryDescription = this.titleAndDescription[this.cardTypes.COMP_DETAILS].description;
        componentDetailsCard.reportSummaryContent.infoEntries = [];

        if (this.report.user_stack_info) {
            let userStackInfo: UserStackInfoModel = this.report.user_stack_info;


            const unknownCount: number = userStackInfo.unknown_dependencies.length;
            const analyzedDirectCount: number = userStackInfo.analyzed_dependencies.length;
            const totalCount: number = unknownCount + analyzedDirectCount;

            let analyzedTransSet = new Set();
            let analyzedTransCount: number;
            userStackInfo.analyzed_dependencies.forEach(element => {
                element.dependencies.forEach(tDep => {
                    analyzedTransSet.add(tDep.name + tDep.version);
                });
            });

            analyzedTransCount =  analyzedTransSet.size;
            const isTransitiveSupported: boolean = analyzedTransCount >= 0;

            const analyzedEntry: MReportSummaryInfoEntry = new MReportSummaryInfoEntry();
            analyzedEntry.infoText = 'Analyzed Dependencies';
            analyzedEntry.infoValue = analyzedDirectCount;

            const unknownEntry: MReportSummaryInfoEntry = new MReportSummaryInfoEntry();
            unknownEntry.infoText = 'Unknown Dependencies';
            unknownEntry.infoValue = unknownCount;

            if (isTransitiveSupported) {
                const analyzedTransEntry: MReportSummaryInfoEntry = new MReportSummaryInfoEntry();
                analyzedTransEntry.infoText = 'Transitive Dependencies';
                analyzedTransEntry.infoValue = analyzedTransCount;

                componentDetailsCard.reportSummaryContent.infoEntries.push(analyzedEntry);
                componentDetailsCard.reportSummaryContent.infoEntries.push(analyzedTransEntry);
            } else {
                const totalEntry: MReportSummaryInfoEntry = new MReportSummaryInfoEntry();
                totalEntry.infoText = 'Total Dependencies';
                totalEntry.infoValue = totalCount;

                componentDetailsCard.reportSummaryContent.infoEntries.push(totalEntry);
                componentDetailsCard.reportSummaryContent.infoEntries.push(analyzedEntry);
            }
            componentDetailsCard.reportSummaryContent.infoEntries.push(unknownEntry);
        } else {
            // Handle no user dependencies scenario
        }

        return componentDetailsCard;
    }

    private updateCards(): void {
        let cards: Array<MReportSummaryCard> = [];
        if (this.report) {
            cards[0] = this.getSecurityReportCard();
            cards[1] = this.getComponentDetailsReportCard();
            cards[2] = this.getLicensesReportCard();
            cards[3] = this.getInsightsReportCard();
        }
        this.reportSummaryCards = cards;
        // Select the first card by default
        this.handleSummaryClick(cards[0]);
    }

    private paintView(): void {
        this.updateCards();
    }

    private repaintView(): void {
        this.paintView();
    }
}
