// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import { primaryKey } from "drizzle-orm/mysql-core";
import {
  boolean,
  date,
  index,
  integer,
  pgEnum,
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

//@TODO figure out how to convert rank varchar to enum
export enum Rank {
  SCOUT = 'Scout',
  HIKER = 'Hiker',
  EXPLORER = 'Explorer',
  ADVENTURER = 'Adventurer',
  MOUNTAINEER = 'Mountaineer',
  EXPEDITIONER = 'Expeditioner',
  RANGER = 'Ranger',
  DOUBLE_STAR_RANGER = 'Double Star Ranger',
  TRIPLE_STAR_RANGER = 'Triple Star Ranger',
  FOUR_STAR_RANGER = 'Four Star Ranger',
  FIVE_STAR_RANGER = 'Five Star Ranger',
  ALL_STAR_RANGER = 'All Star Ranger',
}

export function enumToPgEnum<T extends Record<string, any>>(
  myEnum: T,
): [T[keyof T], ...T[keyof T][]] {
  return Object.values(myEnum).map((value: string) => `${value}`) as string
}
// https://github.com/drizzle-team/drizzle-orm/discussions/1914
// https://trailhead.salesforce.com/trailblazer-ranks

export const rankEnum = pgEnum('rank', enumToPgEnum(Rank))


export const trailblazers = createTable(
  "trailblazer",
  {
    id: serial("id").primaryKey(),
    rank: rankEnum('rank'),
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

export const awards = createTable(
  "award",
  {
    id: varchar("id").primaryKey(),
    title: varchar("title", { length: 1024 }),
    icon: varchar("icon", { length: 1024 }),
    webUrl: varchar("web_url", { length: 1024 }),
    description: varchar("description", { length: 1024 }),
    type: varchar("type", { length: 256 }),
  }
);

export const earnedAwards = createTable(
  "earned_award",
  {
    id: varchar("id").primaryKey(),
    award_id: varchar("award_id", { length: 256 }),
    user_id: varchar("user_id", { length: 256 }),
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


export type SelectTrailblazer = typeof trailblazers.$inferSelect;
export type InsertTrailblazer = typeof trailblazers.$inferInsert;


export type SelectAward = typeof awards.$inferSelect;
export type InsertAward = typeof awards.$inferInsert;


export type SelectEarnedAward = typeof earnedAwards.$inferSelect;
export type InsertEarnedAward = typeof earnedAwards.$inferInsert;

export type SelectCertification = typeof trailblazerCertifications.$inferSelect;
export type InsertCertification = typeof trailblazerCertifications.$inferInsert;


export type BadgeUnion = {
  award: SelectAward,
  earned_award: SelectEarnedAward
}