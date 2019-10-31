
import React from 'react';
import { Typography, IconButton } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import MailIcon from '@material-ui/icons/Mail';
const about = () => {
    return (
        <Paper>
            <Typography variant="h5" align="center" color="primary">About</Typography>
            <Typography variant="body2" component="p">
                The TICCLAT Explorer was initially developed by the <a href="https://www.esciencecenter.nl/">Netherlands eScience Center</a>  as part of the project entitled
                    <strong>“TICCLAT: Text-Induced Corpus Correction and Lexical Assessment Tool ” </strong>awarded to dr. Martin Reynaert.
For more information about the TICCLAT explorer contact dr. Martin Reynaert
                            <IconButton href="mailto:martin.reynaert@meertens.knaw.nl;reynaert@uvt.nl" size="small" color="primary">
                    <MailIcon />
                </IconButton>
                <br />The code can be found here:<a href="https://github.com/TICCLAT" target="_blank"> https://github.com/TICCLAT</a>
              <p>
                If you used this tool, please cite the software as follows:<br/>
                <pre
                  style={{marginLeft: '2em'}}
                  dangerouslySetInnerHTML={{__html: `
@software{pawar_pushpanjali_2019_3520462,
  author       = {Pawar, Pushpanjali and
  Mendrik, Adriënne and
  van Meersbergen, Maarten and
  Bos, Patrick and
  Klaver, Tom and
  van der Zwaan, Janneke and
  Reynaert, Martin},
  title        = {TICCLAT},
  month        = oct,
  year         = 2019,
  publisher    = {Zenodo},
  doi          = {10.5281/zenodo.3520455},
  url          = {https://doi.org/10.5281/zenodo.3520455}
}
                    `}}
                />
              </p>
            </Typography>
            <Typography variant="subtitle1" color="primary">Acknowledgements</Typography>
            <Typography component="div" variant="body2">
                <ul>
                    <li>
                        The TICCLAT project (project number: 27017G04) was funded by the <strong>ADAH</strong> (Accelerating Scientific Discovery in the Arts and Humanities) call. <br />
                        A joint call by <a href="https://www.clariah.nl/">CLARIAH</a> and the Netherlands eScience Center.
                            <br />The following eScience research engineers worked on the project:
                            <br />dr. Patrick Bos, dr. Janneke van der Zwaan, Tom Klaver, Pushpanjali Pawar, and Maarten van Meersbergen.
                    </li>
                    <li>The TICCLAT team gratefully acknowledges use of the computer server facilities of the department of Cognitive Science and Artificial Intelligence at Tilburg University for data processing and at the Centre for Language and Speech Technology at Radboud University Nijmegen for data storage and transfer. We also acknowledge having relied heavily on the diachronic and synchronic lexical resources gracefully provided by project partner INT, the Institute for the Dutch Language in Leiden. Prior projects LINKS and Names under direction of dr.ir. Gerrit Bloothooft at Utrecht University provided the complete list of Dutch person names from A.D. 1811. We thank Geonames for Dutch spellings and variants for place names around the globe. Project Gutenberg provided the 1914 version of the Green Booklet, the official word list of Dutch. Stichting Open Taal offered us extensive lists of Dutch compounds, a word type traditionally neglected by lexicographers.

TICCLAT relies heavily on the great range of Dutch corpora collected in NWO Groot project Nederlab. Major subcorpora in Nederlab were digitized by the Dutch National Library or KB whose portal Delpher freely provides access to fabulous collections of historical texts: newspapers, books, etc.

At CLST senior programmer Ko van der Sloot develops and maintains TICCL, i.e. the OCR post-correction tool used in this work to identify and gather lexical variants in the Nederlab corpora and incorporated in TICCLAT.</li>
                    <li>SURFSara HPC cloud</li>
                </ul>
            </Typography>
        </Paper>

    )
}

export default about;
