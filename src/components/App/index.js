import './style.css'
import React, {useState} from "react";
import ImageGallery from "../ImageGallery";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import {useQuery} from "@tanstack/react-query";

function App() {
    const [urls, setUrls] = useState([]);
    const [count, setCount] = useState(0);
    const { status } = useQuery({
        queryKey: ['memes', count],
        queryFn: async () => {
            const response = await fetch('https://api.imgflip.com/get_memes');
            const data = await response.json();
            const memes = data.data.memes.map((meme) => meme.url);
            setUrls(memes);
            return memes;
        },
        staleTime: Infinity,
    });
    if (status === 'loading') {
        return (
            <div className="app">
                <Button disabled={true} variant="success">Loading</Button>
            </div>
        );
    }
    if (status === 'error') {
        return (
            <div className="app">
                <Button variant="danger" onClick={() => {
                    setCount(count + 1);
                }}>Try Again</Button>
            </div>
        );
    }
    return (
        <div className="app">
            <Button variant="primary" onClick={() => {
                setCount(count + 1);
            }}>Load Memes</Button>
            <Container>
                <Row>
                    <ImageGallery urls={urls}/>
                </Row>
            </Container>
        </div>
    );
}

export default App;