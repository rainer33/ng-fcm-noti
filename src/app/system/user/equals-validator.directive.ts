import { Directive, Input, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, FormControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
	selector: '[validateEquals][formControlName],[validateEquals][formControl],[validateEquals][ngModel]',
	providers: [
		{ provide: NG_VALIDATORS, useExisting: forwardRef(() => EqualsValidator), multi: true }
	]
})
export class EqualsValidator implements Validator {
	@Input() validateEquals: FormControl;
	private subscribe: boolean = false;

	validate(c: AbstractControl): { [key: string]: any } {
		if (!this.subscribe) {
			this.subscribe = true;
			this.validateEquals.valueChanges.subscribe(() => {
				c.updateValueAndValidity();
			});
		}

		let v = c.value;
		if (v != this.validateEquals.value) {
			return {
				validateEquals: true
			}
		}
		return null;
	}
}
