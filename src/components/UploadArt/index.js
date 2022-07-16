import React, { useCallback, useEffect, useState, useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap'
import { getAllCategories, newArt } from 'services/artService'
import useFormArt from './hook'

const isImage = (file) => {
    if (file.type.match('image/*'))
        return file;

    return "";
}

function checkType(file) {
    if (file.type.match('image/*'))
        return 'image';

    if (file.type.match('video/*'))
        return 'video';

    if (file.type.match('audio/*'))
        return 'audio';

    return 'none'
}

//TODO: Be able to select collection or create a new one

export default function UploadArt({ show, onHide, idUser }) {
    const [categories, setCategories] = useState([])
    const [artUploaded, setArtUploaded] = useState(false)
    const [uploadMsg, setUploadMsg] = useState('')
    const formInfo = useFormArt()


    const handleArtContent = useCallback((evt) => {
        formInfo.updateArtContent(evt.target.files[0])
    }, [formInfo])

    const handleFrontPage = useCallback((evt) => {
        formInfo.updateFrontPage(isImage(evt.target.files[0]))
    }, [formInfo])

    const handleTitle = useCallback((evt) => {
        formInfo.updateTitle(evt.target.value)
    }, [formInfo])

    const handleDescription = useCallback((evt) => {
        formInfo.updateDescription(evt.target.value)
    }, [formInfo])

    const handleSellPrice = useCallback((evt) => {
        formInfo.updateSellPrice(evt.target.value)
    }, [formInfo])

    const handleCategory = useCallback((evt) => {
        formInfo.updateCategory(evt.target.value)
    }, [formInfo])

    const handlePieceType = useCallback((evt) => {
        formInfo.updatePieceType(checkType(evt.target.files[0]))
    }, [formInfo])

    const handleSubmit = (e) => {
        e.preventDefault()

        //Validate
        //Category is not 0, etc

        const data = new FormData();
        data.append("files", formInfo.artContent)
        data.append('title', formInfo.title);
        data.append('description', formInfo.description);
        data.append('sell_price', formInfo.sellPrice);
        data.append('piece_type', formInfo.pieceType);
        data.append('category', formInfo.category);
        data.append('idUser', idUser)
        if (formInfo.frontPage) {
            data.append('files', formInfo.frontPage);
        }
        if (formInfo.collection) {
            data.append('collection', formInfo.collection);
        }

        newArt(data)
            .then((res) => { setUploadMsg(res.data); if (res.ok) setArtUploaded(true) })
    }

    useEffect(() => {
        getAllCategories()
            .then(setCategories)
            .catch(err => console.log(err))
    }, [])

    return (
        <>
            {
                formInfo && (
                    <Modal
                        show={show}
                        onHide={() => { onHide(); setArtUploaded(false); formInfo.resetForm() }}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                                SUBIR OBRA
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {
                                artUploaded ?
                                    <h1>{uploadMsg}</h1>
                                    :
                                    <Form encType='multipart/form-data'>
                                        <Form.Label htmlFor="upload-nft" className=''>
                                            Subir obra
                                        </Form.Label>
                                        <Form.Control type="file" name="file" id="upload-nft" onChange={(e) => { handleArtContent(e); handlePieceType(e) }} />

                                        {
                                            formInfo.pieceType === 'audio' && (
                                                <>
                                                    <Form.Label htmlFor="upload-nft" className=''>
                                                        Subir Caratula
                                                    </Form.Label>
                                                    <Form.Control type="file" name="file" id="upload-nft" onChange={(e) => { handleFrontPage(e); }} />
                                                </>
                                            )
                                        }
                                        <Form.Group controlId="formArtTitle">
                                            <Form.Label>Titulo</Form.Label>
                                            <Form.Control type="text" placeholder="Titulo" value={formInfo.title} onChange={handleTitle} />
                                        </Form.Group>

                                        <Form.Group controlId="formArtDescription">
                                            <Form.Label>Descripción</Form.Label>
                                            <Form.Control type="text" placeholder="Descripcion" value={formInfo.description} onChange={handleDescription} />
                                        </Form.Group>

                                        <Form.Group controlId="formArtPrice">
                                            <Form.Label>Precio</Form.Label>
                                            <Form.Control type="number" placeholder="Precio" value={formInfo.sellPrice} onChange={handleSellPrice} />
                                        </Form.Group>
                                        <Form.Group controlId="formArtCategory">
                                            <Form.Label>Categoria</Form.Label>
                                            <Form.Select aria-label="Default select example" onChange={handleCategory}>
                                                <option value="0" key="0">Selecciona la categoria</option>
                                                {
                                                    categories && categories.map((cat, idx) => (
                                                        <>
                                                            <option value={cat.id} key={cat.id}>{cat.title}</option>
                                                        </>
                                                    ))
                                                }
                                            </Form.Select>
                                        </Form.Group>
                                        <Button className="btn-success" onClick={(e) => handleSubmit(e)}>Submit</Button>
                                        {uploadMsg}
                                    </Form>
                            }
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={() => { onHide(); setArtUploaded(false); formInfo.resetForm() }}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                )
            }

        </>
    )
}