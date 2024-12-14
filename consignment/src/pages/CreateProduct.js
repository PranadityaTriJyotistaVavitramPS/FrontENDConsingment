import React, { useState } from 'react';
import '../style/CreateProduct.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

function SellProductRequest() {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([null, null, null]);
  const [productForm,setProductForm] = useState({
    firstname:"",
    lastname:"",
    productname:"",
    price:"",
    telephone_number:"",
    ecommerce_number:"",
    productlink:"",
    productcategory:"",
    googlemapslink:"",
    product1_photo:null,
    product2_photo:null,
    product3_photo:null,
    product_desc:"",
  })
  const [deliveryOptions, setDeliveryOptions] = useState({
    pickUpAtCertainPlaces: false,
    requestToTheSeller: false,
  });

  const handleSubmitSellProduct = async(e) =>{
    e.preventDefault();
    const token = Cookies.get('token');
    if (!token) {
      alert("You need to be logged in to submit a product.");
      navigate('/login')
      return;
    }

    try {
      new URL(productForm.googlemapslink);
    } catch (e) {
      alert("Please enter a valid Google Maps link.");
      return; // Stop further processing if URL is invalid
    }


    try {  
      //memasukkan nilai-nilai kedalam formData
      const product_data = new FormData();
      product_data.append("init_name", productForm.firstname);
      product_data.append("last_name", productForm.lastname);
      product_data.append("product_name", productForm.productname);
      product_data.append("price",productForm.price);
      product_data.append("phone_number", productForm.telephone_number);
      product_data.append("ecommerce_phone", productForm.ecommerce_number);
      product_data.append("product_link",productForm.productlink);
      product_data.append("kategori", productForm.productcategory);
      product_data.append("googlemaplink", productForm.googlemapslink)
      product_data.append("product_desc",productForm.product_desc)
      product_data.append("pickup", productForm.pickUpAtCertainPlaces);
      product_data.append("request", productForm.requestToTheSeller);


      //memasukkan foto apabila terdapat foto
      if(productForm.product1_photo){
        product_data.append("product1_photo",productForm.product1_photo);
      }

      if(productForm.product2_photo){
        product_data.append("product2_photo",productForm.product2_photo);
      }

      if(productForm.product3_photo){
        product_data.append("product3_photo",productForm.product3_photo);
      }

      //mengirim ke API
      const response = await axios.post("http://localhost:5000/api/v1/products/createproducts",product_data,{
        headers:{
          'Authorization': `Bearer ${token}`
        },
        withCredentials:true,
      });

      if(response.status === 201){
        navigate('/find');
      }
    } catch (error) {
      console.error(error.message);
      alert("An error occurred while submitting your product. Please try again.");
    }

  }

  const handleChange = (e) =>{
    const {name,value} = e.target;
    setProductForm({
      ...productForm,
      [name]:value,
    })
  }

  const handleOptionChange = (e) => {
    const { name, checked } = e.target;
  
    // Update the deliveryOptions state
    setDeliveryOptions({
      ...deliveryOptions,
      [name]: checked,
    });
  
    // Update the productForm state
    setProductForm({
      ...productForm,
      [name]: checked, // Set the corresponding delivery option to true or false
    });
  };
  
  // Fungsi untuk menangani unggah foto
  const handlePhotoUpload = (event) => {
    const files = Array.from(event.target.files);
  
    // Update photo previews for UI display
    setPhotos((prevPhotos) => {
      const newPhotos = [...prevPhotos]; // Copy previous photos
      files.forEach((file, index) => {
        if (index < 3) { // Ensure we don't have more than 3 photos
          newPhotos[index] = URL.createObjectURL(file); // Create preview for UI
        }
      });
      return newPhotos; // Update the photos state
    });
  
    // Update productForm with the actual file objects
    setProductForm((prevState) => {
      const updatedPhotos = { ...prevState }; // Copy previous form state
      files.forEach((file, index) => {
        if (index === 0) updatedPhotos.product1_photo = file;
        else if (index === 1) updatedPhotos.product2_photo = file;
        else if (index === 2) updatedPhotos.product3_photo = file;
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
        <h1>Sell Product Request</h1>
        <p>Fill out the form to request a product</p>

      </div>

      <hr className="divider" />

      <form onSubmit={handleSubmitSellProduct}>
        <div className="input-group">
          <label className="section-label">Name</label>
          <div className="name-section">
            <input 
              type="text" 
              placeholder="First Name" 
              name='firstname'
              value={productForm.firstname}
              onChange={handleChange}
              
              />
            <input 
              type="text" 
              placeholder="Last Name" 
              name='lastname'
              value={productForm.lastname}
              onChange={handleChange}
              />
          </div>
        </div>

        <p className="instructions">
          Before uploading your product to our website, please ensure that it complies with the following rule:
          <br />
          1. It does not offend any group of people (race, gender, religion, circumstances, etc.), including the brand name, product name, product description, and product type.
          <br />
          2. The product and its branding should not be offensive or misleading.
          <br />
          3. High-quality, clear images of the product are required, showing different angles and uses.
          <br />
          4. Products must be tested first before being sold.
        </p>

        <div className="form-row">
          <div className="form-col">
            <div className="input-group">

              <label>Product Name</label>
              <input 
                type="text" 
                maxLength="25"
                name="productname"
                value={productForm.productname}
                onChange={handleChange}
               />
              <span className="small-text">Maximum 25 Characters</span>
            </div>

            <div className="input-group">
              <label>Price</label>
              <input 
                type="text" 
                name='price'
                value={productForm.price}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Telephone Number</label>
              <input 
                type="text"
                name='telephone_number'
                value={productForm.telephone_number}
                onChange={handleChange}
               />
            </div>

            <div className="input-group">
              <label>E-Commerce Number</label>
              <input 
                type="text"
                name='ecommerce_number'
                value={productForm.ecommerce_number}
                onChange={handleChange}
                />
            </div>

            <div className="input-group">
              <label>Product Website Link</label>
              <input 
                type="url"
                name='productlink'
                value={productForm.productlink}
                onChange={handleChange} 
                />
            </div>
          </div>

          <div className="form-col">
            <div className="input-group">
                <div className="input-group">
                  <label>Product Category</label>
                  <select
                    name="productcategory"
                    value={productForm.productcategory}
                    onChange={handleChange}
                  >
                    <option value="">Select a category</option>
                    <option value="Electronic Equipment">Electronic Equipment</option>
                    <option value="Laboratory Equipment">Laboratory Equipment</option>
                    <option value="Food and Beverages">Food and Beverages</option>
                    <option value="Clothes">Clothes</option>
                    <option value="Software/IoT Development Services">Software/IoT Development Services</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              <div className='delivery-option-wrapper'>
                  <div>
                    <label>Available Delivery Option</label>
                    
                    {/* Radio buttons for delivery options */}
                    <div className='deliveryoption'>
                      <label>
                        <input
                          type="checkbox"
                          name="pickUpAtCertainPlaces"
                          checked={deliveryOptions.pickUpAtCertainPlaces}
                          onChange={handleOptionChange}/>
                        <p>Pick Up at Certain Places</p>
                      </label>
                    </div>

                    <div className='deliveryoption'>
                      <label>
                        <input
                          type="checkbox"
                          name="requestToTheSeller"
                          checked={deliveryOptions.requestToTheSeller}
                          onChange={handleOptionChange}
                        />
                        <p>Request to the Seller</p>
                      </label>
                    </div>
                  </div>
                <div className='input-group'>
                  <label>Google Maps Link</label>
                  <input 
                    type='text'
                    name='googlemapslink'
                    value={productForm.googlemapslink}
                    onChange={handleChange}
                    />
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
            Upload Product Photo
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
            name='product_desc'
            value={productForm.product_desc}
            onChange={handleChange}
          />
          <span className="small-text">Maximum 500 Characters</span>
        </div> 

        <button type="submit" className="submit-button">Submit</button>
      </form>

    </div>
  );
}

export default SellProductRequest;
