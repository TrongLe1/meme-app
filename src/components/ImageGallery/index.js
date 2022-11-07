import './style.css'
import React from "react";
import Col from 'react-bootstrap/Col';

function ImageGallery({urls}) {
    return (
        <>
            {urls.map((url) =>
                <Col sm={6} md={4} lg={3} key={url}>
                    <img className="meme" src={url} alt=""/>
                </Col>
            )}
        </>
    );
}

export default ImageGallery;