import React from 'react';
import Modal from 'react-bootstrap/Modal'
const DenyReasonModal = ({ show, onClose, onSubmit, rejectionReasonType, rejectionReason, onChange }) => {
    debugger;
    return (
        <Modal show={show} onHide={onClose} >
            <Modal.Body>
                <div className="form-group ">
                    <label>Deny Reason</label>
                    <select className="form-control" name="RejectionReasonType" value={rejectionReason} onChange={onChange}>
                        <option value="">Select one...</option>
                        {(rejectionReasonType && rejectionReasonType.length > 0) &&
                            rejectionReasonType.map((leave, index) => {
                                return (
                                    <option key={leave.GlobalCodeId} value={leave.Description}>{leave.Description}</option>
                                )
                            })
                        }
                    </select>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-info" onClick={onClose}> Close</button>
                <button className="btn btn-info" onClick={onSubmit}> Submit</button>
            </Modal.Footer>
        </Modal>
    )
}

export default DenyReasonModal;