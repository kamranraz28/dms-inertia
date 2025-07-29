import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import * as XLSX from "xlsx";

const customStyles = {
  headCells: {
    style: {
      backgroundColor: "#f9fafb", // light gray
      fontWeight: "700",
      fontSize: "1.1rem",
      color: "#374151", // dark gray
      paddingLeft: "16px",
      paddingRight: "16px",
    },
  },
  rows: {
    style: {
      minHeight: "52px",
      borderBottom: "1px solid #e5e7eb",
    },
  },
  cells: {
    style: {
      paddingLeft: "16px",
      paddingRight: "16px",
    },
  },
};

export default function CustomDataTable({ title, columns, data }) {
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  // Filtered data based on filterText (search)
  const filteredData = useMemo(() => {
    if (!filterText) return data;
    return data.filter((item) =>
      columns.some((col) => {
        const val = typeof col.selector === "function" ? col.selector(item) : item[col.selector];
        if (!val) return false;
        return val.toString().toLowerCase().includes(filterText.toLowerCase());
      })
    );
  }, [filterText, data, columns]);

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text(title, 14, 10);
    autoTable(doc, {
      head: [columns.map((col) => col.name)],
      body: filteredData.map((row) =>
        columns.map((col) =>
          typeof col.selector === "function"
            ? col.selector(row)
            : row[col.selector]
        )
      ),
    });
    doc.save(`${title}.pdf`);
  };

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredData.map((row) => {
        let rowData = {};
        columns.forEach((col) => {
          rowData[col.name] =
            typeof col.selector === "function"
              ? col.selector(row)
              : row[col.selector];
        });
        return rowData;
      })
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const dataBlob = new Blob([excelBuffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });
    saveAs(dataBlob, `${title}.xlsx`);
  };

  const handlePrint = () => {
    const printContent = document.getElementById("print-table").innerHTML;
    const win = window.open("", "", "height=700,width=900");
    win.document.write("<html><head><title>Print</title>");
    win.document.write(
      '<link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">'
    );
    win.document.write("</head><body>");
    win.document.write(printContent);
    win.document.write("</body></html>");
    win.document.close();
    win.print();
  };

  // Custom pagination component positioning styles (optional)
  const paginationComponentOptions = {
    rowsPerPageText: "Rows per page:",
    rangeSeparatorText: "of",
    selectAllRowsItem: false,
  };

  // Render

  return (
    <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
        <h2 className="text-xl font-semibold text-gray-700">{title}</h2>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleExportPDF}
            className="text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            type="button"
          >
            PDF
          </button>
          <button
            onClick={handleExportExcel}
            className="text-sm px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            type="button"
          >
            Excel
          </button>
          <button
            onClick={handlePrint}
            className="text-sm px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-800"
            type="button"
          >
            Print
          </button>
        </div>
      </div>

      {/* Search input and rows per page selector container */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-4">
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 rounded px-3 py-2 w-full sm:w-64"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />

        {/* Rows per page selector will be rendered by DataTable pagination (customizing below) */}
      </div>

      <div id="print-table" className="overflow-x-auto">
        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          paginationComponentOptions={paginationComponentOptions}
          paginationPerPage={10}
          paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 30]}
          highlightOnHover
          responsive
          dense
          customStyles={customStyles}
          // Position pagination below and right-aligned using a custom pagination component wrapper (see below)
          paginationComponentOptions={{
            rowsPerPageText: "Rows per page:",
            rangeSeparatorText: "of",
          }}
        />
      </div>

      {/* Custom pagination styling */}
      <style>{`
        /* Position rows-per-page selector above the table (already done by DataTable's built-in pagination) */
        /* Align pagination controls to right */
        .rdt_Pagination {
          justify-content: flex-end !important;
          padding-top: 1rem;
          padding-bottom: 0;
        }
        /* Set width for action buttons */
        .action-button {
          min-width: 70px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
