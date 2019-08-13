export interface ICorpora {
    frequencies: Array<ICorpusFrequencyEntry>,
    name: ''
}
export interface IMetadata {
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
    year: ''
}

export interface ICorpus {
    frequencies: Array<ICorpusFrequencyEntry>,
    name: ''
}

export interface IVariant {
    V: 1,
    corpora: Array<ICorpus>,
    word_type_code: string,
    word_type_number: number,
    wordform: string
}

export interface ILemma {
    lemma: string,
    paradigm_code: string,
    variants: Array<IVariant>
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
    paradigms: Array<ILemma>,
    wordform: string
}

export interface IFrequency {
    freq: number,
    year: number,
}