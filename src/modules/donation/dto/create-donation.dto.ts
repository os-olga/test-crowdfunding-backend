import { IsNumber, IsString, Matches, Min } from 'class-validator';

export class CreateDonationDto {
  @IsString()
  @Matches(/^[a-zA-Z\d_]+$/)
  nickname: string;

  @IsNumber()
  @Min(1)
  amount: number;

  @IsNumber()
  @Min(1)
  campaignId: number;
}
