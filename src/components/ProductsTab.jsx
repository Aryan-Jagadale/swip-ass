import React, { useState } from "react";
import { Button, Card, Col, Row, Table } from "react-bootstrap";
import { BiTrash } from "react-icons/bi";
import { BsEyeFill } from "react-icons/bs";
import InvoiceModal from "../components/InvoiceModal";
import { useNavigate } from "react-router-dom";
import { useInvoiceListData } from "../redux/hooks";
import { useDispatch } from "react-redux";
import { addItemToForm, deleteItem } from "../redux/invoicesSlice";
import TooltipHeader from "../commonComponents/TooltipHeader";


const ProductsTab = () => {
  const { invoiceList } = useInvoiceListData();
  const isListEmpty = invoiceList.length === 0;
  const navigate = useNavigate();

  const allItems = invoiceList.flatMap((invoice) =>
    invoice.items.map((item) => ({
      ...item,
      invoiceNumber: invoice.invoiceNumber,
      currency: invoice.currency,
      invoiceId: invoice.id,
    }))
  );
  const transformItems = (items) => {
    return items.map(item => ({
      ...item,
      itemName: item.itemName || '---',
      itemDescription: item.itemDescription || '---',
      itemPrice: item.itemPrice || '---',
      invoiceNumber: item.invoiceNumber || '---',
      currency: item.currency || '---'
    }));
  };
  const transformedItems = transformItems(allItems);


  return (
    <Row>
      <Col className="mx-auto">
        <Card
          className="d-flex p-3 p-md-4 my-3 my-md-4"
          style={{ width: "100%" }}
        >
          {isListEmpty ? (
            <div className="d-flex flex-column align-items-center full-width">
              <h5 className="fw-bold pb-2 pb-md-4">No invoices present</h5>
            </div>
          ) : (
            <div className="d-flex flex-column">
              <div className="d-flex flex-row align-items-center justify-content-between">
                <h3 className="fw-bold pb-2 pb-md-4">Products List</h3>
              </div>
              <Table responsive>
                <thead>
                  <tr>
                    <TooltipHeader
                      text="Inv."
                      tooltipText="Invoice Number"
                
                    />
                    <TooltipHeader
                      text="Name"
                      tooltipText="Item Name"
                      
                    />
                    <TooltipHeader
                      text="Price"
                      tooltipText="Item Price"
                      
                    />
                    <TooltipHeader
                      text="Actions"
                      tooltipText="Actions"
                     
                    />
                     <TooltipHeader
                      text=""
                      tooltipText=""
                      style={{
                        visibility:"hidden"
                      }}

                    />
                  </tr>
                </thead>
                <tbody>
                  {transformedItems.map((item) => (
                    <ItemRow
                      key={item.itemId}
                      item={item}
                      navigate={navigate}
                    />
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Card>
      </Col>
    </Row>
  );
};

const ItemRow = ({ item, navigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const handleDeleteClick = () => {
    dispatch(deleteItem({ invoiceId: item.invoiceId, itemId: item.itemId }));
  };

  const openModal = (event) => {
    event.preventDefault();
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <tr>
      <td style={{
        textAlign:"center"
      }}>{item.invoiceNumber}</td>
      <td className="fw-normal">{item.itemName}</td>
      <td className="fw-normal">
        {item.currency}
        {item.itemPrice}
      </td>

      <td style={{ width: "5%" }}>
        <Button variant="danger" onClick={handleDeleteClick}>
          <div className="d-flex align-items-center justify-content-center gap-2">
            <BiTrash />
          </div>
        </Button>
      </td>
      <td style={{ width: "5%" }}>
        <Button variant="secondary" onClick={openModal}>
          <div className="d-flex align-items-center justify-content-center gap-2">
            <BsEyeFill />
          </div>
        </Button>
      </td>
      <InvoiceModal
        showModal={isOpen}
        closeModal={closeModal}
        info={{
          isOpen,
          id: item.invoiceId,
          currency: item.currency,
          currentDate: "",
          invoiceNumber: item.invoiceNumber,
          dateOfIssue: "",
          billTo: "",
          billToEmail: "",
          billToAddress: "",
          billFrom: "",
          billFromEmail: "",
          billFromAddress: "",
          notes: "",
          total: "",
          subTotal: "",
          taxRate: "",
          taxAmount: "",
          discountRate: "",
          discountAmount: "",
        }}
        items={[item]}
        currency={item.currency}
        subTotal={""}
        taxAmount={""}
        discountAmount={""}
        total={item.itemPrice}
      />
    </tr>
  );
};

export default ProductsTab;
