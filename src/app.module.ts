import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ormconfig } from './db/data-source';
import { CampaignModule } from './modules/campaign/campaign.module';
import { DonationModule } from './modules/donation/donation.module';
import { FraudModule } from './modules/fraud/fraud.module';

@Module({
  imports: [
    CampaignModule,
    DonationModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(ormconfig),
    FraudModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
