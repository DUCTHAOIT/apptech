import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class AffiliateService {
    constructor(private dataSource: DataSource) { }

    async getAffiliateTree(userId: number, maxLevel = 3) {
        const result = await this.dataSource.query(
            `
      WITH RECURSIVE tree AS (
        
        -- Level 1
        SELECT 
          userId,
          name,
          email,
          createdAt,
          referralId,
          1 as level
        FROM users
        WHERE referralId = ?

        UNION ALL

        -- Level tiếp theo
        SELECT 
          u.userId,
          u.name,
          u.email,
          u.createdAt,
          u.referralId,
          t.level + 1
        FROM users u
        INNER JOIN tree t ON u.referralId = t.userId
        WHERE t.level < ?
      )

      SELECT * FROM tree
      ORDER BY level, createdAt DESC;
      `,
            [userId, maxLevel],
        );

        return result;
    }
}