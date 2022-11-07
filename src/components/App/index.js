import './style.css'
import React, {useEffect, useState} from "react";
import ImageGallery from "../ImageGallery";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import {useQuery} from "@tanstack/react-query";

function App() {
    const [urls, setUrls] = useState([]);
    useEffect(() => {
        loadMemes();
        return () => {};
    }, []);

    const { status, data, refetch } = useQuery({
        queryKey: ['memes'],
        queryFn: async () => {
            const response = await fetch('https://api.imgflip.com/get_memes');
            const data = await response.json();
            setUrls(data.data.memes.map((meme) => meme.url));
            return data.data.memes.map((meme) => meme.url);
        },
        enabled: false,
    });

    const buttonClicked = function () {
        refetch();
    }

    const loadMemes = async function () {
        const response = await fetch('https://api.imgflip.com/get_memes');
        const data = await response.json();
        setUrls(data.data.memes.map((meme) => meme.url));
    }
    return (
        <div className="app">
            <Button variant="primary" onClick={buttonClicked}>Load Memes</Button>
            <Container>
                <Row>
                    <ImageGallery urls={urls} />
                </Row>
            </Container>
        </div>
    );
}

export default App;