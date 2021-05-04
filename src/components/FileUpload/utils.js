import { red, blue, grey } from '@material-ui/core/colors';

export const FILE_LIMIT_EXCEEDED = 'FILE_LIMIT_EXCEEDED';
export const FILE_SIZE_LIMIT_EXCEEDED = 'FILE_SIZE_LIMIT_EXCEEDED';
export const FILE_EXTENSION_IS_WRONG = 'FILE_EXTENSION_IS_WRONG';

export const DROP_ZONE_MIN_HEIGHT = 140;
export const DROP_ZONE_MAX_HEIGHT = 1600;
export const FILE_IMAGE_HEIGHT = 100;
export const FILE_IMAGE_WIDTH = 160;
export const OPAQUE = 0.7;

export const LIGHT_BLUE = blue[400];
export const BLUE = blue[500];
export const RED = red[500];
export const LIGHT_GREY = '#cfd8dc';
export const GREY = grey[600];

export const preventDefaults = (e) => {
  e.preventDefault();
  e.stopPropagation();
};

export const formatBytes = (bytes, decimals = bytes % 10 === 0 ? 0 : 2) => {
  if (bytes === 0) return '0B';
  const fix = decimals < 0 ? 0 : decimals;
  const d = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${parseFloat((bytes / (1024 ** d)).toFixed(fix))}${
    ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][d]
  }`;
};

export const getAcceptedFileTypes = accept => accept.replace(/\s/g, '').split(',');

export const getMimeTypeFromFileType = (fileType) => {
  if (typeof fileType !== 'string') {
    return '';
  }
  const split = fileType.replace(/\s/g, '').split('/');
  let [mimeType] = split;
  if (mimeType === 'application') {
    mimeType = 'document';
  }
  return mimeType.toUpperCase();
};

export const getExtensionFromFileType = (mimeType) => {
  if (!mimeType) return mimeType;
  const split = mimeType.replace(/\s/g, '').replace('.', '/').split('/');
  const extension = (split.length > 0 && split[1]) || '';

  return extension.toUpperCase();
};

export const validFileExtension = (file, accept) => {
  if (!accept) return true;
  const notFileInstance = !(file instanceof File);
  const extension = getExtensionFromFileType(file.type);
  const mimeTypes = getAcceptedFileTypes(accept);

  const validExtension = mimeTypes.some((mime) => {
    if (notFileInstance && mime.toUpperCase().split('/').includes(extension)) {
      return true;
    }
    return new RegExp(mime, 'i').test(file.type);
  });
  return validExtension;
};

export const isImage = (file) => {
  const imageRegex = /(image)|(gif|jpe?g|tiff?|png|webp|bmp)$/i;
  const extension = getExtensionFromFileType(file.type);
  if (imageRegex.test(extension)) {
    return true;
  }
  if (imageRegex.test(file.name)) {
    return true;
  }

  return false;
};

export const isPdf = (file) => {
  const pdfRegex = /(pdf)$/i;
  const extension = getExtensionFromFileType(file.type);
  if (pdfRegex.test(extension)) {
    return true;
  }
  if (pdfRegex.test(file.name)) {
    return true;
  }

  return false;
};

export const getAcceptedFileTypeMessage = (accept) => {
  if (!accept) return '';
  const [firstFileType, ...restOfFileTypes] = getAcceptedFileTypes(accept);
  let firstFileExtention = getExtensionFromFileType(firstFileType);
  if (firstFileExtention === '*') {
    firstFileExtention = getMimeTypeFromFileType(firstFileType);
  }
  const acceptedFileTypeMessage = restOfFileTypes.reduce((acc, fileType, i) => {
    const isLastElement = i + 1 === restOfFileTypes.length;

    let extension = getExtensionFromFileType(fileType);
    if (!extension) {
      if (isLastElement) {
        // insert 'or' before the previous string
        const accArray = acc.split(',');
        return accArray.map((s, j) => {
          const lastELement = j + 1 === accArray.length;
          return lastELement ? ` or${s}` : s;
        }).join(',');
      }
      return acc;
    }

    if (extension === '*') {
      extension = getMimeTypeFromFileType(fileType);
    }

    return acc.concat(`, ${isLastElement ? 'or ' : ''}${extension.toUpperCase()}`);
  }, firstFileExtention);
  return acceptedFileTypeMessage;
};

export const getErrorListItemDetail = (errorMessage, file) => {
  switch (errorMessage.id) {
    case FILE_LIMIT_EXCEEDED:
      return '';
    case FILE_SIZE_LIMIT_EXCEEDED:
      return formatBytes(file.size, 0);
    case FILE_EXTENSION_IS_WRONG:
      return file.type;
    default:
      return '';
  }
};

export const getStylesFromProps = (styleClass, defaultStyles = {}) => {
  if (!styleClass) {
    return defaultStyles;
  }

  if (typeof styleClass === 'string') {
    return styleClass;
  }

  if (typeof styleClass === 'object') {
    return {
      ...defaultStyles,
      ...styleClass,
    };
  }

  return defaultStyles;
};
