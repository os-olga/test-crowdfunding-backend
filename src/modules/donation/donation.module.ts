import { CampaignModule } from 'src/modules/campaign/campaign.module';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DonationController } from './controllers/donation.controller';
import { DonationEntity } from './entities/donation.entity';
import { FraudModule } from '../fraud/fraud.module';

import { DonationService } from './services/donation.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([DonationEntity]),
    CampaignModule,
    FraudModule,
  ],
  controllers: [DonationController],
  providers: [DonationService],
  exports: [DonationService],
})
export class DonationModule {}
