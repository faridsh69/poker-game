export const envConfig = (): { [key: string]: string } => {
  const config = {
    port: process.env.PORT as string,
    secretKey: process.env.JWT_SECRET_KEY as string,
    privateKey: Buffer.from(process.env.JWT_PRIVATE_KEY as string, 'base64').toString('ascii'),
    publicKey: process.env.JWT_PUBLIC_KEY as string,
  }

  return config
}

export const CORS_ORIGINS = ['http://localhost:2000', 'https://admin.socket.io', 'http://85.215.241.88']
