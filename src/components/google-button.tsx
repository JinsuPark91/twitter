import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { styled } from "styled-components"
import { auth } from "../firebase"
import { useNavigate } from "react-router-dom"
import { gapi } from 'gapi-script';
import { SetStateAction, useState } from "react";

const Button = styled.span`
    background-color: white;
    font-weight: 500;
    width: 100%;
    margin-top: 30px;
    color: black;
    padding: 10px 20px;
    border-radius: 50px;
    border: 0;
    display: flex;
    gap : 5px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`
const Logo = styled.img`
    height: 25px;
`

export default function GoogleButton() {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [files, setFiles] = useState([]);


    const navigate = useNavigate();
    const onClick = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider)
            navigate('/');
        } catch (e) {
            console.log(e)
        }

        async function start() {
            gapi.client.init({
                apiKey: import.meta.env.VITE_API_KEY,
                clientId: import.meta.env.VITE_CLIENT_ID,
                discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
                scope: import.meta.env.VITE_SCOPES,
            }).then(() => {
                const authInstance = gapi.auth2.getAuthInstance();
                setIsSignedIn(authInstance.isSignedIn.get());
                authInstance.isSignedIn.listen(setIsSignedIn);
                authInstance.signIn();
            });
        }

        await gapi.load("client:auth2", start);
    }

    const handleLogin = async () => {
        gapi.auth2.getAuthInstance().signIn();
    };

    const handleLogout = () => {
        gapi.auth2.getAuthInstance().signOut();
    };

    const listFiles = () => {
        gapi.client.drive.files.list({
            pageSize: 10,
            fields: "nextPageToken, files(id, name)",
        }).then((response: { result: { files: SetStateAction<never[]>; }; }) => {
            setFiles(response.result.files);
        });
    };

    return (<Button onClick={onClick}>
        <Logo src="/google.svg" />
        Continue with Google
    </Button>)
}