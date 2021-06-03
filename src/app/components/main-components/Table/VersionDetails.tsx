import { ChartDonut, ChartThemeColor } from "@patternfly/react-charts";
import {
  Flex,
  FlexItem,
  Grid,
  GridItem,
  Split,
  SplitItem,
  Text,
  TextContent,
  Title,
} from "@patternfly/react-core";
import { SecurityIcon } from "@patternfly/react-icons";
import React, { useState } from "react";
import GithubStats from "../../shared-components/addons-primary/github_stats";

function VersionDetails() {
  const drawD = {
    name: "org.apache.commons:commons-lang3",
    licenses: "Apache License,version2.0",
    latest_version: "2.0.0",
    github: {
      contributors: "32",
      dependent_projects: "22",
      dependent_repos: "5",
      first_release_date: null,
      forks_count: "101",
      issues: {
        month: {
          closed: 2,
          opened: 1,
        },
        year: {
          closed: 9,
          opened: 8,
        },
      },
      latest_release_duration: "2017-03-07 15:32:13",
      open_issues_count: "0",
      pull_requests: {
        month: {
          closed: 12,
          opened: 12,
        },
        year: {
          closed: 84,
          opened: 84,
        },
      },
      size: "N/A",
      stargazers_count: "387",
      total_releases: "18",
      used_by: [],
      watchers: "23",
    },
  };
  const [drawerData, setDrawerData] = useState(drawD);
  const SummaryDonut = () => (
    <div style={{ height: "200px", width: "200px" }}>
      <ChartDonut
        ariaDesc="Average number of pets"
        ariaTitle="Donut chart example"
        constrainToVisibleArea
        data={[
          { x: "a", y: 33 },
          { x: "b", y: 33 },
          { x: "c", y: 33 },
        ]}
        labels={({ datum }) => `${datum.x}: ${datum.y}%`}
        legendData={[
          { name: "Critical: 3" },
          { name: "High: 5" },
          { name: "low: 2" },
        ]}
        legendOrientation="vertical"
        legendPosition="right"
        padding={{
          bottom: 0,
          left: 0,
          right: 140, // Adjusted to accommodate legend
          top: 0,
        }}
        subTitle="Vul"
        title="10"
        themeColor={ChartThemeColor.multiOrdered}
        width={280}
      />
    </div>
  );
  return (
    // @ts-ignore
    <Flex justifyContent={{ default: "justifyContentSpaceBetween" }}>
      <FlexItem>
        <Split>
          <SplitItem>
            <Title headingLevel="h6" size="md">
              Latest Version
              <div>{drawerData.latest_version}</div>
            </Title>
          </SplitItem>
        </Split>
        <Split>
          <Title headingLevel="h6" size="md">
            Licence(s) used
            <div>{drawerData.licenses}</div>
          </Title>
        </Split>
      </FlexItem>
      <FlexItem>
        <GithubStats
          contributors={Number(drawerData.github.contributors)}
          dependentRepos={Number(drawerData.github.dependent_repos)}
          usage={Number(drawerData.github.used_by.length)}
          forks={Number(drawerData.github.forks_count)}
          stars={Number(drawerData.github.stargazers_count)}
        />
      </FlexItem>

      <FlexItem>
        <SummaryDonut />
      </FlexItem>
    </Flex>
  );
}

export default VersionDetails;
