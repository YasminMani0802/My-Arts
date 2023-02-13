import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/main/http.service';
import { UtilityService } from 'src/app/utility.service';

@Component({
  selector: 'app-my-user',
  templateUrl: './my-user.component.html',
  styleUrls: ['./my-user.component.scss']
})
export class MyUserComponent {
  constructor(private http: HttpService, private router: Router, private utility: UtilityService) {
    const sub = this.http.get('full-user-by-id').subscribe({
      next: (details) => {
        this.user = details;
        sub.unsubscribe();
      },
      error: (res) => console.log(res.error)

    })
  }
  user: any;
  ngOnInit() {

  }

  update() {
    // console.log(this.user);

    localStorage.setItem('userDetails', JSON.stringify(this.user));
    this.router.navigate(['main/my-user/update']);
  }


  delete() {
    const isConfirm = confirm("Are you sure you want to delete your user?");
    if (isConfirm === true) {
      const sub = this.http.delete('delete-user').subscribe({
        next: () => {
          const secSub = this.utility.logout().subscribe({
            next: () => {
              secSub.unsubscribe();
              if (window.location.pathname === '/')
                window.location.reload();
              this.router.navigate(['/']);
            },
            error: (res) => console.log(res.error)
          })
          sub.unsubscribe();
        },
        error: (res) => console.log(res.error)

      });
    }
  }
}
