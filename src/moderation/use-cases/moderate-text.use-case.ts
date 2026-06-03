import { Injectable } from "@nestjs/common"
import { ProhibitedWordRepository } from "@/moderation/domain/repositories/prohibited-word.repository"

export type ModerationResult = {
    approved: boolean
    reason?: string
    category?: string
}

const buildFuzzyRegex = (word: string) => {
    const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    return new RegExp(escaped.split("").join("[^a-zA-Z0-9]*"), "gi")
}

@Injectable()
export class ModerateTextUseCase {
    constructor(
        private readonly prohibitedWordRepository: ProhibitedWordRepository,
    ) {}

    async execute(text: string): Promise<ModerationResult> {
        const words = await this.prohibitedWordRepository.findAll()

        for (const pw of words) {
            const regex = buildFuzzyRegex(pw.word)
            if (regex.test(text)) {
                return {
                    approved: false,
                    reason: `Contiene palabra prohibida: "${pw.word}"`,
                    category: pw.category,
                }
            }
        }

        return { approved: true }
    }
}
