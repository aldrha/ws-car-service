import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from "@nestjs/common";
import { Prisma } from "@prisma/client";


@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    private readonly logger = new Logger(AllExceptionsFilter.name);

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message: string | object = 'Internal server error';

        // 1. Manejo de Errores de Prisma (Base de Datos)
        if (exception instanceof Prisma.PrismaClientKnownRequestError) {
            switch (exception.code) {
                case 'P2002': // Violación de restricción única (ej: email duplicado)
                    status = HttpStatus.CONFLICT;
                    // Extraemos el campo que falló para ser específicos
                    const target = exception.meta?.target as string[];
                    message = `El valor ingresado para el campo ${target ? target.join(', ') : ''} ya existe.`;
                    break;
                case 'P2025': // Registro no encontrado
                    status = HttpStatus.NOT_FOUND;
                    message = 'El registro solicitado no existe.';
                    break;
                default:
                    // Otros errores de base de datos se quedan como 500 pero se loguean
                    this.logger.error(`Prisma Error: ${exception.code}`, exception.stack);
                    break;
            }
        }
        // 2. Manejo de Errores HTTP (NestJS, ValidationPipe)
        else if (exception instanceof HttpException) {
            status = exception.getStatus();
            const exceptionResponse = exception.getResponse();

            // Si es un error de validación (array de strings), lo mostramos limpio
            message = typeof exceptionResponse === 'object' && 'message' in exceptionResponse
                ? (exceptionResponse as any).message
                : exceptionResponse;
        }
        // 3. Errores Genéricos
        else {
            this.logger.error('Unhandled Error', exception instanceof Error ? exception.stack : exception);
        }

        // Respuesta JSON Estandarizada
        response.status(status).json({
            statusCode: status,
            message: message,
            error: HttpStatus[status], // Ej: "Conflict", "Bad Request"
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }
}