import React from 'react';
import { Tabs, Tab, Typography, Grid, Paper, IconButton, CircularProgress } from '@material-ui/core/';
import NGramTimeline from '../components/NGramTimeline';
import Lexica from '../components/Lexica';
import Paradigms from '../components/Paradigms';
import HorizonChartContainer from '../components/HorizonChartContainer';
import OCRPostcorrectionChartContainer from '../components/OCRPostcorrectionChartContainer';
import DatabaseOverview from '../components/DatabaseOverview';

import SearchBar from '../components/SearchBar';
import { Info } from '@material-ui/icons';
import ParadigmNetwork from '../pages/ParadigmNetwork';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

// Header Component for Tab Panel
export const Header = ({ title, section }: { title: string, section: string }) => {
  return (
    <div style={{ display: 'flex', flex: 1 }}>
      <Typography variant="h6" id="tableTitle" align='center' style={{ flex: 8 }}>
        {title}
      </Typography>
      <IconButton color="primary" href={"/glossary#" + section}><Info /></IconButton>
    </div>
  )
}

// TabPanel Component to display tab specific data
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}

    >
      <Grid container={true} spacing={3}>
        {children}
      </Grid>
    </Typography>
  );
}

interface IProps {
  searchValue: string;
  onSearch: (searchValue: string) => void
}
const OverviewTabs = (props: IProps) => {
  // declare state to store selected tab value
  const [selectedTab, setSelectedTab] = React.useState(0);
  // props destructuring
  const { searchValue, onSearch } = props;
  // Function to set newly selcted tab
  const handleChange = (event: React.ChangeEvent<{}>, newTab: number) => {
    setSelectedTab(newTab);
  };

  return (
    <>
      <SearchBar onSearch={onSearch} wordform={searchValue} />
      <Tabs
        value={selectedTab}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Word usage over time" />
        <Tab label="Paradigms Table" />
        <Tab label="Word variants over time" />
        <Tab label="Paradigm network" />
        <Tab label="OCR Postcorrection view" />
        <Tab label="Database Overview" />
      </Tabs>

      {selectedTab === 0 && (
        <TabPanel value={selectedTab} index="one">

          <Grid item={true} xs={12} md={12} lg={8}>
            <Paper >
              <Header title={searchValue} section="ngram" />
              <NGramTimeline wordform={searchValue} />
            </Paper>
          </Grid>
          <Grid item={true} xs={12} md={12} lg={4}>
            <Paper>
              {searchValue !== '' ? <Lexica wordform={searchValue} /> : <CircularProgress />}
            </Paper>
          </Grid>
        </TabPanel>

      )
      }
      {
        selectedTab === 1 && (
          <TabPanel value={selectedTab} index="two">
            <Grid item={true} xs={12} md={12} lg={12}>
              <Paper>
                {/* <Header title={searchValue} section="paradigm" /> */}
                {searchValue !== '' ? <Paradigms wordform={searchValue} /> : null}
              </Paper>
            </Grid>
          </TabPanel>

        )
      }
      {
        selectedTab === 2 && (
          <TabPanel value={selectedTab} index="three">

            <Grid item={true} xs={12} md={12} lg={12}>
              <Paper >
                <Header title={searchValue} section="Word variants over time" />
                <HorizonChartContainer wordform={searchValue} />
              </Paper>
            </Grid>
          </TabPanel>

        )
      }
      {
        selectedTab === 3 && (
          <TabPanel value={selectedTab} index="four">

            <Grid item={true} xs={12} md={12} lg={12}>
              <Paper >
                <Header title="" section="Paradigm network" />
                <ParadigmNetwork />
              </Paper>
            </Grid>
          </TabPanel>
        )
      }
      {
        selectedTab === 4 && (
          <TabPanel value={selectedTab} index="five">

            <Grid item={true} xs={12} md={12} lg={12}>
              <Paper >
                <Header title={searchValue} section="OCR Postcorrection view" />
                <OCRPostcorrectionChartContainer wordform={searchValue} />
              </Paper>
            </Grid>
          </TabPanel>
        )
      }

      {
        selectedTab === 5 && (
          <TabPanel value={selectedTab} index="six">

            <Grid item={true} xs={12} md={12} lg={12}>
              <Paper >
                <Header title="" section="Database overview" />
                <DatabaseOverview />
              </Paper>
            </Grid>
          </TabPanel>
        )
      }

    </>

  );
}
export default OverviewTabs;
