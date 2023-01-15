import {Media} from './media';
import {BrandInterface} from './pages/static-page.response';

export interface ServiceCenterResponse {
  page: ServiceCenter;
  brands: Array<BrandInterface>;
}

export interface ServiceCenter {
  id: number;
  banner_cta: string;
  bottom_banner_cta: string;
  alt_text_for_banner_image: string;
  alt_text_for_bottom_banner_image: string;
  alt_text_for_process_image_1: string;
  alt_text_for_process_image_2: string;
  alt_text_for_process_image_3: string;
  meta_title: string;
  meta_keywords: string;
  meta_description: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  banner_image: Media;
  process_image_1: Media;
  process_image_2: Media;
  process_image_3: Media;
  bottom_banner_image: Media;
  banner_text: string;
  content: string;
  process_title_1: string;
  process_title_2: string;
  process_title_3: string;
  bottom_banner_text: string;
}
