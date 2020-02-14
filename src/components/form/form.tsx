import { Component, h, State, Event, EventEmitter } from '@stencil/core';
import "@material/mwc-textfield";
import '@material/mwc-select';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-button';

@Component({
  tag: 'login-form',
  styleUrl: 'form.css',
  shadow: true
})

export class LoginForm {

  usernameInput!: HTMLInputElement;
  passwordInput!: HTMLInputElement;
  @Event() formSubmit: EventEmitter;

  @State() username: string;
  @State() password: string;
  @State() type: string = '101';

  private types: any[] = [
      { 'value': '101', 'label': 'Mark' },
      { 'value': '102', 'label': 'Smith' }
  ];

  handleSubmit(e) {
    e.preventDefault();
    if(this.validateForm()) {
      this.formSubmit.emit({username: this.username, password: this.password, type: this.type})
    }
  }

  handleChange(fieldName, value) {
    this[fieldName] = value;
  }

  validateForm() {
    const passwordValidation = this.passwordInput.reportValidity()
    const userValidation = this.usernameInput.reportValidity()
    return passwordValidation && userValidation 
  }

  render() {
    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <mwc-textfield id="username" required ref={(el) => this.usernameInput = el as HTMLInputElement} validationMessage="Required" label="User name" outlined value={this.username} onInput={(event) => this.handleChange('username',event.target.value)} />
        <mwc-textfield id="password" required ref={(el) => this.passwordInput = el as HTMLInputElement} validationMessage="Required" label="Password" type="password" outlined value={this.password} onInput={(event) => this.handleChange('password', event.target.value)} />
        <mwc-select required onChange={(e) => this.handleChange('type',e.target.value)}  label="Type" outlined>
          {this.types.map( type => <mwc-list-item index={type.value} selected={this.type === type.value} value={type.value}>{type.label}</mwc-list-item> )}
        </mwc-select>
        <mwc-button raised onClick={(e) => this.handleSubmit(e)} >Login</mwc-button>
      </form>
    );
  }
}