import {Faq} from "./faq";

export interface HowItWork {
    id: number;
    name: string;
    slug: string;
    banner_image: string;
    banner_left_image: string;
    banner_title: string;
    banner_description: string;
    section_1_title: string;
    section_1_description: string;
    step_1_image: string;
    step_1_title: string;
    step_1_description: string;
    step_2_image: string;
    step_2_title: string;
    step_2_description: string;
    step_3_image: string;
    step_3_title: string;
    step_3_description: string;
    section_2_description: string;
    section_2_image: string;
    section_3_image: string;
    section_3_title: string;
    section_3_description: string;
    section_3_cta_text: string;
    section_3_cta_url: string;
    section_4_title: string;
    section_4_description: string;
    section_4_cta_text: string;
    section_4_cta_url: string;
    section_4_first_image: string;
    section_4_second_image: string;
    section_4_arrow_image: string;
    section_2_cta_title: string;
    section_2_cta_link: string;
    help_section_title: string;
    help_section_placeholder: string;
    book_title: string;
    book_image: string;
    download_book_title: string;
    upload_book: any;
    meta_title: string;
    meta_description: string;
    meta_keywords: string;
    is_active: number;
    created_at: Date;
    updated_at: Date;
}

export interface HowItWorkResponse{
    faqs: Faq[];
    how_it_work: HowItWork;
}
