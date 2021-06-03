import React, { useContext, useEffect, useState } from "react";
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
import "./overview.scss";

function OverviewCard() {
  const [activeTab, setActiveTab] = useState(1);
  // @ts-ignore
  const { globalState, globalDispatch } = useContext(Context);

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
    ariaDesc="Average number of pets"
    ariaTitle="Donut chart example"
    constrainToVisibleArea
    data={[
      { x: "a", y: 35 },
      { x: "b", y: 55 },
      { x: "c", y: 10 },
    ]}
    height={208}
    labels={({ datum }) => `${datum.x}: ${datum.y}%`}
    subTitle="Vul"
    title="8"
    width={202}
  />
);
// @ts-ignore
const OverviewSummary = (props) => (
  <TextContent className="vulnerability-summary">
    <Text>
      8 direct vulnerabilities in {props.analyzedDependenciesCount} dependencies
    </Text>
  </TextContent>
);

const VersionUpdates = () => (
  <TextContent className="version-updates-summary">
    <Text>Version updates are available for 10 dependencies.</Text>
  </TextContent>
);

const VulnerabilityCount = (props: any) => (
  <GridItem span={8}>
    <TextContent className="vulnerability-count-overview">
      <Text>
        <SecurityIcon /> {" "}
        <strong>{props.count}</strong> {props.severity}
      </Text>
    </TextContent>
  </GridItem>
);

const OverviewContent = () => {
  // @ts-ignore
  const { globalState } = useContext(Context);
  const [analyzedDependenciesCount, setAnalyzedDependenciesCount] = useState(0);
  const [directVulnerabilities, setDirectVulnerabilities] = useState(0);
  const [criticalVulnerabilities, setCriticalVulnerabilities] = useState(0);
  useEffect(() => {
    const analyzedDependencies = globalState.APIData?.analyzed_dependencies;
    // @ts-ignore
    analyzedDependencies?.forEach((dep) => {
      if (dep.public_vulnerabilities || dep.private_vulnerabilities) {
        setAnalyzedDependenciesCount(analyzedDependenciesCount + 1);
      }
    });
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
                analyzedDependenciesCount={analyzedDependenciesCount}
              />
            </FlexItem>
          </Flex>
        </GridItem>
        <GridItem span={8}>
          <Flex>
            <FlexItem>
              <VersionUpdates />
            </FlexItem>
          </Flex>
        </GridItem>
        <VulnerabilityCount count={3} severity="High vulnerabilities" />
        <VulnerabilityCount count={2} severity="Medium vulnerabbilities" />
        <VulnerabilityCount count={3} severity="Low vulnerabbilities" />
      </GridItem>
    </Grid>
  );
};

export default OverviewCard;
