import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormsService {
  form: FormGroup;
  constructor() {}
  getInput(formControlName: string): AbstractControl | null {
    return this.form.get(formControlName);
  }
  validateInput(formControlName: string) {
    return (
      this.getInput(formControlName)?.invalid &&
      (this.getInput(formControlName)?.touched ||
        this.getInput(formControlName)?.dirty)
    );
  }
  allInputsValid(...args: string[]) {
    return args.every((arg) => this.getInput(arg)?.valid! === true);
  }
  addBorder(formControlName: string) {
    return {
      borderLeft: this.validateInput(formControlName)
        ? '5px solid #c1121f'
        : '',
    };
  }
}
