import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as Joi from 'joi';

type envKeys =
  | 'MONGO_URI'
  | 'REDIS_URI'
  | 'ROOT_USER_EMAIL'
  | 'ROOT_USER_DEFAULT_PASSWORD';

type Config = { [key in envKeys]: string };

@Injectable()
export class ConfigService {
  private readonly config: Config;

  constructor() {
    const envConfig = dotenv.parse(fs.readFileSync('.env'));
    this.config = this.validateEnvConfigs(envConfig) as Config;
  }

  validateEnvConfigs(envConfig: dotenv.DotenvParseOutput) {
    const envSchema: Joi.ObjectSchema = Joi.object({
      MONGO_URI: Joi.string().required(),
      REDIS_URI: Joi.string().required(),
      ROOT_USER_EMAIL: Joi.string().email(),
      ROOT_USER_DEFAULT_PASSWORD: Joi.string().required(),
    });
    const { error, value: validateConfig } = Joi.validate(envConfig, envSchema);
    if (error) {
      throw new Error(`Config Error: ${error.message}`);
    }
    return validateConfig;
  }

  get(key: envKeys) {
    return this.config[key];
  }

  getRootAccount() {
    return {
      email: this.config.ROOT_USER_EMAIL,
      password: this.config.ROOT_USER_DEFAULT_PASSWORD,
      firstName: 'Administrator',
      lastName: 'Sneaker',
      address: 'Sneaker shop',
      phone: '123456789',
    };
  }
}
