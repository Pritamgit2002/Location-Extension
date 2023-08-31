declare global{
    namespace NodeJS{
        interface ProcessEnv{
            IPINFO_TOKEN:string;
            NODE_ENV: "development"| "production";
        }
    }
}
export {};