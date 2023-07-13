module.exports = {
    decodeBase64(b64string) {
      const buf = Buffer.from(b64string, 'base64').toString('utf-8');
      return buf;
    },
};