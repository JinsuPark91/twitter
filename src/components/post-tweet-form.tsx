import { useState } from "react";
import styled from "styled-components"
import GDriveButton from "./googleDrive-button";

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap:10px;
`;

const TextArea = styled.textarea`
    border: 2px solid white;
    padding: 20px;
    border-radius: 20px;
    font-size: 16px;
    color: white;
    background-color: black;
    width: 100%;
    resize: none;
    &::placeholder{
        font-size: 16px;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    &:focus{
        outline: none;
        border-color: #139bf0;
    }
`

const AttachFileButton = styled.label`
    padding: 10px 0px;
    color: #139bf0;
    text-align: center;
    border-radius: 20px;
    border: 1px solid #139bf0;
    font-size: 15px;
    font-weight: 600;
    cursor:pointer;


`

const AttachFileInput = styled.input`
    display: none;
`

const SubmitBtn = styled.input`
    background-color: #139bf0;
    color: white;
    border:none;
    padding: 10px 0px;
    border-radius: 20px;
    font-size: 16px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    cursor: pointer;
    &:hover,&:active{
        opacity: 0.8;
    }
`

const Wrapper = styled.div``

export default function PostTweetForm() {

    const [isLoading, setLodaing] = useState(false);
    const [tweet, setTweet] = useState('');
    const [file, setFile] = useState(null);

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTweet(e.target.value);
    }

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = setFile(e?.target);

        if (files && files.length === 1) {
            setFile(files[0]);
        }
    }

    return <Wrapper>

        <Form>
            <TextArea
                rows={5}
                maxLength={180}
                onChange={onChange}
                value={tweet}
                placeholder="what is happening" />
            <AttachFileButton htmlFor="file">{file ? "Photo Added 🆒" : "Add Photo"}</AttachFileButton >
            <AttachFileInput id="file" type="file" accept="image/*" onChange={onFileChange} />
            <SubmitBtn
                value={isLoading ? "Posting..." : "Post Tweet"}
                type="submit" />
        </Form>
        <GDriveButton></GDriveButton>
    </Wrapper>
}