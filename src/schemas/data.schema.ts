import { z } from "zod";

export const heroSchema = z.object({
  name: z.string(),
  title: z.string(),
  skills: z.string(),
  description: z.string(),
  social: z.object({
    github: z.string().url(),
    linkedin: z.string().url(),
    email: z.string().email(),
  }),
});

export const projectSchema = z.object({
  name: z.string(),
  description: z.string(),
  tech: z.array(z.string()),
  link: z.string().url().optional(),
  image: z.string(),
});

export const projectsSchema = z.object({
  featuredProject: z.object({
    name: z.string(),
    description: z.string(),
    tech: z.array(z.string()),
    link: z.string().url().optional(),
    image: z.string(),
    caseStudy: z
      .object({
        problem: z.string(),
        solution: z.string(),
        impact: z.array(z.string()),
      })
      .optional(),
  }),
  projects: z.array(projectSchema),
  allTechs: z.array(z.string()),
});

export const nowSchema = z.object({
  lastUpdated: z.string(),
  currentWork: z.string(),
  learning: z.array(z.string()),
  status: z.string(),
});

export const workExperienceItemSchema = z.object({
  role: z.string(),
  company: z.string(),
  period: z.string(),
  description: z.string(),
  tech: z.array(z.string()),
  image: z.string(),
  link: z.string().url().optional(),
  achievements: z.array(z.string()).optional(),
});

export const workExperienceSchema = z.object({
  experiences: z.array(workExperienceItemSchema),
});

export const milestoneSchema = z.object({
  year: z.string(),
  title: z.string(),
  description: z.string(),
  icon: z.string(),
});

export const milestonesSchema = z.array(milestoneSchema);

export const interestSchema = z.object({
  title: z.string(),
  description: z.string(),
  icon: z.string(),
});

export const interestsSchema = z.array(interestSchema);

export type HeroData = z.infer<typeof heroSchema>;
export type ProjectData = z.infer<typeof projectSchema>;
export type ProjectsData = z.infer<typeof projectsSchema>;
export type NowData = z.infer<typeof nowSchema>;
export type WorkExperienceItem = z.infer<typeof workExperienceItemSchema>;
export type WorkExperienceData = z.infer<typeof workExperienceSchema>;
export type MilestoneData = z.infer<typeof milestoneSchema>;
export type MilestonesData = z.infer<typeof milestonesSchema>;
export type InterestData = z.infer<typeof interestSchema>;
export type InterestsData = z.infer<typeof interestsSchema>;
