import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function AddCustomer(props) {
  const [name, setName] = useState('');
  const [industry, setIndustry] = useState('');

  const [show, setShow] = useState(props.show);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button
        onClick={props.toggleShow}
        className="block mx-auto px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">Add Customer</button>

      <Modal
        show={props.show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setName('')
              setIndustry('')
              props.newCustomer(name, industry)
            }}

            id="editmodal" className="w-full max-w-sm">
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="name">
                  Full Name
                </label>
              </div>
              <div className="md:w-2/3">
                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="name"
                  placeholder='Under Armor'
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value)
                  }} />
              </div>
            </div>


            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="industry">
                  Industry
                </label>
              </div>
              <div className="md:w-2/3">
                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="industry"
                  placeholder='Clothing'
                  type="text"
                  value={industry}
                  onChange={(e) => {
                    setIndustry(e.target.value)
                  }} />
              </div>

            </div>



            <div className="md:flex md:items-center">
              <div className="md:w-1/3"></div>
            </div>
          </form>

        </Modal.Body>
        <Modal.Footer>
          <button
            className='block mx-auto bg-slate-400 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded'
            onClick={props.toggleShow}
          >
            Close
          </button>
          <button
            className='bg-purple-400 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded' form="editmodal">
            + Add New Customer
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
//
