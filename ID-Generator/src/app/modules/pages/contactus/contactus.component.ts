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
    this.contact.PostMessage(FormData).subscribe(
      (response) => {
        location.href = '/pages/contact';
        console.log(response);
      },
      (error) => {
        console.warn(error.responseText);
        console.log({ error });
      }
    );
  }
}
