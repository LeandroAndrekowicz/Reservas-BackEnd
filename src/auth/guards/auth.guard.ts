import { CanActivate, ExecutionContext, Injectable, UseGuards, createParamDecorator } from "@nestjs/common";
import { AuthService } from "../service/auth.service";
import { Request } from "express";


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;     
    const payloadDto = await this.authService.extractToken(authorization);
    (request as any).tokenPayload = payloadDto;   
    return true;
  }
}

    /** Decorador para proteger uma rota, exigindo JWT. O payload pode ser acessado com `@TokenPayload`. **/
    export function RequireAuth() {
        return UseGuards(AuthGuard);
    }

    /** Decorador para extrair a `request.tokenPayload`. **/
    export const TokenPayload = createParamDecorator(
        (data: unknown, context: ExecutionContext) =>
          context.switchToHttp().getRequest().tokenPayload
    );