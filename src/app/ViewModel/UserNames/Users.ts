export class Users {

  private static lastId = 0;
  private domain: string;
  private name: string;
  private id: number;
  private password: string;
  private passwordStrength: string;

  constructor(name: string, password: string, domain: string) {
    this.domain = domain;
    this.name = name;
    this.id = Users.getId();
    this.password = password;
    this.passwordStrength = Users.calcPasswordStrength(password);
  }

  private static calcPasswordStrength(password: string): string {
    const strengthValue = {
      caps: false,
      length: false,
      special: false,
      numbers: false,
      small: false
    };
    const strength = {
      1: 'Very Weak',
      2: 'Weak',
      3: 'Medium',
      4: 'Strong',
      5: 'Very Strong'
    };
    for (let index = 0; index < password.length; index++) {
      const char = password.charCodeAt(index);
      if (!strengthValue.caps && char >= 65 && char <= 90) {
        strengthValue.caps = true;
      } else if (!strengthValue.numbers && char >= 48 && char <= 57) {
        strengthValue.numbers = true;
      } else if (!strengthValue.small && char >= 97 && char <= 122) {
        strengthValue.small = true;
      } else if (!strengthValue.numbers && char >= 48 && char <= 57) {
        strengthValue.numbers = true;
      } else if (!strengthValue.special && (char >= 33 && char <= 47) || (char >= 58 && char <= 64)) {
        strengthValue.special = true;
      }
    }
    let strengthIndicator = 0;
    for (const metric in strengthValue) {
      if (strengthValue[metric] === true) {
        strengthIndicator++;
      }
    }
    return strength[strengthIndicator];
  }

  private static getId(): number {
    return Users.lastId++;
  }

  public getId() {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getPassword(): string {
    return this.password;
  }

  public getDomain(): string {
    return this.domain;
  }

  public setDomain(domain: string): void {
    this.domain = domain;
  }

  public getPasswordStrength(): string {
    return this.passwordStrength;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public setPassword(password: string): void {
    this.password = password;
  }
}
