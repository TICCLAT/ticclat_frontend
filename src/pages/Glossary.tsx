import React from 'react';
import { Container, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import GlossaryDescription from '../components/GlossaryDescription';

const useStyles = makeStyles(theme => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },

}));

const glossary = ({ history }: RouteComponentProps) => {
    const classes = useStyles();

    return (
        <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                    <Paper>
                        <GlossaryDescription title="Anagram hashing" >
                            <Typography variant="subtitle1" id="Anagram hashing">
                                A system of calculating with words developed by Martin Reynaert in the course of his PhD work (Reynaert, 2005).
                            </Typography>
                            <pre
                                dangerouslySetInnerHTML={{
                                    __html: `
                                        @PhdThesis{Reynaert05,
                                            author = {Reynaert, Martin},
                                            title = {{T}ext-{I}nduced {S}pelling {C}orrection},
                                            year = {2005},
                                            school = {Tilburg University},
                                            url = {http://ilk.uvt.nl/~mre/TISC.PhD.MartinReynaert.pdf.gz}
                                        }`
                                }}
                            />
                        </GlossaryDescription>
                        <GlossaryDescription title="FoLiA XML" >
                            <Typography component="p" variant="subtitle1" id="foliaXml">
                                The 'Format for Linguistic Annotations' or FoLiA xml is described in (van Gompel and Reynaert, 2013). A paper about the larger FoLiA infrastructure and tools: (van Gompel et al., 2017).
                                Just about all the tools required for handling and analysing FoLiA corpora are available to all: https://proycon.github.io/LaMachine/
                            </Typography>
                            <pre
                                dangerouslySetInnerHTML={{
                                    __html: `
                                    @article{vanGompelReynaert2013,
                                        title = {{F}o{L}i{A}: {A} practical {XML} {F}ormat for {L}inguistic {A}nnotation - a descriptive and comparative study},
                                        journal = {Computational Linguistics in the Netherlands Journal},
                                        volume = {3},
                                        pages = {63--81},
                                        author = {van Gompel, Maarten and Reynaert, Martin},
                                        url = {http://www.clinjournal.org/sites/clinjournal.org/files/05-vanGompel-Reynaert-CLIN2013.pdf},
                                        year = {2013}
                                    }
                                    
                                    @incollection{CLARINLOW2017a,
                                      booktitle = {{CLARIN-NL} in the Low Countries},
                                      editor = {Odijk, J. and van Hessen, A.},
                                      chapter = {6},
                                      Pages = {71--81},
                                      publisher = {Ubiquity (Open Access)},
                                      author = {{van Gompel}, Maarten and {van der Sloot}, Ko and Reynaert, Martin and {van den Bosch}, Antal},
                                      title = {{FoLiA} in practice: {T}he infrastructure of a linguistic annotation format},
                                      year = {2017}
                                    }
                                    `
                                }}
                            />
                        </GlossaryDescription>
                        <GlossaryDescription title="Lemma" >
                            <Typography variant="subtitle1" id="lemma">
                                The word form that is usually stated as the entry for a word in a lexicon or dictionary.
                                <br /><span> In Dutch:</span>
                                <br /><span>  for a noun: usually the singular word form</span>
                                <br /><span>   for a verb: usually the infinitive</span>
                            </Typography>
                        </GlossaryDescription>
                        <GlossaryDescription title="Morphological form" >
                            <Typography component="p" variant="subtitle1" id="morphologicalform">
                                Words take on different forms according to their meaning or function within a sentence. These are called morphological forms.
                            </Typography>
                        </GlossaryDescription>
                        <GlossaryDescription title="Nederlab" >
                            <Typography component="p" variant="subtitle1" id="nederlab">
                                The Nederlab project has brought together the major collections of digitized texts relevant to the Dutch national heritage (c. A.D. 800 -- present) running to about 18.5 billion word tokens in a unified text format, i.e. FoLiA XML. Book chapter about the Nederlab project and portal, available in Open Access: (Brugman, 2016).
                                Nederlab has its own portal, freely accessible to anyone with an academic login: https://www.nederlab.nl/onderzoeksportaal/
                            </Typography>
                            <pre
                                dangerouslySetInnerHTML={{
                                    __html: `
                                    @InProceedings{Brugman2016,
                                        author = {Brugman, Hennie and Reynaert, Martin and van der Sijs, Nicoline and {van Stipriaan}, Ren{\'e} and Tjong Kim Sang, Erik and van den Bosch, Antal},
                                        title = {{Nederlab:   Towards  a  Single  Portal  and  Research Environment for Diachronic Dutch Text Corpora.}},
                                        booktitle = {Proceedings of the Tenth International Conference on Language Resources and Evaluation ({LREC}-2016)},
                                        year = {2016},
                                        address = {Portoroz, Slovenia},
                                        editor = {Nicoletta Calzolari et al.},   
                                        publisher = {ELRA},
                                        isbn = {978-2-9517408-9-1},
                                        language = {english},
                                        pages = {1277-1281},
                                        url = {http://www.lrec-conf.org/proceedings/lrec2016/pdf/471_Paper.pdf}
                                       }
                                    `
                                }}
                            />
                        </GlossaryDescription>
                        <GlossaryDescription title="Nederlab corpus" >
                            <Typography component="p" variant="subtitle1" id="nederlabcorpus">
                                The collection of corpora that were gathered in the Nederlab project.
                                These corpora span the full extent of the history of Dutch. There are a few texts, usually just phrases, recognized as 'Dutch' from the 9th. century.
                                The oldest book length texts in the Nederlab corpus are from about A.D. 1250.
                            </Typography>
                        </GlossaryDescription>
                        <GlossaryDescription title="Text corpus" >
                            <Typography component="p" variant="subtitle1" id="textcorpus">
                                A collection of texts regarded as a single entity. Plural: corpora. Texts are collected in corpora for a wide range of reasons and purposes.
                            </Typography>
                        </GlossaryDescription>
                        <GlossaryDescription title="Word cluster" >
                            <Typography component="p" variant="subtitle1" id="wordcluster">
                                The group of words that are perceived to belong together. In this work we link all morphologically related word forms to their contemporary lemma. For a noun the morphologically related word forms for the lemma would be: the plural form and the singular as well as the plural diminutive forms.
                                E.g. lemma: 'paard' (E. 'horse'), plural: 'paarden' (E. 'horses'), diminutive singular: 'paardje' (E. 'small horse'), diminutive plural: 'paardjes' (E. 'small horses').
                            </Typography>
                        </GlossaryDescription>
                        <GlossaryDescription title="Word form" >
                            <Typography component="p" variant="subtitle1" id="wordform">
                                A word as it appears in text.
                            </Typography>
                        </GlossaryDescription>
                        <GlossaryDescription title="Word frequency list" >
                            <Typography component="p" variant="subtitle1" id="wordfrequencylist">
                                A list of word forms derived from a particular text or collection of texts. For 'collection of text', see: text corpus.
                            </Typography>
                        </GlossaryDescription>
                        <GlossaryDescription title="Word token" >
                            <Typography component="p" variant="subtitle1" id="wordtoken">
                                We call the word forms as we encounter them in running text 'word tokens'.
                            </Typography>
                        </GlossaryDescription>
                        <GlossaryDescription title="Word type" >
                            <Typography component="p" variant="subtitle1" id="wordtype">
                                When one calculates how often a particular word form occurs in running text, one in fact builds a list of the word types in the text. For each word type in the word frequency list, the absolute word frequency is then stated. See: word frequency list.
                            </Typography>
                        </GlossaryDescription>
                        <GlossaryDescription title="Ngram" >
                            <Typography component="p" variant="subtitle1" id="ngram">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </Typography>
                        </GlossaryDescription>
                        <GlossaryDescription title="Paradigm" >
                            <Typography component="p" variant="subtitle1" id="paradigm">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </Typography>
                        </GlossaryDescription>
                        <GlossaryDescription title="Horizon" >
                            <Typography component="p" variant="subtitle1" id="horizon">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </Typography>
                        </GlossaryDescription>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}

export default glossary;
