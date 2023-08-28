export const ENVIROMENT = process.env.ENVIROMENT || 'develop'
export const develop = ENVIROMENT?.toLowerCase() === 'develop'
export const staging = ENVIROMENT?.toLowerCase() === 'staging'

export const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID
export const FIREBASE_PRIVATE_KEY = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
export const FIREBASE_CLIENT_EMAIL = process.env.FIREBASE_CLIENT_EMAIL