import { styled } from "styled-components";
import { gapi } from 'gapi-script';
import { SetStateAction, useEffect, useState } from "react";


const Button = styled.button`
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
export default function GDriveButton() {
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        function initializeGapiClient() {
            gapi.client
                .init({
                    apiKey: import.meta.env.VITE_API_KEY,
                    clientId: import.meta.env.VITE_CLIENT_ID,
                    discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
                    scope: import.meta.env.VITE_SCOPES,
                })
                .then(() => {
                    const authInstance = gapi.auth2.getAuthInstance();
                    setIsSignedIn(authInstance.isSignedIn.get()); // 로그인 상태 설정
                    authInstance.isSignedIn.listen(setIsSignedIn); // 로그인 상태 변화 감지
                    console.log(gapi.client)
                });
        }
        if (!gapi.client)
            gapi.load("client:auth2", initializeGapiClient);
    }, []);

    const getDrivedFiles = async () => {
        gapi.client.drive.files.list({
            pageSize: 10,
            fields: "nextPageToken, files(id, name)",
        }).then((response: { result: { files: SetStateAction<never[]>; }; }) => {
            console.log(response.result.files);
        });
    }


    return <Button onClick={getDrivedFiles}>Get Drive Files</Button>
}