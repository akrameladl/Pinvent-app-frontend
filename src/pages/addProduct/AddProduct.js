import React, { useState } from 'react'
import ProductForm from "../../components/product/productForm/ProductForm"
import { useDispatch ,useSelector } from "react-redux";
import { createProduct, selectIsLoading } from '../../redux/features/product/productSlice';
import { useNavigate } from 'react-router-dom';
import Loader from "../../components/loader/Loader";


const intialState={
  name:"",
  category:"",
  quantity:"",
  price:"",
}


const AddProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();


  const [product, setProduct] = useState(intialState)
  const [productImage, setProductImage] = useState("")
  const [imagePerview, setImagePerview] = useState(null)
  const [description, setDescription] = useState("")

  const isLoading = useSelector(selectIsLoading)

  const {name, category, price, quantity}= product

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setProduct({ ...product, [name]: value });
    };

    const handleImageChange = (e) => {
      setProductImage(e.target.files[0])
      setImagePerview(URL.createObjectURL(e.target.files[0]));

    };

    const generateSKU =(category)=>{
      const letter = category.slice(0,3).toUpperCase()
      const number= Date.now()
      const sku = letter +"-"+ number
      return sku;
    };

    const saveProduct = async (e) =>{
      e.preventDefault()
      const formData = new FormData()
      formData.append("name",name)
      formData.append("sku",generateSKU(category))
      formData.append("category",category)
      formData.append("quantity",quantity)
      formData.append("price",price)
      formData.append("description",description)
      formData.append("image",productImage)
      console.log(...formData);
      await dispatch(createProduct(formData))
      navigate("/dashpoard")
    };


  return (
    <div>
      {isLoading && <Loader/>}
      <h3 className="--mt">Add New Product </h3>
      <ProductForm
      product={product}
      productImage={productImage}
      imagePerview={imagePerview}
      description={description}
      setDescription={setDescription}
      handleInputChange={handleInputChange}
      handleImageChange={handleImageChange}
      saveProduct={saveProduct}
       />
    </div>
  );
}

export default AddProduct
