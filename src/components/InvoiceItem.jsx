import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { BiTrash } from "react-icons/bi";
import EditableField from "./EditableField";

const getUniqueItemsByName = (items) => {
  const uniqueItemsMap = new Map();
  items.forEach(item => {
      if (!uniqueItemsMap.has(item.itemName)) {
          uniqueItemsMap.set(item.itemName, item);
      }
  });
  return Array.from(uniqueItemsMap.values());
};


const InvoiceItem = (props) => {
  const {
    onItemizedItemEdit,
    currency,
    onRowDel,
    items,
    onRowAdd,
    convertCurrency,
    oldCurrency,
    newCurrency,
  } = props;

  const itemTable = items?.map((item) => {
    return (
      <ItemRow
        key={item.id}
        item={item}
        onDelEvent={onRowDel}
        onItemizedItemEdit={onItemizedItemEdit}
        currency={currency}
        allItems={items}
        convertCurrency={convertCurrency}
        oldCurrency={oldCurrency}
        newCurrency={newCurrency}
      />
    );
  });

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>ITEM</th>
            <th>QTY</th>
            <th>PRICE/RATE</th>
            <th className="text-center">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {itemTable.length > 0 ? (
            itemTable
          ) : (
            <tr>
              {" "}
              <td colSpan={4} className="text-center">
                <div>No item present!</div>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <Button className="fw-bold" onClick={onRowAdd}>
        Add Item
      </Button>
    </div>
  );
};

const ItemRow = (props) => {
  const onDelEvent = () => {
    props.onDelEvent(props.item);
  };

  const handlePriceChange = (event) => {
    const convertedPrice = props.convertCurrency(
      event.target.value,
      props.oldCurrency,
      props.newCurrency
    );
    props.onItemizedItemEdit(
      {
        target: { name: "itemPrice", value: convertedPrice },
      },
      props.item.itemId
    );
  };

  console.log();
  const uniqueItems = getUniqueItemsByName(props?.allItems);


  return (
    <tr>
      <td style={{ width: "100%" }}>
        <EditableField
          onItemizedItemEdit={(evt) =>
            props.onItemizedItemEdit(evt, props.item.itemId)
          }
          cellData={{
            type: "text",
            name: "itemName",
            placeholder: "Item name",
            value: props.item.itemName,
            id: props.item.itemId,
          }}
          options={uniqueItems}
        />
        <EditableField
          onItemizedItemEdit={(evt) =>
            props.onItemizedItemEdit(evt, props.item.itemId)
          }
          cellData={{
            type: "text",
            name: "itemDescription",
            placeholder: "Item description",
            value: props.item.itemDescription,
            id: props.item.itemId,
          }}
        />
      </td>
      <td style={{ minWidth: "70px" }}>
        <EditableField
          onItemizedItemEdit={(evt) =>
            props.onItemizedItemEdit(evt, props.item.itemId)
          }
          cellData={{
            type: "number",
            name: "itemQuantity",
            min: 1,
            step: "1",
            value: props.item.itemQuantity,
            id: props.item.itemId,
          }}
        />
      </td>
      <td style={{ minWidth: "130px" }}>
        <EditableField
          onItemizedItemEdit={handlePriceChange}
          cellData={{
            leading: props.currency,
            type: "number",
            name: "itemPrice",
            min: 1,
            step: "0.01",
            precision: 2,
            textAlign: "text-end",
            value: props.item.itemPrice,
            id: props.item.itemId,
          }}
        />
      </td>
      <td className="text-center" style={{ minWidth: "50px" }}>
        <BiTrash
          onClick={onDelEvent}
          style={{ height: "33px", width: "33px", padding: "7.5px" }}
          className="text-white mt-1 btn btn-danger"
        />
      </td>
    </tr>
  );
};

export default InvoiceItem;
