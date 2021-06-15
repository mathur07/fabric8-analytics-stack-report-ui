/* eslint-disable camelcase */
import React, { useContext, useEffect, useState } from "react";
import {
  Divider,
  Drawer,
  DrawerActions,
  DrawerCloseButton,
  DrawerContent,
  DrawerContentBody,
  DrawerHead,
  DrawerPanelBody,
  DrawerPanelContent,
  Flex,
  FlexItem,
  Grid,
  GridItem,
  Split,
  SplitItem,
  Title,
} from "@patternfly/react-core";
import "./addons.scss";
import Utils from "src/app/utils/utility";
import GithubStats from "./github_stats";
import ComposableTableMisc from "./addonstable";
import Context from "../../../store/context";

const DrawerFC = () => {
  // @ts-ignore
  const { globalState, globalDispatch } = useContext(Context);
  const utils = new Utils();
  const [Companion, setCompanion] = useState([]);
  useEffect(() => {
    const compaionDeps = utils.GetCompanionData(globalState.Companion);
    setCompanion(compaionDeps);
    // setCompanion(compaionDeps);
  }, [globalState]);
  const drawD = {
    name: "Hello",
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
  const [drawerSta, setDrawerState] = useState(false);
  const [drawerData, setDrawerData] = useState(drawD);
  const panelc = (
    <DrawerPanelContent>
      <DrawerHead>
        <h3 className="pf-c-title pf-m-2xl">{drawerData.name}</h3>
        <DrawerActions>
          <DrawerCloseButton onClick={() => setDrawerState(false)} />
        </DrawerActions>
      </DrawerHead>
      <DrawerPanelBody>
        <Flex>
          <FlexItem>
            <Flex key="2" direction={{ default: "column" }}>
              <FlexItem spacer={{ default: "spacerNone" }}>
                <Split>
                  <Title headingLevel="h6" size="md">
                    Latest Version
                    <div className="font">{drawerData.latest_version}</div>
                  </Title>
                </Split>
              </FlexItem>
              <FlexItem spacer={{ default: "spacerNone" }}>
                <Split>
                  <Title headingLevel="h6" size="md">
                    Licence(s) used
                    <div className="font">{drawerData.licenses.toString()}</div>
                  </Title>
                </Split>
              </FlexItem>
            </Flex>
          </FlexItem>
          <Divider isVertical />
          <FlexItem align={{ default: "alignRight" }}>
            <Flex key="2" direction={{ default: "column" }}>
              <GithubStats
                contributors={Number(drawerData.github.contributors)}
                dependentRepos={Number(drawerData.github.dependent_repos)}
                usage={Number(drawerData.github.used_by.length)}
                forks={Number(drawerData.github.forks_count)}
                stars={Number(drawerData.github.stargazers_count)}
              />
            </Flex>
          </FlexItem>
        </Flex>
      </DrawerPanelBody>
    </DrawerPanelContent>
  );
  return (
    <Drawer className="DrawerSize" isExpanded={drawerSta}>
      <DrawerContent panelContent={panelc}>
        <DrawerContentBody>
          <ComposableTableMisc
            drawerSta={drawerSta}
            setDrawerState={setDrawerState}
            rowData={Companion}
            setDrawerData={setDrawerData}
          />
        </DrawerContentBody>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerFC;
