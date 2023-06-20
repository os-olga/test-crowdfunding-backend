import { Controller } from '@nestjs/common';
import { FraudService } from './services/fraud.service';

@Controller('fraud')
export class FraudController {
  constructor(private readonly fraudService: FraudService) {}
}
