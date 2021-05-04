import {
  formatBytes,
  getAcceptedFileTypes,
  getMimeTypeFromFileType,
  getExtensionFromFileType,
  validFileExtension,
  isImage,
  isPdf,
  getAcceptedFileTypeMessage,
  getErrorListItemDetail,
  FILE_LIMIT_EXCEEDED,
  FILE_SIZE_LIMIT_EXCEEDED,
  FILE_EXTENSION_IS_WRONG,
  getStylesFromProps,
} from '../utils';

describe('utils', () => {
  describe('formatBytes', () => {
    it('Should return 0KB with no decimal', () => {
      const expected = '0B';
      const result = formatBytes(0);
      expect(result).toBe(expected);
    });
    it('Should return the right KB', () => {
      const expected = '5KB';
      const result = formatBytes(5000);
      expect(result).toBe(expected);
    });

    it('Should return the right KB', () => {
      const expected = '4.88KB';
      const result = formatBytes(5001);
      expect(result).toBe(expected);
    });

    it('Should return the right KB and fix the decimal', () => {
      const expected = '5KB';
      const result = formatBytes(5001, -100);
      expect(result).toBe(expected);
    });
  });

  describe('getAcceptedFileTypes', () => {
    it('Should return an array of strings', () => {
      const accept = 'text/html, application/pdf';
      const expected = ['text/html', 'application/pdf'];
      const result = getAcceptedFileTypes(accept);
      expect(result).toMatchObject(expected);
    });
  });

  describe('getMimeTypeFromFileType', () => {
    it('Should the right string', () => {
      const fileType = 'text/html';
      const expected = 'TEXT';
      const result = getMimeTypeFromFileType(fileType);
      expect(result).toBe(expected);
    });

    it('Should default to empty string', () => {
      const fileType = false;
      const expected = '';
      const result = getMimeTypeFromFileType(fileType);
      expect(result).toBe(expected);
    });
  });

  describe('getExtensionFromFileType', () => {
    it('Should return an empty string with no mimeType', () => {
      const mimeType = '';
      const expected = '';
      const result = getExtensionFromFileType(mimeType);
      expect(result).toBe(expected);
    });
    it('Should return the right string extension with a "/" delineator', () => {
      const mimeType = 'application/pdf';
      const expected = 'PDF';
      const result = getExtensionFromFileType(mimeType);
      expect(result).toBe(expected);
    });

    it('Should return the right string extension with a "." delineator', () => {
      const mimeType = '.doc';
      const expected = 'DOC';
      const result = getExtensionFromFileType(mimeType);
      expect(result).toBe(expected);
    });

    it('Should return an empty string with no delineator', () => {
      const mimeType = 'doc';
      const expected = '';
      const result = getExtensionFromFileType(mimeType);
      expect(result).toBe(expected);
    });
  });

  describe('validFileExtension', () => {
    it('Should return true when file type is valid', () => {
      const file = new File([''], 'testFile', { type: 'application/pdf' });
      const accept = 'text/html, application/pdf';
      const expected = true;
      const result = validFileExtension(file, accept);
      expect(result).toBe(expected);
    });

    it('Should return true when file type is valid', () => {
      const file = { name: 'testFile', type: 'application/pdf' };
      const accept = 'pdf';
      const expected = true;
      const result = validFileExtension(file, accept);
      expect(result).toBe(expected);
    });

    it('Should return false when file type is not valid', () => {
      const file = { name: 'testFile', type: 'application/pdf' };
      const accept = 'text/html';
      const expected = false;
      const result = validFileExtension(file, accept);
      expect(result).toBe(expected);
    });
  });

  describe('isImage', () => {
    it('Should return true when file type is valid', () => {
      const file = new File([''], 'testFile', { type: 'image/png' });
      const expected = true;
      const result = isImage(file);
      expect(result).toBe(expected);
    });
    it('Should return true when extension in file name is valid', () => {
      const file = new File([''], 'testFile.png', { type: '' });
      const expected = true;
      const result = isImage(file);
      expect(result).toBe(expected);
    });
  });

  describe('isPdf', () => {
    it('Should return true when file type is valid', () => {
      const file = new File([''], 'testFile', { type: 'application/pdf' });
      const expected = true;
      const result = isPdf(file);
      expect(result).toBe(expected);
    });
    it('Should return true when extension in file name is valid', () => {
      const file = new File([''], 'testFile.pdf', { type: '' });
      const expected = true;
      const result = isPdf(file);
      expect(result).toBe(expected);
    });
  });

  describe('getAcceptedFileTypeMessage', () => {
    it('Should return the right string', () => {
      const accept = 'text/html, application/pdf, .mp4';
      const expected = 'HTML, PDF, or MP4';
      const result = getAcceptedFileTypeMessage(accept);
      expect(result).toBe(expected);
    });

    it("Should return the right string when there is a '*' ", () => {
      const accept = 'text/*, application/*, .mp4, image/*';
      const expected = 'TEXT, DOCUMENT, MP4, or IMAGE';
      const result = getAcceptedFileTypeMessage(accept);
      expect(result).toBe(expected);
    });

    it("Should return the right string when there is a '*' ", () => {
      const accept = 'text/*, application/*, .mp4, asdasd';
      const expected = 'TEXT, DOCUMENT, or MP4';
      const result = getAcceptedFileTypeMessage(accept);
      expect(result).toBe(expected);
    });
  });

  describe('getAcceptedFileTypeMessage', () => {
    it('Should return the right string', () => {
      const errorMessage = { id: FILE_LIMIT_EXCEEDED };
      const file = { size: 4000000 };
      const expected = '';
      const result = getErrorListItemDetail(errorMessage, file);
      expect(result).toBe(expected);
    });
    it('Should return the right string', () => {
      const errorMessage = { id: FILE_SIZE_LIMIT_EXCEEDED };
      const file = { size: 4000000 };
      const expected = '4MB';
      const result = getErrorListItemDetail(errorMessage, file);
      expect(result).toBe(expected);
    });
    it('Should return the right string', () => {
      const errorMessage = { id: FILE_EXTENSION_IS_WRONG };
      const type = 'application/pdf';
      const file = { size: 4000000, type };
      const expected = type;
      const result = getErrorListItemDetail(errorMessage, file);
      expect(result).toBe(expected);
    });

    it('Should return the default string', () => {
      const errorMessage = { id: undefined };
      const type = 'application/pdf';
      const file = { size: 4000000, type };
      const expected = '';
      const result = getErrorListItemDetail(errorMessage, file);
      expect(result).toBe(expected);
    });
  });

  describe('getStylesFromProps', () => {
    it('Should return the default string when class does not exist', () => {
      const styleClass = '';
      const expected = {};
      const result = getStylesFromProps(styleClass);
      expect(result).toMatchObject(expected);
    });
    it('Should return a string when it is using a material ui class', () => {
      const defaultStyles = { dropZone: { textAlign: 'center' } };
      const styleClass = 'some-material-ui-class';
      const expected = styleClass;
      const result = getStylesFromProps(styleClass, defaultStyles);
      expect(result).toBe(expected);
    });
    it('Should return the right object', () => {
      const defaultStyles = { dropZone: { textAlign: 'center' } };
      const styleClass = { dropZone: { textAlign: 'left' } };
      const expected = styleClass;
      const result = getStylesFromProps(styleClass, defaultStyles);
      expect(result).toMatchObject(expected);
    });

    it('Should return the default styles', () => {
      const defaultStyles = { dropZone: { textAlign: 'center' } };
      const styleClass = true;
      const expected = defaultStyles;
      const result = getStylesFromProps(styleClass, defaultStyles);
      expect(result).toMatchObject(expected);
    });
  });
});
