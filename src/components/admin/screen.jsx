import React from "react";
import { Link } from "react-router-dom";
import "./screen.scss"
import { FaRegEdit, FaRegTrashAlt, FaSpinner } from "react-icons/fa";

const CustomTable = ({ data, columns, activeTab, loading, handleEdit,  }) => {
    // console.log(data, columns);
    
  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            {columns.map((columnKey, index) => (
              <th key={index}>{columnKey}</th>
))}
{activeTab !== "Orders" ? (
                            activeTab !== "Corporate orders" ? (
                              activeTab !== "Packages orders" ? (
                                // <div className="empty">
                                  <th>Action</th>
                                // </div>
                              ) : (
                                ""
                              )
                            ) : null
                          ) : (
                            ""
                          )}
                          {activeTab === "Orders" ||
                          activeTab === "Corporate orders" ||
                          activeTab === "Packages orders" ? (
                            
                              <th>Status</th>
                        
                          ) : (
                            ""
                          )}

            </tr>
        </thead>
        <tbody>
          {data.map((col, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((key, colIndex) => (
                <td key={colIndex}>
                  {typeof col[key] === "string" &&
                  col[key].startsWith("http") &&
                  (col[key].includes("googleusercontent") ||
                    col[key].includes("res.cloudinary.com")) &&
                  col[key].slice(0, 50) ? (
                    <img
                      src={col[key]}
                      alt={`Image ${rowIndex}`}
                      style={{
                        width: "35px",
                        borderRadius: "50px",
                        height: "auto",
                      }}
                    />
                  ) : col[key] === true ? (
                    "Yes"
                  ) : col[key] === false ? (
                    "No"
                  ) : Array.isArray(col[key]) ? (
                    key === "statusHistory" ? (
                      <Link
                        to={"/dashboard/history"}
                        state={{
                          id: col._id,
                          tab: activeTab,
                        }}
                        style={{
                          textDecoration: "none",
                          color: "royalblue",
                        }}
                      >
                        Check History
                      </Link>
                    ) : key === "mynote" ? (
                      <Link
                        to={"/dashboard/notes"}
                        state={{ id: col._id }}
                        style={{
                          textDecoration: "none",
                          color: "royalblue",
                        }}
                      >
                        View Notes
                      </Link>
                    ) : (
                      <Link
                        to={`/dashboard/items`}
                        state={{
                          id: col._id,
                          arry: col[key],
                          ttle: col.title,
                        }}
                        style={{
                          textDecoration: "none",
                          color: "royalblue",
                        }}
                      >
                        View
                      </Link>
                    )
                  ) : (
                    col[key]
                  )}
                </td>
              ))}
               {activeTab !== "Orders" ? (
                                  activeTab !== "Corporate orders" ? (
                                    activeTab !== "Packages orders" ? (
                                      <div className="empty icons">
                                        {loading ? (
                                          <FaSpinner className="spinner" />
                                        ) : (
                                          <>
                                            {activeTab === "Clients" ||
                                            activeTab === "Services" ||
                                            activeTab === "Faq" ||
                                            activeTab === "Category" ? (
                                              <Link
                                                to={"/dashboard/edit"}
                                                state={{
                                                  tab: activeTab,
                                                  id: col._id,
                                                  image: col.image,
                                                  name: col.name,
                                                  question: col.question,
                                                  answer: col.answer,
                                                  catogery: col.catogery,
                                                }}
                                              >
                                                {" "}
                                                <FaRegEdit
                                                  className="edit"
                                                  size={18}
                                                />
                                              </Link>
                                            ) : activeTab === "Corporate" ||
                                              activeTab === "Packages" ? (
                                              <Link
                                                to={"/dashboard/corporate"}
                                                state={{
                                                  id: col._id,
                                                  name: col.title,
                                                  description: col.description,
                                                  image: col.image,
                                                  actualPrice: col.actualPrice,
                                                  discountedPrice:
                                                    col.discountedPrice,
                                                  catogery: col.catogery,
                                                  items: col.items,
                                                  tag: col.tags,
                                                  tab: activeTab,
                                                }}
                                              >
                                                {" "}
                                                <FaRegEdit
                                                  className="edit"
                                                  size={18}
                                                />
                                              </Link>
                                            ) : (
                                              <FaRegEdit
                                                className="edit"
                                                size={18}
                                                onClick={() => {
                                                  {
                                                    setVisible(true);
                                                    setUpdate(true);
                                                    setAdmin(true);
                                                    update
                                                      ? console.log("nalla")
                                                      : handleEdit(
                                                          "edit",
                                                          col._id
                                                        ),
                                                      setId(col._id);
                                                  }
                                                }}
                                              />
                                            )}
                                            <FaRegTrashAlt
                                              className="delete"
                                              size={18}
                                              onClick={() => {
                                                handleEdit("delete", col._id);
                                              }}
                                            />
                                          </>
                                        )}
                                      </div>
                                    ) : (
                                      <></>
                                    )
                                  ) : null
                                ) : (
                                  <></>
                                )}
                                {

                                }
                                
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;
