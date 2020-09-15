/** Vendor imports Go HERE */
import {
    Component,
    Input,
    OnInit,
    OnChanges,
    SimpleChanges
} from '@angular/core';
/** Vendor imports Go HERE */

import {
    MReportInformation,
    MComponentDetails,
    MGenericStackInformation
} from '../../models/ui.model';

import { GenerateUrl } from '../../utils/url-generator';
import { HandleUrl } from '../../utils/handle-url'

@Component({
    selector: 'report-information',
    styleUrls: ['./report-information.component.less'],
    templateUrl: './report-information.component.html'
})
export class ReportInformationComponent implements OnInit, OnChanges {
    @Input() report: MReportInformation;
    @Input() genericInformation: MGenericStackInformation;
    @Input() repoInfo: any;
    @Input() tabType: string;
    @Input() transitive: boolean;
    @Input() registrationStatus: string;

    public generateUrl = new GenerateUrl();
    public handleUrl = new HandleUrl();

    public componentDetails: Array<MComponentDetails> = null;

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {

        let summary: any = changes['report'];
        if (summary) {
            this.report = <MReportInformation>summary.currentValue;
            this.paint();
        }
    }

    public handleAccordion(event: MouseEvent, componentDetail: MComponentDetails): void {

        event.stopPropagation()

        let element = componentDetail.componentInformation;


        let elem: HTMLElement = (<HTMLElement>event.target);
        if (this.checkIfClickable(elem)) {

            if (componentDetail.componentInformation && componentDetail.componentInformation.allTransitiveDependencies && componentDetail.componentInformation.allTransitiveDependencies.length > 0) {
                this.closeAllButThis(componentDetail);

                if (
                    (componentDetail.componentInformation && !componentDetail.componentInformation.needsExpansion) ||
                    (componentDetail.recommendationInformation && componentDetail.recommendationInformation.componentInformation &&
                        !componentDetail.recommendationInformation.componentInformation.needsExpansion)
                ) {
                    return;
                }
                if (componentDetail.componentInformation) {
                    componentDetail.componentInformation.isOpen = !componentDetail.componentInformation.isOpen;
                }
                if (componentDetail.recommendationInformation) {
                    if (componentDetail.recommendationInformation.componentInformation) {
                        componentDetail.recommendationInformation.componentInformation.isOpen = !componentDetail.recommendationInformation.componentInformation.isOpen;
                    }
                }

            } else if (componentDetail.componentInformation && componentDetail.componentInformation.allTransitiveDependencies === undefined || null) {
                this.closeAllButThis(componentDetail);

                if (
                    (componentDetail.componentInformation && !componentDetail.componentInformation.needsExpansion) ||
                    (componentDetail.recommendationInformation && componentDetail.recommendationInformation.componentInformation &&
                        !componentDetail.recommendationInformation.componentInformation.needsExpansion)
                ) {
                    return;
                }
                if (componentDetail.componentInformation) {
                    componentDetail.componentInformation.isOpen = !componentDetail.componentInformation.isOpen;
                }
                if (componentDetail.recommendationInformation) {
                    if (componentDetail.recommendationInformation.componentInformation) {
                        componentDetail.recommendationInformation.componentInformation.isOpen = !componentDetail.recommendationInformation.componentInformation.isOpen;
                    }
                }

            } else {
                this.closeAllButThis(componentDetail);

                if (
                    (componentDetail.componentInformation && !componentDetail.componentInformation.needsExpansion) ||
                    (componentDetail.recommendationInformation && componentDetail.recommendationInformation.componentInformation &&
                        !componentDetail.recommendationInformation.componentInformation.needsExpansion)
                ) {
                    return;
                }
                if (componentDetail.componentInformation) {
                    componentDetail.componentInformation.isOpen = !componentDetail.componentInformation.isOpen;
                }
                if (componentDetail.recommendationInformation) {
                    if (componentDetail.recommendationInformation.componentInformation) {
                        componentDetail.recommendationInformation.componentInformation.isOpen = !componentDetail.recommendationInformation.componentInformation.isOpen;
                    }
                }
            }
        }
    }


    public handleTransitive(event: MouseEvent, componentDetail: MComponentDetails): void {

        event.stopPropagation()

        let elem: HTMLElement = (<HTMLElement>event.target);
        if (this.checkIfTransitiveToggler(elem)) {

            if (componentDetail.componentInformation) {
                componentDetail.componentInformation.showTransitive = !componentDetail.componentInformation.showTransitive;
            }

        }
    }


    private checkIfClickable(elem: HTMLElement): boolean {
        if (elem && elem.classList && elem.classList.contains('toggler')) {
            return true;
        }
        elem = <HTMLElement>elem.parentNode;
        return (elem && elem.classList && elem.classList.contains('toggler'));
    }
    private checkIfTransitiveToggler(elem: HTMLElement): boolean {
        if (elem && elem.classList && (elem.classList.contains('transitive-head') || elem.classList.contains('trans-dropdown'))) {
            return true;
        }
        elem = <HTMLElement>elem.parentNode;
        return (elem && elem.classList && (elem.classList.contains('transitive-head') || elem.classList.contains('trans-dropdown')));
    }


    private paint(): void {
        if (this.report) {
            if (this.report.componentDetails && this.report.componentDetails.length > 0) {
                this.componentDetails = this.report.componentDetails;
            }
        }
    }

    private closeAllButThis(componentDetail: MComponentDetails): void {
        event.preventDefault();
        if (this.componentDetails) {
            this.componentDetails.forEach((cdetail: MComponentDetails) => {
                if (cdetail !== componentDetail) {
                    if (cdetail.componentInformation) {
                        cdetail.componentInformation.isOpen = false;  // changed
                        event.preventDefault();
                    }
                    if (cdetail.recommendationInformation) {
                        if (cdetail.recommendationInformation.componentInformation) {
                            cdetail.recommendationInformation.componentInformation.isOpen = false;
                        }
                    }
                }
            });
        }
    }
}
