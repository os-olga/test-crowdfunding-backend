import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FraudEntity } from '../entities/fraud.entity';

@Injectable()
export class FraudService {
  constructor(
    @InjectRepository(FraudEntity)
    private readonly fraudRepository: Repository<FraudEntity>,
  ) {}

  async isFraud(nickname: string) {
    const query = `SELECT COUNT(*) as count FROM fraud WHERE nickname = ?`;
    const result = await this.fraudRepository.query(query, [nickname]);
    const count = result[0].count;
    return count > 0;
  }

  async makeFraud(nickname: string) {
    const isFraud = await this.isFraud(nickname);
    if (!isFraud) {
      const query = `INSERT INTO fraud (nickname) VALUES (?)`;
      await this.fraudRepository.query(query, [nickname]);
    }
    return { ok: 1 };
  }
}
