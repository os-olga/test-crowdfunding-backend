import { IsEnum, IsNumber, IsString, IsOptional } from 'class-validator';

import { ECampaignStatus } from '../enums/campaign-status.enum';

export class CreateCampaignDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  goal: number;

  @IsEnum(ECampaignStatus)
  @IsOptional()
  status: string;
}
