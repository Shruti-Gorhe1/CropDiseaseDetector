import {
  pgTable,
  text,
  varchar,
  timestamp,
  jsonb,
  index,
  serial,
  real,
  boolean,
  integer,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table (required for Replit Auth)
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table (required for Replit Auth)
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Predictions table for storing disease detection results
export const predictions = pgTable("predictions", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id),
  imageUrl: text("image_url"),
  originalFilename: varchar("original_filename"),
  diseaseName: varchar("disease_name").notNull(),
  confidence: real("confidence").notNull(),
  severity: real("severity"),
  processingTime: real("processing_time"),
  modelVersion: varchar("model_version").default("v2.1.0"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  predictions: many(predictions),
}));

export const predictionsRelations = relations(predictions, ({ one }) => ({
  user: one(users, {
    fields: [predictions.userId],
    references: [users.id],
  }),
}));

// Schemas
export const insertUserSchema = createInsertSchema(users).omit({
  createdAt: true,
  updatedAt: true,
});

export const insertPredictionSchema = createInsertSchema(predictions).omit({
  id: true,
  createdAt: true,
});

export const upsertUserSchema = insertUserSchema;

// Types
export type User = typeof users.$inferSelect;
export type UpsertUser = z.infer<typeof upsertUserSchema>;
export type Prediction = typeof predictions.$inferSelect;
export type InsertPrediction = z.infer<typeof insertPredictionSchema>;

