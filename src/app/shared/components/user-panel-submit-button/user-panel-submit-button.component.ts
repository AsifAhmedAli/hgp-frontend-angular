import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-user-panel-submit-button',
  templateUrl: './user-panel-submit-button.component.html',
  styleUrls: ['./user-panel-submit-button.component.css']
})
export class UserPanelSubmitButtonComponent implements OnInit {
  @Input() submit = 'Submit';
  @Input() isSubmitting;
  constructor() { }

  ngOnInit(): void {
  }

}
