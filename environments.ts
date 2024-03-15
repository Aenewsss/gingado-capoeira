export const environments = {

    API_URL: process.env.NODE_ENV == "production" ? process.env.NEXT_PUBLIC_API_PROD_URL : process.env.NEXT_PUBLIC_API_DEV_URL

}