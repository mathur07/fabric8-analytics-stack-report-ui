import React from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableHeader,
  TableBody,
  TableVariant,
  sortable,
  SortByDirection,
} from "@patternfly/react-table";

export default class DemoSortableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: props.columns,
      rows: props.rows,
      sortBy: {},
    };
    this.onSort = this.onSort.bind(this);
  }

  onSort(_event, index, direction) {
    const sortedRows = this.state.rows.sort((a, b) => {
      if (a[index] < b[index]) {
        return -1;
      }
      return a[index] > b[index] ? 1 : 0;
    });

    this.setState({
      sortBy: {
        index,
        direction,
      },
      rows:
        direction === SortByDirection.asc ? sortedRows : sortedRows.reverse(),
    });
  }

  render() {
    const { id } = this.props;
    const { columns, rows, sortBy } = this.state;

    return (
      <Table
        aria-label="Sortable Table"
        variant={TableVariant.compact}
        sortBy={sortBy}
        onSort={this.onSort}
        cells={columns}
        rows={rows}
        className="pf-m-no-border-rows"
        id={id}
      >
        <TableHeader />
        <TableBody />
      </Table>
    );
  }
}

DemoSortableTable.propTypes = {
  rows: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
};
