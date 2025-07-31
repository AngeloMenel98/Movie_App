import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Username should not be empty' })
  @Length(1, 50, { message: 'Username must be between 1 and 50 characters' })
  username: string;

  @IsString()
  @IsNotEmpty({ message: 'Password should not be empty' })
  @Length(8, 20, { message: 'Password must be between 8 and 20 characters' })
  password: string;

  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email should not be empty' })
  @IsString()
  email: string;
}

export class LoginUserDTO {
  @IsString()
  @Length(1, 50, { message: 'Username must be between 1 and 50 characters' })
  username: string;

  @IsEmail({}, { message: 'Invalid email format' })
  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password should not be empty' })
  @Length(8, 20, { message: 'Password must be between 8 and 20 characters' })
  password: string;
}
