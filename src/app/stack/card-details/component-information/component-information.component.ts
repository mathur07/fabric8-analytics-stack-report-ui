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

import { GenerateUrl } from '../../utils/url-generator';

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

    public generateUrl = new GenerateUrl();

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

    public getInformationUrl(url: string): string {
            return this.generateUrl.publicUrl(url);
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
