export class HandleUrl {
    public open(event, url = null) {
        event.preventDefault();
        event.stopPropagation();
        let elem: HTMLElement = <HTMLElement>event.target;
        if (elem && elem.attributes && elem.attributes.getNamedItem("href")) {
            let url = event.target.href;
            parent.postMessage(url, "*");
        } else if (url) {
            parent.postMessage(url, "*");
        }
    }
}
