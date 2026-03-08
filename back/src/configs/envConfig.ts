export const envConfig = () => {
  const config = {
    port: process.env.PORT as string,
    secretKey: process.env.JWT_SECRET_KEY as string,

    dbHost: process.env.DB_HOST as string,
    dbPort: process.env.DB_PORT as any as number,
    dbPassword: process.env.DB_PASSWORD as string,
    dbUsername: process.env.DB_USERNAME as string,
    dbName: process.env.DB_NAME as string,

    // @ts-ignore
    hashSalt: +process.env.HASH_SALT as string,
  }

  return config
}

export const CORS_ORIGINS = [
  'http://localhost:2000',
  'https://admin.socket.io',
  'http://85.215.241.88',
  'http://216.225.197.89',
]
