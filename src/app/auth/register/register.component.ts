import {Component, OnInit} from '@angular/core';
import {AuthserviceService} from "../../shared/authservice.service";
import {AbstractControl, FormBuilder, FormControl, Validators} from "@angular/forms";
import {Auth} from "../../models/auth.model";
import * as CryptoJS from 'crypto-js';

var keySize = 256;
var iterations = 100;

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    userForm = this.fb.group({});
    formSubmitted = false;
    keys: string = "6be5aee122ff6537f28b0c1792c83e286f44656213caa72c58c828c37fdfa4fd2a2f4d5e21e8e8f7ee18795307027efff5f536007ed93a920d52d3cb20b87208R0bJvHMqqbPjVFaWt3VlOxby";

    constructor(private authService: AuthserviceService, private fb: FormBuilder) {
    }

    ngOnInit() {
        this.userForm.addControl('id', new FormControl('',));
        this.userForm.addControl('firstname', new FormControl('', [Validators.required, Validators.minLength(2)]));
        this.userForm.addControl('lastname', new FormControl('', [Validators.required]));
        this.userForm.addControl('phone', new FormControl('', [Validators.required]));
        this.userForm.addControl('email', new FormControl('',));
        this.userForm.addControl('username', new FormControl('', [Validators.required]));
        this.userForm.addControl('password', new FormControl('', [Validators.required]));
        this.userForm.addControl('confirmpassword', new FormControl('', [Validators.required]));
    }

    save($event): void {
        this.formSubmitted = true;
        if (!this.userForm.valid) {
            return;
        }
        this.saveUser();
    }

    private saveUser() {
        const user = new Auth();
        var pass = this.userForm.get('password').value;
        user.id = this.userForm.get('id').value;
        user.firstname = this.userForm.get('firstname').value;
        user.lastname = this.userForm.get('lastname').value;
        user.email = this.userForm.get('email').value;
        user.phone = this.userForm.get('phone').value;
        user.username = this.userForm.get('username').value;
        user.password = this.CryptoJSAesEncrypt(this.keys,pass);
        if (user.id == 0) {
            this.authService.addUser(user).subscribe((response)=>{
                console.log(response);
            });
        }
    }

    onPasswordChange() {
        if (this.confirmpassword.value == this.password.value) {
            this.confirmpassword.setErrors(null);
        } else {
            this.confirmpassword.setErrors({mismatch: true});
        }
    }

    get password(): AbstractControl {
        return this.userForm.controls['password'];
    }

    get confirmpassword(): AbstractControl {
        return this.userForm.controls['confirmpassword'];
    }

    CryptoJSAesEncrypt(passphrase, plain_text) {
        var salt = CryptoJS.lib.WordArray.random(256);
        var iv = CryptoJS.lib.WordArray.random(16);
        var key = CryptoJS.PBKDF2(passphrase, salt, {hasher: CryptoJS.algo.SHA512, keySize: 64 / 8, iterations: 999});
        var encrypted = CryptoJS.AES.encrypt(plain_text, key, {iv: iv});
        var data = {
            ciphertext: CryptoJS.enc.Base64.stringify(encrypted.ciphertext),
            salt: CryptoJS.enc.Hex.stringify(salt),
            iv: CryptoJS.enc.Hex.stringify(iv)
        }
        return data.ciphertext+"__" +data.iv +"__"+ data.salt;
    }
}
