import { Flex, FlexItem, Split, SplitItem } from "@patternfly/react-core";
import {
  ExclamationCircleIcon,
  CheckCircleIcon,
} from "@patternfly/react-icons";
import React from "react";

function DependencyCheck(props: any) {
  const { dependencyCheckArray } = props;
  return (
    <Flex
      key="1"
      direction={{ default: "column" }}
      display={{ default: "inlineFlex" }}
    >
      <FlexItem spacer={{ default: "spacerXs" }}>
        {dependencyCheckArray.length ? (
          dependencyCheckArray.map((issue: any, index: number) => (
            // eslint-disable-next-line react/no-array-index-key
            <IssueItem key={index} prop={issue} />
          ))
        ) : (
          <Split hasGutter>
            <SplitItem>
              <CheckCircleIcon className="icon-class-check" />
            </SplitItem>
            <SplitItem>No Issue</SplitItem>
          </Split>
        )}
      </FlexItem>
    </Flex>
  );
}

// @ts-ignore
function IssueItem({ prop }) {
  return (
    <Split hasGutter>
      <SplitItem>
        <ExclamationCircleIcon className="icon-class-exclamation" />
      </SplitItem>
      <SplitItem>{prop}</SplitItem>
    </Split>
  );
}

export default DependencyCheck;
