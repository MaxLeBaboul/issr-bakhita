import { Controller, Get, Post, Body, Headers } from '@nestjs/common';
import { UsersService, CreateUserDto } from './users.service';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Post()
  async create(
    @Body() dto: CreateUserDto,
    @Headers('x-user-role') headerRole?: string,
  ) {
    const actorRole = headerRole || 'admin';
    return this.usersService.createUser(dto, actorRole);
  }
}
