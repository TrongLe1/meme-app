import './style.css'
import React from "react";
import Col from 'react-bootstrap/Col';

function ImageGallery({urls}) {
    return (
        <>
            {urls.map((url) =>
                <Col key={url} className="mt-3" sm={6} md={4} lg={3}>
                    <img className="meme" src={url} alt=""/>
                </Col>
            )}
        </>
    );
}

export default ImageGallery;