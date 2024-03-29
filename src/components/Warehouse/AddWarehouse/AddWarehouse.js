import axios from "axios"
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import backArrow from "../../../assets/icons/arrow_back-24px.svg";
import TextInput from "../TextInput/TextInput";

function AddWarehouse() {

  const navigate = useNavigate()

  const [warehouse, setWarehouse] = useState({
    name: "",
    address: "",
    city: "",
    country: "",
    contact: {
      name: "",
      position: "",
      phone: "",
      email: ""
    }
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formValid, setFormValid] = useState({
    warehouseName: true,
    address: true,
    city: true,
    country: true,
    contactName: true,
    position: true,
    phone: true,
    email: true,
    form: true,
  });

  // Function to update Warehouse detail text inputs on change
  const handleChangeWarehouse = (event) => {
    const { name, value } = event.target;
    setWarehouse({ ...warehouse, [name]: value });
  };
  
  // Function to update Contact detail text inputs on change
  const handleChangeContact = (event) => {
    const { name, value } = event.target;
    setWarehouse((current) => {
      const contact = { ...current.contact };
      contact[name] = value;
      return { ...current, contact };
    });
  };

  // Function to check if form is valid
  const isFormValid = () => {
    if (
      warehouse.name &&
      warehouse.address &&
      warehouse.city &&
      warehouse.country &&
      warehouse.contact.name &&
      warehouse.contact.position &&
      warehouse.contact.phone &&
      warehouse.contact.email
    ) {
      return true;
    } else {
      if (!warehouse.name) {
        setFormValid({ ...formValid, warehouseName: false });
      }
      if (!warehouse.address) {
        setFormValid({ ...formValid, address: false });
      }
      if (!warehouse.city) {
        setFormValid({ ...formValid, city: false });
      }
      if (!warehouse.country) {
        setFormValid({ ...formValid, country: false });
      }
      if (!warehouse.contact.name) {
        setFormValid({ ...formValid, contactName: false });
      }
      if (!warehouse.contact.position) {
        setFormValid({ ...formValid, position: false });
      }
      if (!warehouse.contact.phone) {
        setFormValid({ ...formValid, phone: false });
      }
      if (!warehouse.contact.email) {
        setFormValid({ ...formValid, email: false });
      }
      return false;
    }
  };

  function handleSubmit(event){
    event.preventDefault()

    if (isFormValid()){
      const name = warehouse.name
      const address = warehouse.address
      const city = warehouse.city
      const country = warehouse.country
      const contactName = warehouse.contact.name
      const contactPosition = warehouse.contact.position
      const contactPhone = warehouse.contact.phone
      const contactEmail = warehouse.contact.email

      axios
        .post("http://localhost:8080/", {
          name,
          address,
          city,
          country,
          contactName,
          contactPosition,
          contactPhone,
          contactEmail
        })
        .then(response =>{
          alert("successfully added warehouse")
          navigate("/warehouses")
        })
    }
  }

  return (
    <>
      <div className="component">
        <div className="component__header">
          <Link to="/warehouses" className="component__header-back">
            <img className="" src={backArrow} alt="Back Arrow" />
          </Link>
          <h1 className="component__title">Add Warehouse</h1>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form__input-container">
            <div className="form__container">
              <h2 className="form__subtitle">Warehouse Details</h2>
              <TextInput
                name={"name"}
                label={"Warehouse Name"}
                value={warehouse.name}
                formValid={formValid}
                isValid={formValid.warehouseName}
                formName={"warehouseName"}
                setValid={setFormValid}
                onChange={handleChangeWarehouse}
              />
              <TextInput
                name={"address"}
                label={"Street Address"}
                value={warehouse.address}
                formValid={formValid}
                isValid={formValid.address}
                formName={"address"}
                setValid={setFormValid}
                onChange={handleChangeWarehouse}
              />
              <TextInput
                name={"city"}
                label={"City"}
                value={warehouse.city}
                formValid={formValid}
                isValid={formValid.city}
                formName={"city"}
                setValid={setFormValid}
                onChange={handleChangeWarehouse}
              />
              <TextInput
                name={"country"}
                label={"Country"}
                value={warehouse.country}
                formValid={formValid}
                isValid={formValid.country}
                formName={"country"}
                setValid={setFormValid}
                onChange={handleChangeWarehouse}
              />
            </div>
            <div className="form__container form__container--contacts">
              <h2 className="form__subtitle">Contact Details</h2>
              <TextInput
                name={"name"}
                label={"Contact Name"}
                value={warehouse.contact.name}
                formValid={formValid}
                isValid={formValid.contactName}
                formName={"contactName"}
                setValid={setFormValid}
                onChange={handleChangeContact}
              />
              <TextInput
                name={"position"}
                label={"Position"}
                value={warehouse.contact.position}
                formValid={formValid}
                isValid={formValid.position}
                formName={"position"}
                setValid={setFormValid}
                onChange={handleChangeContact}
              />
              <TextInput
                name={"phone"}
                label={"Phone Number"}
                value={warehouse.contact.phone}
                formValid={formValid}
                isValid={formValid.phone}
                formName={"phone"}
                setValid={setFormValid}
                onChange={handleChangeContact}
              />
              <TextInput
                name={"email"}
                label={"Email"}
                value={warehouse.contact.email}
                formValid={formValid}
                isValid={formValid.email}
                formName={"email"}
                setValid={setFormValid}
                onChange={handleChangeContact}
              />
            </div>
          </div>
          <div className="button__container">
            <Link to="/warehouses" className="button button--cancel">
              Cancel
            </Link>
            <button className="button button--save" type="submit">
              + Add Warehouse
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default AddWarehouse