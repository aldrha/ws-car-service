import { ConflictException, Injectable } from '@nestjs/common';
import { BcryptService } from 'src/common/services/bcrypt.service'; // O la interfaz
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterUserDto } from './dto/register-user.dto'; // Ya lo creamos antes

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hashingService: BcryptService,
  ) {}

  async create(dto: RegisterUserDto) {
    // 1. Verificar si el usuario ya existe (Email o Teléfono)
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: dto.email }, { phone: dto.phone }],
      },
    });

    if (existingUser) {
      throw new ConflictException('El correo o teléfono ya están registrados');
    }

    // 2. Hashear la contraseña (SOLID: Delegamos la responsabilidad)
    const hashedPassword = await this.hashingService.hash(dto.password);

    // 3. Crear el usuario
    const newUser = await this.prisma.user.create({
      data: {
        ...dto,
        password: hashedPassword,
        isVerified: false, // Por defecto no verificado hasta el OTP
      },
    });

    // 4. Retornar el usuario SIN la contraseña (Seguridad)
    const { password, ...result } = newUser;
    return result;
  }

  // Método auxiliar para buscar por email (lo usaremos en el Login)
  async findOneByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }
}
