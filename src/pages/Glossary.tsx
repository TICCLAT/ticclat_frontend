import React, { useState } from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import GlossaryDescription from '../components/GlossaryDescription';
import TicclatDialog from '../components/TicclatDialog';


const glossary = () => {
    const [biText, setbiText] = useState('');
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
                <Paper>
                    {biText &&
                        <TicclatDialog
                            title={'BibTex'}
                            onClose={() => setbiText('')}
                        >
                            <pre
                                dangerouslySetInnerHTML={{
                                    __html: biText
                                }}
                            />
                        </TicclatDialog>
                    }
                    <GlossaryDescription title="Anagram hashing" >
                        <Typography variant="body2" id="Anagram hashing">
                            A system of calculating with words developed by Martin Reynaert in the course of his PhD work
                            <a
                                href="#"
                                onClick={() => setbiText(
                                    `
                                            @PhdThesis{Reynaert05,
                                            author = {Reynaert, Martin},
                                            title = {{T}ext-{I}nduced {S}pelling {C}orrection},
                                            year = {2005},
                                            school = {Tilburg University},
                                            url = {http://ilk.uvt.nl/~mre/TISC.PhD.MartinReynaert.pdf.gz}
                                            }`

                                )}
                            >
                                (Reynaert, 2005)
                            </a>.
                            </Typography>

                    </GlossaryDescription>
                    <GlossaryDescription title="Corpus versus Document frequency" >
                        <Typography variant="body2" id="dispersion">
                            <strong>Corpus frequency</strong><br />
                            The number of times a word form actually occurs in a corpus (absolute frequency) or occurs relative to the total number of words in the corpus (relative frequency).
                                <br />
                            <strong>Document Frequency</strong><br />
                            The number of documents in the corpus the word form occurs in.
                            </Typography>
                    </GlossaryDescription>
                    <GlossaryDescription title="Dispersion" >
                        <Typography variant="body2" id="dispersion">
                            The spread of a word through time, diverse text types or diverse regions of a language.
                            </Typography>
                    </GlossaryDescription>

                    <GlossaryDescription title="FoLiA XML" >
                        <Typography component="p" variant="body2" id="foliaXml">
                            The 'Format for Linguistic Annotations' or FoLiA xml is described in
                            <a
                                href="#"
                                onClick={() => setbiText(
                                    `
                                        @article{vanGompelReynaert2013,
                                            title = {{F}o{L}i{A}: {A} practical {XML} {F}ormat for {L}inguistic {A}nnotation - a descriptive and comparative study},
                                            journal = {Computational Linguistics in the Netherlands Journal},
                                            volume = {3},
                                            pages = {63--81},
                                            author = {van Gompel, Maarten and Reynaert, Martin},
                                            url = {http://www.clinjournal.org/sites/clinjournal.org/files/05-vanGompel-Reynaert-CLIN2013.pdf},
                                            year = {2013}
                                        }
                                        
                                        `

                                )}
                            >
                                (van Gompel and Reynaert, 2013)
                            </a>. A paper about the larger FoLiA infrastructure and tools:
                            <a
                                href="#"
                                onClick={() => setbiText(
                                    `@incollection{CLARINLOW2017a,
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

                                )}
                            >
                                (van Gompel et al., 2017)
                            </a>.Just about all the tools required for handling and analysing FoLiA corpora are available to all: https://proycon.github.io/LaMachine/
                            </Typography>

                    </GlossaryDescription>
                    <GlossaryDescription title="Granularity" >
                        <Typography variant="body2" id="granularity">
                            <span>In the context of TICCLAT, the level of detail we handle to look at the lexical. On occasion, we look on a (sub)corpus as a whole. </span>
                            <span>For most purposes, we look at the texts originating in a particular year to derive our frequency lists from.</span>
                        </Typography>
                    </GlossaryDescription>
                    <GlossaryDescription title="Green Booklet" >
                        <Typography variant="body2" id="greenbooklet">
                            <span>The 'Green Booklet' (Dutch: 'Groene Boekje') represents the official word list of Dutch.
                                These books present the official spelling of Dutch words.
                                Since about 1950 there is a treaty between the Netherlands and Belgium called 'The Dutch Language Union' that states it is mandatory in the Netherlands and the Dutch speaking part of Belgium, commonly called 'Flanders', for this spelling to be handled in official documents. TICCLAT contains the 1914, 1995 and 2005 versions of this lexicon.
                                The 1914 version is due to project Gutenberg.
                                The two more recent versions were obtained from the then Institute for Dutch Lexicology (INL), now the Institute for the Dutch Language (INT).
                                    The Green Booklet that was published about 1950 represents a major Dutch spelling reform.</span>
                        </Typography>
                    </GlossaryDescription>
                    <GlossaryDescription title="Hapax" >
                        <Typography variant="body2" id="hapax">
                            A word type that occurs only once in a given corpus.
                                 Zipf's Law implies that in well-edited natural language corpora the number of hapaxes present will always be about 50% of the word types, at least for corpora of sufficient size, not  just for short texts.
                                 This fact is all too often overlooked. Words in text do not display a normal or Gaussian distribution, they are subject to the statistics of 'Very Large Numbers of Small Events'
                                 (
                            <a
                                href="#"
                                onClick={() => setbiText(
                                    `@TechReport{Khmaladze1987,
                                            author = {Khmaladze, E.V.},
                                            title = {The statistical analysis of large number of rare events},
                                            year = {1987},
                                            number = {MS-R8804},
                                            institution = {Department of Mathematical Statistics, CWI},
                                            address = {Amsterdam: Center for Mathematics and Computer Science}
                                          }
                                        `
                                )}
                            >   Khmaladze, 198
                            </a>
                            ;
                            <a
                                href="#"
                                onClick={() => setbiText(
                                    `@book{Baayen01,
                                            Address = {Dordrecht},
                                            Author = {R. Harald Baayen},
                                            Date-Added = {2010-01-29 15:06:48 +0100},
                                            Date-Modified = {2010-01-29 15:06:54 +0100},
                                            Note = {Text, Speech and Language Technology, vol. 18, series editors: Nancy Ide and Jean V\'{e}ronis},
                                            Publisher = {Kluwer Academic Publishers},
                                            Title = {Word Frequency Distributions},
                                            Year = {2001}}
                                        `
                                )}
                            >
                                Baayen, 2001
                            </a>
                            ).
                            </Typography>
                    </GlossaryDescription>
                    <GlossaryDescription title="Lemma" >
                        <Typography variant="body2" id="lemma">
                            The word form that is usually stated as the entry for a word in a lexicon or dictionary.
                                <br /><span> In Dutch:</span>
                            <br /><span>  for a noun: usually the singular word form</span>
                            <br /><span>   for a verb: usually the infinitive</span>
                        </Typography>
                    </GlossaryDescription>
                    <GlossaryDescription title="Morphological form" >
                        <Typography component="p" variant="body2" id="morphologicalform">
                            Words take on different forms according to their meaning or function within a sentence. These are called morphological forms.
                            </Typography>
                    </GlossaryDescription>
                    <GlossaryDescription title="Nederlab" >
                        <Typography component="p" variant="body2" id="nederlab">
                            The Nederlab project has brought together the major collections of digitized texts relevant to the Dutch national heritage (c. A.D. 800 -- present) running to about 18.5 billion word tokens in a unified text format, i.e. FoLiA XML. Book chapter about the Nederlab project and portal, available in Open Access:
                            <a
                                href="#"
                                onClick={() => setbiText(
                                    ` @InProceedings{Brugman2016,
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
                                )}
                            >(Brugman, 2016)
                            </a>.Nederlab has its own portal, freely accessible to anyone with an academic login: https://www.nederlab.nl/onderzoeksportaal/
                            </Typography>

                    </GlossaryDescription>
                    <GlossaryDescription title="Nederlab corpus" >
                        <Typography variant="body2" id="nederlabcorpus">
                            The collection of corpora that were gathered in the Nederlab project.
                            These corpora span the full extent of the history of Dutch. There are a few texts, usually just phrases, recognized as 'Dutch' from the 9th. century.
                            The oldest book length texts in the Nederlab corpus are from about A.D. 1250.
                            </Typography>
                    </GlossaryDescription>
                    <GlossaryDescription title="Text corpus" >
                        <Typography variant="body2" id="textcorpus">
                            A collection of texts regarded as a single entity. Plural: corpora. Texts are collected in corpora for a wide range of reasons and purposes.
                            </Typography>
                    </GlossaryDescription>
                    <GlossaryDescription title="Word cluster" >
                        <Typography variant="body2" id="wordcluster">
                            The group of words that are perceived to belong together. In this work we link all morphologically related word forms to their contemporary lemma. For a noun the morphologically related word forms for the lemma would be: the plural form and the singular as well as the plural diminutive forms.
                            E.g. lemma: 'paard' (E. 'horse'), plural: 'paarden' (E. 'horses'), diminutive singular: 'paardje' (E. 'small horse'), diminutive plural: 'paardjes' (E. 'small horses').
                            </Typography>
                    </GlossaryDescription>
                    <GlossaryDescription title="Word form" >
                        <Typography component="p" variant="body2" id="wordform">
                            A word as it appears in text.
                            </Typography>
                    </GlossaryDescription>
                    <GlossaryDescription title="Word frequency list" >
                        <Typography component="p" variant="body2" id="wordfrequencylist">
                            A list of word forms derived from a particular text or collection of texts. For 'collection of text', see: text corpus.
                            </Typography>
                    </GlossaryDescription>
                    <GlossaryDescription title="Word token" >
                        <Typography component="p" variant="body2" id="wordtoken">
                            We call the word forms as we encounter them in running text 'word tokens'.
                            </Typography>
                    </GlossaryDescription>
                    <GlossaryDescription title="Word type" >
                        <Typography component="p" variant="body2" id="wordtype">
                            When one calculates how often a particular word form occurs in running text, one in fact builds a list of the word types in the text. For each word type in the word frequency list, the absolute word frequency is then stated. See: word frequency list.
                            </Typography>
                    </GlossaryDescription>
                    <GlossaryDescription title="Word Usage Over Time" >
                        <Typography variant="body2" id="ngram">
                            <strong>Absolute corpus frequency</strong><br />
                            The number of occurrences of a particular word type in a given corpus. See also:
                                <a href="#zipfslaw">Zipf's Law</a> and  <a href="#hapax">Hapax</a>.
                                <br />
                            <strong>Relative corpus frequency</strong><br />
                            The number of times a word form occurs relative to the total number of words in the corpus .
                                <br />
                            <strong>Relative year frequency</strong><br />
                            The number of times a word form occurs relative to the number of words in a particular year of the corpus .
                            </Typography>

                    </GlossaryDescription>
                    <GlossaryDescription title="Paradigm" >
                        <Typography component="div" variant="body2" id="paradigm">
                            In TICCLAT, we link the many
                            related variants of what might constitute a single ‘word’. Each word type is assigned a unique code
                            which links and identifies through its prefix the overall cluster of its related words, by an infix specific
                            to each of the following three subcategories: the morphologically related word forms, next the word
                            types related diachronically or that are possibly divergent but accepted word variants and, finally, the
                            incredible diversity of related erratic word forms misrecognized by the digitization processes. Numerical
                            suffixes identify the word clusters and each unique word form in the cluster.
                                <br />
                            Each word type is assigned a a word label which is a multi-segmented code.
                                <ul>
                                <li>
                                    The first three segments (codes Z, Y and X) identify the morphological paradigm and subclass of the word type.
                                    </li>
                                <li>
                                    The fourth segment (code W) identifies the cluster around the word types’ contemporary lemma.
                                    </li>
                                <li>
                                    The fifth segment identifies the class of the word type:
                                    lemma,morphologically related contemporary form, attested modern typo,diachronic form, surname or first or place name.
                                        <br />
                                    In this segment we have the following codes (the numbers denote the position in the code, i.e. each code in this segment consists of just three capitalized letters):
                                        <ol>
                                        <li> <br />
                                            H : Humanly attested. Usually applies to correct Dutch words , either synchronic or diachronic, obtained from lexica or name lists that were compiled by specialists. Also applies to a listed of attested typos, that were manually collected from Dutch newspapers printed in 2002, informally called the 'Twente Corpus 2002'.
                                                <br />
                                            A : Automatically collected or derived. Usually the result of OCR (Optical Character Recognition) or HTR (Handwritten Text Recognition) post-correction by means of TICCL. May later be humanly attested after which it may or should be modified into 'H'.
                                            </li>
                                        <li> <br />
                                            C : Contemporary, i.e. being in the current spelling
                                                <br />
                                            D : Diachronic, i.e. being a historical spelling variant of the contemporary lemma to which it is linked by the Word Label.
                                            </li>
                                        <li><br />
                                            L : Lemma. These are currently all C or Contemporary forms.<br />
                                            M : Morphological variant. We do not currently discern between various types of morphological variants other than lemmata.<br />
                                            S : Surname or family name or last name.<br />
                                            F : First name or given name.<br />
                                            P : Place name or equivalent denotation for a particular location.<br />
                                            B : 'Boat'. The name of a ship or other vessel.<br />
                                        </li>
                                    </ol>
                                </li>
                                <li>
                                    The last segment, if present, identifies and numbers the non-word variants of the preceding label segments created by e.g. OCR.
                                    </li>
                            </ul>
                            <span><strong>Word token</strong><br />
                                We call the word forms as we encounter them in running text 'word tokens'.
                                </span><br />
                            <span><strong>Word type</strong><br />
                                When one calculates how often a particular word form occurs in running text, one in fact builds a list of the word types in the text. For each word type in the word frequency list, the absolute word frequency is then stated. See: word frequency list.
                                </span><br />
                            <p id="zipfslaw"><strong >Zipf's law</strong><br />
                                Zipf's law  is named after the linguist George Kingsley Zipf, who first proposed this empirical law. Zipf's law states that given a large sample of words, the frequency of any word type in the sample is inversely proportional to its rank in the frequency list derived from the sample, where rank is the word type's sequence number in the list sorted descendingly by frequency.
                                </p>
                        </Typography>
                    </GlossaryDescription>
                    <GlossaryDescription title="Horizon" >
                        <Typography component="p" variant="body2" id="horizon">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </Typography>
                    </GlossaryDescription>
                    <GlossaryDescription title="Paradigm network" >
                        <Typography component="p" variant="body2" id="Paradigm network">
                            The paradigm network shows the network of paradigms around the items in the shopping bag. It does so by drawing
                            the selected wordforms, and at most 50 values around it that differ only by the 'V'-code (black items), and at
                            most 50 items that differ only by 'X'-code (red circles), and for each of those also items that differ
                            only by the 'V'-code.

                            Each item can be clicked to show the variants for that paradigm (items with a different 'V'-code). Everything can
                            be zoomed using the scroll wheel, or panned by dragging the mouse.
                            </Typography>
                    </GlossaryDescription>
                </Paper>
            </Grid>
        </Grid>
    )

}

export default glossary;
