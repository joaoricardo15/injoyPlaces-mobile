import { Component } from '@angular/core';
import { LocalStorageService } from 'src/app/common/services/localStorage.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/common/services/api.service';

@Component({
  selector: 'signUp-page',
  templateUrl: 'signUp.page.html',
  styleUrls: ['signUp.page.scss']
})
export class SignUpPage {

  constructor(private router: Router, private api: ApiService, private localStorage: LocalStorageService) {}

  user: any
  email: any
  submitted: boolean = false
  alreadyInUse: boolean = false
  alreadyInUseName: string

  signUp(form) {
    this.submitted = true

    if (form.valid) {
      this.api.getUser(form.value.user)
        .subscribe(users => {
          if (users.length == 0) {
            this.api.postUser(form.value)
              .subscribe(() => {
                this.localStorage.setUser(form.value)
                this.router.navigate(['/home'])
              })
          }
          else {
            this.alreadyInUse = true
            this.alreadyInUseName = users[0].user
          }
        })
    }
  }
}
