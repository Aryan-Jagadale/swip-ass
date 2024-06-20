import React, { useState } from "react";
import { Button, Card, Col, Row, Table } from "react-bootstrap";
import { BiTrash } from "react-icons/bi";
import { BsEyeFill } from "react-icons/bs";
import InvoiceModal from "../components/InvoiceModal";
import { useNavigate } from "react-router-dom";
import { useInvoiceListData } from "../redux/hooks";
import { useDispatch } from "react-redux";
import { addItemToForm, deleteItem } from "../redux/invoicesSlice";
import { GrAddCircle } from "react-icons/gr";

const ProductsTab = () => {
  const { invoiceList } = useInvoiceListData();
  const isListEmpty = invoiceList.length === 0;
  const navigate = useNavigate();

  // Flatten the items from all invoices
  const allItems = invoiceList.flatMap(invoice => 
    invoice.items.map(item => ({
      ...item,
      invoiceNumber: invoice.invoiceNumber,
      currency: invoice.currency,
      invoiceId: invoice.id,
    }))
  );

  return (
    <Row>
      <Col className="mx-auto" xs={12} md={8} lg={9}>
        <Card className="d-flex p-3 p-md-4 my-3 my-md-4" style={{ width: '100%' }}>
          {isListEmpty ? (
            <div className="d-flex flex-column align-items-center">
              <h3 className="fw-bold pb-2 pb-md-4">No invoices present</h3>
            </div>
          ) : (
            <div className="d-flex flex-column">
              <div className="d-flex flex-row align-items-center justify-content-between">
                <h3 className="fw-bold pb-2 pb-md-4">Items List</h3>
              </div>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Invoice No.</th>
                    <th>Item Name</th>
                    <th>Item Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allItems.map((item) => (
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

  const handleAddClick = () => {
    dispatch(addItemToForm({ invoiceId: item.invoiceId, newItem: item }));
    /* console.log({ invoiceId: item.invoiceId, newItem: item }); */
  }

  const openModal = (event) => {
    event.preventDefault();
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <tr>
      <td>{item.invoiceNumber}</td>
      <td className="fw-normal">{item.itemName}</td>
      <td className="fw-normal">
        {item.currency}
        {item.itemPrice}
      </td>
      <td style={{ width: "5%" }}>
        <Button variant="outline" onClick={handleAddClick}>
          <div className="d-flex align-items-center justify-content-center gap-2">
            <GrAddCircle />
          </div>
        </Button>
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
          currentDate: "", // Add other necessary fields if required
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