import {
    MReportSummaryCard,
    MReportSummaryInfoEntry,
    MReportSummaryContent,
    MReportSummaryTitle
} from '../models/ui.model';
import {
    ComponentInformationModel,
    RecommendationsModel,
    SecurityInformationModel,
    StackLicenseAnalysisModel,
    UserStackInfoModel
} from '../models/stack-report.model';

export class ReportSummaryUtils {
    public notification: any = {
        warning: {
            bg: '#f5a625',
            icon: 'pficon-warning-triangle-o'
        },
        good: {
            bg: '#6dc663',
            icon: 'fa fa-check'
        }
    };

    public colors: any = {
        security: {
            warning: '#d1011c',
            moderate: '#f5a625'
        },
        confidence: {
            good: '#6dc663'
        }
    };

    public cardTypes: any = {
        SECURITY: 'security',
        INSIGHTS: 'insights',
        LICENSES: 'licenses',
        COMP_DETAILS: 'compDetails'
    };

    public titleAndDescription: any = {
        [this.cardTypes.SECURITY]: {
            title: 'Dependencies with security issues in your stack',
            description: 'Dependencies with high common vulnerabilities and exposures (CVE) score.  Click this card to see the details of all CVE(s).'
        },
        [this.cardTypes.INSIGHTS]: {
            title: 'Complementary dependencies that can augment your stack',
            description: 'Complementary dependencies that can be added to your application stack or replace current dependencies with alternate one. Click to see details.'
        },
        [this.cardTypes.LICENSES]: {
            title: 'License details of dependencies in your stack',
            description: 'Recommended license for your application stack, flag any unknown/restrictive license(s) present. Click this card to see the detailed information.'
        },
        [this.cardTypes.COMP_DETAILS]: {
            title: 'Dependency details of your manifest file',
            description: 'Dependencies analyzed based on versions and popularity. Click this card to see security, license and usage information for each dependency.'
        }
    };

    public newCardInstance(): MReportSummaryCard {
        let newCard: MReportSummaryCard = new MReportSummaryCard();
        newCard.reportSummaryContent = new MReportSummaryContent();
        newCard.reportSummaryTitle = new MReportSummaryTitle();
        return newCard;
    }

