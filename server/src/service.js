const db = require('./db');

class Service {
  constructor() {
    this.db = db;
  }

  checkUrl(input){
    const pattern = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g;
    return !!input.match(pattern);
  }

  getUrl(code) {
    const sql = `SELECT * FROM url WHERE code='${code}'`;

    return this.db.query(sql);
  }

  async findUrl(code) {
    const sql = `SELECT * FROM url WHERE code='${code}'`;

    const result = await this.db.query(sql);

    if (!result.rowCount) {
      const error = new Error(`Couldn't find an URL for code ${code}`);
      error.status = 404;
      throw error;
    }

    return result.rows[0].url;
  }

  async createShortUrl(url) {
    const code = await this.generateUniqueCode();
    const sql = `INSERT INTO url (url, code, created_on) VALUES ('${url}', '${code}', NOW())`;

    try {
      const result = await this.db.query(sql);
      if (!result.rowCount) {
        const error = new Error(`Couldn't create a short URL`);
        error.status = 400;
        throw error;
      }

      return code;
    } catch (e) {
      console.log(`There was a problem to create a new URL`, e);
      throw e;
    }
  }

  // Generates a string of N characters
  // A character can be a lowecase letter, uppercase letter or a number
  generateRandomCode(length) {
    let code = '';

    const table = {
      type: ['lowercase', 'uppercase', 'number'],
      lowercase: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
      uppercase: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'W', 'V', 'X', 'Y', 'Z'],
      number: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    };

    let type, typeIndex, typeKey, char, charIndex;
    for (var i = 0; i < length; i++) {
      typeIndex = this.getRandomInt(0, table.type.length - 1);
      typeKey = table.type[typeIndex];
      type = table[typeKey];
      charIndex = this.getRandomInt(0, type.length - 1);
      char = type[charIndex];

      code += char;
    }

    return code;
  }

  // Get a random integer between a range
  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Generates a random code, check if there is already an URL assigned to it
  // If there is no URL assigned, repeat the script, else return code
  async generateUniqueCode() {
    const code = this.generateRandomCode(8);
    const urlResult = await this.getUrl(code);
    const codeExists = urlResult.rows.length > 0;

    if (codeExists) return await this.generateUniqueCode();
    return code;
  }
}

module.exports = Service;