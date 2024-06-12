import { Controller, Get, Request, UseGuards } from '@nestjs/common';

import { UserService } from 'src/user/user.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthenticatedRequest } from './request.type';

@Controller('/v1/auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  profile(@Request() req: AuthenticatedRequest) {
    const user = req.user;
    return user;
  }
}
