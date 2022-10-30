import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { createCollection } from 'services/userService';
import useValidateFields from 'hooks/useValidateFields'


function validateForm(name, description, validateForms) {
    let validado = true;
    if (!name || !name.trim()) {
        validateForms('nombreCollection', 0, "Campo obligatorio");
        validado = false;
    }
    if (!description || !description.trim()) {
        validateForms('descCollection', 1, "Campo obligatorio");
        validado = false;
    }

    return validado;
}

export default function Collection({ show, onHide, idUser, toast }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const { validateForms, eraseError } = useValidateFields();

    const handleSubmit = (e) => {
        e.preventDefault();
        let validate = validateForm(name, description, validateForms);
        if (validate) {
            const body = {
                name: name.trim(),
                description: description.trim(),
                id_user: idUser
            }
            console.log(body)
            createCollection(body)
                .then(() => {
                    onHide();
                    toast("¡Coleccion creada correctamente!")
                });
        }
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
                            <Form.Control id="nombreCollection" type="text" placeholder="Nombre" value={name} onChange={(e) => { setName(e.target.value); eraseError("nombreCollection", 0) }} />
                            <small class="texto-obligatorio-form" >Campo obligatorio</small>
                        </Form.Group>
                        <Form.Group controlId="collectionDesc">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control id="descCollection" type="text" placeholder="Descripción" value={description} onChange={(e) => { setDescription(e.target.value); eraseError("descCollection", 1) }} />
                            <small class="texto-obligatorio-form" >Campo obligatorio</small>
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