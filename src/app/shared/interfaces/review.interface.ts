export interface Review {
  id: number;
  reviewer_id: number;
  product_id: number;
  rating: number;
  reviewer_name: string;
  comment: string;
  is_approved: boolean;
  created_at: string;
  updated_at: string;
  rating_percent: number;
  created_at_formatted: string;
}
