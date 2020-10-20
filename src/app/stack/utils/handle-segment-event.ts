import { TokenDetailModel } from "../models/stack-report.model";

/**
 * identifyUser
 */
export function identifyUser(userId: string, registrationStatus: string) {
    analytics.identify(userId, {
        registrationStatus: registrationStatus,
    });
}

export function trackClick(e: MouseEvent, title: string, location?: string) {
    if (e.isTrusted) {
        if (location) {
            analytics.track(title, {
                location: location,
            });
        } else {
            analytics.track(title);
        }
    }
}
