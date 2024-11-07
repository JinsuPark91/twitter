import { useState } from 'react'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { FirebaseError } from 'firebase/app';
import { Link, useNavigate } from 'react-router-dom'
import { Form, Input, Switcher, Title, Wrapper, Error } from '../components/auth-components';
import GithubButton from '../components/github-button';
import GoogleButton from '../components/google-button';


export default function CreateAccount() {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false)
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");


    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { target: { name, value } } = e;
        if (name === "name") {
            setName(value)
        } else if (name === "password") {
            setPassword(value);
        } else if (name === "email") {
            setEmail(value);
        }
    }
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isLoading || name === '' || email === '' || password === '') return;
        try {
            setIsLoading(true);

            const credentials = await createUserWithEmailAndPassword(auth, email, password);
            console.log(credentials.user);

            await updateProfile(credentials.user, {
                displayName: name,
            });

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
        <Title> Join Χ</Title>
        <Form onSubmit={onSubmit}>
            <Input onChange={onChange} name="name" value={name} placeholder='Name' type="text" />
            <Input onChange={onChange} name="email" value={email} placeholder='Email' type='email' />
            <Input onChange={onChange} name="password" value={password} placeholder='password' type='password' required />
            <Input type="submit" value={isLoading ? "is loading...." : "Create Account"} />
        </Form>
        {error !== "" ? <Error>{error}</Error> : null}
        <Switcher>
            Already have an account? {" "}
            <Link to="/login">log in &rarr;</Link>
        </Switcher>
        <GithubButton></GithubButton>
        <GoogleButton></GoogleButton>
    </Wrapper>
}