import React from 'react';
import ChartIcon from '@material-ui/icons/BarChart';
import InfoIcon from '@material-ui/icons/Info';
import GlossaryIcon from '@material-ui/icons/LibraryBooks';

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
    /** Uncomment  to enable Tutorial Menu 
    {
        name: 'Tutorial',
        icon: <TutorialIcon />
    }
    */

]


export default Menu;
