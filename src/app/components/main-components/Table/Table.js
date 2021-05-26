import ReactDOM from "react-dom";
import "@patternfly/react-core/dist/styles/base.css";

import React from "react";
import {
  TableComposable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  ExpandableRowContent,
} from "@patternfly/react-table";

import CodeBranchIcon from "@patternfly/react-icons/dist/js/icons/code-branch-icon";
import CodeIcon from "@patternfly/react-icons/dist/js/icons/code-icon";
import CubeIcon from "@patternfly/react-icons/dist/js/icons/cube-icon";

// https://github.com/patternfly/patternfly-react/blob/master/packages/react-table/src/components/Table/examples/DemoSortableTable.js
import DemoSortableTable from "./DemoSortableTable";
import {
  Divider,
  Flex,
  FlexItem,
  Split,
  SplitItem,
} from "@patternfly/react-core";
import { ExclamationCircleIcon, SecurityIcon } from "@patternfly/react-icons";

const Table = () => {
  const columns = [
    "Dependencies",
    "Dependency Check",
    "Current Version",
    "Direct Vulnerabilities",
    "Transitive Vulnerabilities",
    "Recommended Version",
  ];
  const rows = [
    ["org.bouncycastle:bcprov-jdk16", 10, "1.46", 4, "20 minutes", "N/A"],
    ["org.bouncycastle:bcprov-jdk16", 10, "1.46", 4, "20 minutes", "N/A"],
  ];
  // index corresponds to row index, and value corresponds to column index of the expanded, null means no cell is expanded
  const [activeChild, setActiveChild] = React.useState([null, null]);
  // key = row_col of the parent it corresponds to
  const childData = {
    "0_2": {
      component: (
        <DemoSortableTable
          rows={["parent-0", "compound-2", "three", "four", "five"]}
          id="compound-expansion-table-0_2"
          key="0_2"
        />
      ),
    },
    "0_3": {
      component: (
        <DemoSortableTable
          rows={["parent-0", "compound-3", "three", "four", "five"]}
          id="compound-expansion-table-0_3"
          key="0_3"
        />
      ),
    },
    "0_4": {
      component: (
        <DemoSortableTable
          rows={["parent-0", "compound-4", "three", "four", "five"]}
          id="compound-expansion-table-0_4"
          key="0_4"
        />
      ),
    },
    "1_2": {
      component: (
        <DemoSortableTable
          rows={["parent-1", "compound-2", "three", "four", "five"]}
          id="compound-expansion-table-1_2"
          key="1_2"
        />
      ),
    },
    "1_3": {
      component: (
        <DemoSortableTable
          rows={["parent-1", "compound-3", "three", "four", "five"]}
          id="compound-expansion-table-1_3"
          key="1_3"
        />
      ),
    },
    "1_4": {
      component: (
        <DemoSortableTable
          rows={["parent-1", "compound-4", "three", "four", "five"]}
          id="compound-expansion-table-1_4"
          key="1_4"
        />
      ),
    },
  };
  const customRender = (cell, index) => {
    if (index === 0) {
      return <a href="#">{cell}</a>;
    } else if (index === 1) {
      return (
        <Flex
          key="1"
          direction={{ default: "column" }}
          display={{ default: "inlineFlex" }}
        >
          <FlexItem spacer={{ default: "spacerXs" }}>
            <Split hasGutter>
              <SplitItem>
                <ExclamationCircleIcon className="icon-class-exclamation" />
              </SplitItem>
              <SplitItem>Security Issues</SplitItem>
            </Split>
            <Split hasGutter>
              <SplitItem>
                <ExclamationCircleIcon className="icon-class-exclamation" />
              </SplitItem>
              <SplitItem>Licence conflict</SplitItem>
            </Split>
          </FlexItem>
        </Flex>
      );
    } else if (index === 2) {
      return (
        <React.Fragment>
          <CodeIcon key="icon" /> {cell}
        </React.Fragment>
      );
    } else if (index === 3) {
      return (
        <Flex
          key="1"
          direction={{ default: "column" }}
          display={{ default: "inlineFlex" }}
        >
          <FlexItem spacer={{ default: "spacerXs" }}>
            <Split hasGutter>
              <SplitItem>6</SplitItem>{" "}
              <Divider
                isVertical
                inset={{
                  default: "insetMd",
                  md: "insetNone",
                  lg: "insetSm",
                  xl: "insetXs",
                }}
              />
              <SplitItem>
                <SecurityIcon className="icon-class" /> 1
              </SplitItem>{" "}
              <SplitItem>
                <SecurityIcon className="icon-class" /> 2
              </SplitItem>{" "}
              <SplitItem>
                <SecurityIcon className="icon-class" /> 3
              </SplitItem>{" "}
              <SplitItem>
                <SecurityIcon className="icon-class" /> 4
              </SplitItem>
            </Split>
          </FlexItem>
        </Flex>
      );
    } else if (index === 4) {
      return (
        <Flex
          key="1"
          direction={{ default: "column" }}
          display={{ default: "inlineFlex" }}
        >
          <FlexItem spacer={{ default: "spacerXs" }}>
            <Split hasGutter>
              <SplitItem>6</SplitItem>{" "}
              <Divider
                isVertical
                inset={{
                  default: "insetMd",
                  md: "insetNone",
                  lg: "insetSm",
                  xl: "insetXs",
                }}
              />
              <SplitItem>
                <SecurityIcon className="icon-class" /> 1
              </SplitItem>{" "}
              <SplitItem>
                <SecurityIcon className="icon-class" /> 2
              </SplitItem>{" "}
              <SplitItem>
                <SecurityIcon className="icon-class" /> 3
              </SplitItem>{" "}
              <SplitItem>
                <SecurityIcon className="icon-class" /> 4
              </SplitItem>
            </Split>
          </FlexItem>
        </Flex>
      );
    } else if (index === 5) {
      return cell;
    }
    return cell;
  };
  const isCompoundExpanded = (rowIndex, cellIndex) => {
    // only columns 1 - 3 are compound expansion toggles in this example
    if (2 <= cellIndex && cellIndex <= 4) {
      return activeChild[rowIndex] === cellIndex;
    }
    return null;
  };
  return (
    <TableComposable aria-label="Compound expandable table">
      <Thead>
        <Tr>
          {columns.map((column, columnIndex) => (
            <Th key={columnIndex}>{column}</Th>
          ))}
        </Tr>
      </Thead>
      {rows.map((row, rowIndex) => {
        const isRowExpanded = activeChild[rowIndex] !== null;
        return (
          <Tbody key={rowIndex} isExpanded={isRowExpanded}>
            <React.Fragment>
              <Tr>
                {row.map((cell, cellIndex) => {
                  // for this example, only columns 1 - 3 are clickable
                  const compoundExpandParams =
                    2 <= cellIndex && cellIndex <= 4
                      ? {
                          compoundExpand: {
                            isExpanded: isCompoundExpanded(rowIndex, cellIndex),
                            onToggle: () => {
                              if (activeChild[rowIndex] === cellIndex) {
                                // closing the expansion on the current toggle
                                // set the corresponding item to null
                                const updatedActiveChild = activeChild.map(
                                  (item, index) =>
                                    index === rowIndex ? null : item,
                                );
                                setActiveChild(updatedActiveChild);
                              } else {
                                // expanding
                                // set the corresponding cell index
                                const updatedActiveChild = activeChild.map(
                                  (item, index) =>
                                    index === rowIndex ? cellIndex : item,
                                );
                                setActiveChild(updatedActiveChild);
                              }
                            },
                          },
                        }
                      : {};
                  return (
                    <Td
                      key={`${rowIndex}_${cellIndex}`}
                      dataLabel={columns[cellIndex]}
                      component={cellIndex === 0 ? "th" : "td"}
                      {...compoundExpandParams}
                    >
                      {customRender(cell, cellIndex)}
                    </Td>
                  );
                })}
              </Tr>
              {isRowExpanded && (
                <Tr key={`${rowIndex}-child`} isExpanded={isRowExpanded}>
                  <Td dataLabel={columns[0]} noPadding colSpan={6}>
                    <ExpandableRowContent>
                      {
                        childData[`${rowIndex}_${activeChild[rowIndex]}`]
                          .component
                      }
                    </ExpandableRowContent>
                  </Td>
                </Tr>
              )}
            </React.Fragment>
          </Tbody>
        );
      })}
    </TableComposable>
  );
};

export default Table;
