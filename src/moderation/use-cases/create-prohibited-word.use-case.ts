import { Injectable } from "@nestjs/common"
import {
    ProhibitedWord,
    ProhibitedWordRepository,
} from "@/moderation/domain/repositories/prohibited-word.repository"

@Injectable()
export class CreateProhibitedWordUseCase {
    constructor(
        private readonly prohibitedWordRepository: ProhibitedWordRepository,
    ) {}

    execute(word: string, category: string): Promise<ProhibitedWord> {
        return this.prohibitedWordRepository.create({ word, category })
    }
}
