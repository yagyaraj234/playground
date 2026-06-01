import React, { useState } from "react";
import users from "./data/users";

const Pagination = ({ maxPage, currentPage, handlePageChange }) => {
  return (
    <div className="page-no">
      {Array.from({ length: maxPage }, (_, idx) => (
        <div
          onClick={() => {
            handlePageChange(idx);
          }}
          className={`${idx === currentPage ? "active" : ""}`}
          key={idx}
        >
          {idx + 1}
        </div>
      ))}
    </div>
  );
};

export default function DataTable() {
  const [message, setMessage] = useState("Data Table");
  const [currData, setCurrData] = useState(users.slice(0, 10));
  const [selectedSize, setSelectedSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  function handleSizeChange(e) {
    const value = Number(e.target.value);

    setSelectedSize(value);

    setCurrData(() => {
      const start = currentPage * value;
      return users.slice(start, start + value);
    });
  }

  const handlePageChange = (value) => {
    setCurrentPage(value);

    setCurrData(() => {
      const start = value * selectedSize;
      const end = start + selectedSize;

      return users.slice(start, end);
    });
  };

  const maxPage = React.useMemo(() => {
    return Math.ceil(users.length / selectedSize);
  }, [selectedSize]);

  return (
    <div>
      <h1>{message}</h1>
      <table className="table">
        <thead>
          <tr>
            {[
              { label: "ID", key: "id" },
              { label: "Name", key: "name" },
              { label: "Age", key: "age" },
              { label: "Occupation", key: "occupation" },
            ].map(({ label, key }) => (
              <th key={key}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currData.map(({ id, name, age, occupation }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{name}</td>
              <td>{age}</td>
              <td>{occupation}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <select value={selectedSize} name="size" onChange={handleSizeChange}>
          <option id="5">5</option>
          <option id="10">10</option>
          <option id="20">20</option>
        </select>
        <Pagination
          maxPage={maxPage}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
