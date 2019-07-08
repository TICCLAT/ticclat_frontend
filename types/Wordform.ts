export interface ICorpora {
    frequencies: [],
    name: ''
}
export interface IMetadata {
    max_freq: string,
    max_year: string,
    min_freq: string,
    min_year: string
}
export interface IData {
    corpora: Array<ICorpora>,
    metadata: IMetadata,
    wordform: string
}