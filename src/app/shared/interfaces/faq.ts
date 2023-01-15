export interface Faq {
    id: number;
    question: string;
    slug: string;
    answer: string;
    type: string;
    is_feature: number;
    show_on_about_us: number;
    is_active: number;
    created_at: Date;
    updated_at: Date;
    category_id: number;
}

export interface FaqResponse {
    openCategorySlug: number;
    faqs: Faq[];
    faqCategories:FaqCategory[]
}export interface FaqsByCategoryResponse {
    faqCategories: FaqCategory[];
    faqs:Faq[]
}
export interface FaqCategory {
    id: number;
    name: string;
    slug: string;
    is_active: number;
    created_at: Date;
    updated_at: Date;
    faqs: Faq[];

}
