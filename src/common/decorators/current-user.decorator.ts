import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  if (request?.user) {
    return request.user;
  }

  const gqlContext = ctx.getArgByIndex(2);
  return gqlContext?.req?.user;
});
