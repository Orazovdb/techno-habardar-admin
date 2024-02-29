import { BASE_IMG_URL } from '@/api/axiosInstance'
import { Color } from '@tiptap/extension-color'
import Document from '@tiptap/extension-document'
import Dropcursor from '@tiptap/extension-dropcursor'
import Image from '@tiptap/extension-image'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import TextStyle from '@tiptap/extension-text-style'
import { EditorProvider, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import IconComponent from '../icon/Icon'
import EditorComponent from './EditorContent/EditorContent'
import './TipTap.scss'

const MenuBar = () => {
	const { editor } = useCurrentEditor()
	if (!editor) {
		return null
	}

	const uploadFile = (file: any) => {
		console.log(file)

		editor
			?.chain()
			.focus()
			.setImage({ src: `${BASE_IMG_URL + file.slice(7)}` })
			.run()
	}

	return (
		<div className='buttons'>
			<button
				onClick={() => editor.chain().focus().toggleBold().run()}
				disabled={!editor.can().chain().focus().toggleBold().run()}
				className={editor.isActive('bold') ? 'is-active' : ''}
			>
				<IconComponent icon='bold' />
			</button>
			<button
				onClick={() => editor.chain().focus().toggleItalic().run()}
				disabled={!editor.can().chain().focus().toggleItalic().run()}
				className={editor.isActive('italic') ? 'is-active' : ''}
			>
				<IconComponent icon='italic' />
			</button>
			<button
				onClick={() => editor.chain().focus().toggleStrike().run()}
				disabled={!editor.can().chain().focus().toggleStrike().run()}
				className={editor.isActive('strike') ? 'is-active' : ''}
			>
				<IconComponent icon='strike' />
			</button>
			<button
				onClick={() => editor.chain().focus().setParagraph().run()}
				className={editor.isActive('paragraph') ? 'is-active' : ''}
			>
				<IconComponent icon='paragraph' />
			</button>
			<button
				onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
				className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
			>
				h1
			</button>
			<button
				onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
				className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
			>
				h2
			</button>
			<button
				onClick={() => editor.chain().focus().toggleBulletList().run()}
				className={editor.isActive('bulletList') ? 'is-active' : ''}
			>
				<IconComponent icon='bulletList' />
			</button>
			<button
				onClick={() => editor.chain().focus().toggleOrderedList().run()}
				className={editor.isActive('orderedList') ? 'is-active' : ''}
			>
				<IconComponent icon='orderedList' />
			</button>
			<button
				onClick={() => editor.chain().focus().toggleBlockquote().run()}
				className={editor.isActive('blockquote') ? 'is-active' : ''}
			>
				<IconComponent icon='blockquote' />
			</button>
			{/* <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
				Линия
			</button> */}
			<button onClick={() => editor.chain().focus().setHardBreak().run()}>
				<IconComponent icon='br' />
			</button>
			<EditorComponent editor={editor} onUploadFile={uploadFile} />
		</div>
	)
}
const extensions = [
	Color.configure({ types: ['textStyle', 'listItem'] }),
	Document,
	Paragraph,
	Text,
	Image,
	Dropcursor,
	TextStyle.configure({}),
	StarterKit.configure({
		bulletList: {
			keepMarks: true,
			keepAttributes: false
		},
		orderedList: {
			keepMarks: true,
			keepAttributes: false
		}
	})
]

const TipTap = ({ content }: { content: string }): JSX.Element => {
	return (
		<div className='tiptap-wrapper'>
			<EditorProvider o content={content} extensions={extensions}>
				<MenuBar />
			</EditorProvider>
		</div>
	)
}

export default TipTap
