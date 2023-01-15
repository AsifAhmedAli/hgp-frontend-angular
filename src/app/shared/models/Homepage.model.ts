import {Product, Review} from '../interfaces/products.model';
import {Kit, KitSliders} from '../interfaces/kits.interface';
import {Category} from '../interfaces/header.response';
import {Testimonials} from '../interfaces/testimonials.interface';
import {Videos} from "../interfaces/videos.interface";

export interface Team {
  id: number;
  name: string;
  profile_image: string;
  designation: string;
  achievement_text: string;
  achievement_icon: string;
  description: string;
  cta_text: string;
  cta_url: string;
  created_at: Date;
  updated_at: Date;
}

export interface Homepage {
  id: number;
  banner_title: string;
  banner_text: string;
  banner_cta_text_1: string;
  banner_cta_url_1: string;
  banner_cta_text_2: string;
  banner_cta_url_2: string;
  featured_section_title: string;
  featured_section_text: string;
  banner_products: string;
  slider_banner_image: string;
  promotional_banner: string;
  promotional_banner_cta_link: string;
  featured_products_title: string;
  featured_products_mini_title: string;
  package_1_title: string;
  package_1_description: string;
  package_1_image: string;
  package_1_price: number;
  package_2_title: string;
  package_2_description: string;
  package_2_image: string;
  package_2_price: number;
  package_3_title: string;
  package_3_description: string;
  package_3_image: string;
  package_3_price: number;
  package_cta_title: string;
  package_cta_link: string;
  how_it_work_title: string;
  how_it_work_description: string;
  how_it_work_cta_title: string;
  how_it_work_cta_link: string;
  how_it_work_left_image: string;
  how_it_work_right_image: string;
  team_title: string;
  team_cta_title: string;
  team_cta_link: string;
  bottom_section_title: string;
  bottom_section_mini_title: string;
  bottom_section_book_cover_image: string;
  bottom_center_image: string;
  bottom_section_description: string;
  bottom_section_cta_title: string;
  bottom_section_book_title: string;
  bottom_section_download_book: any;
  bottom_section_cta_link: string;
  review_section_title: string;
  created_at: Date;
  updated_at: Date;
  testimonial_title: string;
  testimonial_description: string;
  video_title: string;
}


export interface FeatureCategory {
  banner_image: string;
  created_at: Date;
  id: number;
  promotional_banner_image: string;
  promotional_banner_image_url: string;
  updated_at: Date;
  hydro_category: Category;
}

export interface HomepageModel {
  kit_sliders: KitSliders[];
  testimonials: Testimonials[];
  videos: Videos[];
  kits: Kit[];
  teams: Team[];
  homepage: Homepage;
  reviews: Review[];
  featureCategories: FeatureCategory[];
  featureProducts: Product[];
  sliderProducts: Product[];
}


export interface HomePageResponse {
  kits: Kit[];
  status: boolean;
  message: string;
  result: HomepageModel;
}
