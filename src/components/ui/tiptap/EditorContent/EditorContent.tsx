import './EditorContent.scss' // Assuming you have styles defined in 'styles.scss'

import { Editor, EditorContent } from '@tiptap/react'
import React from 'react'
import Avatar from '../../avatar-uploader/AvatarUploader'

interface IEditorContent {
	editor: Editor | null
	imgPath?: string
	label?: string
	onUploadFile?: (data: any) => void
}

const EditorComponent: React.FC<IEditorContent> = ({
	editor,
	label,
	onUploadFile,
	imgPath
}) => {
	return (
		<>
			{/* <button onClick={addImage}>add image from URL</button> */}
			<Avatar
				buttonStyle
				insideIcon
				imgPath={imgPath}
				onUploadFile={onUploadFile}
			/>
			<EditorContent editor={editor} />
		</>
	)
}

export default EditorComponent
