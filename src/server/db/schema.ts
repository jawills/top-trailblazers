// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import { primaryKey } from "drizzle-orm/mysql-core";
import {
  boolean,
  date,
  index,
  integer,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `top-trailblazers_${name}`);

export const trailblazers = createTable(
  "trailblazer",
  {
    id: serial("id").primaryKey(),
    rank: varchar('rank', {length: 256}),
    profileSlug: varchar('profile_slug', {length: 256}).unique(),
    profileId: varchar('profile_id', {length: 256}).unique(),
    salesforceId: varchar('salesforce_id', {length: 256}).unique(),
    profileUrl: varchar('profile_url', {length: 256}).unique(),
    avatarUrl: varchar('avatar_url', {length: 256}),
    title: varchar('title', {length: 256}),
    description: varchar('description', {length: 256}),
    role: varchar('role', {length: 256}),
    isPublic: boolean('is_public'),
    companyName: varchar('company_name', {length: 256}),
    badges: integer('badges'),
    modules: integer('modules'),
    projects: integer('projects'),
    trails: integer('trails'),
    isMvp: boolean('is_mvp'),
    superBadges: integer('super_badges'),
    points: integer('points'),
    badgeStreak: integer('badge_streak'),
    name: varchar("name", { length: 256 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
  }
);

export const certifications = createTable(
  "certification",
  {
    id: serial("id").primaryKey(),
    logoUrl: varchar("logo_url", { length: 1024 }),
    infoUrl: varchar("info_url", { length: 1024 }),
    downloadLogoUrl: varchar("download_logo_url", { length: 1024 }),
    product: varchar("product", { length: 256 }),
    publicDescription: varchar("public_description", { length: 1024 }),
    title: varchar("title", { length: 256 }).unique(),
  }
);

export const trailblazerCertifications = createTable(
  "trailblazer_certifications",
  {
    id: serial("id").primaryKey(),
    linkedId: varchar('linked_id').unique(),
    dateCompleted: date('date_completed'),
    dateExpired: date('date_expired'),
    maintenanceDueDate: date('maintenance_due_date'),
    status: varchar("status", { length: 256 }),
    certName: varchar("cert_name", { length: 256 }),
    userProfileId: varchar("user_profile_id", { length: 256 }),
  }
);

export const certificationRelations = relations(certifications, ({ one }) => ({
  certification: one(trailblazerCertifications, {
    fields: [certifications.title],
    references: [trailblazerCertifications.id],
  }),
}));

export const trailblazerCertificationRelations = relations(trailblazerCertifications, ({ one }) => ({
  user: one(trailblazers, {
    fields: [trailblazerCertifications.id],
    references: [trailblazers.profileId],
  }),
}));

export const trailheadRanks = createTable(
  "trailhead_rank",
  {
    id: serial("id").primaryKey(),
    imageUrl: varchar("imageUrl", { length: 256 }),
    requiredPointsSum: integer('requiredPointsSum'),
    requiredBadgesCount: integer('requiredBadgesCount'),
    title: varchar("title", { length: 256 }).unique(),
  }
);

export type SelectTrailblazer = typeof trailblazers.$inferSelect;
export type InsertTrailblazer = typeof trailblazers.$inferInsert;