import {Component, OnInit} from '@angular/core';
import {AuthserviceService} from "../../shared/authservice.service";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {Login} from "../../models/login.model";
import * as CryptoJS from "crypto-js";
import {Router} from "@angular/router";
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    userLogin = this.fb.group({});
    formSubmitted = false;
    message: string;
    failed: boolean = false;
    logedUrl: string;
    loginPage: string;
    keys: string = "6be5aee122ff6537f28b0c1792c83e286f44656213caa72c58c828c37fdfa4fd2a2f4d5e21e8e8f7ee18795307027efff5f536007ed93a920d52d3cb20b87208R0bJvHMqqbPjVFaWt3VlOxby";

    constructor(private loginService: AuthserviceService,
                private fb: FormBuilder,
                private router: Router) {
    }
    ngOnInit() {
        this.userLogin.addControl('username', new FormControl('', [Validators.required]));
        this.userLogin.addControl('password', new FormControl('', [Validators.required]));
        this.logedUrl = '/dashboard';
        this.loginPage = 'login';
    }
    sendLogReq($vent): void {
        this.formSubmitted = true;
        if (!this.userLogin.valid) {
            return;
        }
        this.loginUser()
    }
    loginUser() {

        const user = new Login();
        var pass = this.userLogin.get('password').value;
        user.username = this.userLogin.get('username').value;
        user.password = this.passEncrypt(this.keys, pass);
        this.loginService.loginUser(user).subscribe(
            (response) => {
                // @ts-ignore
                this.message = response;
                // @ts-ignore
                if (this.message.message == 'success' && this.message.code == 200) {
                    localStorage.setItem('isLoggedIn', 'true');
                    // @ts-ignore
                    localStorage.setItem('token', this.message.results.username);
                    this.router.navigate([this.logedUrl]);
                } else {
                    this.failed = true;
                    // @ts-ignore
                    this.message = response.results;
                    console.log(this.message);
                    this.router.navigate([this.loginPage]);
                }
            });
    }
    passEncrypt(passphrase, plain_text) {
        var salt = CryptoJS.lib.WordArray.random(256);
        var iv = CryptoJS.lib.WordArray.random(16);
        var key = CryptoJS.PBKDF2(passphrase, salt, {hasher: CryptoJS.algo.SHA512, keySize: 64 / 8, iterations: 999});
        var encrypted = CryptoJS.AES.encrypt(plain_text, key, {iv: iv});
        var data = {
            ciphertext: CryptoJS.enc.Base64.stringify(encrypted.ciphertext),
            salt: CryptoJS.enc.Hex.stringify(salt),
            iv: CryptoJS.enc.Hex.stringify(iv)
        }
        return data;
    }
}
