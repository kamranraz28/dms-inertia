import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useState } from "react";
import DataTable from "react-data-table-component";
import * as XLSX from "xlsx";

export default function AppDataTable({ columns, data, title = "Data Table" }) {
    const [filterText, setFilterText] = useState("");

    const filteredData = data.filter((item) =>
        JSON.stringify(item).toLowerCase().includes(filterText.toLowerCase())
    );

    const getExportData = () =>
        filteredData.map((row) =>
            Object.fromEntries(
                columns.map((col) => [
                    col.name,
                    typeof col.selector === "function"
                        ? col.selector(row)
                        : row[col.selector],
                ])
            )
        );

    const exportToExcel = () => {
        const exportData = getExportData();
        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, title);
        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
        });
        const blob = new Blob([excelBuffer], {
            type: "application/octet-stream",
        });
        saveAs(blob, `${title}.xlsx`);
    };

    const exportToCSV = () => {
        const exportData = getExportData();
        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const csv = XLSX.utils.sheet_to_csv(worksheet);
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        saveAs(blob, `${title}.csv`);
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        const tableColumn = columns.map((col) => col.name);
        const tableRows = filteredData.map((row) =>
            columns.map((col) =>
                typeof col.selector === "function"
                    ? col.selector(row)
                    : row[col.selector]
            )
        );

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            styles: { fontSize: 9 },
            margin: { top: 20 },
        });

        doc.save(`${title}.pdf`);
    };

    const exportToClipboard = () => {
        const rows = filteredData.map((row) =>
            columns.map((col) =>
                typeof col.selector === "function"
                    ? col.selector(row)
                    : row[col.selector]
            )
        );
        const clipboardText = rows.map((r) => r.join("\t")).join("\n");
        navigator.clipboard.writeText(clipboardText).then(() => {
            alert("Copied to clipboard!");
        });
    };

    const customStyles = {
        headCells: {
            style: {
                backgroundColor: "#f9fafb",
                fontWeight: 600,
                fontSize: "14px",
                color: "#374151",
                paddingLeft: "1.5rem",
                paddingRight: "1.5rem",
            },
        },
        rows: {
            style: {
                fontSize: "14px",
                color: "#374151",
                paddingLeft: "1.5rem",
                paddingRight: "1.5rem",
                minHeight: "56px",
            },
        },
        pagination: {
            style: {
                padding: "1rem 1.5rem",
                justifyContent: "center",
            },
            pageButtonsStyle: {
                borderRadius: "0.375rem",
                border: "1px solid #d1d5db",
                color: "#4b5563",
                margin: "0 4px",
                "&:hover": {
                    backgroundColor: "#f3f4f6",
                },
                "&:focus": {
                    outline: "none",
                    backgroundColor: "#e5e7eb",
                },
            },
        },
    };

    return (
        <div className="bg-white border border-gray-200 rounded-xl shadow overflow-hidden">
            {/* Top Bar: Search + Export Buttons */}
            <div className="flex flex-col md:flex-row items-center justify-between px-6 py-4 border-b border-gray-100 bg-white gap-4">
                {/* Search Input */}
                <input
                    type="text"
                    placeholder="Search..."
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                    className="w-full md:w-64 px-4 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />

                {/* Export Buttons */}
                <div className="flex flex-wrap items-center gap-2">
                    <button
                        onClick={exportToClipboard}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm px-3 py-1.5 rounded-lg"
                    >
                        Copy
                    </button>
                    <button
                        onClick={exportToCSV}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm px-3 py-1.5 rounded-lg"
                    >
                        CSV
                    </button>
                    <button
                        onClick={exportToExcel}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-3 py-1.5 rounded-lg"
                    >
                        Excel
                    </button>
                    <button
                        onClick={exportToPDF}
                        className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1.5 rounded-lg"
                    >
                        PDF
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="p-2">
                <DataTable
                    title={null}
                    columns={columns}
                    data={filteredData}
                    pagination
                    highlightOnHover
                    customStyles={customStyles}
                    noHeader
                />
            </div>
        </div>
    );
}
