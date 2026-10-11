export type AppCategory = 'Games' | 'Education' | 'Puzzle' | 'Tools' | 'Other Apps';

export type PublicationStatus = 'Published' | 'Coming Soon';

export interface AppItem {
  id: string;
  name: string;
  packageName: string;
  iconUrl: string;
  shortDescription: string;
  fullDescription: string;
  category: AppCategory;
  tags?: string[];
  googlePlayUrl?: string; // Real or placeholder URL
  screenshots: string[];
  privacyPolicyUrl?: string;
  privacyPolicyText?: string;
  supportEmail: string;
  publicationStatus: PublicationStatus;
  keyFeatures: string[];
  version: string;
  minAndroidVersion: string;
  contentRating: string;
  sizeMb?: string;
  featured?: boolean;
  releaseDate?: string;
}

export interface DeveloperInfo {
  developerName: string;
  studioName: string;
  brandTagline: string;
  supportEmail: string;
  officialWebsiteUrl: string;
  googlePlayDeveloperUrl: string;
  admobPublisherId: string;
  admobVerificationLine: string;
  location: string;
}

export type PageRoute = 
  | { type: 'home' }
  | { type: 'app-details'; appId: string }
  | { type: 'privacy'; appId?: string }
  | { type: 'support'; appId?: string }
  | { type: 'about' }
  | { type: 'terms' }
  | { type: 'admob-guide' };
