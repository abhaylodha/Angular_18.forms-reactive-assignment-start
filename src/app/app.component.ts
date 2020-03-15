import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ObservableLike, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  projectStatuses = ['Stable', 'Critical', 'Finished'];
  forbiddenProjectNames = ['test'];
  forbiddenProjectNames1 = ['test1'];
  signUpForm = new FormGroup({
    'ctrl_projectName': new FormControl(null, [Validators.required, this.checkValidValues.bind(this)],
      [this.checkValidValuesAsynchronously.bind(this)]),
    'ctrl_mail': new FormControl(null, [Validators.required, Validators.email]),
    'ctrl_projectStatus': new FormControl('Stable')
  });

  onSubmit() {
    let t = {
      'Project Name': this.signUpForm.value['ctrl_projectName'],
      'Mail': this.signUpForm.value['ctrl_mail'],
      'Project Status': this.signUpForm.value['ctrl_projectStatus']
    };

    console.log(this.signUpForm);

    console.log(t);

  }

  checkValidValues(control: FormControl) {
    if (this.forbiddenProjectNames.indexOf(control.value) !== -1)
      return ({ 'nameIsForbidden': true })
    else
      return null;
  }

  checkValidValuesAsynchronously(control: FormControl): Promise<any> | Observable<any> {

    return new Promise<any>(
      (resolve, reject) => {
        setTimeout(() => {
          if (this.forbiddenProjectNames1.indexOf(control.value) !== -1)
            resolve({ 'nameIsForbiddenAsynchronously': true })
          else
            resolve(null);
        }, 1500);
      }
    );

  }
}

