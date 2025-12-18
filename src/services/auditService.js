// src/services/auditService.js
import axiosInstance from "../utils/axiosInstance";

/**
 * BASE PATH
 * Backend can internally differentiate logs by type
 */
const BASE_URL = "/users/audit-logs/";

export const auditService = {
  /* =====================================================
     1️⃣ AUDIT OVERVIEW (Dashboard Cards)
     ===================================================== */
  async getOverview() {
    try {
      const res = await axiosInstance.get(`${BASE_URL}overview/`);
      return res.data;
    } catch (error) {
      console.error("Audit Overview Error:", error);
      return null;
    }
  },

  /* =====================================================
     2️⃣ AUDIT LOGS (Main Logs Page)
     Filters:
     - module
     - action
     - user
     - date_from, date_to
     - page, page_size
     ===================================================== */
  async getLogs(params = {}) {
    try {
      const res = await axiosInstance.get(BASE_URL, { params });
      return res.data;
    } catch (error) {
      console.error("Fetch Audit Logs Error:", error);
      return { results: [], count: 0 };
    }
  },

  /* =====================================================
     3️⃣ USER ACTIVITY LOGS
     (Login, Logout, Permission Changes)
     ===================================================== */
  async getUserActivity(params = {}) {
    try {
      const res = await axiosInstance.get(`${BASE_URL}user-activity/`, {
        params,
      });
      return res.data;
    } catch (error) {
      console.error("Fetch User Activity Error:", error);
      return [];
    }
  },

  /* =====================================================
     4️⃣ SYSTEM EVENTS
     (System jobs, token failures, cron, subscription events)
     ===================================================== */
  async getSystemEvents(params = {}) {
    try {
      const res = await axiosInstance.get(`${BASE_URL}system-events/`, {
        params,
      });
      return res.data;
    } catch (error) {
      console.error("Fetch System Events Error:", error);
      return [];
    }
  },

  /* =====================================================
     ADD AUDIT LOG (Optional / Internal)
     ===================================================== */
  async addLog(payload) {
    try {
      const res = await axiosInstance.post(BASE_URL, payload);
      return res.data;
    } catch (error) {
      console.error("Add Audit Log Error:", error);
      throw error;
    }
  },

  /* =====================================================
     UPDATE AUDIT LOG (Rare – Admin only)
     ===================================================== */
  async updateLog(id, payload) {
    try {
      const res = await axiosInstance.patch(`${BASE_URL}${id}/`, payload);
      return res.data;
    } catch (error) {
      console.error("Update Audit Log Error:", error);
      throw error;
    }
  },

  /* =====================================================
     DELETE AUDIT LOG (Master Admin only)
     ===================================================== */
  async deleteLog(id) {
    try {
      await axiosInstance.delete(`${BASE_URL}${id}/`);
    } catch (error) {
      console.error("Delete Audit Log Error:", error);
      throw error;
    }
  },

  /* =====================================================
     EXPORT AUDIT LOGS (CSV / Excel)
     ===================================================== */
  async exportLogs(params = {}) {
    try {
      const res = await axiosInstance.get(`${BASE_URL}export/`, {
        params,
        responseType: "blob",
      });
      return res;
    } catch (error) {
      console.error("Export Audit Logs Error:", error);
      throw error;
    }
  },
};
