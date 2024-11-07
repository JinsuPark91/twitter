import { gapi } from 'gapi-script';
import { SetStateAction, useEffect, useState } from 'react';

const API_KEY = import.meta.env.VITE_API_KEY;
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const CLIENTPASSWORD = import.meta.env.VITE_CLIENTPASSWORD;
const DISCOVERY_DOC = import.meta.env.VITE_DISCOVERY_DOC;
const SCOPES = import.meta.env.VITE_SCOPES;

function GoogleDrive() {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [files, setFiles] = useState([]);

    useEffect(() => {
        function start() {
            gapi.client.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
                discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
                scope: SCOPES,
            }).then(() => {
                const authInstance = gapi.auth2.getAuthInstance();
                setIsSignedIn(authInstance.isSignedIn.get());
                authInstance.isSignedIn.listen(setIsSignedIn);
            });
        }

        gapi.load("client:auth2", start);
    }, []);

    const handleLogin = () => {
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

}

export default GoogleDrive;