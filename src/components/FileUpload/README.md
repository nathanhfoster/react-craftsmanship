## FileUpload

This FileUpload has the ability to upload multiple files and be a controlled or uncontrolled component.


### Props
The component takes the following props:
  - classes: object with the following classes
    - dropZone: string || object
    - inputButton: string || object
    - fileImageContainer: string || object
    - input: string || object
    - labelContainer: string || object
    - label: string || object
    - uploadIcon: string || object
    - errorMessagesListContainer: string || object
    - errorMessageHeader: string || object
    - errorMessagesList: string || object
    - labelMessage: string || object
    - fileImageItem: string || object
    - deleteIcon: string || object
    - file: string || object
    - fileName: string || object
    - fileImage: string || object
    - fileWrapper: string || object
    - acceptedFileTypeMessage: string || object
  - onChange: - function
    - Calls function when a file(s) is uploaded.
  - onDelete: - function
    - Calls function when a file's delete icon is clicked.
  - onError: - function
    - Calls function when there are files that fail validation.
  - children: - node
    - child elements passed that will be the last rendered element(s) rendered inside the component
  - showDefaultLabel: boolean
    - Conditionally renders the that condatins the upload icon and accepted file type message
  - accept: string
    - String that contained all the accepted file types. Delinated with a ","
  - showFileNames: boolean
    - Conditionally renders uploaded file names.

    For Example
    <pre><code>
        accept=".pdf, .png"

        Will only accept pdf and png files
    </code></pre>
  - multiple: - boolean
    - Toggles if the component accepts multiple files to be uploaded or just one.
  - disabled: boolean
    - If true, the component will not be clickable or able to upload files dragged over it.
  - inDropZone: - boolean
    - Represents if files are dragged inside the drop zone area.
    - This is handled internally
  - fileLimit: - number
    - The maximum number of files that can be uploaded
  - fileSizeLimit: - number
    - The maximum byte file size that can be uploaded 
  - fileList: - arrayOf(File || object)
    - The uploaded list of files.