import {Component, Inject, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {HelpersService} from '../../shared/services/helpers.service';
import {Subscription} from 'rxjs';
import {Blog, TagInterface} from '../../shared/interfaces/blog/blog.response';
import {Constants, Messages, ValidationMessages} from '../../shared/constants/constants';
import {FormGroup} from '@angular/forms';
import {FormsService} from '../../shared/services/forms.service';
import {isPlatformBrowser} from '@angular/common';
import {resolveDataNotFound} from "../../shared/functions/core.function";

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit, OnDestroy {
  slug: string;
  title: string;
  subscription: Subscription;
  blog: Blog;
  relatedBlog: Array<Blog> = [];
  isPageProcessingComplete = false;
  readonly CONSTANTS = Constants;
  commentForm: FormGroup;
  readonly MESSAGES = ValidationMessages;
  isSubmitting = false;
  shareURL: string;
  tags: Array<TagInterface>;
   relatedBlogsNotFound = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private helpersService: HelpersService,
    private formsService: FormsService,
    @Inject(PLATFORM_ID) private platformID,
  ) {
  }

  ngOnInit(): void {
    this.helpersService.dataService.setShowFooter(false);
    this.commentForm = this.formsService.buildBlogCommentForm();
    this.title = this.helpersService.resolveTitle(this.activatedRoute);
    this.helpersService.scrollToTop();
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.slug = params.slug;
        this.resolvePage();
      }
    );
  }
  resolveShareUrl(): void {
    if (isPlatformBrowser(this.platformID)) {
      const baseURL = window.location.origin;
      this.shareURL = `${baseURL}/blog/${this.slug}`;
    }
  }
  resolvePage(): void {
    this.helpersService.scrollToTop();
    this.subscription = this.helpersService.apiService.getBlogDetail(this.slug).subscribe(
      response => {
        this.blog = response.blog;
        this.tags = response.tags;
        this.relatedBlog = response.relatedBlog;
        resolveDataNotFound(this.relatedBlog, notFound => this.relatedBlogsNotFound = notFound);
        this.helpersService.setTitle(this.blog.name);
        this.resolveShareUrl();
        this.helpersService.setBlogMetaInfo(this.blog)
        this.completePageProcessing();
        this.helpersService.dataService.setShowFooter(true);
      },
      error => {
        this.helpersService.showResponseErrorMessage(error);
        this.completePageProcessing();
        this.helpersService.dataService.setShowFooter(true);
      }
    );
  }

  onSubmit() {
    if (this.commentForm.valid) {
      this.isSubmitting = true;
      this.subscription = this.helpersService.apiService.postBlogComment(this.commentForm.value, this.blog.id).subscribe(
        response => {
          this.isSubmitting = false;
          this.commentForm.reset();
          this.helpersService.success(Messages.blogCommentAdded, '');
        },
        error => {
          this.isSubmitting = false;
          this.helpersService.showResponseErrorMessage(error);
        }
      );
    } else {
      this.commentForm.markAllAsTouched();
    }
  }

  completePageProcessing() {
    this.isPageProcessingComplete = true;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
