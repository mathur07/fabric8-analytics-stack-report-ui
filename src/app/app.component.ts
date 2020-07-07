import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
    selector: 'f8-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})

export class AppComponent implements OnInit {
    public stackUrl: string;
    public apiData: any;
    public gateway: any = {};
    public label: string;
    public routerLink: string;
    public version: string;

    constructor(private route: ActivatedRoute) {
        this.route.paramMap.subscribe((params) => {
            this.label = params.get('id');
        });
        window.onhashchange = () => {
            let url: string = location.hash;
            let id: string = url.replace('#/analyze/', '');
            let splitParams: Array<string> = id.split('?');
            this.label = splitParams[0];
            this.onAppLoad();
        };
    }

    onAppLoad(): void {
        let url: string = location.hash;
        let id: string = url.replace('#/analyze/', '');
        let splitParams: Array<string> = id.split('?');
        if (splitParams && splitParams.length > 1) {
            this.apiData = decodeURIComponent(splitParams[1].split('api_data=')[1]);
            try {
                this.apiData = JSON.parse(this.apiData);
            } catch (err) {
                console.log('Error parsing JSON');
            }
            if (this.apiData) {
                this.changeLabel();
            }
        }
    }
    changeLabel(): void {
        console.log(this.label);
        if (this.label && this.label.trim() !== '') {
            this.routerLink = '/analyze/' + this.label;
            this.gateway['user_key'] = this.apiData['user_key'];
            this.gateway['access_token'] = this.apiData['access_token'];
            this.gateway['config'] = this.apiData['route_config'];
            if (this.apiData['show_modal']) {
                this.gateway['modal'] = this.apiData['show_modal'];
            }

            if (this.gateway['config'] && this.gateway['config']['api_url']) {
                let apiHost: string = this.gateway['config']['api_url'];
                if (apiHost.charAt(apiHost.length - 1) !== '/') {
                    apiHost += '/';
                    this.gateway['config']['api_url'] = apiHost;
                }

                // Separate v2 users 
                if (this.gateway['config']['ver'] === 'v2') {
                    this.version = this.gateway['config']['ver'];
                } else {
                    this.version = 'v1';
                }
                
                if (this.gateway['user_key']) {
                    this.stackUrl = apiHost + 'api/v2/stack-analyses/' + this.label + '?user_key=' + this.gateway['user_key'];
                } else {
                    this.stackUrl = apiHost + 'api/v2/stack-analyses/' + this.label;
                }

                console.log('=========================');
                console.log(this.gateway);
                console.log(this.stackUrl);
                console.log('=========================');
            }
        }
    }

    ngOnInit(): void {
        this.onAppLoad();
    }


}

// format of the url
// http://localhost:8080/#/analyze/6422008e69b9474195ef395918a2c892?api_data={
//     "access_token": "",
//     "route_config": {
//         "api_url": "https://recommender.api.openshift.io/"
//     }
// }

// dev cluster hosted end point
// http://fabric8-analytics-stack-report-ui.dev.rdu2c.fabric8.io/#/analyze/4460cedfec3e49b5b6cf5712ccf7750b?api_data={
//     "access_token": "<ACCESS_TOKEN>",
//     "route_config": {
//         "api_url": "https://recommender.api.openshift.io/"
//     }
// }
