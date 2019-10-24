import React from 'react';
import { Tabs, Tab, Typography, Grid, Paper } from '@material-ui/core/';
import NGramTimeline from '../components/NGramTimeline';
import Lexica from '../components/Lexica';
import Paradigms from '../components/Paradigms';
import HorizonChartContainer from '../components/HorizonChartContainer';
import OCRPostcorrectionChartContainer from '../components/OCRPostcorrectionChartContainer';
import SearchBar from '../components/SearchBar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },

}));
interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            id={`wrapped-tabpanel-${index}`}
            aria-labelledby={`wrapped-tab-${index}`}
            style={{ margin: 20 }}
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

    const [value, setValue] = React.useState(0);
    const { searchValue, onSearch } = props;
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (
        <>
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
            >
                <Tab label="Word usage over time" />
                <Tab label="Paradigms" />
                <Tab label="Paradigms over time" />
                <Tab label="OCR Postcorrection view" />
            </Tabs>

            {
                value === 0 && (
                    <TabPanel value={value} index="one">
                        <Grid item={true} xs={12} md={12} lg={12}>
                            <SearchBar onSearch={onSearch} wordform={searchValue} />                
                        </Grid>
                        <Grid item={true} xs={12} md={8} lg={8}>
                            <Paper >                                
                                <NGramTimeline wordform={searchValue} />
                            </Paper>
                        </Grid>
                        <Grid item={true} xs={12} md={4} lg={4}>
                            <Paper>
                                {searchValue !== '' ? <Lexica wordform={searchValue} /> : null}
                            </Paper>
                        </Grid>
                    </TabPanel>

                )
            }
            {
                value === 1 && (
                    <TabPanel value={value} index="two">
                        <Grid item={true} xs={12} md={12} lg={12}>
                            <SearchBar onSearch={onSearch} wordform={searchValue} />                
                        </Grid>
                        <Grid item={true} xs={12} md={12} lg={12}>
                            {searchValue !== '' ? <Paradigms wordform={searchValue} /> : null}
                        </Grid>
                    </TabPanel>

                )
            }
            {
                value === 2 && (
                    <TabPanel value={value} index="three">
                        <Grid item={true} xs={12} md={12} lg={12}>
                            <SearchBar onSearch={onSearch} wordform={searchValue} />
                        </Grid>
                        <Grid item={true} xs={12} md={12} lg={12}>
                            <Paper >                                
                                <HorizonChartContainer wordform={searchValue} />
                            </Paper>
                        </Grid>
                    </TabPanel>

                )
            }
            {
                value === 3 && (
                    <TabPanel value={value} index="four">
                        <Grid item={true} xs={12} md={12} lg={12}>
                            <SearchBar onSearch={onSearch} wordform={searchValue} />
                        </Grid>
                        <Grid item={true} xs={12} md={12} lg={12}>
                            <Paper >
                                <OCRPostcorrectionChartContainer wordform={searchValue} />
                            </Paper>
                        </Grid>
                    </TabPanel>

                )
            }

        </>

    );
}
export default OverviewTabs;