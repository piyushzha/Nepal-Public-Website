/**
 * NPSBS API Layer — Cloudflare Edition
 * 
 * In Cloudflare Pages, the Worker is bound as a "Functions" proxy.
 * All /api/* requests are routed to the Worker automatically.
 * 
 * LOCAL DEV: Set API_BASE to your wrangler dev URL
 * PRODUCTION: API_BASE = '' (same origin, CF Pages routes /api/* to Worker)
 */

const API = (() => {
  // Change this to your worker URL during local dev:
  // e.g. 'http://localhost:8787'
  // In production on Cloudflare Pages, leave as '' (same origin)
  const API_BASE = 'https://npsbs-api.np-public12.workers.dev';
  const BASE = API_BASE + '/api';

  let _token = (() => { try { return sessionStorage.getItem('npsbs_token') || ''; } catch { return ''; } })();

  function headers() {
    const h = { 'Content-Type': 'application/json' };
    if (_token) h['Authorization'] = 'Bearer ' + _token;
    return h;
  }

  async function req(method, path, body) {
    const opts = { method, headers: headers() };
    if (body !== undefined) opts.body = JSON.stringify(body);
    let res;
    try {
      res = await fetch(BASE + path, opts);
    } catch (e) {
      throw new Error('Network error — check your connection');
    }
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || res.statusText);
    return data;
  }

  return {
    setToken(t) {
      _token = t;
      try { sessionStorage.setItem('npsbs_token', t); } catch { }
    },
    clearToken() {
      _token = '';
      try { sessionStorage.removeItem('npsbs_token'); } catch { }
    },
    hasToken() { return !!_token; },

    login: (username, password) => req('POST', '/auth/login', { username, password }),
    portalLogin: (role, id, verify) => req('POST', '/auth/portal', { role, id, verify }),

    getSettings: () => req('GET', '/settings'),
    saveSettings: (data) => req('PUT', '/settings', data),
    getAcadYear: () => req('GET', '/acadyear'),
    saveAcadYear: (acadYear) => req('PUT', '/acadyear', { acadYear }),

    getStudents: (params = {}) => {
      const qs = new URLSearchParams(params).toString();
      return req('GET', '/students' + (qs ? '?' + qs : ''));
    },
    addStudent: (data) => req('POST', '/students', data),
    updateStudent: (id, data) => req('PUT', '/students/' + id, data),
    deleteStudent: (id) => req('DELETE', '/students/' + id),
    upgradeStudents: (fromClass, toClass, ids) => req('POST', '/students/upgrade', { fromClass, toClass, ids }),

    getStaff: () => req('GET', '/staff'),
    addStaff: (data) => req('POST', '/staff', data),
    updateStaff: (id, data) => req('PUT', '/staff/' + id, data),
    deleteStaff: (id) => req('DELETE', '/staff/' + id),

    getNotices: () => req('GET', '/notices'),
    addNotice: (data) => req('POST', '/notices', data),
    updateNotice: (id, data) => req('PUT', '/notices/' + id, data),
    deleteNotice: (id) => req('DELETE', '/notices/' + id),

    getExams: () => req('GET', '/exams'),
    addExam: (data) => req('POST', '/exams', data),
    updateExam: (id, data) => req('PUT', '/exams/' + id, data),
    deleteExam: (id) => req('DELETE', '/exams/' + id),

    getGrades: (params = {}) => {
      const qs = new URLSearchParams(params).toString();
      return req('GET', '/grades' + (qs ? '?' + qs : ''));
    },
    getStudentGrades: (sid) => req('GET', '/grades/student/' + sid),
    saveGrade: (data) => req('POST', '/grades', data),
    deleteGrade: (id) => req('DELETE', '/grades/' + id),

    getBills: (params = {}) => {
      const qs = new URLSearchParams(params).toString();
      return req('GET', '/bills' + (qs ? '?' + qs : ''));
    },
    getStudentBills: (sid) => req('GET', '/bills/student/' + sid),
    generateBills: (term, year, cls) => req('POST', '/bills/generate', { term, year, cls }),
    payBill: (id, amount, method, note) => req('POST', '/bills/' + id + '/pay', { amount, method, note }),
    deleteBill: (id) => req('DELETE', '/bills/' + id),
    updateBill: (id, data) => req('PUT', '/bills/' + id, data),

    getPayments: (params = {}) => {
      const qs = new URLSearchParams(params).toString();
      return req('GET', '/payments' + (qs ? '?' + qs : ''));
    },

    getAttendance: (cls, date) => req('GET', `/attendance?cls=${cls}&date=${date}`),
    saveAttendance: (cls, date, records) => req('POST', '/attendance', { cls, date, records }),

    getHostel: () => req('GET', '/hostel'),
    addHostel: (data) => req('POST', '/hostel', data),
    updateHostel: (id, data) => req('PUT', '/hostel/' + id, data),
    deleteHostel: (id) => req('DELETE', '/hostel/' + id),

    getLibrary: () => req('GET', '/library'),
    addBook: (data) => req('POST', '/library', data),
    updateBook: (id, data) => req('PUT', '/library/' + id, data),
    deleteBook: (id) => req('DELETE', '/library/' + id),

    getGallery: () => req('GET', '/gallery'),
    addGalleryItem: (data) => req('POST', '/gallery', data),
    deleteGalleryItem: (id) => req('DELETE', '/gallery/' + id),

    getSubjects: () => req('GET', '/subjects'),
    saveSubjects: (data) => req('PUT', '/subjects', data),

    getFeeStructure: () => req('GET', '/feestructure'),
    saveFeeStructure: (data) => req('PUT', '/feestructure', data),

    getTermSettings: () => req('GET', '/termsettings'),
    saveTermSettings: (data) => req('PUT', '/termsettings', data),

    getDashboard: () => req('GET', '/dashboard'),
  };
})();
