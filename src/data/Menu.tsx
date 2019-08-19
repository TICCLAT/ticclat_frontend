import React from 'react';
import ChartIcon from '@material-ui/icons/BarChart';
import InfoIcon from '@material-ui/icons/Info';
import GlossaryIcon from '@material-ui/icons/LibraryBooks';
import TutorialIcon from '@material-ui/icons/Assignment';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';

const Menu = [
    {
        name: 'Overview',
        icon: <ChartIcon />
    },
    {
        name: 'About',
        icon: <InfoIcon />
    },
    {
        name: 'Glossary',
        icon: <GlossaryIcon />
    },
    {
        name: 'Tutorial',
        icon: <TutorialIcon />
    },
    {
        name: 'ParadigmNetwork',
        icon: <DeviceHubIcon />
    }
]


export default Menu;
