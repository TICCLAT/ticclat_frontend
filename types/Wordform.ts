export interface ICorpora {
    frequencies: ICorpusFrequencyEntry[],
    name: '',
    total_number_of_words: number,
}
export interface IMetadata {
    max_term_freq: number,
    min_term_freq: number,
    min_corpus_rel_freq: number,
    max_corpus_rel_freq: number,
    max_freq: number,
    max_year: number,
    min_freq: number,
    min_year: number
}
export interface IData {
    corpora: Array<ICorpora>,
    metadata: IMetadata,
    wordform: string
}

export interface ICorpusFrequencyEntry {
    freq: number,
    term_frequency: number,
    total: number,
    year: string
}

export interface ICorpus {
    frequencies: ICorpusFrequencyEntry[],
    name: string
}

export interface IVariant {
    V: 1,
    corpora: ICorpus[],
    frequency: number,
    word_type_code: string,
    word_type_number: number,
    wordform: string
}

export interface ILemma {
    lemma: string,
    paradigm_code: string,
    variants: IVariant[]
}

export interface ICorrections {
    wordform: string,
    frequency: number,
    // xyzw: number, 
    levenshtein_distance: number,
    // anahash: number, 
    // wordlengthdiff: number, 
    // children: Array<ISlt>
}

export interface IVariantsMetadata {
    max_freq: number,
    max_year: number,
    min_freq: number,
    min_year: number,
    overall_max_year: number,
    overall_min_year: number
}

export interface IVariantsQueryData {
    metadata: IVariantsMetadata,
    paradigms: ILemma[],
    wordtype: string
}

export interface ICorrectionsQueryData {
    metadata: IVariantsMetadata,
    paradigms: ILemma[],
    wordform: string,
    corrections: ICorrections[]
}

export interface IFrequency {
    freq: number,
    year: number,
}