    public getSecurityReportCard(userStackInfo: UserStackInfoModel): MReportSummaryCard {
        let securityCard: MReportSummaryCard = this.newCardInstance();
        securityCard.identifier = this.cardTypes.SECURITY;
        securityCard.reportSummaryTitle.titleIcon = 'fa fa-shield';
        securityCard.reportSummaryDescription =
            this.titleAndDescription[this.cardTypes.SECURITY].description;
        securityCard.reportSummaryTitle.titleText = 'Security Issues';
        securityCard.reportSummaryContent.infoEntries = [];


        if (userStackInfo &&
            userStackInfo.analyzed_dependencies &&
            userStackInfo.analyzed_dependencies.length > 0) {

            let securityIssues: number = 0;
            let dependenciesEffected: number = 0;

            let analyzedDependencies: Array<ComponentInformationModel>;
            let highCvss: boolean = false;
            let hasVulnerabilities: boolean = false;


            // filter-out transitives which is also listed as direct commented
            const uniqueDependencies: Set<string> = new Set<string>();
            analyzedDependencies = userStackInfo.analyzed_dependencies.filter(info => {
                const key: string = `${info.name}+${info.version}`;
                if (uniqueDependencies.has(key)) {
                    return false;
                }
                uniqueDependencies.add(key);
                return true;
            });

            let publicVulnerabilitiesSet = new Set();
            let privateVulnerabilitiesSet = new Set();

            analyzedDependencies.forEach(element => {

                if (element.public_vulnerabilities && element.public_vulnerabilities.length > 0) {
                    element.public_vulnerabilities.forEach(pubDep => {
                        publicVulnerabilitiesSet.add(pubDep)
                    });
                }
                if (element.private_vulnerabilities && element.private_vulnerabilities.length > 0) {
                    element.private_vulnerabilities.forEach(priDep => {
                        privateVulnerabilitiesSet.add(priDep)
                    });
                }

                if (element.vulnerable_dependencies && element.vulnerable_dependencies.length > 0) {

                    element.vulnerable_dependencies.forEach(tdep => {
                        if (tdep.public_vulnerabilities && tdep.public_vulnerabilities.length > 0) {
                            tdep.public_vulnerabilities.forEach(transPubDep => {
                                publicVulnerabilitiesSet.add(transPubDep)
                            });
                        }
                        if (tdep.private_vulnerabilities && tdep.private_vulnerabilities.length > 0) {
                            tdep.private_vulnerabilities.forEach(transPriDep => {
                                privateVulnerabilitiesSet.add(transPriDep)
                            });
                        }
                    });

                }

            });
            let publicVulnerabilitiesCount: number = 0;
            let privateVulnerabilitiesCount: number = 0;

            publicVulnerabilitiesCount = publicVulnerabilitiesSet.size;
            privateVulnerabilitiesCount = privateVulnerabilitiesSet.size;

            for (const dep of analyzedDependencies) {
                let allVulnerabilities = dep.public_vulnerabilities.concat(dep.private_vulnerabilities);
                if (allVulnerabilities.length > 0) {
                    hasVulnerabilities = true;
                    for (const element of allVulnerabilities) {
                        if (element.cvss >= 7) {
                            highCvss = true;
                            break;
                        }
                    }
                }
                if (highCvss) {
                    break;
                }
            }

            let totalVulnerabilities: MReportSummaryInfoEntry = new MReportSummaryInfoEntry();
            totalVulnerabilities.infoText = "Total Vulnerabilities";
            totalVulnerabilities.infoValue = publicVulnerabilitiesCount + privateVulnerabilitiesCount;
            securityCard.reportSummaryContent.infoEntries.push(
                totalVulnerabilities
            );

            let vulnerableDependenciesCount = 0;
            let vulnerableDependencies: MReportSummaryInfoEntry = new MReportSummaryInfoEntry();
            vulnerableDependencies.infoText = "Vulnerable Dependencies";

            vulnerableDependenciesCount = analyzedDependencies.filter((element) => element.public_vulnerabilities.length > 0 || element.private_vulnerabilities.length > 0 || element.vulnerable_dependencies.length > 0)
                .reduce((count) => count + 1,0)

            vulnerableDependencies.infoValue = vulnerableDependenciesCount;
            securityCard.reportSummaryContent.infoEntries.push(
                vulnerableDependencies
            );

            if (hasVulnerabilities) {
                let securityColor: string = highCvss ? this.colors.security.warning : this.colors.security.moderate;
                securityCard.reportSummaryTitle.notificationIcon = this.notification.warning.icon;
                securityCard.reportSummaryTitle.notificationIconBgColor = securityColor;
                securityCard.hasWarning = true;
                securityCard.severity = highCvss ? 1 : 2;


            } else {
                securityCard.hasWarning = false;
            }

        } else {
            // Handle for no analyzed_dependencies
        }
        return securityCard;
    }

    public getInsightsReportCard(recommendation: RecommendationsModel): MReportSummaryCard {
        let insightsCard: MReportSummaryCard = this.newCardInstance();
        insightsCard.identifier = this.cardTypes.INSIGHTS;
        insightsCard.reportSummaryTitle.titleText = 'Add-ons';
        insightsCard.reportSummaryTitle.titleIcon = 'pficon-zone';
        insightsCard.reportSummaryDescription = this.titleAndDescription[this.cardTypes.INSIGHTS].description;
        insightsCard.reportSummaryContent.infoEntries = [];

        let usageOutliersCount: number = 0, companionCount: number = 0;
        if (recommendation) {
            let usage = recommendation.usage_outliers;
            usageOutliersCount = usage ? usage.length : 0;
            companionCount = recommendation.companion ? recommendation.companion.length : 0;

            let totalInsights: MReportSummaryInfoEntry = new MReportSummaryInfoEntry();
            totalInsights.infoText = 'Total Dependencies';
            totalInsights.infoValue = usageOutliersCount + companionCount;
            insightsCard.reportSummaryContent.infoEntries.push(totalInsights);

            let outliersInsights: MReportSummaryInfoEntry = new MReportSummaryInfoEntry();
            outliersInsights.infoText = 'Usage Outliers';
            outliersInsights.infoValue = usageOutliersCount;
            insightsCard.reportSummaryContent.infoEntries.push(outliersInsights);

            let companionInsights: MReportSummaryInfoEntry = new MReportSummaryInfoEntry();
            companionInsights.infoText = 'Companion Dependencies';
            companionInsights.infoValue = companionCount;
            insightsCard.reportSummaryContent.infoEntries.push(companionInsights);

            // insightsCard.reportSummaryTitle.notificationIcon = this.notification.good.icon;
            // insightsCard.reportSummaryTitle.notificationIconBgColor = this.notification.good.bg;
            insightsCard.hasWarning = false;
            if (usageOutliersCount > 0) {
                insightsCard.reportSummaryTitle.notificationIcon = 'pficon-info';
                insightsCard.reportSummaryTitle.notificationIconBgColor = this.colors.security.moderate;
                insightsCard.hasWarning = true;
            }

        } else {
            // Handle no recommendations block scenario
        }

        return insightsCard;
    }

