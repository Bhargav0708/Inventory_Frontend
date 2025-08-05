import { validSchemaErrorData } from "@hookform/resolvers/valibot/src/__tests__/__fixtures__/data.js";
import type { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { useStockUpdate } from "../../api/stocks/ModifyStock";
type ModalProps = {
  handleClose: () => void;
  stock: {
    quantity: number;
    productid: number;
  };
};

type StockModifyQuantity = {
  quantity: number;
  productid: number;
};
const ModifyStockModel = ({ handleClose, stock }: ModalProps) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<StockModifyQuantity>({
    shouldUnregister: true,
    defaultValues: {
      quantity: stock.quantity,
      productid: stock.productid,
    },
  });
  const { updateStock, data: responseData, loading, error } = useStockUpdate();

  // console.log("the default values", stock.productid);
  // const
  // console.log(object);
  const handlesubmit = async (data: StockModifyQuantity) => {
    // const data = getValues();
    console.log("the response data", responseData);
    // console.log("the data is");
    // const dataoftheproduct = new FormData();
    // console.log("the data2", dataoftheproduct);
    // console.log("the prouduct id", data2.productid);
    console.log("after the submitting", data.quantity);
    console.log("the submiited stock of productid", data.productid);

    // const form = new FormData();
    // form.append("quantity", data.quantity);
    // form.append(
    //   "productid",
    //   data.productid
    //   // updateStock()
    // );
    const payload = {
      quantity: data.quantity,
      productid: data.productid,
    };
    updateStock(payload);
    alert("Updated Successfully");
    // productid
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
            Modify the Stock
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
          <form onSubmit={handleSubmit(handlesubmit)}>
            <input type="hidden" {...register("productid")} />
            <>
              <div className="form-group">
                <label htmlFor="quantity">Quantity</label>
                <input
                  id="quantity"
                  placeholder="Enter Quantity"
                  {...register("quantity", {
                    required: "Quantity Is Required",
                    valueAsNumber: true,
                    min: { value: 1, message: "Quantity must be at least 1" },
                  })}
                  type="number"
                />

                {errors.quantity && (
                  <p className="text-red-500 text-sm">
                    {errors.quantity.message as ReactNode}
                  </p>
                )}
              </div>
            </>

            <button
              type="submit"
              className="btn-submit"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default ModifyStockModel;
