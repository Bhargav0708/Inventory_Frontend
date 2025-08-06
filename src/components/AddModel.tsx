import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "../AddModel.css";
import { useAddProduct } from "../api/product/AddProduct";
import { useAddStock } from "../api/stocks/AddStock";
import { Producttype } from "./Home";
import { useCateogry } from "../api/cateogry/CategoryDisplay";
// type ProductType = {
//   product_id?: number;
//   name: string;
//   barcode?: string;
//   description?: string;
//   price: number; // Use number unless you absolutely need bigint
//   image_url?: string;
//   supplierid?: number;
//   categoryid?: number;
//   quantity?: number;
// };

type ModalProps = {
  handleClose: () => void;
  // setProduct: ;
  product: Producttype[];
  setProduct: React.Dispatch<React.SetStateAction<Producttype[]>>;
};
type ProducSTocktInfo = {
  product_name: string;
  product_barcode: string;
  product_price: number;
  description: string;
  supplier_id: number;
  category_id: number;
  quantity: number;
  warehouse_id: number;
  minstock: number;
  maxstock: number;
  recordstock: number;
};

type productAllInfo = {
  name: string;
  barcode: string;
  description: string;
  price: number;
  supplier_id: number;
  category_id: number; // Fixed spelling here
};
type Category = {
  cateogry_id: any;
  cid: number;
  name: string;
};

