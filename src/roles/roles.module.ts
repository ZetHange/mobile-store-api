import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/models/users.model';
import { Role } from './models/roles.model';
import { UserRoles } from './models/user-roles.model';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [SequelizeModule.forFeature([Role, User, UserRoles])],
  exports: [RolesService]
})
export class RolesModule {}
