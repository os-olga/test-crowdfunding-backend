import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'frauds' })
export class FraudEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nickname: string;
}
