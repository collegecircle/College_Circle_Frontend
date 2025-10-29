// UserManagementWithStats.jsx
import React, { useState } from "react";
import { Users } from "lucide-react";
import axios from "axios";
import * as XLSX from "xlsx";

const BASE_URL = import.meta.env.VITE_API_URL;

function pad2(n) {
  return String(n).padStart(2, "0");
}

// Format JS Date to "DD-MM-YYYY hh:mm A" in IST
function formatDateToISTString(dateObj) {
  if (!dateObj) return "";
  try {
    const parts = dateObj.toLocaleString("en-GB", {
      timeZone: "Asia/Kolkata",
      hour12: true,
    });
    const [datePart, timePart] = parts.split(",").map((s) => s.trim());
    const [day, month, year] = datePart.split("/");
    let [time, ampm] = timePart.split(" ");
    let [hh, mm] = time.split(":");
    hh = pad2(Number(hh));
    mm = pad2(Number(mm));
    return `${pad2(day)}-${pad2(month)}-${year} ${hh}:${mm} ${ampm}`;
  } catch (err) {
    const d = dateObj;
    let hours = d.getHours();
    const minutes = pad2(d.getMinutes());
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${pad2(d.getDate())}-${pad2(
      d.getMonth() + 1
    )}-${d.getFullYear()} ${pad2(hours)}:${minutes} ${ampm}`;
  }
}

// Convert Firestore timestamp or ISO string to Date
function parseFirestoreTimestampToDate(ts) {
  if (!ts) return null;
  if (typeof ts === "object" && ts._seconds != null) {
    const ms = Number(ts._seconds) * 1000 + Number(ts._nanoseconds || 0) / 1e6;
    return new Date(ms);
  }
  if (typeof ts === "string") {
    const d = new Date(ts);
    if (!isNaN(d.getTime())) return d;
  }
  if (ts instanceof Date) return ts;
  return null;
}

const UserManagementWithStats = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const computeStats = (arr) => {
    const total = arr.length;
    const verified = arr.filter((u) => u.isVerified === true).length;
    const notVerified = arr.filter((u) => u.isVerified === false).length;
    return { total, verified, notVerified };
  };

  const handleGetAllUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${BASE_URL}/admin/all-users`);
      if (response?.data?.status_code === 200) {
        const fetched = Array.isArray(response.data.data)
          ? response.data.data
          : [];
        setUsers(fetched);
      } else {
        const msg = response?.data?.message || "Failed to fetch users";
        setError(msg);
        alert(msg);
      }
    } catch (err) {
      setError(err.message || "Network error");
      alert(err.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  const buildRow = (u) => {
    const createdDate = parseFirestoreTimestampToDate(u.createdAt);

    return {
      id: u.id ?? u._id ?? "",
      name: u.name ?? "",
      email: u.email ?? "",
      phone: u.phone != null ? String(u.phone) : "",
      studyField: u.studyField ?? "",
      isVerified: typeof u.isVerified === "boolean" ? u.isVerified : "",
      createdAt: createdDate ? formatDateToISTString(createdDate) : "",
    };
  };

  const exportUsers = (rows, filename) => {
    if (!rows || rows.length === 0) {
      alert("No users to export");
      return;
    }
    const worksheet = XLSX.utils.json_to_sheet(rows, { skipHeader: false });

    // ✅ Auto-fit column width
    const colWidths = Object.keys(rows[0]).map((key) => {
      const maxLength = Math.max(
        key.length,
        ...rows.map((row) => (row[key] ? row[key].toString().length : 0))
      );
      return { wch: maxLength + 2 };
    });
    worksheet["!cols"] = colWidths;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    XLSX.writeFile(workbook, filename);
  };

  const getDateForFilename = () => {
    const d = new Date();
    const dd = pad2(d.getDate());
    const mm = pad2(d.getMonth() + 1);
    const yyyy = d.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  };

  const handleDownloadAll = () => {
    const rows = users.map((u) => buildRow(u));
    exportUsers(rows, `all_users_${getDateForFilename()}.xlsx`);
  };

  const handleDownloadVerified = () => {
    const filtered = users.filter((u) => u.isVerified === true);
    const rows = filtered.map((u) => buildRow(u));
    exportUsers(rows, `verified_users_${getDateForFilename()}.xlsx`);
  };

  const handleDownloadNotVerified = () => {
    const filtered = users.filter((u) => u.isVerified === false);
    const rows = filtered.map((u) => buildRow(u));
    exportUsers(rows, `not_verified_users_${getDateForFilename()}.xlsx`);
  };

  const { total, verified, notVerified } = computeStats(users);

  return (
    <div className="p-4 sm:p-6">
      {/* Header card */}
      <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6 mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              Manage Students
            </h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">
              Handle Students effortlessly
            </p>
          </div>

          <div className="flex gap-3 w-full sm:w-auto">
            <button
              onClick={handleGetAllUsers}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              disabled={loading}
            >
              <Users className="w-5 h-5" />
              <span>{loading ? "Loading..." : "Get users"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Show stats & download buttons ONLY AFTER API fetch */}
      {users.length > 0 && (
        <>
          {/* Stats cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow p-4">
              <div className="text-sm text-gray-500">Total Users</div>
              <div className="text-2xl font-semibold">{total}</div>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <div className="text-sm text-gray-500">Verified Users</div>
              <div className="text-2xl font-semibold">{verified}</div>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <div className="text-sm text-gray-500">Not Verified Users</div>
              <div className="text-2xl font-semibold">{notVerified}</div>
            </div>
          </div>

          {/* Download buttons */}
          <div className="flex gap-3 items-center justify-center">
            <button
              onClick={handleDownloadVerified}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Download Verified Users
            </button>

            <button
              onClick={handleDownloadNotVerified}
              className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
            >
              Download Not Verified Users
            </button>

            <button
              onClick={handleDownloadAll}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Download All Users
            </button>
          </div>
        </>
      )}

      {error && <div className="mt-4 text-red-500">{error}</div>}
    </div>
  );
};

export default UserManagementWithStats;
