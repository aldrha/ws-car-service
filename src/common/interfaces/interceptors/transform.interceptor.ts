import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { ApiResponse } from "../response.interface";
import { map, Observable } from "rxjs";


@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {

    intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();


        return next.handle().pipe(
            map((data) => ({
                statusCode: response.statusCode, // Toma el código HTTP real (200, 201)
                message: data?.message || 'Operation successful', // Mensaje por defecto o personalizado
                data: data?.result || data || null, // Maneja si devuelves {result: ...} o datos directos
                timestamp: new Date().toISOString(),
                path: request.url,
            })),
        );


    }

}