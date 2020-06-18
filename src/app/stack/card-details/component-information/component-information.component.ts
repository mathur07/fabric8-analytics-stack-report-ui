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
    MComponentInformation,
    MComponentHeaderColumn,
    MRecommendationInformation,
    MGenericStackInformation
} from '../../models/ui.model';


@Component({
    selector: 'component-information',
    styleUrls: ['./component-information.component.less'],
    templateUrl: './component-information.component.html'
})
export class ComponentInformationComponent implements OnInit, OnChanges {
    @Input() component: MComponentInformation | MRecommendationInformation;
    @Input() positions: Array<MComponentHeaderColumn>;
    @Input() genericInformation: MGenericStackInformation;
    @Input() serial: number;
    @Input() type: string;
    @Input() repoInfo: any;
    @Input() tabType: string;
    public comp: MComponentInformation;
    publicTransvulnerabilities: number;

    constructor(
    ) { }

    ngOnInit() {
        this.paint();
    }

    ngOnChanges(changes: SimpleChanges) {
        let summary: any = changes['component'];
        if (summary) {
            this.component = <MComponentInformation | MRecommendationInformation>summary.currentValue;
        }
        if (changes['positions']) {
            this.positions = changes['positions']['currentValue'];
        }

        this.paint();
    }

    public generateUrl(url: string): string {
        if (typeof (url) === "string") {
            let content: Array<string>;
            let generatedUrl: string;
            content = url.split('/vuln/', 2);
            generatedUrl = url + "?utm_medium=Partner&utm_source=RedHat&utm_campaign=Code-Ready-Analytics-2020&utm_content=vuln/" + content[1];
            return generatedUrl;
        }
        return null;
    }

    public paint(): void {
        if (this.component) {
            if (this.type === 'recommendation') {
                let c = (<MRecommendationInformation>this.component);
                this.comp = c && c.componentInformation;
            } else {
                this.comp = <MComponentInformation>this.component;
            }
        }
    }

}
