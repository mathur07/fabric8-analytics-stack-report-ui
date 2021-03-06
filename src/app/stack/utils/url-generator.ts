export class GenerateUrl {

    public registrationURL: string = "https://app.snyk.io/login?utm_campaign=Code-Ready-Analytics-2020&utm_source=code_ready&code_ready=FF1B53D9-57BE-4613-96D7-1D06066C38C9";

    public snykVulnerabilityDBURL:string = "https://snyk.io/product/vulnerability-database/?utm_medium=Partner&utm_source=RedHat&utm_campaign=Code-Ready-Analytics-2020&utm_content=VulnDB";
    
    private vulUrlSub = "?utm_medium=Partner&utm_source=RedHat&utm_campaign=Code-Ready-Analytics-2020&utm_content=vuln/";

    public publicUrl(url: string): string {
        if (typeof (url) === "string") {
            let content: Array<string>;
            let generatedUrl: string;
            content = url.split('/vuln/', 2);
            generatedUrl = url + this.vulUrlSub + content[1];
            return generatedUrl;
        }
        return null;
    }
    public privateUrl(url: string, registrationStatus: string): string {
        if (registrationStatus !== 'registered') {
            return this.registrationURL;
        }
        else if (typeof (url) === "string") {
            let content: Array<string>;
            let generatedUrl: string;
            content = url.split('/vuln/', 2);
            generatedUrl = url + this.vulUrlSub + content[1];
            return generatedUrl;
        }
        return null;
    }
}