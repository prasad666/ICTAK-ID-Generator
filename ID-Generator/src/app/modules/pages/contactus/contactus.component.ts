import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ContactService } from 'src/app/shared/services/contact.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css'],
})
export class ContactusComponent implements OnInit {
  FormData!: FormGroup;
  submitSuccess = false;
  submitError = false;
  constructor(private builder: FormBuilder, private contact: ContactService) {}

  ngOnInit(): void {
    this.FormData = this.builder.group({
      Fullname: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.required, Validators.email]),
      Phone: new FormControl('', [Validators.required]),
      Comment: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(FormData: any) {
    console.log(FormData);
    this.submitSuccess = false;
    this.submitError = false;
    this.contact.PostMessage(FormData).subscribe(
      (response) => {
        this.submitSuccess = true;
        this.FormData.reset();
        console.log(response);
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
      },
      (error) => {
        this.submitError = true;
        console.warn(error.responseText);
        console.log({ error });
      }
    );
  }
}
