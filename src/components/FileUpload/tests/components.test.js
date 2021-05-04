import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FileUploadContainer from '..';
import FileUpload from '../components/FileUpload';
import AcceptedFileTypeMessage from '../components/DefaultLabel/AcceptedFileTypeMessage';
import ErrorMessages from '../components/DefaultLabel/ErrorMessages';
import DefaultLabel from '../components/DefaultLabel';
import LabelMessage from '../components/DefaultLabel/LabelMessage';
import FileImages from '../components/FileImages';
import FileImage from '../components/FileImages/FileImage';

const mockFile = new File([''], 'testFile', { type: 'application/pdf', size: 0 });
const mockLargeFile = {
  key: 'large',
  name: 'large',
  url: 'large.com',
  type: 'application/pdf',
  href: 'large.com',
  size: 1000,
};

const mountWithContext = (children, props = {}) => render(
  <FileUploadContainer {...props}>{children}</FileUploadContainer>,
);

let wrapper;
let props;
describe('Components', () => {
  beforeEach(() => {
    global.URL.createObjectURL = jest.fn();
  });

  describe('FileUploadContainer', () => {
    beforeEach(() => {
      props = {};
      wrapper = render(<FileUploadContainer {...props} />);
    });
    it('Should render', () => {
      expect(wrapper).toBeDefined();
    });
  });

  describe('FileUpload', () => {
    const onChange = jest.fn();
    const onError = jest.fn();
    beforeEach(() => {
      props = { accept: '*' };
      wrapper = mountWithContext(<FileUpload {...props} />, {
        inDropZone: true,
        disabled: false,
        fileLimit: 2,
        fileSizeLimit: 100,
        onError,
        onChange,
      });
    });

    it('Should render', () => {
      expect(wrapper).toBeDefined();
    });

    it('Should allow a file to be uploaded when clicked', () => {
      const event = { target: { files: [mockFile, mockLargeFile, mockFile] } };
      const input = wrapper.container.querySelector('input');
      userEvent.click(input);
      fireEvent.change(input, event);
      expect(input).toBeDefined();
      expect(onChange).toHaveBeenCalled();
      expect(onError).toHaveBeenCalled();
    });

    it('Should allow files to be uploaded when dropped', () => {
      const clearData = jest.fn();
      const event = { dataTransfer: { files: [mockFile], clearData } };
      const input = wrapper.container.querySelector('input');
      fireEvent.drop(input, event);
      expect(input).toBeDefined();
      expect(clearData).toHaveBeenCalled();
    });

    it('Should not allow files to be uploaded when dropped and disabled', () => {
      wrapper = mountWithContext(<FileUpload {...props} />, { inDropZone: true, disabled: true });
      const clearData = jest.fn();
      const event = { dataTransfer: { files: [mockFile], clearData } };
      const input = wrapper.container.querySelector('input');
      fireEvent.drop(input, event);
      expect(input).toBeDefined();
      expect(clearData).toHaveBeenCalledTimes(0);
    });

    it('Should allow files to be uploaded when dragged', () => {
      const event = { dataTransfer: { dropEffect: '' } };
      const input = wrapper.container.querySelector('input');
      fireEvent.dragOver(input, event);
      expect(input).toBeDefined();
    });

    it('Should not allow files to be uploaded when dragged and disabled', () => {
      wrapper = mountWithContext(<FileUpload {...props} />, { inDropZone: true, disabled: true });
      const event = { dataTransfer: { dropEffect: '' } };
      const input = wrapper.container.querySelector('input');
      fireEvent.dragOver(input, event);
      expect(input).toBeDefined();
    });

    it('Should handle onDragEnter/Leave', () => {
      wrapper = mountWithContext(<FileUpload {...props} />, { inDropZone: false, disabled: false });
      const input = wrapper.container.querySelector('input');
      fireEvent.dragEnter(
        input,
        new MouseEvent('dragenter', {
          bubbles: true,
          cancelable: true,
          clientX: 0,
          clientY: 0,
        }),
      );
      fireEvent.dragLeave(
        input,
        new MouseEvent('dragleave', {
          bubbles: true,
          cancelable: true,
          clientX: 100,
          clientY: 100,
        }),
      );
      expect(input).toBeDefined();
    });

    it('Should not handle onDragEnter/Leave and disabled', () => {
      wrapper = mountWithContext(<FileUpload {...props} />, { inDropZone: true, disabled: true });
      const currentTarget = document.createElement('div');
      const relatedTarget = document.createElement('div');
      const event = { currentTarget, relatedTarget };
      const input = wrapper.container.querySelector('input');
      fireEvent.dragEnter(input, event);
      fireEvent.dragLeave(input, event);
      expect(input).toBeDefined();
    });
  });

  describe('AcceptedFileTypeMessage', () => {
    beforeEach(() => {
      props = {};
      wrapper = mountWithContext(<AcceptedFileTypeMessage {...props} />);
    });

    it('Should render', () => {
      expect(wrapper).toBeDefined();
    });
  });

  describe('ErrorMessages', () => {
    beforeEach(() => {
      props = {};
      wrapper = mountWithContext(<ErrorMessages {...props} />);
    });

    it('Should render', () => {
      expect(wrapper).toBeDefined();
    });
  });

  describe('DefaultLabel', () => {
    beforeEach(() => {
      props = {};
      wrapper = mountWithContext(<DefaultLabel {...props} />);
    });

    it('Should render', () => {
      expect(wrapper).toBeDefined();
    });

    it('Should allow the file upload icon to upload a file when clicked', () => {
      const uploadIcon = wrapper.container.querySelector('svg');
      userEvent.click(uploadIcon);
      expect(uploadIcon).toBeDefined();
    });
  });

  describe('LabelMessage', () => {
    beforeEach(() => {
      props = {};
      wrapper = mountWithContext(<LabelMessage {...props} />);
    });

    it('Should render', () => {
      expect(wrapper).toBeDefined();
    });
  });

  describe('FileImages', () => {
    beforeEach(() => {
      const mockPdf = {
        key: 'pdf',
        name: 'pdf',
        url: 'pdf.com',
        type: 'application/pdf',
        href: 'pdf.com',
      };
      const mockVideo = {
        key: 'video',
        name: 'video',
        url: 'video.com',
        type: 'video/mp4',
        href: 'video.com',
      };
      const mockAudio = {
        key: 'audio',
        name: 'audio',
        url: 'audio.com',
        type: 'audio/mp3',
        href: 'audio.com',
      };
      const mockText = {
        key: 'text',
        name: 'text',
        url: 'text.com',
        type: 'text/plain',
        href: 'text.com',
      };
      props = {};
      wrapper = mountWithContext(<FileImages {...props} />, {
        fileList: [mockFile, mockPdf, mockVideo, mockAudio, mockText],
        onDelete: false,
        showFileNames: true,
      });
    });

    it('Should render', () => {
      expect(wrapper).toBeDefined();
    });
  });

  describe('FileImage', () => {
    const mockFileWithHref = {
      key: 'href',
      name: 'href',
      url: 'href.com',
      type: 'image/png',
      href: 'href.com',
    };
    const mockFileWithOnClick = {
      key: 'onClick',
      name: 'onClick',
      url: 'onClick.com',
      type: 'image/png',
      onClick: jest.fn(),
    };
    const onDelete = jest.fn();
    beforeEach(() => {
      props = { fileIndex: 0 };
      wrapper = mountWithContext(<FileImage {...props} />, {
        fileList: [mockFile, mockFileWithHref, mockFileWithOnClick],
        onDelete,
      });
    });
    it('Should handle a file onClick', () => {
      const fileWrapper = wrapper.getByTestId(`fileWrapper-${mockFileWithOnClick.key}`);
      userEvent.click(fileWrapper);
      expect(wrapper).toBeDefined();
      expect(mockFileWithOnClick.onClick).toHaveBeenCalled();
    });
    it('Should handle a file being deleted', () => {
      const deleteIcon = wrapper.getByTestId(`deleteIcon-${mockFileWithOnClick.key}`);
      userEvent.click(deleteIcon);
      expect(wrapper).toBeDefined();
      expect(onDelete).toHaveBeenCalled();
    });
  });
});
