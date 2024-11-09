import React from "react";
import SelectOption from "../SelectOption";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./EstimateTable.css";
import { Button } from "react-bootstrap";

function EstimateTable({
  columns,
  rows,
  handleChange,
  FetchRowId,
  deleteRow,
  SelectStyle,
  SearchHandler,
}) {
  return (
    <div
      style={{ overflow: "auto", maxWidth: "100%" }}
      className="table-responsive my-4 mx-5 slider border"
    >
      <table className="table align-middle">
        <thead className="thead-decor">
          <tr>
            <th className="th-decor">Sr. No.</th>
            {columns.map((col) => (
              <th key={col.key} className="th-decor">
                {col.label}
              </th>
            ))}
            <th className="th-decor">Actions</th>
          </tr>
        </thead>
        <tbody className="table-body-decor">
          {rows.map((row) => (
            <tr key={row.id}>
              <td className="th-decor">{row.id}</td>
              {columns.map((col) => (
                <td key={col?.key} className="td-cell">
                  {col?.SelectOption ? (
                    <div className="table-input-wrapper">
                      <SelectOption
                        Soptions={
                          col?.isCustomized ? row?.StoneSubList : col?.data
                        }
                        SName={col?.key}
                        PlaceHolder={col?.PlaceHolder}
                        Value={row[col?.key]}
                        OnSelect={(event) =>
                          handleChange(row?.id, col?.key, event)
                        }
                        SelectStyle={{
                          width: "100px",
                          height: "35px",
                          margin: 0,
                          padding: "0px 5px",
                          fontSize: "12px",
                          color: "grey",
                        }}
                      />
                      {col.isButton && (
                        <button
                          type="button"
                          className="table-button"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          onClick={() => FetchRowId(row?.id)}
                        >
                          <i className="bi bi-calculator-fill"></i>
                        </button>
                      )}
                    </div>
                  ) : col?.isTableSelection ? (
                    <div className="d-flex justify-content-start flex-nowrap table-input-wrapper">
                      <input
                        type={col.type}
                        name={col.key}
                        value={row[col.key] || ""}
                        placeholder={col.label}
                        className="input-cell"
                        style={{ width: col?.width || "100px" }}
                        onChange={(event) =>
                          handleChange(row?.id, col?.key, event)
                        }
                      />
                      <Button
                        className="table-button"
                        onClick={() => SearchHandler(row?.id, col.key)}
                      >
                        <i className="bi bi-search"></i>
                      </Button>
                    </div>
                  ) : (
                    <div className="table-input-wrapper">
                      <input
                        type={col.type}
                        name={col.key}
                        value={row[col.key] || ""}
                        onChange={(event) =>
                          handleChange(row.id, col.key, event)
                        }
                        placeholder={col.label}
                        className="input-cell"
                      />
                      {col.isButton && (
                        <Button
                          type="button"
                          className="table-button"
                          onClick={() => FetchRowId(row?.id)}
                        >
                          <i className="bi bi-calculator-fill"></i>
                        </Button>
                      )}
                    </div>
                  )}
                </td>
              ))}
              <td className="td-cell">
                <button
                  className={
                    row.id === 1
                      ? "table-button-del-disabled"
                      : "table-button-del"
                  }
                  disabled={row.id === 1 ? true : false}
                  onClick={() => deleteRow(row.id)}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EstimateTable;
