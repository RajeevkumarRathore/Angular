import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() buttonText: string;
  @Input() buttonSubmit = false;
  @HostBinding("class.disabled") disabled: boolean = false;
  classObject = {};

  private _buttonSize = "medium";
  get buttonSize(): string {
    return this._buttonSize;
  }
  @Input() set buttonSize(buttonSize: string) {
    delete this.classObject[`button--size-${this.buttonSize}`];

    this._buttonSize = buttonSize || "medium";
    this.classObject[`button--size-${this.buttonSize}`] = this.buttonSize;
  }

  private _buttonStyle: string;
  get buttonStyle(): string {
    return this._buttonStyle;
  }
  @Input() set buttonStyle(buttonStyle: string) {
    delete this.classObject[`button--style-${this.buttonStyle}`];

    this._buttonStyle = buttonStyle || "primary";
    this.classObject[`button--style-${this.buttonStyle}`] = this.buttonStyle;
  }

  private _buttonColor: string;
  get buttonColor(): string {
    return this._buttonColor;
  }
  @Input() set buttonColor(buttonColor: string) {
    delete this.classObject[`button--color-${this.buttonColor}`];

    this._buttonColor = buttonColor || "primary";
    this.classObject[`button--color-${this.buttonColor}`] = this.buttonColor;
  }

  private _loading: boolean;
  get loading(): boolean {
    return this._loading;
  }
  @Input() set loading(loading: boolean) {
    this._loading = loading || false;
  }

  private _isDisabled: boolean;
  get isDisabled(): boolean {
    return this._isDisabled;
  }
  @Input() set isDisabled(isDisabled: boolean) {
    this._isDisabled = isDisabled || false;
    this.classObject[`button--disabled`] = this.isDisabled;
    this.disabled = this.isDisabled;
  }
 
  private _isActivated;
  get isActivated(): boolean {
    return this._isActivated;
  }
  @Input() set isActivated(isActivated: boolean) {
    this._isActivated = isActivated || false;
    this.classObject[`button--is-activated`] = this.isActivated;
  }

  _isSpinning: boolean;
  get isSpinning(): boolean {
    return this._isSpinning;
  }
  @Input() set spin(spin: boolean) {
    this._isSpinning = spin || false;
    this.classObject[`button--spin`] = this.isSpinning;
  }

  constructor() {
    this.buttonSize = "medium";
    this.buttonColor = "primary";
    this.buttonStyle = "primary";
  }

  ngOnInit(): void {}
}
