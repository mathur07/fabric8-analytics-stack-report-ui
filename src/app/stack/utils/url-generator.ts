export class GenerateUrl {

    public regitrationURL: string = "https://app.snyk.io/signup/?utm_medium=Partner&utm_source=RedHat&utm_campaign=Code-Ready-Analytics-2020&utm_content=Register";

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
    public privateUrl(url: string, regitrationStatus: string): string {
        if (regitrationStatus === 'freetier') {
            return this.regitrationURL;
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