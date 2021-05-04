import React, { useState, useCallback } from 'react';
import { storiesOf } from '@storybook/react';
import { previewTemplate } from 'storybook-addon-preview';
import { withReadme } from 'storybook-readme';
import FileUpload from '.';
import { wrapInThemeProvider } from '../../utils/common';
import FileUploadREADME from './README.md';

storiesOf('CORE|FileUpload', module)
  .addParameters({ options: { theme: {} } })
  .add(
    'Accept pdf and png',
    withReadme(FileUploadREADME, () => wrapInThemeProvider(
      <div className="story-container">
        <div style={{ padding: 40 }}>
          <FileUpload accept=".pdf, .png" fileSizeLimit={4000000} />
        </div>
      </div>,
    )),
    {
      preview: [
        {
          tab: 'FileUpload',
          template: previewTemplate`<FileUpload accept='.pdf, .png' fileSizeLimit={4000000} />`,
          language: 'ts',
          copy: true,
        },
      ],
    },
  );

storiesOf('CORE|FileUpload', module)
  .addParameters({ options: { theme: {} } })
  .add(
    'Custom',
    withReadme(FileUploadREADME, () => {
      const [errorMessage, setErrorMessage] = useState('');
      const [fileList, setFileList] = useState([]);
      const handleOnChange = useCallback((files) => {
        const mappedFiles = files.map(f => ({
          key: f.name,
          name: f.name,
          url: URL.createObjectURL(f),
          type: f.type,
          href: false,
          onClick: false,
        }));
        setFileList(mappedFiles);
      }, []);
      const handleDelete = useCallback((file, index) => {
        setFileList((prevFileList) => {
          const filteredFileList = prevFileList.filter(
            (f, i) => f.name !== file.name || i !== index,
          );

          if (filteredFileList.length === 0) {
            setErrorMessage('');
          }

          return filteredFileList;
        });
      }, []);
      const handleOnError = useCallback((error) => {
        const errors = error.errorMessages.map(e => e.message).join(', ');
        setErrorMessage(errors);
      }, []);
      return wrapInThemeProvider(
        <div className="story-container">
          <div style={{ padding: 40 }}>
            <FileUpload
              fileLimit={5}
              fileSizeLimit={400000}
              fileList={fileList}
              customErrorMessage={errorMessage}
              onChange={handleOnChange}
              onDelete={handleDelete}
              onError={handleOnError}
              multiple
            />
          </div>
        </div>,
      );
    }),
    {
      preview: [
        {
          tab: 'FileUpload',
          template: previewTemplate`
          const [errorMessage, setErrorMessage] = useState('')
const [fileList, setFileList] = useState([])

const handleOnChange = useCallback(files => {
  const mappedFiles = files.map(f => ({
    key: f.name,
    name: f.name,
    url: URL.createObjectURL(f),
    type: f.type,
    href: false,
    onClick: false,
  }))
  setFileList(mappedFiles)
}, [])

const handleDelete = useCallback((file, index) => {
  setFileList((prevFileList) => {
    const filteredFileList = prevFileList.filter(
      (f, i) => f.name !== file.name || i !== index,
    );

    if (filteredFileList.length === 0) {
      setErrorMessage('');
    }

    return filteredFileList;
  });
}, []);

  if (filteredFileList.length === 0) {
    setErrorMessage('');
  }

  return filteredFileList;
}, []);

const handleOnError = useCallback(error => {
  const errors = error.errorMessages.map(e => e.message).join(', ')
  setErrorMessage(errors)
}, [])

return (
  <FileUpload
    fileLimit={5}
    fileSizeLimit={400000}
    fileList={fileList}
    customErrorMessage={errorMessage}
    onChange={handleOnChange}
    onDelete={handleDelete}
    onError={handleOnError}
    multiple={true}
  />
)`,
          language: 'ts',
          copy: true,
        },
      ],
    },
  );
