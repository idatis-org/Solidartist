import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { createCollection } from 'services/userService';

export default function Collection({ show, onHide, idUser }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const body = {
            name: name,
            description: description,
            id_user: idUser
        }
        console.log(body)
        createCollection(body)
            .then(onHide());
    }

    return (
        <>
            <Modal
                show={show}
                onHide={onHide}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Crear Colección</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form >
                        <Form.Group controlId="collectionName">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="collectionDesc">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control type="text" placeholder="Descripción" value={description} onChange={(e) => setDescription(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>
                        Cerrar
                    </Button>
                    <Button onClick={(e) => { handleSubmit(e) }} variant="success">Crear</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}