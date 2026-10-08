import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import dns from "node:dns";

// Fix DNS SRV lookup on local Windows dev where default ISP DNS does not resolve mongodb+srv records
if (typeof process !== "undefined" && process.env.NODE_ENV !== "production") {
  try {
    dns.setServers(["8.8.8.8", "1.1.1.1"]);
  } catch {
    // Ignore in restricted environments
  }
}

// Direct replica set connection URI to guarantee zero DNS SRV lookup failures in serverless / cloud environments
const directReplicaUri =
  "mongodb://mahi24235001_db_user:ERuLMxUBpxYP01Ft@ac-4k3kkb3-shard-00-00.shcpuau.mongodb.net:27017,ac-4k3kkb3-shard-00-01.shcpuau.mongodb.net:27017,ac-4k3kkb3-shard-00-02.shcpuau.mongodb.net:27017/?ssl=true&replicaSet=atlas-10u5y4-shard-0&authSource=admin&appName=First";

let mongoUri = process.env.BETTER_AUTH_DB_URL || process.env.MONGODB_URI || directReplicaUri;

// If URI targets the user's cluster, prefer direct replica set URI to prevent SRV timeouts on cloud/serverless
if (!mongoUri || mongoUri.includes("first.shcpuau.mongodb.net")) {
  mongoUri = directReplicaUri;
}

// Global cached MongoClient for serverless environments (prevents connection leaks and ensures reuse)
declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: MongoClient | undefined;
}

if (!global._mongoClientPromise) {
  global._mongoClientPromise = new MongoClient(mongoUri, {
    connectTimeoutMS: 10000,
    serverSelectionTimeoutMS: 10000,
    maxPoolSize: 10,
  });
}

const client = global._mongoClientPromise;
const db = client.db("bazardor_db");

const getBaseURL = () => {
  if (process.env.BETTER_AUTH_URL) return process.env.BETTER_AUTH_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  if (process.env.NODE_ENV === "production") return "https://bazar-dor-mahi.vercel.app";
  return "http://localhost:3000";
};

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET || "th4oXXn8eqrxt4qo8Utdng9fTjnBbA0m",
  baseURL: getBaseURL(),
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? {
          google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          },
        }
      : {}),
    ...(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET
      ? {
          github: {
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
          },
        }
      : {}),
  },
  trustedOrigins: [
    "http://localhost:3000",
    "https://bazar-dor-mahi.vercel.app",
    getBaseURL(),
    ...(process.env.BETTER_AUTH_URL ? [process.env.BETTER_AUTH_URL] : []),
    ...(process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : []),
  ],
});