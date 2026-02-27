import { Controller, Get, Param, Query } from '@nestjs/common';
import { AffiliateService } from './affiliate.service';

@Controller('affiliate')
export class AffiliateController {
    constructor(private readonly affiliateService: AffiliateService) { }

    @Get(':id')
    async getTree(
        @Param('id') id: string,
        @Query('level') level?: string,
    ) {
        const maxLevel = level ? parseInt(level) : 3;

        return this.affiliateService.getAffiliateTree(
            parseInt(id),
            maxLevel,
        );
    }
}