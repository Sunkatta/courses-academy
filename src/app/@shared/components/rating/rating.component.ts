import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  ratingForm: FormGroup;
  @Input() rating: number;
  @Input() itemId: number;
  @Output() ratingClick: EventEmitter<any> = new EventEmitter<any>();

  inputName: string;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.inputName = this.itemId + '_rating';
    this.ratingForm = this.formBuilder.group({
      inputName: this.inputName
    });
  }

  rate() {
    this.ratingClick.emit({
      itemId: this.itemId,
      rating: this.ratingForm.controls.inputName.value
    });
  }

  onClick(rating: number): void {
    this.ratingForm.controls.inputName.setValue(rating);
    this.rating = rating; // need this so the stars stay highlighted before rating is submitted
  }
}
