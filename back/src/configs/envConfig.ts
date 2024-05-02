export const envConfig = (): { [key: string]: string } => {
  const config = {
    port: process.env.PORT as string,
    secretKey: process.env.JWT_SECRET_KEY as string,

    dbPassword: process.env.DB_PASSWORD as string,
    dbUsername: process.env.DB_USERNAME as string,
    dbName: process.env.DB_NAME as string,
  }

  return config
}

export const CORS_ORIGINS = [
  'http://localhost:2000',
  'https://admin.socket.io',
  'http://85.215.241.88',
  'http://216.225.197.89',
]
