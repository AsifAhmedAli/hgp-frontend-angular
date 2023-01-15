import {Category} from './header.response';

export interface ProductsResponse {
  products: PaginatedProducts;
  counter: number;
  categories: Category[];
  brands: Array<Brand>;
}

export interface PaginatedProducts {
  current_page: number;
  data: Array<Product>;
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

export interface Price  {
  product_recid: number;
  retailPrice: number;
}

export interface Image {
  product_recid: number;
  url: string;
}


export interface Brand {
  checked: any;
  name: string;
}


export interface Brand {
  product_recid: number;
  attribute: string;
  value: string;
  dataType: number;
}

export interface Specification {
  product_recid: any;
  attribute: string;
  value: string;
  dataType: number;
}

export interface BarCode {
  product_recid: number;
  barcode: string;
  barcodeType: string;
  uom: string;
}

export interface Dimension {
  product_recid: number;
  uom: string;
  depth: string;
  height: string;
  weight: string;
  width: string;
}

export interface Document {
  product_recid: number;
  url: string;
  docName: string;
}

export interface Image {
  product_recid: number;
  url: string;
  docName: string;
}

export interface Related2 {
  id: number;
  recid: any;
  sku: string;
  name: string;
  categoryid: any;
  model: string;
  rating: number;
  reviews: any[];
}

export interface Related {
  product_recid: any;
  sku: string;
  relation: string;
  related: Product;
}

export interface Item {
  id: number;
  hydro_product_family_id: number;
  sku: string;
  priority: number;
  isDefault: boolean;
  unitSize: string;
  is_continued: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Family {
  id: number;
  hydro_product_id: number;
  product_recid: number;
  name: string;
  created_at: Date;
  updated_at: Date;
  items: Item[];
}

export interface ProductDetailResponse {
  product: Product;
  message: string;
}

export interface Product {
  recid: number;
  id: number;
  sku: string;
  name: string;
  namealias: string;
  hydro_category_id: number;
  categoryid: number;
  sortpriority: any;
  description: string;
  webdescription: string;
  unitsize: string;
  model: string;
  isdefault: number;
  isdiscontinued: number;
  isspecialorder: number;
  isbuildtoorder: number;
  isclearance: number;
  issale: number;
  ishazmat: number;
  defaultuom: string;
  defaultuomrecid: number;
  defaultimageid: number;
  mixmatchgrp: string;
  warranty: string;
  trackingdimensiongroup: string;
  launchdate: string;
  salestartdate?: any;
  saleenddate?: any;
  modifiedon: string;
  createdon: string;
  is_active: number;
  deleted_at?: any;
  created_at: Date;
  updated_at: Date;
  retailPrice: number;
  image: Image;
  price: Price;
  rating: number;
  is_in_stock: boolean;
  is_favorite_count: number;
  is_prop65_warning: boolean;
  is_fcc: boolean;
  is_csa: boolean;
  featured_image: string;
  specifications: Specification[];
  bar_codes: BarCode[];
  dimensions: Dimension[];
  documents: Document[];
  images: Image[];
  related: Related[];
  _related: Related[];
  family: Family;
  reviews: Review[];
  category: Category;
  inventories: Inventory[];
  qty: number;
  logo: string;
  logo1_tooltip: string;
  logo2: string;
  logo2_tooltip: string;
  logo3: string;
  logo3_tooltip: string;
  brand: Specification;
  pivot: Pivot;
  quantity: number
}

export interface Pivot {
  quantity: number;
}

export interface Review {
  id: number;
  reviewer_id: number;
  hydro_product_id: number;
  rating: number;
  reviewer_name: string;
  comment: string;
  is_approved: number;
  created_at?: any;
  updated_at?: any;
}


export interface Inventory {
  id: number;
  hydro_product_id: number;
  product_recid: number;
  siteId: string;
  name: string;
  availPhysicalByWarehouse: string;
  availPhysicalTotal: string;
  bckpInventLocationId: string;
  bckpAvailPhysicalByWarehouse: string;
  created_at: Date;
  updated_at: Date;
}


