export interface ProhibitedWord {
    id: string
    word: string
    category: string
    createdAt: Date
}

export interface CreateProhibitedWordData {
    word: string
    category: string
}

export abstract class ProhibitedWordRepository {
    abstract findAll(): Promise<ProhibitedWord[]>
    abstract create(data: CreateProhibitedWordData): Promise<ProhibitedWord>
    abstract delete(id: string): Promise<ProhibitedWord>
}
