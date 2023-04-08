import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { LoginDTO, RegisterDTO } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/session')
  @HttpCode(200)
  login(@Body(ValidationPipe) credentials: LoginDTO) {
    console.log({ credentials });
    return this.authService.login(credentials);
  }

  @Post('/register')
  @HttpCode(201)
  register(@Body(ValidationPipe) credentials: RegisterDTO) {
    return this.authService.register(credentials);
  }

  @Get('/me')
  @UseGuards(AuthGuard())
  @HttpCode(200)
  me(@Req() request: any) {
    return this.authService.me({ email: request.user.email });
  }
}
