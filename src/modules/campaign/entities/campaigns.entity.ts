import { DonationEntity } from 'src/modules/donation/entities/donation.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ECampaignStatus } from '../enums/campaign-status.enum';

@Entity('campaigns')
export class CampaignEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: 0 })
  goal: number;

  @Column({ default: 0 })
  balance: number;

  @Column({
    type: 'enum',
    enum: ECampaignStatus,
    default: ECampaignStatus.ACTIVE,
  })
  status: ECampaignStatus;

  @OneToMany(() => DonationEntity, (donation) => donation.campaign)
  donations: DonationEntity[];

  @Column({ nullable: true, default: null })
  created_at: Date;

  @Column({ nullable: true })
  updated_at: Date;
}
