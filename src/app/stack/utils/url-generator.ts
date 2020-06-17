export class GenerateUrl {

    public regitrationURL: string = "https://app.snyk.io/signup/?utm_medium=Partner&utm_source=Red-Hat&utm_campaign=Code-Ready-Analytics-2020&utm_content=register";

    public publicUrl(url: string): string {
        if (typeof (url) === "string") {
            let content: Array<string>;
            let generatedUrl: string;
            content = url.split('/vuln/', 2);
            generatedUrl = url + "?utm_medium=Partner&utm_source=Red%20Hat&utm_campaign=Code-Ready-Analytics-2020&utm_content=vuln/" + content[1];
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
            generatedUrl = url + "?utm_medium=Partner&utm_source=Red%20Hat&utm_campaign=Code-Ready-Analytics-2020&utm_content=vuln/" + content[1];
            return generatedUrl;
        }
        return null;
    }
}