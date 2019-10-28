import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import React from 'react';

const about = () => {
    return (
        <Paper>
            <Typography variant="h5" align="center" color="primary">Ticclat</Typography>
            <Typography variant="body2" component="p">
                The TICCLAT Explorer was initially developed by the <a href="https://www.esciencecenter.nl/">Netherlands eScience Center</a>  as part of the project entitled
                    <strong>“TICCLAT: Text-Induced Corpus Correction and Lexical Assessment Tool ” </strong>awarded to dr. Martin Reynaert.
            For more information about the TICCLAT explorer contact dr. Martin Reynaert.
                        <br />The code can be found here:<a href="https://github.com/TICCLAT" target="_blank"> https://github.com/TICCLAT</a>
                {/* If you used this tool, please cite the software as follows: */}
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
                    {/* <li>Nijmegen, ponyland?</li> */}
                    <li>SURFSara HPC cloud</li>
                </ul>
            </Typography>
        </Paper>

    )
}

export default about;
