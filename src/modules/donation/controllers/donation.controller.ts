import { Body, Controller, Post } from '@nestjs/common';
import { CreateDonationDto } from '../dto/create-donation.dto';

import { DonationService } from '../services/donation.service';

@Controller('donations')
export class DonationController {
  constructor(private readonly donatorService: DonationService) {}

  @Post()
  async create(@Body() body: CreateDonationDto) {
    return await this.donatorService.create(body);
  }
}
