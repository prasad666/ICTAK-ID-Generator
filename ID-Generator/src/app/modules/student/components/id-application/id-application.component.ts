import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-id-application',
  templateUrl: './id-application.component.html',
  styleUrls: ['./id-application.component.css']
})
export class IdApplicationComponent implements OnInit {

  //dummy data
  courses = [
    {
      name:'FSD',
      batches:['B1','B2']
    },
    {
      name:'ML',
      batches:['B1','B2']
    },
  ];               /////fetch courses from db    TO DO



  constructor(private http: HttpClient,private auth: AuthService ) { }

  ngOnInit(): void {
  }

  form = new FormGroup({
    course: new FormControl("",Validators.required),
    batch: new FormControl("",Validators.required),
    photo: new FormControl("",Validators.required),

  })

  batchesInselectedCourse:any;

  onCourseChange(){
    let selectedCourse = this.form.value.course ? this.courses.find((e)=>{ return this.form.value.course=== e.name }):{batches:[]};
    this.batchesInselectedCourse = selectedCourse?.batches

  }

  file:any;

  onFileChange(event:any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      // this.form.get('photo')?.setValue(this.file);
      
    }
  }

  onSubmit(){
    const formData = new FormData();
    formData.append('course', this.form.get('course')?.value|| "");
    formData.append('batch', this.form.get('batch')?.value|| "");
    formData.append('photo', this.file);


    this.http.post(`http://localhost:3000/users/${this.auth.currentUser._id}/apply`, formData)
    .subscribe({
      next: (data)=>{
        console.log(data);      /////TO DO
      },
      error: (err)=> {
        console.log(err);
      }
    })
  }

}
