CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "headline" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ProfileLink" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    CONSTRAINT "ProfileLink_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Skill" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Experience" (
    "id" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT NOT NULL,
    "achievements" TEXT[] NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "profileId" TEXT NOT NULL,
    CONSTRAINT "Experience_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "technologies" TEXT[] NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "profileId" TEXT NOT NULL,
    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Profile_email_key" ON "Profile"("email");
CREATE UNIQUE INDEX "ProfileLink_profileId_label_key" ON "ProfileLink"("profileId", "label");
CREATE UNIQUE INDEX "Skill_profileId_name_key" ON "Skill"("profileId", "name");
CREATE INDEX "Skill_category_idx" ON "Skill"("category");
CREATE INDEX "Experience_profileId_sortOrder_idx" ON "Experience"("profileId", "sortOrder");
CREATE UNIQUE INDEX "Project_profileId_name_key" ON "Project"("profileId", "name");
CREATE INDEX "Project_profileId_sortOrder_idx" ON "Project"("profileId", "sortOrder");

ALTER TABLE "ProfileLink" ADD CONSTRAINT "ProfileLink_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Experience" ADD CONSTRAINT "Experience_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Project" ADD CONSTRAINT "Project_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
