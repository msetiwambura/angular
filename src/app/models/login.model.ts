export class Login {
    username: string;
    password: { ciphertext: string; salt: string; iv: string };
}
