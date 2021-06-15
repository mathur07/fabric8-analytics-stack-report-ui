import React, { FC, useContext, useEffect, useState } from "react";
import {
  Card,
  CardTitle,
  CardBody,
  Grid,
  GridItem,
  Flex,
  FlexItem,
  TextContent,
  Text,
  Tabs,
  Tab,
  TabTitleText,
  TabTitleIcon,
  PageSection,
} from "@patternfly/react-core";
import { ChartDonut } from "@patternfly/react-charts";
import SecurityIcon from "@patternfly/react-icons/dist/js/icons/security-icon";
import ZoneIcon from "@patternfly/react-icons/dist/js/icons/zone-icon";
import AddonsTable from "../../shared-components/addons-primary/add-ons";
import SelectableDataList from "../../shared-components/addons-primary/datalist";
import DrawerFC from "../../shared-components/addons-primary/drawerNew";
import Context from "../../../store/context";
import { Logger } from "../../../utils/logger";
import "./Overview.scss";

function OverviewCard() {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <Card isHoverable isFullHeight className="GridCard">
      <CardTitle>
        <TextContent>
          <Text className="overview-title">Overview of the Stack</Text>
        </TextContent>
      </CardTitle>
      <CardBody className="CardBodySize">
        <Tabs
          activeKey={activeTab}
          onSelect={(event, tabIndex) => setActiveTab(Number(tabIndex))}
        >
          <Tab
            onSelect={() => {
              Logger.log("hello");
            }}
            eventKey={0}
            title={
              <>
                <TabTitleIcon>
                  <SecurityIcon />
                </TabTitleIcon>
                <TabTitleText>Security Issues</TabTitleText>
              </>
            }
          >
            <br />
            <OverviewContent />
          </Tab>
          <Tab
            eventKey={1}
            title={
              <>
                <TabTitleIcon>
                  <ZoneIcon />
                </TabTitleIcon>
                <TabTitleText>Add-ons</TabTitleText>
              </>
            }
          >
            <DrawerFC />
          </Tab>
        </Tabs>
      </CardBody>
    </Card>
  );
}

const SummaryDonut = () => (
  <ChartDonut
    ariaDesc="SummaryDonut"
    ariaTitle="Donut chart"
    constrainToVisibleArea
    data={[
      {
        x: "Critical",
        y: VulnerabilitiesDetailsObj.critical,
      },
      { x: "High", y: VulnerabilitiesDetailsObj.high },
      { x: "Medium", y: VulnerabilitiesDetailsObj.medium },
      { x: "Low", y: VulnerabilitiesDetailsObj.low },
      { x: "Unique to Snyk", y: VulnerabilitiesDetailsObj.uniqueToSnyk },
    ]}
    height={208}
    labels={({ datum }) => `${datum.x}: ${datum.y}%`}
    subTitle="Total"
    title={VulnerabilitiesDetailsObj.total.toString()}
    width={202}
    colorScale={["#7D1007", "#C9190B", "#EC7A08", "#F0AB00", "#6A6E73"]}
  />
);
// @ts-ignore
const OverviewSummary: FC<{
  DirectVulnerabilitiesTotalCount: number,
  TotalVulnerableCount: number,
}> = ({ DirectVulnerabilitiesTotalCount, TotalVulnerableCount }) => (
  <TextContent className="vulnerability-summary">
    <Text>
      {DirectVulnerabilitiesTotalCount} direct vulnerabilities in{" "}
      {TotalVulnerableCount} dependencies
    </Text>
  </TextContent>
);

const VersionUpdates: FC<{ VersionUpdatesCount: number }> = ({
  VersionUpdatesCount,
}) => (
  <TextContent className="version-updates-summary">
    <Text>
      Version updates are available for {VersionUpdatesCount} dependencies.
    </Text>
  </TextContent>
);

const VulnerabilityCount = (props: any) => (
  <GridItem span={8}>
    <TextContent className="vulnerability-count-overview">
      <Text>
        <SecurityIcon color={props.color} /> <strong>{props.count}</strong>{" "}
        {props.severity}
      </Text>
    </TextContent>
  </GridItem>
);

