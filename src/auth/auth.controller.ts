import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { UserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthenticatedRequest } from './request.type';

@Controller('/v1/auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  profile(@Request() req: AuthenticatedRequest) {
    const user = req.user;
    return user;
  }

  @Post('login')
  async login(@Body() authDto: AuthDto) {
    const user = await this.userService.findByGoogleId(authDto.googleId);

    if (user) {
      return this.authService.generateToken(new UserDto(user));
    } else {
      const newUser = await this.userService.create(authDto);
      return this.authService.generateToken(new UserDto(newUser));
    }
  }
}
