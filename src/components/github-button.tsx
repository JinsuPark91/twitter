import { GithubAuthProvider, signInWithPopup } from "firebase/auth"
import { styled } from "styled-components"
import { auth } from "../firebase"
import { useNavigate } from "react-router-dom"

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

export default function GithubButton() {
    const navigate = useNavigate();
    const onClick = async () => {
        const provider = new GithubAuthProvider();
        try {
            await signInWithPopup(auth, provider)
            navigate('/');
        } catch (e) {
            console.log(e)
        }

    }

    return (<Button onClick={onClick}>
        <Logo src="/github.svg" />
        Continue with Github
    </Button>)
}