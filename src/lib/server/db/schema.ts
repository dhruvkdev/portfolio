import {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  timestamp,
  integer,
  pgEnum,
  primaryKey,
} from "drizzle-orm/pg-core";

export const projectStatus = pgEnum("project_status", [
  "building",
  "completed",
  "archived",
]);

export const journalStatus = pgEnum("journal_status", [
  "draft",
  "published",
]);

export const currentCategory = pgEnum("current_category", [
  "building",
  "learning",
  "reading",
  "exploring",
]);

export const projects = pgTable("projects", {
  id: uuid().defaultRandom().primaryKey(),

  slug: varchar({ length: 200 }).notNull().unique(),
  title: varchar({ length: 200 }).notNull(),

  summary: varchar({ length: 500 }).notNull(),
  content: text(),

  techStack: text().array().notNull(),

  githubUrl: text().notNull(),
  liveUrl: text(),

  status: projectStatus().notNull().default("building"),

  featured: boolean().notNull().default(false),
  homepageOrder: integer(),

  createdAt: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow(),

  updatedAt: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow(),
});


export const journals = pgTable("journals", {
  id: uuid().defaultRandom().primaryKey(),

  slug: varchar({ length: 200 }).notNull().unique(),
  title: varchar({ length: 200 }).notNull(),

  content: text().notNull(),

  tags: text().array().notNull(),

  status: journalStatus().notNull().default("draft"),

  publishedAt: timestamp({ withTimezone: true }),

  createdAt: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow(),

  updatedAt: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow(),
});


export const journalProjects = pgTable(
  "journal_projects",
  {
    journalId: uuid()
      .notNull()
      .references(() => journals.id, {
        onDelete: "cascade",
      }),

    projectId: uuid()
      .notNull()
      .references(() => projects.id, {
        onDelete: "cascade",
      }),
  },
  (table) => [
    primaryKey({
      columns: [table.journalId, table.projectId],
    }),
  ]
);


export const currentItems = pgTable("current_items", {
  id: uuid().defaultRandom().primaryKey(),

  category: currentCategory().notNull(),

  title: varchar({ length: 200 }).notNull(),
  description: text(),

  url: text(),

  sortOrder: integer().notNull().default(0),

  active: boolean().notNull().default(true),

  createdAt: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow(),

  updatedAt: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow(),
});


export const timelineEntries = pgTable("timeline_entries", {
  id: uuid().defaultRandom().primaryKey(),

  year: integer().notNull(),

  title: varchar({ length: 200 }).notNull(),
  description: text().notNull(),

  sortOrder: integer().notNull().default(0),
});