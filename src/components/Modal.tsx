import { useProductUpdate } from "../api/product/UpdateProduct";
import "../Model.css";
import { useForm } from "react-hook-form";
import { Producttype } from "./Home";

// type Product = {
//   name?: string;
//   price?: number;
//   image_url?: string;
//   product_image?: FileList;
//   product_id: number;
//   barcode?: string;
//   description?: string;
//   supplierid?: number;
//   categoryid?: number;
//   quantity?: number;
// };
type ModalProps = {
  handleClose: () => void;
  // product: {
  //   name?: string;
  //   price?: number;
  //   image_url?: string;
  //   product_image?: FileList;
  //   product_id: number;
  //   barcode?: string;
  //   description?: string;
  //   supplierid?: number;
  //   categoryid?: number;
  //   quantity?: number;
  // };
  product: Producttype;
};

// type FormData = {

//   name: string;
//   price: number;
//   product_image: FileList;
//   product_id: number;
// };
type FormData = {
  name: string;
  price: number;
  product_image: FileList;
  product_id: number;
  barcode?: string;
  description?: string;
  image_url?: string;
  supplierid?: number;
  categoryid?: number;
  quantity?: number;
};

const Modal = ({ handleClose, product }: ModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    shouldUnregister: true,
    defaultValues: {
      name: product.name,
      price: Number(product.price),
      product_id: product.product_id,
    },
  });
  const { updateProduct } = useProductUpdate();

  //   const onSubmit = (data: FormData) => {
  //     console.log("the product is in model", product);
  //     const Product_id = product.product_id;
  //     console.log("this is id in whcih change", Product_id);

  //     data.product_id = Product_id;

  //     console.log("The edit form data:", data);
  //     updateProduct(data);

  //     alert("Upadted Successfully");
  //     handleClose();
  //   };
  const onSubmit = (data: FormData) => {
    const form = new FormData();

    form.append("name", data.name);
    form.append("price", data.price.toString()); // price needs to be string
    form.append("product_id", product.product_id!.toString());

    // Extract the first file from product_image FileList
    if (data!.product_image && data!.product_image.length > 0) {
      console.log("this is data image", data.product_image);
      form.append("product_image", data.product_image[0]);
    }
    //  else {
    //   alert("Please upload a product image");
    //   return;
    // }

    updateProduct(form);

    alert("Updated Successfully");
    handleClose();
  };

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal-container">
        <header className="modal-header">
          <h5 id="modal-title" className="modal-title">
            Edit Product
          </h5>
          <button
            type="button"
            className="close"
            aria-label="Close modal"
            onClick={handleClose}
          >
            &times;
          </button>
        </header>

        <section className="modal-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="name">Product Name</label>
              {/* defaultValue={product.name} */}
              <input
                id="name"
                defaultValue={product.name}
                {...register("name", { required: true })}
                type="text"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="price">Product Price</label>
              {/* defaultValue={product.price} */}
              <input
                id="price"
                defaultValue={Number(product.price)}
                {...register("price", { valueAsNumber: true, required: true })}
                type="number"
                step="0.01"
              />
              {errors.price && (
                <p className="text-red-500 text-sm">{errors.price.message}</p>
              )}
            </div>

            {/* <div className="form-group">
              <label htmlFor="image_url">Upload Product Image</label>
              {product.image_url && typeof product.image_url === "string" && (
                <img
                  src={product.image_url}
                  alt="Current Product"
                  className="w-32 h-32 object-cover mb-2"
                />
              )}
              <input
                // defaultValue={String(product.image_url)}
                id="image_file"
                type="file"
                accept="image/*"
                {...register("product_image")}
              />
              {errors.product_image && (
                <p className="text-red-500 text-sm">
                  {errors.product_image.message}
                </p>
              )}
            </div> */}

            <div className="form-group">
              <label htmlFor="image_url">Upload Product Image</label>
              {product.image_url && (
                <img
                  src={product.image_url}
                  alt="Current Product"
                  className="w-32 h-32 object-cover mb-2"
                />
              )}
              <input
                // defaultValue={String(product.image_url)}
                id="image_file"
                type="file"
                accept="image/*"
                {...register("product_image")}
              />
              {errors.product_image && (
                <p className="text-red-500 text-sm">
                  {errors.product_image.message}
                </p>
              )}
            </div>
            <button type="submit" className="btn-submit">
              Save Changes
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Modal;
