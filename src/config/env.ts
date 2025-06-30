// Environment variable validation and typing
export const env = {
supabase: {
  url: import.meta.env.VITE_SUPABSE_URL,
  anonKey: import.meta.env.VITE_SUPABSE_ANON_KEY,
},
app: {
  name: import.meta.env.VITE_APP_NAME || 'GLOSHEN',
  version: import.meta.env.VITE_APP_VERSION || '1.0.0',
  environment: import.meta.env.MODE || 'development',
}
} as const

// Validation
const requiredEnvVars = [
  env.supabase.url,
  env.supabase.anonKey,
]

requiredEnvVars.forEach((envVar, index) => {
  if (!envVar) {
    const varNames = ['VITE_SUPABASE_URL', 'VITE_SUPABASE_ANON_KEY']
    throw new Error('Missing required environment variable: ${varNames[index]}')
  }
})
