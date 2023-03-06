import React, { useCallback, useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { getAllCategories, newArt } from 'services/artService';
import { getCollections } from 'services/userService';
import useFormArt from './hook';
import useValidateFields from 'hooks/useValidateFields';
import Compressor from 'compressorjs';

const isImage = (file) => {
  if (file.type.match('image/*')) return file;

  return '';
};

function checkType(file) {
  if (file.type.match('image/*')) return 'image';

  if (file.type.match('video/*')) return 'video';

  if (file.type.match('audio/*')) return 'audio';

  return 'none';
}

function validateForm(formInfo, validateForms) {
  let validado = true;
  if (!formInfo.artContent) {
    validateForms('upload-nft', 0, 'Campo obligatorio');
    validado = false;
  }
  if (!formInfo.title || !formInfo.title.trim()) {
    validateForms('tituloSubirObra', 1, 'Campo obligatorio');
    validado = false;
  }
  if (!formInfo.sellPrice || !formInfo.sellPrice.trim()) {
    validateForms('precioSubirObra', 2, 'Campo obligatorio');
    validado = false;
  } else if (isNaN(formInfo.sellPrice)) {
    validateForms('precioSubirObra', 2, 'Solo se aceptan valores numericos');
    validado = false;
  } else if (formInfo.sellPrice <= 0) {
    validateForms('precioSubirObra', 2, 'El valor ha de ser mayor a 0');
    validado = false;
  }
  if (!formInfo.category) {
    validateForms('categoriaSubirObra', 3, 'Campo obligatorio');
    validado = false;
  }
  if (!formInfo.collection) {
    validateForms('coleccionSubirObra', 4, 'Campo obligatorio');
    validado = false;
  }

  return validado;
}

export default function UploadArt({ show, onHide, idUser, toast }) {
  const [categories, setCategories] = useState([]);
  const [collections, setCollections] = useState([]);
  const [artUploaded, setArtUploaded] = useState(false);
  const [uploadMsg, setUploadMsg] = useState('');
  const formInfo = useFormArt();
  const { validateForms, eraseError } = useValidateFields();

  const handleArtContent = useCallback(
    (evt) => {
      formInfo.updateArtContent(evt.target.files[0]);
    },
    [formInfo]
  );

  const handleFrontPage = useCallback(
    (evt) => {
      formInfo.updateFrontPage(isImage(evt.target.files[0]));
    },
    [formInfo]
  );

  const handleTitle = useCallback(
    (evt) => {
      formInfo.updateTitle(evt.target.value);
    },
    [formInfo]
  );

  const handleDescription = useCallback(
    (evt) => {
      formInfo.updateDescription(evt.target.value);
    },
    [formInfo]
  );

  const handleSellPrice = useCallback(
    (evt) => {
      formInfo.updateSellPrice(evt.target.value);
    },
    [formInfo]
  );

  const handleCategory = useCallback(
    (evt) => {
      formInfo.updateCategory(evt.target.value);
    },
    [formInfo]
  );

  const handlePieceType = useCallback(
    (evt) => {
      formInfo.updatePieceType(checkType(evt.target.files[0]));
    },
    [formInfo]
  );

  const handleCollection = useCallback(
    (evt) => {
      formInfo.updateCollection(evt.target.value);
    },
    [formInfo]
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    let validado = validateForm(formInfo, validateForms);
    if (validado) {
      const data = new FormData();
      console.log(formInfo.category);
      if (formInfo.category == 1) {
        console.log('uploaded image size  ' + formInfo.artContent.size);
        if (formInfo.artContent.size > 250000) {
          // agrega el if para verificar el tamaño de la imagen, si es menor a 250kb no esta comprimida
          new Compressor(formInfo.artContent, {
            quality: 0.95,
            maxWidth: 'auto',
            maxHeight: 2160,
            convertSize: 250000, // 250KB

            success(result) {
              console.log('saved image size  ' + result.size);
              data.append('files', result);
              data.append('title', formInfo.title.trim());
              data.append('description', formInfo.description.trim());
              data.append('sell_price', formInfo.sellPrice);
              data.append('piece_type', formInfo.pieceType);
              data.append('category', formInfo.category);
              data.append('idUser', idUser);
              if (formInfo.frontPage) {
                data.append('files', formInfo.frontPage);
              }
              if (formInfo.collection) {
                data.append('id_collection', formInfo.collection);
              }

              newArt(data).then((res) => {
                setUploadMsg(res.data);
                if (res.ok) {
                  console.log(res.data);
                  setArtUploaded(true);
                  onHide();
                  toast('¡Obra subida correctamente!');
                  formInfo.resetForm();
                } else {
                  console.log('not saved');
                }
              });
            },
            error(err) {
              console.log(err.message);
            },
          });
        } else {
          // agregue el else para el caso en que el tamaño de la imagen sea menor o igual a 250kB
          console.log('image smaller than 250Kb, not compressed');
          data.append('files', formInfo.artContent);
          data.append('title', formInfo.title.trim());
          data.append('description', formInfo.description.trim());
          data.append('sell_price', formInfo.sellPrice);
          data.append('piece_type', formInfo.pieceType);
          data.append('category', formInfo.category);
          data.append('idUser', idUser);
          if (formInfo.frontPage) {
            data.append('files', formInfo.frontPage);
          }
          if (formInfo.collection) {
            data.append('id_collection', formInfo.collection);
          }

          newArt(data).then((res) => {
            setUploadMsg(res.data);
            if (res.ok) {
              console.log(res.data);
              setArtUploaded(true);
              onHide();
              toast('¡Obra subida correctamente!');
              formInfo.resetForm();
            } else {
              console.log('not saved');
            }
          });
        }
      } else {
        console.log('not Image');
        data.append('files', formInfo.artContent);
        data.append('title', formInfo.title.trim());
        data.append('description', formInfo.description.trim());
        data.append('sell_price', formInfo.sellPrice);
        data.append('piece_type', formInfo.pieceType);
        data.append('category', formInfo.category);
        data.append('idUser', idUser);
        if (formInfo.frontPage) {
          data.append('id_collection', formInfo.collection);
        }

        newArt(data).then((res) => {
          setUploadMsg(res.data);
          if (res.ok) {
            console.log(res.data);
            setArtUploaded(true);
            onHide();
            toast('¡Obra subida correctamente!');
            formInfo.resetForm();
          } else {
            console.log('not saved');
          }
        });
      }
    }
  };

  useEffect(() => {
    getAllCategories()
      .then(setCategories)
      .catch((err) => console.log(err));
  }, [show, idUser]);

  useEffect(() => {
    getCollections(idUser)
      .then(setCollections)
      .catch((err) => console.log(err));
  }, [idUser, show]);

  const [showCropModal, setShowCropModal] = useState(false);
  const handleCloseCropModal = () => setShowCropModal(false);
  const [image, setImage] = useState('');
  const [cropData, setCropData] = useState('');
  const [cropper, setCropper] = useState(null);
  const handleCrop = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
    setShowCropModal(true);
  };
  return (
    <>
      {formInfo && (
        <Modal
          show={show}
          onHide={() => {
            onHide();
            setArtUploaded(false);
            formInfo.resetForm();
          }}
          size='lg'
          aria-labelledby='contained-modal-title-vcenter'
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id='contained-modal-title-vcenter'>
              SUBIR OBRA
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {artUploaded ? (
              <h1>{uploadMsg}</h1>
            ) : (
              <Form encType='multipart/form-data'>
                <Form.Label htmlFor='upload-nft' className=''>
                  Subir obra
                </Form.Label>
                <Form.Control
                  type='file'
                  name='file'
                  id='upload-nft'
                  onChange={(e) => {
                    handleArtContent(e);
                    handlePieceType(e);
                    eraseError('upload-nft', 0);
                  }}
                />
                <small class='texto-obligatorio-form'>Campo obligatorio</small>
                {formInfo.pieceType === 'audio' && (
                  <>
                    <Form.Label htmlFor='upload-nft' className=''>
                      Subir Caratula
                    </Form.Label>
                    <Form.Control
                      type='file'
                      name='file'
                      id='upload-nft'
                      onChange={(e) => {
                        handleFrontPage(e);
                      }}
                    />
                  </>
                )}
                <Form.Group controlId='formArtTitle'>
                  <Form.Label>Titulo</Form.Label>
                  <Form.Control
                    id='tituloSubirObra'
                    type='text'
                    placeholder='Titulo'
                    value={formInfo.title}
                    onChange={(e) => {
                      handleTitle(e);
                      eraseError('tituloSubirObra', 1);
                    }}
                  />
                  <small class='texto-obligatorio-form'>
                    Campo obligatorio
                  </small>
                </Form.Group>

                <Form.Group controlId='formArtDescription'>
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control
                    id='descSubirObra'
                    type='text'
                    placeholder='Descripcion'
                    value={formInfo.description}
                    onChange={handleDescription}
                  />
                  {/* <small class="texto-obligatorio-form" >Campo obligatorio</small> */}
                </Form.Group>

                <Form.Group controlId='formArtPrice'>
                  <Form.Label>Precio ( Separado por . )</Form.Label>
                  <Form.Control
                    id='precioSubirObra'
                    type='number'
                    placeholder='Precio'
                    value={formInfo.sellPrice}
                    onChange={(e) => {
                      handleSellPrice(e);
                      eraseError('precioSubirObra', 2);
                    }}
                  />
                  <small class='texto-obligatorio-form'>
                    Campo obligatorio
                  </small>
                </Form.Group>
                <Form.Group controlId='formArtCategory'>
                  <Form.Label>Categoria</Form.Label>
                  <Form.Select
                    id='categoriaSubirObra'
                    aria-label='Default select example'
                    onChange={(e) => {
                      handleCategory(e);
                      eraseError('categoriaSubirObra', 3);
                    }}
                  >
                    <option value='0' key='0'>
                      Selecciona la categoria
                    </option>
                    {categories &&
                      categories.map((cat, idx) => (
                        <>
                          <option value={cat.id} key={cat.id}>
                            {cat.title}
                          </option>
                        </>
                      ))}
                  </Form.Select>
                  <small class='texto-obligatorio-form'>
                    Campo obligatorio
                  </small>
                </Form.Group>
                <Form.Group controlId='formArtCollections'>
                  <Form.Label>Colecciones</Form.Label>
                  <Form.Select
                    id='coleccionSubirObra'
                    aria-label='Default select example'
                    onChange={(e) => {
                      handleCollection(e);
                      eraseError('coleccionSubirObra', 4);
                    }}
                  >
                    <option value='0' key='0'>
                      Selecciona la Coleccion
                    </option>
                    {collections &&
                      collections.map((col, idx) => (
                        <>
                          <option value={col.id} key={col.id}>
                            {col.name}
                          </option>
                        </>
                      ))}
                  </Form.Select>
                  <small class='texto-obligatorio-form'>
                    Campo obligatorio
                  </small>
                </Form.Group>
                <Button
                  className='btn-primary m-3'
                  onClick={(e) => handleCrop(e)}
                >
                  delimitar imagem
                </Button>
                <Button
                  className='btn-success'
                  onClick={(e) => handleSubmit(e)}
                >
                  Submit
                </Button>
              </Form>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => {
                onHide();
                setArtUploaded(false);
                formInfo.resetForm();
              }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      {/* Modal de recorte de imagem */}
      <Modal show={showCropModal} onHide={handleCloseCropModal}>
        <Modal.Header closeButton>
          <Modal.Title>Recortar Imagem</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Conteúdo do modal de recorte de imagem</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCloseCropModal}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
