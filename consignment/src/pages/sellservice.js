import React, { useState } from 'react';
import '../style/sellservice.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SellServiceRequest() {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([null, null, null, null, null]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [serviceForm, setServiceForm] = useState({
    "firstname":"",
    "lastname":"",
    "portofolio_website":"",
    "telephone_number":"",
    "social_media":"",
    "categories":[],
    "description":"",
    "starting_price":"",
    "service_foto1":null,
    "service_foto2":null,
    "service_foto3":null,
    "service_foto4":null,
    "service_foto5":null,
  })

  const handleChange = (e) =>{
    const {name, value} = e.target;
    setServiceForm({
      ...serviceForm,
      [name]:value,
    })

  }

  const handleSubmitSellService = async(e) =>{
    e.preventDefault();
    const token = Cookies.get('token');

    if (!token) {
      alert("You need to be logged in to submit a service.");
      navigate('/login')
      return;
    }

    try {
      const serviceData = new FormData();
      serviceData.append("first_name",serviceForm.firstname);
      serviceData.append("last_name",serviceForm.lastname);
      serviceData.append("portfolio_link",serviceForm.portofolio_website);
      serviceData.append("phone_number",serviceForm.telephone_number);
      serviceData.append("instagram_handle",serviceForm.social_media);

      serviceForm.categories.forEach((category) => {
        serviceData.append("service_type_names", category);
      });

      serviceData.append("description",serviceForm.description);
      serviceData.append("starting_price",serviceForm.starting_price);
  
      if(serviceForm.service_foto1){
        serviceData.append("service_foto1",serviceForm.service_foto1);
      }
      if(serviceForm.service_foto2){
        serviceData.append("service_foto2",serviceForm.service_foto2);
      }
      if(serviceForm.service_foto3){
        serviceData.append("service_foto3",serviceForm.service_foto3);
      }
      if(serviceForm.service_foto4){
        serviceData.append("service_foto4",serviceForm.service_foto4);
      }
      if(serviceForm.service_foto5){
        serviceData.append("service_foto5",serviceForm.service_foto5);
      }
      const response = await axios.post("http://localhost:5000/api/v1/services/createService",serviceData,{
        headers:{
          'Authorization': `Bearer ${token}`
        },
        withCredentials:true,
      });

      if(response.status === 201){
        navigate('/');
      }
      
    } catch (error) {
      console.error(error.message);
      
    }
  }
  
  const handleOptionChange = (e) => {
    const { value } = e.target;
  
    setSelectedOptions((prevSelectedOptions) => {
      // Add or remove the category based on checkbox state
      const updatedOptions = prevSelectedOptions.includes(value)
        ? prevSelectedOptions.filter((option) => option !== value) // Remove the option
        : [...prevSelectedOptions, value]; // Add the option
  
      // Make sure categories are always an array (even with one or zero categories)
      setServiceForm((prevForm) => ({
        ...prevForm,
        categories: updatedOptions,
      }));
  
      return updatedOptions;
    });
  };
  
  
  // Fungsi untuk menangani unggah foto
  const handlePhotoUpload = (event) => {
    const files = Array.from(event.target.files);

    setPhotos((prevPhotos) => {
      const newPhotos = [...prevPhotos];
      files.forEach((file, index) => {
        if (index < 5) {
          newPhotos[index] = URL.createObjectURL(file);
        }
      });
      return newPhotos;
    });

    setServiceForm((prevState) => {
      const updatedPhotos = { ...prevState }; // Copy previous form state
      files.forEach((file, index) => {
        if (index === 0) updatedPhotos.service_foto1 = file;
        else if (index === 1) updatedPhotos.service_foto2 = file;
        else if (index === 2) updatedPhotos.service_foto3 = file;
        else if (index === 3) updatedPhotos.service_foto4 = file;
        else if (index === 4) updatedPhotos.service_foto5 = file;
      });
      return updatedPhotos; // Update the form state with the new photos
    });
  };

  // Fungsi untuk menghapus foto dari pratinjau
  const handleRemovePhoto = (index) => {
    setPhotos((prevPhotos) => prevPhotos.map((photo, i) => (i === index ? null : photo)));
  };

  return (

    <div className="sell-product-request">
      <button className="back-button" onClick={()=>navigate('/')}>Back</button>
      <div className='form-header'>
        <h1>Sell Service Request</h1>
        <p>Fill out the form to request a service</p>

      </div>

      <hr className="divider" />

      <form onSubmit={handleSubmitSellService}>
        <div className="input-group">
          <label className="section-label">Name</label>
          <div className="name-section">
            <input
              type="text" 
              placeholder="First Name"
              name='firstname'
              value={serviceForm.firstname}
              onChange={handleChange} 
              />
            <input 
              type="text" 
              placeholder="Last Name"
              name='lastname' 
              value={serviceForm.lastname}
              onChange={handleChange}
              />
          </div>
        </div>

        <div className="form-row">

          <div className="form-col">
            <div className="input-group">
              <label>Portofolio Website</label>
              <input 
                type="text" 
                maxLength="25"
                name='portofolio_website'
                value={serviceForm.portofolio_website}
                onChange={handleChange}
                />
              <span className="small-text">Maximum 25 Characters</span>
            </div>

            <div className="input-group">
              <label>Telephone Number</label>
              <input 
                type="text"
                name='telephone_number'
                value={serviceForm.telephone_number}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Social Media (Instagram)</label>
              <input 
                type="text"
                name='social_media'
                value={serviceForm.social_media} 
                onChange={handleChange}
                />
            </div>

            <div className="input-group">
              <label>Starting Price</label>
              <input 
                type="text"
                name='starting_price'
                value={serviceForm.starting_price} 
                onChange={handleChange}
                />
            </div>

          </div>

          <div className="form-col">
            <div className='input-group'>
            <div className='category-option-wrapper'>
                  <div>
                    <label>Your Service Category <p className='instructions'>(You can choose more than one option)</p></label>
                    
                    {/* Radio buttons for delivery options */}
                    <div className='deliveryoption'>
                      <label>
                        <input
                          type="checkbox"
                          name="category"
                          value="Website"
                          checked={selectedOptions.includes("Website")}
                          onChange={handleOptionChange}/>
                        <p>Website</p>
                      </label>
                    </div>

                    <div className='deliveryoption'>
                      <label>
                        <input
                          type="checkbox"
                          name="category"
                          value="Aplikasi"
                          checked={selectedOptions.includes('Aplikasi')}
                          onChange={handleOptionChange}
                        />
                        <p>Application</p>
                      </label>
                    </div>

                    <div className='deliveryoption'>
                      <label>
                        <input
                          type="checkbox"
                          name="category"
                          value="IoT"
                          checked={selectedOptions.includes('IoT')}
                          onChange={handleOptionChange}
                        />
                        <p>IoT</p>
                      </label>
                    </div>
                  </div>
              </div>

            </div>

          </div>
        </div>

        <div className="photo-upload-section">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handlePhotoUpload}
            className="file-input"
          />
          <button
            type="button"
            className="upload-photo-button"
            onClick={() => document.querySelector('.file-input').click()}
          >
            Upload Service Photo
          </button>
          <div className="divider-vertical"></div>
          <div className="photo-preview-container">
            {photos.map((photo, index) => (
              <div className="photo-preview" key={index}>
                <div
                  className="preview-box"
                  style={{
                    backgroundImage: photo ? `url(${photo})` : 'none',
                    backgroundColor: photo ? 'transparent' : '#FCDC00',
                  }}
                ></div>
                <span className="photo-label">Photo</span>
                {photo && (
                  <button
                    type="button"
                    className="remove-photo"
                    onClick={() => handleRemovePhoto(index)}
                  >
                    X
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="input-group description-group">
          <label>Description</label>
          <textarea
            maxLength={500}
            name='description'
            value={serviceForm.description}
            onChange={handleChange}
          />
          <span className="small-text">Maximum 500 Characters</span>
        </div>

        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
}

export default SellServiceRequest;
