export class StackReportModel {
    finished_at: string;
    release: string;
    request_id: string;
    result: Array<ResultInformationModel>;
    started_at: string;
    version: string;
}

export class ResultInformationModel {
    manifest_name: string;
    manifest_file_path: string;
    version: string;
    started_at: string;
    ended_at: string;
    external_request_id: string;
    registration_link: string;
    recommendation: RecommendationsModel;
    user_stack_info: UserStackInfoModel;
}

export class AuditInformationModel {
    ended_at: string;
    started_at: string;
    version: string;
}

export class RecommendationsModel {
    alternate: Array<ComponentInformationModel>;
    companion: Array<ComponentInformationModel>;
    input_stack_topics: Array<any>;
    manifest_file_path: string;
    usage_outliers: Array<OutlierInformationModel>;
}

export class ComponentInformationModel {
    dependencies: Array<any>;
    ecosystem: string;
    github: GithubModel;
    latest_version: string;
    licenses: Array<string>;
    license_analysis: LicenseAnalysisModel;
    name: string;
    osio_user_count: number;
    replaces: any;
    reason: string;
    cooccurrence_probability?: number;
    security: Array<SecurityInformationModel>;
    sentiment: SentimentModel;
    version: string;
    topic_list: Array<string>;
    private_vulnerabilities: Array<VulnerabilitiesModel>;
    private_vulnerabilities_count: number;
    public_vulnerabilities: Array<VulnerabilitiesModel>;
    public_vulnerabilities_count: number;
    recommended_version: string;
    url: string;
    vulnerable_dependencies: Array<any>; // commented
    allTransitiveDependencies?: Array<any>;
    publicTransitiveDependencies?: Array<any>;
    privateTransitiveDependencies?: Array<any>;

}


export class VulnerabilitiesModel {
    cve_ids: Array<string>;
    cvss: number;
    cvss_v3: string;
    cwes: Array<string>;
    description: string;
    exploit: string;
    fixable: boolean;
    fixed_in: Array<string>;
    id: string;
    malicious: boolean;
    patch_exists: boolean;
    references: Array<ReferencesModel>;
    severity: string;
    title: string;
    url: string;
}

export class ReferencesModel {
    title: string;
    url: string
}

export class SecurityInformationModel {
    CVE: string;
    CVSS: string;
}

export class LicenseAnalysisModel {
    conflict_licenses: Array<any>;
    status: string;
    unknown_licenses: Array<any>;
    _message: string;
    _representative_licenses: any;
}

export class GithubModel {
    contributors: number;
    dependent_projects: number;
    dependent_repos: number;
    first_release_date: string;
    forks_count: number;
    issues: {
        month: {
            closed: number;
            opened: number;
        };
        year: {
            closed: number;
            opened: number;
        }
    };
    latest_release_duration: string;
    pull_requests: {
        month: {
            closed: number;
            opened: number;
        };
        year: {
            closed: number;
            opened: number;
        }
    };
    size: string;
    stargazers_count: number;
    total_releases: number;
    used_by: Array<any>;
    watchers: number;
    refreshed_on: string;
}

export class SentimentModel {
    latest_comment: string;
    overall_score: number;
}

export class OutlierInformationModel {
    outlier_probabilty: number;
    package_name: string;
}

export class ConflictPackageModel {
    package1: string;
    license1: string;
    package2: string;
    license2: string;
}

export class ReallyUnknownLicenseModel {
    package: string;
    license: string;
}

export class ComponentConflictLicenseModel {
    license1: string;
    license2: string;
}

export class ComponentConflictUnknownModel {
    package: string;
    conflict_licenses: Array<ComponentConflictLicenseModel>;
}

export class UnknownLicensesModel {
    unknown: Array<ReallyUnknownLicenseModel> = [];
    component_conflict: Array<ComponentConflictUnknownModel> = [];
}

export class StackLicenseAnalysisModel {
    recommended_licenses: Array<string> = [];
    status: string;
    conflict_packages: Array<ConflictPackageModel> = [];
    unknown_licenses: UnknownLicensesModel;
    outlier_packages: Array<ReallyUnknownLicenseModel> = [];
    recommendation_ready: boolean;
    stack_license_conflict: boolean;
    total_licenses: number;
    unknown_dependencies: Array<any>;
    unknown_dependencies_count: number;
}

export class UserStackInfoModel {
    analyzed_dependencies: Array<ComponentInformationModel>;
    ecosystem: string;
    license_analysis: StackLicenseAnalysisModel;
    recommendation_ready: boolean;
    registration_status: string;
    unknown_dependencies: Array<any>;
}
export class TokenDetailModel {
    id: string;
    status: string;
}
