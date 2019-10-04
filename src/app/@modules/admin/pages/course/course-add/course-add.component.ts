import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/@core/services/course.service';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.css']
})
export class CourseAddComponent implements OnInit {
  courseForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params) => {
        if (params.id) {
          this.courseService.getCourseById(params.id)
          .subscribe(
            response => {
              this.createForm();
              this.courseForm.patchValue({...response.body});
            }
          );
        }
      }
    );

    this.createForm();
  }

  private createForm(): void {
    this.courseForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(3)]],
      image: [{value: 'https://picsum.photos/217/217', disabled: true} /*, Validators.required */]
    });
  }

  onFormSubmit(): void {
    this.courseService.addNewCourse({
      Title: this.courseForm.controls.title.value,
      Description: this.courseForm.controls.description.value,
      Image: this.courseForm.controls.image.value
    })
    .subscribe(
      () => {
        this.router.navigateByUrl('admin/courses?title=' + this.courseForm.controls.title.value);
      }
    );
  }
}
