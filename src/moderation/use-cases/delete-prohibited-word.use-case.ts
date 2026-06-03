import { Injectable } from "@nestjs/common"
import {
    ProhibitedWord,
    ProhibitedWordRepository,
} from "@/moderation/domain/repositories/prohibited-word.repository"

@Injectable()
export class DeleteProhibitedWordUseCase {
    constructor(
        private readonly prohibitedWordRepository: ProhibitedWordRepository,
    ) {}

    execute(id: string): Promise<ProhibitedWord> {
        return this.prohibitedWordRepository.delete(id)
    }
}
