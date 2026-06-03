import { Injectable } from "@nestjs/common"
import {
    ProhibitedWord,
    ProhibitedWordRepository,
} from "@/moderation/domain/repositories/prohibited-word.repository"

@Injectable()
export class FindAllProhibitedWordsUseCase {
    constructor(
        private readonly prohibitedWordRepository: ProhibitedWordRepository,
    ) {}

    execute(): Promise<ProhibitedWord[]> {
        return this.prohibitedWordRepository.findAll()
    }
}
