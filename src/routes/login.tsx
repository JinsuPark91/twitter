import { useState } from 'react'
import { FirebaseError } from 'firebase/app';
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Form, Error, Input, Switcher, Title, Wrapper } from '../components/auth-components';
import GithubButton from '../components/github-button';
import GoogleButton from '../components/google-button';
import { styled } from 'styled-components';


export default function CreateAccount() {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { target: { name, value } } = e;
        if (name === "password") {
            setPassword(value);
        } else if (name === "email") {
            setEmail(value);
        }
    }
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isLoading || email === '' || password === '') return;
        try {
            setIsLoading(true);

            const user = await signInWithEmailAndPassword(auth, email, password);

            navigate("/")

        } catch (e) {
            // set error
            if (e instanceof FirebaseError) {
                console.log(e.code, e.message);
                setError(e.message)
            }

        } finally {
            setIsLoading(false)
        };
    }

    return <Wrapper>
        <Title> Log into Χ</Title>
        <Form onSubmit={onSubmit}>
            <Input onChange={onChange} name="email" value={email} placeholder='Email' type='email' />
            <Input onChange={onChange} name="password" value={password} placeholder='password' type='password' required />
            <Input type="submit" value={isLoading ? "is loading...." : "Log in"} />
        </Form>
        {error !== "" ? <Error>{error}</Error> : null}
        <Switcher>
            Don't have an account? <Link to='/create-account'> Create One &rarr;</Link>
        </Switcher>
        <GithubButton></GithubButton>
        <GoogleButton></GoogleButton>
        
    </Wrapper>
}