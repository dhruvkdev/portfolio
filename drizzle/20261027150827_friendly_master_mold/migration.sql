CREATE TYPE "current_category" AS ENUM('building', 'learning', 'reading', 'exploring');--> statement-breakpoint
CREATE TYPE "journal_status" AS ENUM('draft', 'published');--> statement-breakpoint
CREATE TYPE "project_status" AS ENUM('building', 'completed', 'archived');--> statement-breakpoint
CREATE TABLE "current_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"category" "current_category" NOT NULL,
	"title" varchar(200) NOT NULL,
	"description" text,
	"url" text,
	"sortOrder" integer DEFAULT 0 NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "journal_projects" (
	"journalId" uuid,
	"projectId" uuid,
	CONSTRAINT "journal_projects_pkey" PRIMARY KEY("journalId","projectId")
);
--> statement-breakpoint
CREATE TABLE "journals" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"slug" varchar(200) NOT NULL UNIQUE,
	"title" varchar(200) NOT NULL,
	"content" text NOT NULL,
	"tags" text[] NOT NULL,
	"status" "journal_status" DEFAULT 'draft'::"journal_status" NOT NULL,
	"publishedAt" timestamp with time zone,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"slug" varchar(200) NOT NULL UNIQUE,
	"title" varchar(200) NOT NULL,
	"summary" varchar(500) NOT NULL,
	"content" text,
	"techStack" text[] NOT NULL,
	"githubUrl" text NOT NULL,
	"liveUrl" text,
	"status" "project_status" DEFAULT 'building'::"project_status" NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"homepageOrder" integer,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "timeline_entries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"year" integer NOT NULL,
	"title" varchar(200) NOT NULL,
	"description" text NOT NULL,
	"sortOrder" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
ALTER TABLE "journal_projects" ADD CONSTRAINT "journal_projects_journalId_journals_id_fkey" FOREIGN KEY ("journalId") REFERENCES "journals"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "journal_projects" ADD CONSTRAINT "journal_projects_projectId_projects_id_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE;