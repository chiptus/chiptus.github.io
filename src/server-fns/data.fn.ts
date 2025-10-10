import {
  heroSchema,
  interestsSchema,
  milestonesSchema,
  nowSchema,
  projectsSchema,
  workExperienceSchema,
} from "@/schemas/data.schema";
import { createServerFn } from "@tanstack/react-start";
import fs from "fs/promises";
import path from "path";
import { z } from "zod";
import { staticFunctionMiddleware } from "@tanstack/start-static-server-functions";

const allDataSchema = z.object({
  hero: heroSchema,
  interests: interestsSchema,
  milestones: milestonesSchema,
  now: nowSchema,
  projects: projectsSchema,
  workExperience: workExperienceSchema,
});

export type AllData = z.infer<typeof allDataSchema>;

export const dataFn = createServerFn({ method: "GET" })
  .middleware([staticFunctionMiddleware])
  .handler(async () => {
    console.log("Loading all data...");
    const dataDir = path.resolve(process.cwd(), "public", "data");

    const [hero, interests, milestones, now, projects, workExperience] =
      await Promise.all([
        fs.readFile(path.join(dataDir, "hero.json"), "utf-8"),
        fs.readFile(path.join(dataDir, "interests.json"), "utf-8"),
        fs.readFile(path.join(dataDir, "milestones.json"), "utf-8"),
        fs.readFile(path.join(dataDir, "now.json"), "utf-8"),
        fs.readFile(path.join(dataDir, "projects.json"), "utf-8"),
        fs.readFile(path.join(dataDir, "work-experience.json"), "utf-8"),
      ]);

    const data = {
      hero: JSON.parse(hero),
      interests: JSON.parse(interests),
      milestones: JSON.parse(milestones),
      now: JSON.parse(now),
      projects: JSON.parse(projects),
      workExperience: JSON.parse(workExperience),
    };

    return allDataSchema.parse(data);
  });
