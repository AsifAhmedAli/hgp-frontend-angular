import {Team} from '../../models/Homepage.model';

export interface StaticPageResponse {
  message?: string;
  result?: StaticPage;
}

export interface BrandPageResponse {
  brands: PaginatedBrands;
}

export interface PaginatedBrands {
  current_page: number;
  data: Array<BrandInterface>;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
  total: number;
}


export interface BrandInterface {
  id: number;
  slug: string;
  name: string;
  logo: BrandLogoInterface;
}

export interface BrandLogoInterface {
  id: string;
  filename: string;
  path: string;
}

export interface DocumentPageResponse {
  documents: PaginatedDocuments;
}

export interface PaginatedDocuments {
  current_page: number;
  data: Array<DocumentInterface>;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
  total: number;
}

export interface DocumentInterface {
  id: number;
  category_id: number;
  user_id: number;
  filename: string;
  disk: string;
  path: string;
  extension: string;
  mime: string;
  size: string;
  name: string;
}


export interface StaticPage {
  name: string;
  translations: Array<StaticPageTranslationInterface>;
  id: number;
  title: string;
  slug: string;
  body: string;
  meta_title: string;
  meta_keywords: string;
  meta_description: string;
}

export interface StaticPageTranslationInterface {
  body: string,
  id: number,
  locale: string,
  name: string,
  page_id: string
}

export interface AboutUsResponse {
  status: boolean;
  message: string;
  result: AboutUsResult;
}

export interface AboutUsResult {
  page: AboutUsPage;
  distributions: Array<Distribution>;
  offers: Array<Offer>;
  teams: Array<Team>;
}

export interface AboutUsPage {
  banner_title: string;
  id: number;
  name: string;
  slug: string;
  section_1_title: string;
  section_1_description: string;
  section_1_image: string;
  section_1_cta_title: string;
  section_1_cta_link: string;
  section_2_image: string;
  section_2_title: string;
  section_2_description: string;
  section_3_title: string;
  section_3_description: string;
  section_3_image: string;
  distribution_heading: string;
  team_title: string;
  team_cta_text: string;
  team_cta_url: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Distribution {
  title: string;
  phone: string;
  image: string;
  address: string;
  is_active: boolean;
}

export interface Offer {
  id: number;
  image: string;
  title: string;
  slug: string;
  description: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  readMore: boolean;
}
