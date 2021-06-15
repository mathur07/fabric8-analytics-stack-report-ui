/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-console */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from "react";
import {
  TableComposable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableText,
} from "@patternfly/react-table";
import {
  Button,
  Progress,
  ProgressMeasureLocation,
  ProgressSize,
} from "@patternfly/react-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { submitFeedback } from "../../../utils/apiCalls";

const TextTable = (data: string) => {
  return <TableText wrapModifier="wrap">{data}</TableText>;
};

const ProgressBar = (data: number) => {
  const title = String(Math.ceil(data)).concat("%");
  return (
    <Progress
      value={Math.ceil(data)}
      title={title}
      size={ProgressSize.sm}
      measureLocation={ProgressMeasureLocation.none}
    />
  );
};

const FeedbackButtons = (data: any, name: string) => {
  return (
    <div>
      <Button
        onClick={(event) => submitFeedback(data, true, name)}
        variant="link"
        icon={<FontAwesomeIcon icon={faThumbsUp} />}
      />
      <Button
        onClick={(event) => submitFeedback(data, false, name)}
        variant="link"
        icon={<FontAwesomeIcon icon={faThumbsDown} />}
      />
    </div>
  );
};

type tableProps = {
  setDrawerState: any;
  drawerSta: boolean;
  rowData: any;
  setDrawerData: any;
};

const GenerateRows = (data: any) => {
  const rowsData: (
    | { title: JSX.Element; drawer: any }
    | { title: JSX.Element; drawer?: any }
  )[][] = [];
  data.forEach((element: { name: string; drawer: any; progress: number }) => {
    const result = [
      { title: TextTable(element.name), drawer: element.drawer },
      { title: ProgressBar(element.progress) },
      { title: FeedbackButtons(element.drawer, element.name) },
    ];
    rowsData.push(result);
  });
  return rowsData;
};

const ComposableTableMisc = ({
  setDrawerState,
  drawerSta,
  rowData,
  setDrawerData,
}: tableProps) => {
  const [OpenIndex, setOpenIndex] = useState(0);
  const rows = GenerateRows(rowData);
  const columns = ["Companion Dependencies", "Confidence Score", "Feedback"];
  const customStyle = {
    borderLeft: "3px solid var(--pf-global--primary-color--100)",
  };
  const onRowClick = (rowIndex: number, data: any, cellIndex: boolean) => {
    if (cellIndex) {
      setDrawerData(data);
      setDrawerState(!drawerSta);
      setOpenIndex(rowIndex);
    }
  };
  return (
    <TableComposable isStickyHeader aria-label="Addons table">
      <Thead noWrap>
        <Tr>
          <Th>{columns[0]}</Th>
          <Th>{columns[1]}</Th>
          <Th>{columns[2]}</Th>
        </Tr>
      </Thead>
      <Tbody>
        {rows.map((row, index) => {
          return (
            <Tr
              key={index}
              style={drawerSta && OpenIndex === index ? customStyle : {}}
            >
              {row.map((cell, cellIndex) => {
                return (
                  <Td
                    key={cellIndex}
                    onClick={(event) =>
                      onRowClick(index, cell?.drawer, cellIndex === 0)
                    }
                  >
                    {cell.title}
                  </Td>
                );
              })}
            </Tr>
          );
        })}
      </Tbody>
    </TableComposable>
  );
};

export default ComposableTableMisc;
