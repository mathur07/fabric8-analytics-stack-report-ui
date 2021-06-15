import React from "react";
import "./App.scss";
import "@patternfly/react-core/dist/styles/base.css";
import AppLayout from "./components/main-components/AppLayout/AppLayout";
import SummaryCard from "./components/main-components/Summary/Summary";
import OverviewCard from "./components/main-components/Overview/Overview";
import Table from "./components/main-components/Table/Table";
import GlobalStateProvider from "./store/GlobalStateProvider";
import { GetStackDetails } from "./utils/apiCalls";

function App() {
  return (
    <GlobalStateProvider>
      <AppLayout
        Summary={<SummaryCard />}
        Overview={<OverviewCard />}
        Table={<Table />}
      />
    </GlobalStateProvider>
  );
}

export default App;
