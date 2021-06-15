import React from "react";
import {
  Flex,
  FlexItem,
  Split,
  SplitItem,
  Title,
} from "@patternfly/react-core";
import {
  UserAltIcon,
  CodeBranchIcon,
  StarIcon,
  GithubIcon,
  CodeIcon,
} from "@patternfly/react-icons";
import "./addons.scss";

type GithubStatsProps = {
  contributors: number;
  dependentRepos: number;
  usage: number;
  forks: number;
  stars: number;
};

const GithubStats = ({
  contributors,
  dependentRepos,
  usage,
  forks,
  stars,
}: GithubStatsProps) => {
  return (
    <div>
      <Flex key="1">
        <FlexItem>
          <Title className="fontCategory" headingLevel="h6" size="md">
            GitHub Stastistics
          </Title>
        </FlexItem>
      </Flex>
      <Flex key="2" direction={{ default: "column" }}>
        <span> </span>
        <FlexItem spacer={{ default: "spacerNone" }}>
          <Split hasGutter>
            <UserAltIcon className="iconColour" />
            <SplitItem className="fontCategory">Contributors:</SplitItem>
            <SplitItem>
              <Title className="font" headingLevel="h6" size="md">
                {Math.max(contributors, 0)}
              </Title>
            </SplitItem>
          </Split>
        </FlexItem>
        <FlexItem spacer={{ default: "spacerNone" }}>
          <Split hasGutter>
            <CodeIcon className="iconColour" />
            <SplitItem className="fontCategory">DependentRepos:</SplitItem>
            <SplitItem>
              <Title className="font" headingLevel="h6" size="md">
                {Math.max(dependentRepos, 0)}
              </Title>
            </SplitItem>
          </Split>
        </FlexItem>
        <FlexItem spacer={{ default: "spacerNone" }}>
          <Split hasGutter>
            <GithubIcon className="iconColour" />
            <SplitItem className="fontCategory">Usage:</SplitItem>
            <SplitItem>
              <Title className="font" headingLevel="h6" size="md">
                {Math.max(usage, 0)}
              </Title>
            </SplitItem>
          </Split>
        </FlexItem>
        <FlexItem spacer={{ default: "spacerNone" }}>
          <Split hasGutter>
            <CodeBranchIcon className="iconColour" />
            <SplitItem className="fontCategory">Forks:</SplitItem>
            <SplitItem>
              <Title className="font" headingLevel="h6" size="md">
                {Math.max(forks, 0)}
              </Title>
            </SplitItem>
          </Split>
        </FlexItem>
        <FlexItem spacer={{ default: "spacerNone" }}>
          <Split hasGutter>
            <StarIcon className="iconColour" />
            <SplitItem className="fontCategory">Stars:</SplitItem>
            <SplitItem>
              <Title className="font" headingLevel="h6" size="md">
                {Math.max(stars, 0)}
              </Title>
            </SplitItem>
          </Split>
        </FlexItem>
      </Flex>
    </div>
  );
};

export default GithubStats;
