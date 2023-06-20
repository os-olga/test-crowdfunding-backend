import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FraudEntity } from './entities/fraud.entity';
import { FraudController } from './fraud.controller';

import { FraudService } from './services/fraud.service';

@Module({
  imports: [TypeOrmModule.forFeature([FraudEntity])],
  controllers: [FraudController],
  providers: [FraudService],
  exports: [FraudService],
})
export class FraudModule {}
