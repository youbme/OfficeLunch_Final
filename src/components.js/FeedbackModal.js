import React from 'react'
import { Modal, Button } from 'react-bootstrap'

export default function FeedbackModal({open, setOpen, selectedfeed}) {

    const handleClose = () => setOpen(false);
  return (
    <>
     <Modal
        show={open}
        onHide={handleClose}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
          {selectedfeed.email}
          </Modal.Title>
          
          <span >{selectedfeed.contactDetail}</span>
        </Modal.Header>
        <Modal.Body>
          {selectedfeed.content}

       
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>OK</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
