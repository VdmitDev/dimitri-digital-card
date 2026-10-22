import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// @Global позволяет модулям функциональности внедрять PrismaService,
// не импортируя PrismaModule каждый раз.
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
