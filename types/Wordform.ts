

export interface ICorpora {
    frequencies: IFrequency[],
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
export interface IFrequency {
    freq: number,
    year: number,
}