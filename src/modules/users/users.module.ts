import { Module } from "@nestjs/common";
import { UserController } from "./users.controller";
import { UserService } from "./users.service";
import { Users } from "./models";
import { SequelizeModule } from "@nestjs/sequelize";
import { UploadService } from "../upload";


@Module({
  imports: [SequelizeModule.forFeature([Users])],
  controllers: [UserController],
  providers: [UserService,UploadService],
})
export class UsersModule {}
