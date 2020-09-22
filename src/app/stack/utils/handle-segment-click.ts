import { TokenDetailModel } from '../models/stack-report.model';

export class HandleSegmentClick {

    /**
     * trackCardClick
     */
    public trackCardClick(e: MouseEvent, tokenDetail: TokenDetailModel, title: string) {

        var userId = tokenDetail.id;
        var registrationStatus = tokenDetail.status;

        if (e.isTrusted) {
            analytics.identify(userId, {
                registrationStatus: registrationStatus,
                userClickedOn: title

            })
        }

    }
}