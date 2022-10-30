import useValidateFields from 'hooks/useValidateFields';
import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { reportUser } from 'services/userService';
import "./ReportForm.css";


export default function ReportForm({ user, reportedUser, show, onHide }) {
    const [motivo, setMotivo] = useState("");
    const { validateForms, eraseError } = useValidateFields();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (motivo === "") {
            validateForms("motivoReportForm", 0, "Campo obligatorio");
        } else {
            const body = {
                id_user_reported: reportedUser.id,
                id_user_reporting: user.id,
                motive: motivo
            }

            reportUser(body)
                .then(onHide());
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
                    <Modal.Title>Reportar Usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form >
                        <Form.Group controlId="collectionName">
                            <Form.Label>Usuario a reportar</Form.Label>
                            <Form.Control type="text" placeholder="Usuario reportado" value={reportedUser && reportedUser.username} disabled />
                        </Form.Group>

                        <Form.Group id="divMotivo" controlId="collectionDesc">
                            <Form.Label>Motivo</Form.Label>
                            <Form.Control id="motivoReportForm" clas="" type="textarea" placeholder="Motivo del reporte" rows="6" value={motivo} onChange={(e) => { setMotivo(e.target.value); eraseError("motivoReportForm", 0) }} />
                            <small class="texto-obligatorio-form" >Campo obligatorio</small>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>
                        Cerrar
                    </Button>
                    <Button onClick={(e) => { handleSubmit(e) }} variant="success">Enviar</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}