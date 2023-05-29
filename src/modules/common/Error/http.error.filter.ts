import {
  Catch,
  ExceptionFilter,
  HttpException,
  ArgumentsHost,
  Logger,
} from '@nestjs/common';

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const status = Object.values(exception)[0];

    console.log({ status: status, exception });

    let statusCode = status.statusCode;
    if (status === 'SequelizeUniqueConstraintError') {
      statusCode = 409;
    }

    const erroResponse = {
      statusCode: statusCode,
      code: exception,
      timeStamp: new Date().toLocaleDateString(),
      path: request.url,
      method: request.method,
      message: exception.message,
      status: status,
    };

    Logger.error(
      `${request.method} ${request.url}`,
      JSON.stringify(erroResponse),
      'ExceptionFilter',
    );

    return response.status(statusCode).json(erroResponse);
  }
}
