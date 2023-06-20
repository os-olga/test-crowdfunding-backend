import { CampaignEntity } from 'src/modules/campaign/entities/campaigns.entity';
import { ECampaignStatus } from 'src/modules/campaign/enums/campaign-status.enum';
import { CampaignService } from 'src/modules/campaign/services/campaign.service';
import { FraudService } from 'src/modules/fraud/services/fraud.service';
import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDonationDto } from '../dto/create-donation.dto';
import { DonationEntity } from '../entities/donation.entity';
import { DonationEnum } from '../enums/donation-status.enum';

@Injectable()
export class DonationService {
  constructor(
    @InjectRepository(DonationEntity)
    private donationRepository: Repository<DonationEntity>,
    private campaignService: CampaignService,
    private fraudService: FraudService,
  ) {}

  async create(body: CreateDonationDto) {
    try {
      const isFraudUser = await this.fraudService.isFraud(body.nickname);
      let fraudCampaign = null;
      if (isFraudUser) {
        fraudCampaign = await this.campaignService.makeFraudCampaign(
          body.campaignId,
        );
      }

      const { campaignId, amount, nickname } = body;
      const newDonation = await this.insert({ campaignId, amount, nickname });

      if (campaignId) {
        const foundCampaign = await this.campaignService.byId(campaignId);
        const sum = Number(foundCampaign.balance) + Number(amount);
        if (
          sum >= foundCampaign.goal &&
          foundCampaign.status !== ECampaignStatus.FRAUD
        ) {
          await this.campaignService.updateCampaignBalance(
            sum,
            ECampaignStatus.SUCCESSFUL,
            campaignId,
          );
        }
        if (
          sum <= foundCampaign.goal &&
          foundCampaign.status !== ECampaignStatus.FRAUD
        ) {
          await this.campaignService.updateCampaignBalance(
            sum,
            ECampaignStatus.ACTIVE,
            campaignId,
          );
        }
      }

      return { newDonation, fraudCampaign };
    } catch (error) {
      console.log(error);
    }
  }

  async insert(body: CreateDonationDto) {
    const query = `INSERT INTO donations (campaignId, amount, nickname, status, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?)`;

    const parameters = [
      body.campaignId,
      body.amount,
      body.nickname,
      DonationEnum.VALID,
      new Date(),
      new Date(),
    ];

    try {
      await this.donationRepository.query(query, parameters);
      const createdDonation = new DonationEntity();
      createdDonation.campaign = { id: body.campaignId } as CampaignEntity;
      createdDonation.amount = body.amount;
      createdDonation.nickname = body.nickname;
      createdDonation.status = DonationEnum.VALID;
      createdDonation.created_at = new Date();
      createdDonation.updated_at = new Date();

      return createdDonation;
    } catch (error) {
      console.log(error);
    }
  }

  async byNickname(nickname: string) {
    const res = await this.donationRepository.query(
      `SELECT * FROM donators WHERE nickname=${nickname}`,
    );
    return res;
  }
}
