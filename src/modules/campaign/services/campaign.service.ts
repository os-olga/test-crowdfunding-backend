import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCampaignDto } from '../dto/create-campaign.dto';
import { CampaignEntity } from '../entities/campaigns.entity';
import { ECampaignStatus } from '../enums/campaign-status.enum';

@Injectable()
export class CampaignService {
  constructor(
    @InjectRepository(CampaignEntity)
    private campaignRepository: Repository<CampaignEntity>,
  ) {}

  async create(body: CreateCampaignDto): Promise<CampaignEntity> {
    const query = `
    INSERT INTO campaigns (name, description, goal, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?)
  `;
    const parameters = [
      body.name,
      body.description,
      body.goal,
      new Date(),
      new Date(),
    ];

    try {
      await this.campaignRepository.query(query, parameters);
      const createdCampaign = new CampaignEntity();
      createdCampaign.name = body.name;
      createdCampaign.description = body.description;
      createdCampaign.goal = body.goal;
      createdCampaign.status = ECampaignStatus.ACTIVE;
      createdCampaign.created_at = new Date();
      createdCampaign.updated_at = new Date();

      return createdCampaign;
    } catch (error) {
      throw new Error(`Failed to create campaign: ${error.message}`);
    }
  }

  async findAll(): Promise<CampaignEntity[]> {
    return await this.campaignRepository.query('SELECT * FROM campaigns');
  }

  async findAllActive(): Promise<CampaignEntity[]> {
    return await this.campaignRepository.query(
      `SELECT * FROM campaigns WHERE status = active`,
    );
  }

  async byId(id: number): Promise<CampaignEntity> {
    const result = await this.campaignRepository.query(
      `SELECT * FROM campaigns WHERE id = ${id}`,
    );

    const campaign = result[0];

    return campaign;
  }

  async makeFraudCampaign(campaignId: number): Promise<CampaignEntity> {
    const updateCampaignQuery = `UPDATE campaigns SET status = ?, updated_at = ? WHERE id = ?`;
    return await this.campaignRepository.query(updateCampaignQuery, [
      ECampaignStatus.FRAUD,
      new Date(),
      campaignId,
    ]);
  }

  async updateCampaignBalance(
    sum: number,
    campaignStatus: string,
    campaignId: number,
  ): Promise<CampaignEntity> {
    const updateCampaignBalanceQuery = `
      UPDATE campaigns
      SET balance = ?, status = ?, updated_at = ?
      WHERE id = ?
    `;

    return await await this.campaignRepository.query(
      updateCampaignBalanceQuery,
      [sum, campaignStatus, new Date(), campaignId],
    );
  }
}
