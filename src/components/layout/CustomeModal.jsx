import React from 'react';
import Modal from 'react-modal'; // Make sure you have react-modal installed

const CustomeModal = ({ isOpen, onRequestClose, title, children, onSubmit }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="bg-white p-6 rounded-lg w-full max-w-md mx-auto my-8 shadow-lg outline-none"
            overlayClassName="bg-gray-900 bg-opacity-75 fixed inset-0 flex items-center justify-center"
        >
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <div className="mb-4">{children}</div>
            <div className="flex justify-end">
                <button
                    className="mr-2 py-2 px-4 bg-red-500 text-white rounded hover:bg-red-700"
                    onClick={onRequestClose}
                >
                    Cancel
                </button>
                <button
                    className="py-2 px-4 bg-green-500 text-white rounded hover:bg-indigo-600"
                    onClick={onSubmit} // Call onSubmit when clicking this button
                >
                    Submit
                </button>
            </div>
        </Modal>
    );
}

export default CustomeModal;
