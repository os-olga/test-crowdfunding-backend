import { CampaignEntity } from 'src/modules/campaign/entities/campaigns.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { DonationEnum } from '../enums/donation-status.enum';

@Entity('donations')
export class DonationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  nickname?: string;

  @Column({ default: 0 })
  amount: number;

  @Column({ type: 'enum', enum: DonationEnum, default: DonationEnum.VALID })
  status: DonationEnum;

  @ManyToOne(() => CampaignEntity)
  campaign: CampaignEntity;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