    public getConflictLicenseCount(conflictLicenses: Array<any>): any {
        let conflictLicenseArr = [];
        if (conflictLicenses && conflictLicenses.length > 0) {
            conflictLicenses.forEach((item) => {
                if (conflictLicenseArr.indexOf(item['package1']) === -1) {
                    conflictLicenseArr.push(item['package1']);
                }
                if (conflictLicenseArr.indexOf(item['package2']) === -1) {
                    conflictLicenseArr.push(item['package2']);
                }
            });
        }
        return conflictLicenseArr;
    }

    public getLicensesReportCard(userStackInfo: UserStackInfoModel): MReportSummaryCard {
        let licensesCard: MReportSummaryCard = this.newCardInstance();
        licensesCard.identifier = this.cardTypes.LICENSES;
        licensesCard.reportSummaryTitle.titleText = 'Licenses';
        licensesCard.reportSummaryTitle.titleIcon = 'fa fa-file-text-o';
        licensesCard.reportSummaryDescription = this.titleAndDescription[this.cardTypes.LICENSES].description;
        licensesCard.reportSummaryContent.infoEntries = [];

        if (userStackInfo &&
            userStackInfo.license_analysis) {
            let licenseAnalysis: StackLicenseAnalysisModel;
            licenseAnalysis = userStackInfo.license_analysis;

            let stackLicense: MReportSummaryInfoEntry = new MReportSummaryInfoEntry();
            stackLicense.infoText = 'Suggested License';
            let stackLicenses = licenseAnalysis.recommended_licenses;
            if (stackLicenses) {
                if (stackLicenses.length > 0) {
                    stackLicense.infoValue = stackLicenses[0];
                } else {
                    stackLicense.infoValue = 'None';
                    if (licenseAnalysis.status && licenseAnalysis.status.toLowerCase() === 'failure') {
                        stackLicense.infoValue = 'Unknown';
                    }
                }
            } else {
                // Null
                stackLicense.infoValue = 'None';
                if (licenseAnalysis.status && licenseAnalysis.status.toLowerCase() === 'failure') {
                    stackLicense.infoValue = 'Unknown';
                }
            }
            licensesCard.reportSummaryContent.infoEntries.push(stackLicense);

            let conflictLicense: MReportSummaryInfoEntry = new MReportSummaryInfoEntry();
            conflictLicense.infoText = 'License Conflicts';
            let conflictLicenses = this.getConflictLicenseCount(licenseAnalysis.conflict_packages);
            conflictLicense.infoValue = conflictLicenses ? conflictLicenses.length : 0;
            if (stackLicense.infoValue === 'Unknown') {
                conflictLicense.infoValue = 'NA';
            }
            licensesCard.reportSummaryContent.infoEntries.push(conflictLicense);

            let unknownLicense: MReportSummaryInfoEntry = new MReportSummaryInfoEntry();
            unknownLicense.infoText = 'Unknown Licenses';
            let unknownLicenses = licenseAnalysis.unknown_licenses.unknown;
            unknownLicense.infoValue = unknownLicenses ? unknownLicenses.length : 0;
            if (stackLicense.infoValue === 'Unknown') {
                unknownLicense.infoValue = 'NA';
            }
            licensesCard.reportSummaryContent.infoEntries.push(unknownLicense);

            if (stackLicense.infoValue !== 'None' && stackLicense.infoValue !== 'Unknown') {
                let restrictiveLicenses: MReportSummaryInfoEntry = new MReportSummaryInfoEntry();
                restrictiveLicenses.infoText = 'Restrictive Licenses';
                let restrictive = licenseAnalysis.outlier_packages;
                restrictiveLicenses.infoValue = restrictive ? restrictive.length : 0;
                licensesCard.reportSummaryContent.infoEntries.push(restrictiveLicenses);
            }

            // licensesCard.reportSummaryTitle.notificationIcon = this.notification.good.icon;
            // licensesCard.reportSummaryTitle.notificationIconBgColor = this.notification.good.bg;
            licensesCard.hasWarning = false;
            if (conflictLicenses.length > 0 || unknownLicenses.length > 0) {
                licensesCard.reportSummaryTitle.notificationIcon = this.notification.warning.icon;
                licensesCard.reportSummaryTitle.notificationIconBgColor = this.notification.warning.bg;
                licensesCard.hasWarning = true;
            }
        } else {
            // Handle no licenses section scenario
        }

        return licensesCard;
    }
}
