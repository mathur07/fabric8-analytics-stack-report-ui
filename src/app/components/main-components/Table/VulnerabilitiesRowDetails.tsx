import React from "react";
import {
  Divider,
  Flex,
  FlexItem,
  Split,
  SplitItem,
} from "@patternfly/react-core";
import { SecurityIcon } from "@patternfly/react-icons";
import { RowDetailType } from "./TableInterfaces";

function VulnerabilitiesRowDetails(props: RowDetailType) {
  const { critical, high, medium, low, total } = props;
  return (
    <div>
      {total > 0 ? (
        <Flex
          key="1"
          direction={{ default: "column" }}
          display={{ default: "inlineFlex" }}
        >
          <FlexItem spacer={{ default: "spacerXs" }}>
            <Split hasGutter>
              {/* @ts-ignore */}
              <SplitItem>{total}</SplitItem>{" "}
              <Divider
                isVertical
                inset={{
                  default: "insetMd",
                  md: "insetNone",
                  lg: "insetSm",
                  xl: "insetXs",
                }}
              />
              {critical ? (
                <SplitItem>
                  <SecurityIcon className="icon-class" color="#7D1007" />{" "}
                  {critical}
                </SplitItem>
              ) : null}
              {high ? (
                <SplitItem>
                  <SecurityIcon className="icon-class" color="#C9190B" /> {high}
                </SplitItem>
              ) : null}
              {medium ? (
                <SplitItem>
                  <SecurityIcon className="icon-class" color="#EC7A08" />{" "}
                  {medium}
                </SplitItem>
              ) : null}
              {low ? (
                <SplitItem>
                  <SecurityIcon className="icon-class" color="#F0AB00" /> {low}
                </SplitItem>
              ) : null}
            </Split>
          </FlexItem>
        </Flex>
      ) : null}
    </div>
  );
}

export default VulnerabilitiesRowDetails;
