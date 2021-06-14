/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-array-index-key */
import React, { useContext, useEffect, useState } from "react";
import "@patternfly/react-core/dist/styles/base.css";
import {
  TableComposable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  ExpandableRowContent,
  sortable,
} from "@patternfly/react-table";
// https://github.com/patternfly/patternfly-react/blob/master/packages/react-table/src/components/Table/examples/DemoSortableTable.js
import Context from "../../../store/context";
import DemoSortableTable from "./DemoSortableTable.js";
import VersionDetails from "./VersionDetails";
import VulnerabilitiesRowDetails from "./VulnerabilitiesRowDetails";
import "./Table.scss";
import DependencyCheck from "./DependencyCheck";

const Table = () => {
  // @ts-ignore
  const { globalState, globalDispatch } = useContext(Context);
  const [rowz, setRowz] = useState([]);

  const [rows, setRowsTest] = useState([]);
  const [childDataTest, setChildDataTest] = useState([]);

  useEffect(() => {
    const analyzedDependencies = globalState.APIData?.analyzed_dependencies;
    const rowData: ((prevState: never[]) => never[]) | any[][] = [];
    analyzedDependencies?.forEach((dep: any) => {
      // eslint-disable-next-line no-console
      console.log(dep);
      const tempRowData = [];
      const tempIssuesData = [];
      tempRowData.push(dep.name);
      if (
        dep.private_vulnerabilities.length ||
        dep.public_vulnerabilities.length ||
        dep.vulnerable_dependencies.length
      ) {
        tempIssuesData.push("Security Issues");
      }
      tempRowData.push(tempIssuesData);
      tempRowData.push(dep.version);

      const directVulnerabilitiesDetailsObj = getVulnerabilitiesDetailsObj(dep);
      const transitiveVulnerabilitiesDetailsObj = {
        critical: 0,
        high: 0,
        medium: 0,
        low: 0,
        total: 0,
      };

      tempRowData.push(directVulnerabilitiesDetailsObj);
      tempRowData.push(transitiveVulnerabilitiesDetailsObj);
      tempRowData.push(dep.recommended_version);
      rowData.push(tempRowData);
    });
    rowData.sort((b, a) => {
      if (a[3].total < b[3].total) {
        return -1;
      }
      if (a[3].total > b[3].total) {
        return 1;
      }
      return 0;
    });
    // @ts-ignore
    setRowsTest(rowData);
    // eslint-disable-next-line no-console
    console.log(rowData);
  }, [globalState]);

  function getVulnerabilitiesDetailsObj(dep: any) {
    const VulnerabilitiesDetailsObj = {
      critical: 0,
      high: 0,
      medium: 0,
      low: 0,
      total: 0,
    };
    const allVuls = [
      ...dep.public_vulnerabilities,
      ...dep.private_vulnerabilities,
    ];
    if (allVuls.length) {
      let total = 0;
      allVuls.forEach((vul: { severity: any }) => {
        const { severity } = vul;
        if (severity === "critical") {
          VulnerabilitiesDetailsObj.critical += 1;
          total += 1;
        }
        if (severity === "high") {
          VulnerabilitiesDetailsObj.high += 1;
          total += 1;
        }
        if (severity === "medium") {
          VulnerabilitiesDetailsObj.medium += 1;
          total += 1;
        }
        if (severity === "low") {
          VulnerabilitiesDetailsObj.low += 1;
          total += 1;
        }
      });
      VulnerabilitiesDetailsObj.total = total;
    }
    return VulnerabilitiesDetailsObj;
  }

  const columns = [
    "Dependencies",
    "Dependency Check",
    "Current Version",
    "Direct Vulnerabilities",
    "Transitive Vulnerabilities",
    "Recommended Version",
  ];
  // const rows = [
  //   [
  //     "aniso8601",
  //     ["Security Issues", "Exploit present", "Licence conflict"],
  //     "7.2.0",
  //     { critical: 3, high: 2, medium: 4, low: 2 },
  //     { critical: 1, high: 0, medium: 0, low: 4 },
  //     "9.0.1",
  //   ],
  //   [
  //     "Seville",
  //     [],
  //     "0.2.0",
  //     { critical: 0, high: 2, medium: 3, low: 2 },
  //     { critical: 1, high: 3, medium: 1, low: 4 },
  //     "0.3.1",
  //   ],
  // ];
  // index corresponds to row index, and value corresponds to column index of the expanded, null means no cell is expanded
  const [activeChild, setActiveChild] = React.useState([null, null]);
  // key = row_col of the parent it corresponds to
  const childData = {
    "0_2": {
      component: <VersionDetails />,
    },
    "0_3": {
      component: (
        <DemoSortableTable
          rows={[
            ["Man-in-the-Middle (MitM)", "High", "8.8/10", "", ""],
            ["Cross site scripting (XSS)", "Medium", "5.5/10", "", ""],
          ]}
          columns={[
            { title: "Direct Vulnerability", transforms: [sortable] },
            "Severity",
            { title: "CVSS Score", transforms: [sortable] },
            "",
            "",
          ]}
          id="compound-expansion-table-0_3"
          key="0_3"
        />
      ),
    },
    "0_4": {
      component: (
        <DemoSortableTable
          columns={[
            { title: "Transitive Vulnerability", transforms: [sortable] },
            "Severity",
            "CVSS Score",
            "Transitive dependency",
            "Current Version",
            "Latest Version",
          ]}
          rows={[
            [
              "XML External Entity (XXE) Injection",
              "High",
              "8.8/10",
              "com.fasterxml.jackson.core:jackson-databind",
              "4.8",
              "5.8",
            ],
            [
              "Remote Memory Exposure",
              "Medium",
              "5.8/10",
              "org.eclipse.jetty:jetty-server",
              "4.8",
              "5.1",
            ],
          ]}
          id="compound-expansion-table-0_4"
          key="0_4"
        />
      ),
    },
    "1_2": {
      component: <VersionDetails />,
    },
    "1_3": {
      component: (
        <DemoSortableTable
          rows={[
            ["Man-in-the-Middle (MitM)", "High", "8.8/10", "", ""],
            ["Cross site scripting (XSS)", "Medium", "5.5/10", "", ""],
          ]}
          columns={[
            { title: "Direct Vulnerability", transforms: [sortable] },
            "Severity",
            { title: "CVSS Score", transforms: [sortable] },
            "",
            "",
          ]}
          id="compound-expansion-table-1_3"
          key="1_3"
        />
      ),
    },
    "1_4": {
      component: (
        <DemoSortableTable
          columns={[
            { title: "Transitive Vulnerability", transforms: [sortable] },
            "Severity",
            "CVSS Score",
            "Transitive dependency",
            "Current Version",
            "Latest Version",
          ]}
          rows={[
            [
              "XML External Entity (XXE) Injection",
              "High",
              "8.8/10",
              "com.fasterxml.jackson.core:jackson-databind",
              "4.8",
              "5.8",
            ],
            [
              "Remote Memory Exposure",
              "Medium",
              "5.8/10",
              "org.eclipse.jetty:jetty-server",
              "4.8",
              "5.1",
            ],
          ]}
          id="compound-expansion-table-1_4"
          key="1_4"
        />
      ),
    },
  };
  const customRender = (cell: {} | null | undefined, index: number) => {
    if (index === 0) {
      return <h6>{cell}</h6>;
    }
    if (index === 1) {
      // @ts-ignore
      return <DependencyCheck dependencyCheckArray={cell} />;
    }
    if (index === 2) {
      return <>{cell}</>;
    }
    if (index === 3) {
      // @ts-ignore
      return <VulnerabilitiesRowDetails {...cell} />;
    }
    if (index === 4) {
      // @ts-ignore
      return <VulnerabilitiesRowDetails {...cell} />;
    }
    if (index === 5) {
      return cell;
    }
    return cell;
  };
  const isCompoundExpanded = (rowIndex: number, cellIndex: number) => {
    // only columns 1 - 3 are compound expansion toggles in this example
    if (cellIndex >= 2 && cellIndex <= 4) {
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
      {rows?.map((row, rowIndex) => {
        const isRowExpanded = activeChild[rowIndex] !== null;
        return (
          <Tbody key={rowIndex} isExpanded={isRowExpanded}>
            <>
              <Tr>
                {/* @ts-ignore */}
                {row?.map((cell, cellIndex) => {
                  // for this example, only columns 1 - 3 are clickable
                  const compoundExpandParams =
                    cellIndex >= 2 && cellIndex <= 4
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

                                // @ts-ignore
                                setActiveChild(updatedActiveChild);
                              }
                            },
                          },
                        }
                      : {};
                  return (
                    // @ts-ignore
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
                        // @ts-ignore
                        childData[`${rowIndex}_${activeChild[rowIndex]}`]
                          ?.component
                      }
                    </ExpandableRowContent>
                  </Td>
                </Tr>
              )}
            </>
          </Tbody>
        );
      })}
    </TableComposable>
  );
};

export default Table;
