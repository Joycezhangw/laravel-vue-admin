import * as CryptoJS from 'crypto-js';
import { padEnd } from 'lodash-es';

export default class Crypto {
    /**
     * 解析
     * @param {Sting} aesKey  密钥
     * @returns 
     */
    static parseKey(aesKey) {
        return {
            iv: CryptoJS.enc.Utf8.parse(padEnd('', 16, '0')),
            key: CryptoJS.enc.Utf8.parse(CryptoJS.MD5(aesKey).toString()),
        }
    }

    /**
    * 加密
    * @param {*} value 加密值
    * @param {*} aesKey key
    * @returns 
    */
    static aesEncrypt(value, aesKey) {
        const {
            iv,
            key,
        } = this.parseKey(aesKey);
        const cipherText = CryptoJS.AES.encrypt(value, key, {
            iv
        }).toString();

        return cipherText;
    }

    /**
     * 对字符串进行解密
     * @param {String} value 
     * @param {String} aesKey 
     * @returns 
     */
    static aesDecrypt(value, aesKey) {
        const {
            iv,
            key
        } = this.parseKey(aesKey);
        const bytes = CryptoJS.AES.decrypt(value, key, {
            iv
        });
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

        return decryptedData;
    }

    /**
   * 对json进行加密
   * @param {Object} data 
   * @param {String} aesKey 
   * @returns 
   */
    static aesEncryptJson(data, aesKey) {
        const { iv, key } = this.parseKey(aesKey);
        const cipherText = CryptoJS.AES.encrypt(JSON.stringify(data), key, { iv }).toString();
        return cipherText;
    }

    /**
     * 解密转json
     * @param {String} data 
     * @param {String} aesKey 
     * @returns 
     */
    static aesDecryptJson(data, aesKey) {
        const { iv, key } = this.parseKey(aesKey);
        const bytes = CryptoJS.AES.decrypt(data, key, { iv });
        const decryptedValue = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return decryptedValue;
    }

}