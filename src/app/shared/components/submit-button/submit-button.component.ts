import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-submit-button',
  templateUrl: './submit-button.component.html',
  styleUrls: ['./submit-button.component.css']
})
export class SubmitButtonComponent implements OnInit {
  @Input() submit = 'Submit';
  @Input() isSubmitting;
  @Input() fullWidth = true;
  constructor() { }

  ngOnInit(): void {
  }

}