const AddModel = ({ handleClose, setProduct, product }: ModalProps) => {
  const [step, setStep] = useState(1);
  // const [valid, setValid] = useState(false);
  const { addProductAsync } = useAddProduct();
  const storedUserdata = localStorage.getItem("userdata");
  const [cateogry, setCateogry] = useState<[]>([]);
  const { data: CateogryData } = useCateogry();
  const user = storedUserdata ? JSON.parse(storedUserdata) : null;
  const userid = user.userdata.id;
  console.log("this is userid", userid);
  const [selectedCategory, setSelectedCategory] = useState<number | "">("");

  useEffect(() => {
    if (CateogryData) {
      setCateogry(CateogryData.data);
    }
  }, [CateogryData]);

  console.log("this is a cateogrydata ", cateogry);
  // const Cateogrynm = cateogry.map((category: Category) => {
  //   console.log("the cateogry in nym", category);
  //   return {
  //     cid: category.cateogry_id,
  //     cname: category.name,
  //   };
  // });
  // console.log("the Adding Prouct ", product);
  const { addStockAsync } = useAddStock();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<ProducSTocktInfo>({
    shouldUnregister: false,
  });
  //for updating values on mount
  useEffect(() => {
    const category = getValues("category_id");
    if (category) {
      setSelectedCategory(category);
    }
  }, [getValues]);

  const handleCustomSubmit = async () => {
    const data = getValues();
    const { category_id, product_price, supplier_id } = data;

    if (
      Number.isNaN(category_id) ||
      Number.isNaN(product_price) ||
      Number.isNaN(supplier_id)
    ) {
      alert("Please fill out all required fields.");
      return;
    }

    console.log("Final submission data:", data);

    const ProductData: productAllInfo = {
      name: data.product_name,
      barcode: data.product_barcode,
      description: data.description,
      price: data.product_price,
      supplier_id: data.supplier_id,
      category_id: data.category_id,
    };
    const ProductInfo = new FormData();
    ProductInfo.append("name", data.product_name);
    ProductInfo.append("barcode", data.product_barcode);
    ProductInfo.append("description", data.description);
    ProductInfo.append("price", data.product_price.toString());
    ProductInfo.append("supplierid", userid.toString());
    ProductInfo.append("categoryid", data.category_id.toString());
    console.log("the product data in the after the final data", ProductData);
    const resultoftheAddproduct = addProductAsync(ProductInfo);

    console.log("the add product result of this ....", resultoftheAddproduct);
    const result = await resultoftheAddproduct;
    console.log("this id  data of new product ....................", result);

    setProduct([...product, result.data]);
    const productid = result.data.product_id;

    const StockInfo = new FormData();
    StockInfo.append("productid", productid);
    StockInfo.append("warehouse_id", data.warehouse_id.toString());
    StockInfo.append("quantity", data.quantity.toString());
    StockInfo.append("minstock", data.minstock.toString());
    StockInfo.append("maxstock", data.maxstock.toString());
    StockInfo.append("recordstock", data.recordstock.toString());
    console.log("the all data to the Stocks Successfully get", StockInfo);
    const resultofstockadd = addStockAsync(StockInfo);
    console.log("this is the result of stock addition", resultofstockadd);

    alert("Submitted successfully");
    handleClose();
  };

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal-container" id="add-model">
        <header className="modal-header">
          <h5 id="modal-title" className="modal-title add-model">
            Add Product
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
          <button
            type="button"
            className="close"
            aria-label="Close modal"
            onClick={handleClose}
          >
            &times;
          </button>
          <form onSubmit={handleSubmit(handleCustomSubmit)}>
            {step === 1 && (
              <>
                <div className="form-group" id="form-body">
                  <label htmlFor="product_name">Product Name</label>
                  <input
                    id="name"
                    {...register("product_name", {
                      required: "Product Name Required",
                    })}
                    type="text"
                  />

                  {errors.product_name?.message && (
                    <p className="text-red-500 text-sm">
                      {errors.product_name.message}
                    </p>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="product_barcode">Product barcode</label>
                  <input
                    id="price"
                    {...register("product_barcode", {
                      required: "Product Barcode Required",
                    })}
                    type="text"
                  />

                  {errors.product_barcode?.message && (
                    <p className="text-red-500 text-sm">
                      {errors.product_barcode.message}
                    </p>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="description">Product Description</label>
                  <input
                    id="price"
                    {...register("description", {
                      required: "Product Description Required",
                    })}
                    type="text"
                  />

                  {errors.description?.message && (
                    <p className="text-red-500 text-sm">
                      {errors.description.message}
                    </p>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="product_price">Product Price</label>
                  <input
                    id="price"
                    {...register("product_price", {
                      valueAsNumber: true,
                      required: "Product Price Required",
                    })}
                    type="number"
                    step="10"
                  />
                  {errors.product_price?.message && (
                    <p className="text-red-500 text-sm">
                      {errors.product_price.message}
                    </p>
                  )}
                </div>
                {/* <div className="form-group">
                  <label htmlFor="supplier_id">Product Supplier_ID</label>
                  <input
                    id="supplier_id"
                    type="number"
                    {...register("supplier_id", {
                      valueAsNumber: true,
                      required: "Supplier ID Required",
                    })}
                  />
                  {errors.supplier_id?.message && (
                    <p className="text-red-500 text-sm">
                      {errors.supplier_id.message}
                    </p>
                  )}
                </div> */}
                {/* <div className="form-group">
                  <label htmlFor="cateogry_id">Cateogry ID</label>
                  <input
                    id="cateogry_id"
                    type="number"
                    {...register("category_id", {
                      valueAsNumber: true,
                      required: "Category ID Required",
                    })}
                  />
                  {errors.category_id?.message && (
                    <p className="text-red-500 text-sm">
                      {errors.category_id.message}
                    </p>
                  )}
                </div> */}
                <div className="form-group">
                  <label htmlFor="category_id">Category</label>
                  <select
                    id="category_id"
                    {...register("category_id", {
                      valueAsNumber: true,
                      required: "Category is required",
                    })}
                    value={selectedCategory}
                    onChange={(e) =>
                      setSelectedCategory(Number(e.target.value))
                    }
                  >
                    <option value="">Select a Category</option>
                    {cateogry.map((cat: Category) => (
                      <option key={cat.cateogry_id} value={cat.cateogry_id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  {errors.category_id && (
                    <p className="text-red-500 text-sm">
                      {errors.category_id.message}
                    </p>
                  )}
                </div>

                {/* <select
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
          style={{ margin: "10px", padding: "8px", borderRadius: "6px" }}
        >
          <option value="">All Categories</option>
          {cateogry.map((cat: Category) => (
            <option key={cat.cateogry_id} value={cat.cateogry_id}>
              {cat.name}
            </option>
          ))}
        </select> */}

                <button id="next" onClick={() => setStep(2)}>
                  Next
                </button>
              </>
            )}
            {/* "productid" : "45", "warehouse_id":"1", "quantity":"250",
            "minstock":"10", "maxstock":"50", "recordstock":"15" */}
            {step === 2 && (
              <>
                <div className="form-group">
                  <label htmlFor="warehouse_id">WareHouse id</label>
                  <input
                    id="warehouse_id"
                    type="number"
                    {...register("warehouse_id", {
                      required: "Warehouse id Required",
                      valueAsNumber: true,
                    })}
                  />
                  {errors.warehouse_id && <p>{errors.warehouse_id.message}</p>}
                </div>

                <div className="form-group">
                  <label htmlFor="quantity">Stock Quantity</label>
                  <input
                    id="quantity"
                    type="number"
                    {...register("quantity", {
                      required: "Stock Quantity Required",
                      valueAsNumber: true,
                    })}
                  />
                  {errors.quantity && <p>{errors.quantity.message}</p>}
                </div>

                <div className="form-group">
                  <label htmlFor="minstock">Minimum Stock</label>
                  <input
                    id="minstock"
                    type="number"
                    {...register("minstock", {
                      valueAsNumber: true,
                      required: "Min Stock Required",
                    })}
                  />
                  {errors.minstock && <p>{errors.minstock.message}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="minstock">Maximum Stock</label>
                  <input
                    id="maxstock"
                    type="number"
                    {...register("maxstock", {
                      valueAsNumber: true,
                      required: "Maximum Stock Required",
                    })}
                  />
                  {errors.maxstock && <p>{errors.maxstock.message}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="recordstock">Record Stock</label>
                  <input
                    id="recordstock"
                    type="number"
                    {...register("recordstock", {
                      valueAsNumber: true,
                      required: "Record Stock Required",
                    })}
                  />
                  {errors.recordstock && <p>{errors.recordstock.message}</p>}
                </div>

                <div className="flex justify-between">
                  <button id="back" onClick={() => setStep(1)}>
                    Back
                  </button>

                  <button
                    type="submit"
                    className="btn-submit"
                    disabled={isSubmitting}
                    // aria-disabled={true}
                  >
                    Submit
                  </button>
                </div>
              </>
            )}
          </form>
        </section>
      </div>
    </div>
  );
};

export default AddModel;
