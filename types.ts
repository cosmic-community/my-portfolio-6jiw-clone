/** Cosmic file metafield shape */
export interface CosmicImage {
  url: string;
  imgix_url: string;
}

/** Base Cosmic object interface */
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata?: Record<string, unknown>;
  type?: string;
  created_at?: string;
  modified_at?: string;
}

/** 👤 Profile */
export interface Profile extends CosmicObject {
  metadata?: {
    full_name?: unknown;
    headline?: unknown;
    bio?: unknown;
    avatar?: CosmicImage | null;
    email?: unknown;
    phone?: unknown;
    location?: unknown;
    available_for_work?: unknown;
    social_links?: unknown;
    resume?: CosmicImage | null;
    [key: string]: unknown;
  };
}

/** 🚀 Project */
export interface Project extends CosmicObject {
  metadata?: {
    description?: unknown;
    content?: unknown;
    featured_image?: CosmicImage | null;
    screenshots?: unknown;
    tech_stack?: unknown;
    live_url?: unknown;
    github_url?: unknown;
    completion_date?: unknown;
    featured?: unknown;
    [key: string]: unknown;
  };
}

/** 🛠️ Skill */
export interface Skill extends CosmicObject {
  metadata?: {
    name?: unknown;
    category?: unknown;
    proficiency?: unknown;
    years_experience?: unknown;
    icon?: unknown;
    [key: string]: unknown;
  };
}

/** 💼 Work Experience */
export interface WorkExperience extends CosmicObject {
  metadata?: {
    job_title?: unknown;
    company_name?: unknown;
    company_logo?: CosmicImage | null;
    location?: unknown;
    start_date?: unknown;
    current_role?: unknown;
    end_date?: unknown;
    description?: unknown;
    [key: string]: unknown;
  };
}

/** Generic Cosmic list response */
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}

/** Normalized social link */
export interface SocialLink {
  key: string;
  url: string;
}