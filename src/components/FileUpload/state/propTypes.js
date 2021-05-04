import PropTypes from 'prop-types';

export const materialUiClassOrJssClassPropType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.objectOf(PropTypes.stirng),
]);

export const filePropType = PropTypes.oneOfType([
  PropTypes.instanceOf(File),
  PropTypes.shape({
    key: PropTypes.string,
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    href: PropTypes.bool,
    onClick: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  }),
]);

export const fileListPropType = PropTypes.arrayOf(filePropType);

export const errorMessagesPropType = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.string,
    message: PropTypes.string,
    files: fileListPropType,
  }),
);

export const errorPropType = PropTypes.shape({
  errorMessages: errorMessagesPropType,
  hasInvalidFileCount: PropTypes.bool,
  hasInvalidFileExtension: PropTypes.bool,
  hasInvalidFileSize: PropTypes.bool,
});

export const childrenPropTypes = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.element,
  PropTypes.node,
  PropTypes.func,
  PropTypes.symbol,
  PropTypes.object,
  PropTypes.elementType,
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.arrayOf(PropTypes.element),
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.arrayOf(PropTypes.func),
  PropTypes.arrayOf(PropTypes.symbol),
  PropTypes.arrayOf(PropTypes.object),
  PropTypes.arrayOf(PropTypes.elementType),
]);

export const classesPropType = PropTypes.shape({
  dropZone: materialUiClassOrJssClassPropType,
  inputButton: materialUiClassOrJssClassPropType,
  fileImageContainer: materialUiClassOrJssClassPropType,
  input: materialUiClassOrJssClassPropType,
  labelContainer: materialUiClassOrJssClassPropType,
  label: materialUiClassOrJssClassPropType,
  uploadIcon: materialUiClassOrJssClassPropType,
  errorMessagesListContainer: materialUiClassOrJssClassPropType,
  errorMessageHeader: materialUiClassOrJssClassPropType,
  errorMessagesList: materialUiClassOrJssClassPropType,
  labelMessage: materialUiClassOrJssClassPropType,
  fileImageItem: materialUiClassOrJssClassPropType,
  deleteIcon: materialUiClassOrJssClassPropType,
  file: materialUiClassOrJssClassPropType,
  fileName: materialUiClassOrJssClassPropType,
  fileImage: materialUiClassOrJssClassPropType,
  fileWrapper: materialUiClassOrJssClassPropType,
  acceptedFileTypeMessage: materialUiClassOrJssClassPropType,
});

export const FileUploadPropTypes = {
  classes: classesPropType,
  onChange: PropTypes.func,
  // If false then the <Delete /> icon is not rendered in the FileImages component
  onDelete: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  onError: PropTypes.func,
  children: childrenPropTypes,
  showDefaultLabel: PropTypes.bool,
  accept: PropTypes.string,
  multiple: PropTypes.bool,
  disabled: PropTypes.bool,
  showFileNames: PropTypes.bool,
  inDropZone: PropTypes.bool.isRequired,
  fileLimit: PropTypes.number,
  fileSizeLimit: PropTypes.number,
  fileList: fileListPropType,
};

export const FileUploadDefualtProps = {
  // Custom classes passed in from props
  classes: {
    dropZone: '',
    inputButton: '',
    fileImageContainer: '',
    input: '',
    labelContainer: '',
    label: '',
    uploadIcon: '',
    errorMessagesListContainer: '',
    errorMessageHeader: '',
    errorMessagesList: '',
    labelMessage: '',
    fileImageItem: '',
    deleteIcon: '',
    file: '',
    fileName: '',
    fileImage: '',
    fileWrapper: '',
    acceptedFileTypeMessage: '',
  },
  onChange: undefined,
  onDelete: undefined,
  onError: undefined,
  children: undefined,
  showDefaultLabel: true,
  accept: '',
  multiple: true,
  disabled: false,
  showFileNames: false,
};