const OverviewContent = () => {
  // @ts-ignore
  const { globalState, globalDispatch } = useContext(Context);
  const [analyzedDependenciesCount, setAnalyzedDependenciesCount] = useState(0);
  const [directVulnerabilities, setDirectVulnerabilities] = useState(0);
  const [criticalVulnerabilities, setCriticalVulnerabilities] = useState(0);
  const [DirectVulnerabilitiesTotalCount, setDirectVulnerabilitiesTotalCount] =
    useState(0);
  const [TotalVulnerableCount, setTotalVulnerableCount] = useState(0);
  const [VersionUpdatesCount, setVersionUpdatesCount] = useState(0);

  useEffect(() => {
    const analyzedDependencies: Array<any> =
      globalState.APIData?.analyzed_dependencies;
    let DirectVulnerabilitiesCount = 0;
    let TotalVulnerable = 0;
    let VersionUpdatesCountTemp = 0;
    analyzedDependencies?.forEach((dep) => {
      if (
        dep.private_vulnerabilities.length ||
        dep.public_vulnerabilities.length
      ) {
        TotalVulnerable += 1;
        DirectVulnerabilitiesCount =
          DirectVulnerabilitiesCount +
          dep.private_vulnerabilities.length +
          dep.public_vulnerabilities.length;
      }
      if (
        dep.version !== dep.recommended_version &&
        dep.recommended_version !== ""
      ) {
        VersionUpdatesCountTemp += 1;
      }
      setVulnerabilitiesDetailsObj(dep);
    });
    setDirectVulnerabilitiesTotalCount(DirectVulnerabilitiesCount);
    setTotalVulnerableCount(TotalVulnerable);
    setVersionUpdatesCount(VersionUpdatesCountTemp);
  }, [globalState]);
  return (
    <Grid>
      <GridItem span={4} rowSpan={4}>
        <Flex>
          <FlexItem>
            <SummaryDonut />
          </FlexItem>
        </Flex>
      </GridItem>
      <GridItem span={8} rowSpan={4}>
        <GridItem span={8}>
          <Flex>
            <FlexItem>
              <OverviewSummary
                DirectVulnerabilitiesTotalCount={
                  DirectVulnerabilitiesTotalCount
                }
                TotalVulnerableCount={TotalVulnerableCount}
              />
            </FlexItem>
          </Flex>
        </GridItem>
        <GridItem span={8}>
          <Flex>
            <FlexItem>
              <VersionUpdates VersionUpdatesCount={VersionUpdatesCount} />
            </FlexItem>
          </Flex>
        </GridItem>
        <VulnerabilityCount
          count={VulnerabilitiesDetailsObj.critical.toString()}
          severity="Critical vulnerabilities"
          color="#7D1007"
        />
        <VulnerabilityCount
          count={VulnerabilitiesDetailsObj.high.toString()}
          severity="High vulnerabilities"
          color="#C9190B"
        />
        <VulnerabilityCount
          count={VulnerabilitiesDetailsObj.medium.toString()}
          severity="Medium vulnerabilities"
          color="#EC7A08"
        />
        <VulnerabilityCount
          count={VulnerabilitiesDetailsObj.low.toString()}
          severity="Low vulnerabilities"
          color="#F0AB00"
        />
        <VulnerabilityCount
          count={VulnerabilitiesDetailsObj.uniqueToSnyk.toString()}
          severity="Unique to Snyk vulnerabilities"
          color="#6A6E73"
        />
      </GridItem>
    </Grid>
  );
};
const VulnerabilitiesDetailsObj = {
  critical: 0,
  high: 0,
  medium: 0,
  low: 0,
  total: 0,
  uniqueToSnyk: 0,
};
function setVulnerabilitiesDetailsObj(dep: any) {
  VulnerabilitiesDetailsObj.uniqueToSnyk += dep.private_vulnerabilities.length;

  const allVuls = [
    ...dep.public_vulnerabilities,
    ...dep.private_vulnerabilities,
  ];
  if (allVuls.length) {
    allVuls.forEach((vul: { severity: any }) => {
      const { severity } = vul;
      if (severity === "critical") {
        VulnerabilitiesDetailsObj.critical += 1;
        VulnerabilitiesDetailsObj.total += 1;
      }
      if (severity === "high") {
        VulnerabilitiesDetailsObj.high += 1;
        VulnerabilitiesDetailsObj.total += 1;
      }
      if (severity === "medium") {
        VulnerabilitiesDetailsObj.medium += 1;
        VulnerabilitiesDetailsObj.total += 1;
      }
      if (severity === "low") {
        VulnerabilitiesDetailsObj.low += 1;
        VulnerabilitiesDetailsObj.total += 1;
      }
    });
  }
  return VulnerabilitiesDetailsObj;
}

export default OverviewCard;
