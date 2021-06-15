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
import React, { FC, useState } from "react";
import GithubStats from "../../shared-components/addons-primary/github_stats";

function VersionDetails({ dep }: any) {
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
    <Flex justifyContent={{ default: "justifyContentSpaceEvenly" }}>
      <FlexItem>
        <Split>
          <SplitItem>
            <Title headingLevel="h6" size="md">
              Latest Version
              <div>{dep.latest_version}</div>
            </Title>
          </SplitItem>
        </Split>
        <Split>
          <Title headingLevel="h6" size="md">
            Licence(s) used
            <div>{dep.licenses}</div>
          </Title>
        </Split>
      </FlexItem>
      <FlexItem>
        <GithubStats
          contributors={Number(dep.github.contributors)}
          dependentRepos={Number(dep.github.dependent_repos)}
          usage={Number(dep.github.used_by.length)}
          forks={Number(dep.github.forks_count)}
          stars={Number(dep.github.stargazers_count)}
        />
      </FlexItem>

      {/* <FlexItem>
        <SummaryDonut />
      </FlexItem> */}
    </Flex>
  );
}

export default VersionDetails;
