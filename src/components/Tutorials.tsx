import React from 'react';
import { Typography } from '@material-ui/core';
import video from '../assets/video/overview_word_usage.mp4';
const Tutorials = () => {
    return (
        <>
            <Typography variant="h5" align="center" color="primary">Tutorial</Typography>
            <Typography variant="body2" component="div">
                Access to TICCLAT Explorer's contents is through the navigation menu on left side of screen.<br />
                We have four sections:
                <ol>
                    <li>Overview</li>
                    <li>About</li>
                    <li>Glossary</li>
                    <li>Tutorial</li>
                </ol>
            </Typography>
            <Typography variant="subtitle1" color="primary">Overview</Typography>
            <Typography variant="body2" component="div">
                "Overview" section provides access to Searchbar and six different tabs.<br />
                Screen by default shows information for the dutch word "regering", which is the contemporary Dutch lemma for the word 'government'.
                You can search for any word by typing it in search bar and clicking on search icon or pressing "Enter" key.<br />
                <ul>
                    <li><strong>Word Usage Over Time:</strong> <br />
                        <ul>
                            <li>This tab shows the time line information for the word you queried for(specified in search bar).</li>
                            <li>Shown currently are the frequency lines for the information about the word in the database underlying the system. This database currently holds data on about 1.5 million humanly attested word forms. These are regular word forms, surnames, first names, place names and names of ships, supplemented by a list of mostly productive and actually published typos.</li>
                            <li>Currently three databases are incorporated, so three corpus lines are visible. Note that,at the top of the timeline chart the names of those corpora in which the word was encountered are given, accompanied by a small square informing the user about the color of the frequency line which represents the particular corpus.</li>
                            <li>The screen further affords three different frequency views. The buttons above the frequency permit one to choose the desired frequency type.</li>
                            <li>In the top right of this screen one sees a small information button. Selecting this moves one into the glossary that accompanies this system and which explains the actual differences between the three different frequency views.</li>
                            <li>The narrower frequency field below allows for selecting a specific time range of the frequency field in order to allow one to zoom in on that and obtain a clearer view. The selected region lights up in the lower graph so as to allow the user to orient herself.</li>
                            <li>Note that the actual occurrences of the query word in the frequency field are shown as dots. The lines connecting the dots are not drawn in full, these are dotted: there is in fact no information between the actual dots and dots may well lie many years apart.</li>
                            <li>To the right of the time line screen we find a table listing to the left the lexicons incorporated into TICCLAT Explorer. This gives an overview of the lexicons the word is or is not found in. This list is static, i.e. always displays all of the lexicons present in order to give you, at a glimpse, an idea of the 'ubiquity' and thereby 'validity' of the query word. A green tick shows the word is present in the specific lexicon, a red cross that it is not. Some more information about and further links to the lexicons is to be found in the glossary.</li>
                        </ul>
                    </li>
                </ul>
            </Typography>
            <Typography component="div" align="center">
                <video width="700px" height="400" controls>
                    <source src={video} />
                </video>
            </Typography>
            <Typography variant="subtitle1" color="primary">Glossary</Typography>
            <Typography variant="body2" component="div">
                'Glossary' tries to fill you in to the terms and vocabulary exercised in TICCLAT Explorer. In order to comprehend what one sees, one should at least have acquired a sketchy understanding of what this web site is about.
            </Typography>
            <Typography variant="subtitle1" color="primary">Tutorials</Typography>
            <Typography variant="body2" component="div">
                'Tutorials' is, unless you are reading printed version of this infomation as obtainable from this very site, the web page you are actually reading now.
            </Typography>
        </>
    )
}

export default Tutorials;