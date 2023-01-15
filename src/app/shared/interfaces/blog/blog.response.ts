export interface BlogResponse {
  blogs: BlogPagination;
  result?: BlogPagination;
  featured?: Array<Blog>;
  message?: string;
}

export interface BlogDetailResponse {
  tags: Array<TagInterface>;
  relatedBlog?: Array<Blog>;
  blog?: Blog;
  message?: string;
}

export interface TagInterface {
  name: string;
  slug: string;
}

export interface BlogPagination {
  current_page: number;
  data: Array<Blog>;
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

export interface Blog {
  base_image: BlogImage;
  description: string;
  short_description: string;
  tags: Array<BlogTags>;
  author: string;
  alt_text_for_additional_image_1: string;
  alt_text_for_additional_image_2: string;
  additional_image_1: string;
  additional_image_2: string;
  sections: Array<BlogSection>;
  name: string;
  alt_text_for_featured_image: string;
  featured_image: string;
  alt_text_for_thumbnail_image: string;
  translations: any;
  thumbnail_image: string;
  id: number;
  title: string;
  seo_title: string;
  excerpt: string;
  body: string;
  image: string;
  slug: string;
  status: string;
  meta_title: string;
  meta_keywords: string;
  featured: boolean;
  published_at: string;
}
export interface BlogTags {
  slug: string;
  name: string;
}
export interface BlogSection {
  alt_text_for_section_image: string;
  blog_id: string;
  created_at: string;
  description: string;
  files: any;
  id: number;
  is_active: boolean;
  name: string;
  position: string;
  section_image: any;
  source_cta_url: string;
  source_text: string;
  translations?: Array<BlogTranslation>;

}

export interface BlogTranslation {
  description: string;
  blog_id: string;
  locale: string;
  name: string;
  short_description: string;

}

export interface BlogImage {
  file_name: string;
  id: number;
  path: string;
}
