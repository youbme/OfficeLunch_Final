import React from 'react'
import { Modal,Button } from 'react-bootstrap'


export default function SignupSubmitModal({setOpen, open, signupsubmit}) {

    

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
            Food Preference
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {signupsubmit ? "Sucessfully Registered": "Failed to Register" }

       
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>OK</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
