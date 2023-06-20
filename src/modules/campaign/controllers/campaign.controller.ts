import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateCampaignDto } from '../dto/create-campaign.dto';
import { CampaignEntity } from '../entities/campaigns.entity';

import { CampaignService } from '../services/campaign.service';

@Controller('campaigns')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @Get()
  async findAll(): Promise<CampaignEntity[]> {
    return await this.campaignService.findAll();
  }

  @Get('active')
  async findAllActive(): Promise<CampaignEntity[]> {
    return await this.campaignService.findAllActive();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<CampaignEntity> {
    return await this.campaignService.byId(id);
  }

  @Post()
  async create(@Body() body: CreateCampaignDto): Promise<CampaignEntity> {
    return await this.campaignService.create(body);
  }
}
