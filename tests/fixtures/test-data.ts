// Test fixtures - Import actual data files to make tests data-driven
import workExperienceData from '../../src/data/work-experience.json' with { type: 'json' };
import projectsData from '../../src/data/projects.json' with { type: 'json' };
import heroData from '../../src/data/hero.json' with { type: 'json' };

export const testData = {
  // Hero section data
  hero: heroData,

  // Work experience data
  workExperience: workExperienceData.experiences,

  // Projects data
  projects: projectsData.projects,

  // Computed helpers for convenience
  get workCount() {
    return this.workExperience.length;
  },

  get projectCount() {
    return this.projects.length;
  },

  // Helper to get first work experience (for detailed tests)
  get firstJob() {
    return this.workExperience[0];
  },

  // Helper to get all companies
  get allCompanies() {
    return this.workExperience.map(job => job.company);
  },

  // Helper to get all tech used across all jobs
  get allTech() {
    const allTech = new Set<string>();
    this.workExperience.forEach(job => {
      job.tech.forEach(t => allTech.add(t));
    });
    return Array.from(allTech);
  },
};

export type WorkExperience = typeof workExperienceData.experiences[0];
export type Project = typeof projectsData.projects[0];
export type HeroData = typeof heroData;
