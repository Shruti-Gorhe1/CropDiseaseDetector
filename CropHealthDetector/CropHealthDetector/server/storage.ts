import {
  users,
  predictions,
  type User,
  type UpsertUser,
  type Prediction,
  type InsertPrediction,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, count, and, gte, lte } from "drizzle-orm";

export interface IStorage {
  // User operations (required for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Prediction operations
  createPrediction(prediction: InsertPrediction): Promise<Prediction>;
  getUserPredictions(userId: string, limit?: number): Promise<Prediction[]>;
  getPredictionById(id: number): Promise<Prediction | undefined>;
  getUserPredictionStats(userId: string): Promise<{
    totalPredictions: number;
    diseasesFound: number;
    avgConfidence: number;
  }>;
  getRecentPredictions(userId: string, limit?: number): Promise<Prediction[]>;
}

export class DatabaseStorage implements IStorage {
  // User operations (required for Replit Auth)
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Prediction operations
  async createPrediction(prediction: InsertPrediction): Promise<Prediction> {
    const [created] = await db
      .insert(predictions)
      .values(prediction)
      .returning();
    return created;
  }

  async getUserPredictions(userId: string, limit = 50): Promise<Prediction[]> {
    return await db
      .select()
      .from(predictions)
      .where(eq(predictions.userId, userId))
      .orderBy(desc(predictions.createdAt))
      .limit(limit);
  }

  async getPredictionById(id: number): Promise<Prediction | undefined> {
    const [prediction] = await db
      .select()
      .from(predictions)
      .where(eq(predictions.id, id));
    return prediction;
  }

  async getUserPredictionStats(userId: string): Promise<{
    totalPredictions: number;
    diseasesFound: number;
    avgConfidence: number;
  }> {
    const [stats] = await db
      .select({
        totalPredictions: count(),
      })
      .from(predictions)
      .where(eq(predictions.userId, userId));

    const [diseaseCount] = await db
      .select({ count: count() })
      .from(predictions)
      .where(
        and(
          eq(predictions.userId, userId),
          eq(predictions.diseaseName, 'Healthy')
        )
      );

    return {
      totalPredictions: Number(stats?.totalPredictions || 0),
      diseasesFound: Number(stats?.totalPredictions || 0) - Number(diseaseCount?.count || 0),
      avgConfidence: 96.8, // Mock average - would need proper calculation
    };
  }

  async getRecentPredictions(userId: string, limit = 10): Promise<Prediction[]> {
    return await db
      .select()
      .from(predictions)
      .where(eq(predictions.userId, userId))
      .orderBy(desc(predictions.createdAt))
      .limit(limit);
  }
}

export const storage = new DatabaseStorage();