// Training data tables for disease detection model
export const diseaseClasses = pgTable("disease_classes", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull().unique(),
  scientificName: varchar("scientific_name"),
  description: text("description"),
  severity: varchar("severity", { enum: ["low", "medium", "high"] }).notNull(),
  affectedCrops: jsonb("affected_crops").$type<string[]>().notNull(),
  symptoms: jsonb("symptoms").$type<string[]>().notNull(),
  causes: jsonb("causes").$type<string[]>().notNull(),
  preventionMeasures: jsonb("prevention_measures").$type<string[]>().notNull(),
  spreadMethod: text("spread_method"),
  optimalConditions: text("optimal_conditions"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const treatmentOptions = pgTable("treatment_options", {
  id: serial("id").primaryKey(),
  diseaseClassId: integer("disease_class_id").notNull().references(() => diseaseClasses.id),
  name: varchar("name").notNull(),
  type: varchar("type", { enum: ["organic", "chemical", "biological"] }).notNull(),
  treatmentType: varchar("treatment_type", { enum: ["fungicide", "bactericide", "insecticide", "fertilizer", "organic", "biological"] }).notNull(),
  activeIngredient: varchar("active_ingredient"),
  dosage: text("dosage").notNull(),
  applicationMethod: text("application_method").notNull(),
  frequency: text("frequency").notNull(),
  priceRange: varchar("price_range"),
  effectiveness: integer("effectiveness").notNull(), // 1-10 scale
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const purchaseLinks = pgTable("purchase_links", {
  id: serial("id").primaryKey(),
  treatmentOptionId: integer("treatment_option_id").notNull().references(() => treatmentOptions.id),
  retailer: varchar("retailer").notNull(),
  url: text("url").notNull(),
  price: varchar("price"),
  availability: varchar("availability"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const trainingImages = pgTable("training_images", {
  id: serial("id").primaryKey(),
  diseaseClassId: integer("disease_class_id").notNull().references(() => diseaseClasses.id),
  imageUrl: text("image_url").notNull(),
  originalFilename: varchar("original_filename"),
  imagePath: text("image_path"),
  width: integer("width"),
  height: integer("height"),
  fileSize: integer("file_size"),
  isValidated: boolean("is_validated").default(false),
  validatedBy: varchar("validated_by"),
  qualityScore: real("quality_score"), // 0-1 scale
  metadata: jsonb("metadata"), // Additional image metadata
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const modelVersions = pgTable("model_versions", {
  id: serial("id").primaryKey(),
  version: varchar("version").notNull().unique(),
  modelPath: text("model_path").notNull(),
  accuracy: real("accuracy").notNull(),
  precision: real("precision").notNull(),
  recall: real("recall").notNull(),
  f1Score: real("f1_score").notNull(),
  trainingDataSize: integer("training_data_size").notNull(),
  validationDataSize: integer("validation_data_size").notNull(),
  epochs: integer("epochs").notNull(),
  batchSize: integer("batch_size").notNull(),
  learningRate: real("learning_rate").notNull(),
  isActive: boolean("is_active").default(false),
  trainingStarted: timestamp("training_started"),
  trainingCompleted: timestamp("training_completed"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const modelPredictions = pgTable("model_predictions", {
  id: serial("id").primaryKey(),
  modelVersionId: integer("model_version_id").notNull().references(() => modelVersions.id),
  trainingImageId: integer("training_image_id").notNull().references(() => trainingImages.id),
  predictedClassId: integer("predicted_class_id").notNull().references(() => diseaseClasses.id),
  actualClassId: integer("actual_class_id").notNull().references(() => diseaseClasses.id),
  confidence: real("confidence").notNull(),
  isCorrect: boolean("is_correct").notNull(),
  predictionTime: timestamp("prediction_time").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Additional relations for training data
export const diseaseClassRelations = relations(diseaseClasses, ({ many }) => ({
  treatmentOptions: many(treatmentOptions),
  trainingImages: many(trainingImages),
  actualPredictions: many(modelPredictions, { relationName: "actualClass" }),
  predictedPredictions: many(modelPredictions, { relationName: "predictedClass" }),
}));

export const treatmentOptionRelations = relations(treatmentOptions, ({ one, many }) => ({
  diseaseClass: one(diseaseClasses, {
    fields: [treatmentOptions.diseaseClassId],
    references: [diseaseClasses.id],
  }),
  purchaseLinks: many(purchaseLinks),
}));

export const purchaseLinkRelations = relations(purchaseLinks, ({ one }) => ({
  treatmentOption: one(treatmentOptions, {
    fields: [purchaseLinks.treatmentOptionId],
    references: [treatmentOptions.id],
  }),
}));

export const trainingImageRelations = relations(trainingImages, ({ one, many }) => ({
  diseaseClass: one(diseaseClasses, {
    fields: [trainingImages.diseaseClassId],
    references: [diseaseClasses.id],
  }),
  modelPredictions: many(modelPredictions),
}));

export const modelVersionRelations = relations(modelVersions, ({ many }) => ({
  modelPredictions: many(modelPredictions),
}));

export const modelPredictionRelations = relations(modelPredictions, ({ one }) => ({
  modelVersion: one(modelVersions, {
    fields: [modelPredictions.modelVersionId],
    references: [modelVersions.id],
  }),
  trainingImage: one(trainingImages, {
    fields: [modelPredictions.trainingImageId],
    references: [trainingImages.id],
  }),
  predictedClass: one(diseaseClasses, {
    fields: [modelPredictions.predictedClassId],
    references: [diseaseClasses.id],
    relationName: "predictedClass",
  }),
  actualClass: one(diseaseClasses, {
    fields: [modelPredictions.actualClassId],
    references: [diseaseClasses.id],
    relationName: "actualClass",
  }),
}));

// Type exports for training data
export type DiseaseClass = typeof diseaseClasses.$inferSelect;
export type InsertDiseaseClass = typeof diseaseClasses.$inferInsert;
export type TreatmentOption = typeof treatmentOptions.$inferSelect;
export type InsertTreatmentOption = typeof treatmentOptions.$inferInsert;
export type PurchaseLink = typeof purchaseLinks.$inferSelect;
export type InsertPurchaseLink = typeof purchaseLinks.$inferInsert;
export type TrainingImage = typeof trainingImages.$inferSelect;
export type InsertTrainingImage = typeof trainingImages.$inferInsert;
export type ModelVersion = typeof modelVersions.$inferSelect;
export type InsertModelVersion = typeof modelVersions.$inferInsert;
export type ModelPrediction = typeof modelPredictions.$inferSelect;
export type InsertModelPrediction = typeof modelPredictions.$inferInsert;
