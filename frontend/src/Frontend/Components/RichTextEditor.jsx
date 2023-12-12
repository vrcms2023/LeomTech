import React, { useEffect, useState } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


const RichTextEditor = ({
    RichEditorState
}) => {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

    useEffect(()=>{
        RichEditorState(editorState.getCurrentContent())
    },[editorState])
    

    return (
        <Editor
            defaultEditorState={editorState}
            editorState={editorState}
            onEditorStateChange={setEditorState}
      />
    )
}

export default RichTextEditor