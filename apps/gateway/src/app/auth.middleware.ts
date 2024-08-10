import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.headers['accesstoken'] as string;
    const refreshToken = req.headers['refreshtoken'] as string;

    if (!accessToken || !refreshToken) {
      throw new UnauthorizedException('Access token or refresh token missing');
    }

    try {
      const decodedAccessToken = this.jwtService.verify(accessToken, {
        secret: process.env.ACCESS_TOKEN_SECRET,
      });

      const decodedRefreshToken = this.jwtService.verify(refreshToken, {
        secret: process.env.REFRESH_TOKEN_SECRET,
      });

      // Attach user information to request object if needed
      req['user'] = decodedAccessToken;
      req['refreshToken'] = decodedRefreshToken;

      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
