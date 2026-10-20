/**
 * NPSBS API Bridge
 * Patches all localStorage-based functions to use REST API.
 * Loaded after api.js and after the original inline scripts.
 */

// ─── SIGNATURE IMAGES ────────────────────────────────────────────────────────
const SIG_PRINCIPAL = '/sig_principal.jpg';
const SIG_ACCOUNTANT = '/sig_accountant.jpg';

// ─── NEPALI BS DATE CONVERTER ─────────────────────────────────────────────────
const BS_DATA = [
  [2000,[30,32,31,32,31,30,30,30,29,30,29,31]],
  [2001,[31,31,32,31,31,31,30,29,30,29,30,30]],
  [2002,[31,31,32,32,31,30,30,29,30,29,30,30]],
  [2003,[31,32,31,32,31,30,30,30,29,29,30,31]],
  [2004,[30,32,31,32,31,30,30,30,29,30,29,31]],
  [2005,[31,31,32,31,31,31,30,29,30,29,30,30]],
  [2006,[31,31,32,32,31,30,30,29,30,29,30,30]],
  [2007,[31,32,31,32,31,30,30,30,29,29,30,31]],
  [2008,[31,31,31,32,31,30,30,30,29,30,29,31]],
  [2009,[31,31,32,31,31,31,30,29,30,29,30,30]],
  [2010,[31,31,32,32,31,30,30,29,30,29,30,30]],
  [2011,[31,32,31,32,31,30,30,30,29,29,30,31]],
  [2012,[31,31,31,32,31,30,30,30,29,30,29,31]],
  [2013,[31,31,32,31,31,31,30,29,30,29,30,30]],
  [2014,[31,31,32,32,31,30,30,29,30,29,30,30]],
  [2015,[31,32,31,32,31,30,30,30,29,29,30,31]],
  [2016,[31,31,31,32,31,30,30,30,29,30,29,31]],
  [2017,[31,31,32,31,31,31,30,29,30,29,30,30]],
  [2018,[31,31,32,32,31,30,30,29,30,29,30,30]],
  [2019,[31,32,31,32,31,30,30,30,29,29,30,31]],
  [2020,[31,31,31,32,31,30,30,30,29,30,29,31]],
  [2021,[31,31,32,31,31,31,30,29,30,29,30,30]],
  [2022,[31,31,32,32,31,30,30,29,30,29,30,30]],
  [2023,[31,32,31,32,31,30,30,30,29,29,30,31]],
  [2024,[31,31,31,32,31,30,30,30,29,30,29,31]],
  [2025,[31,31,32,31,31,31,30,29,30,29,30,30]],
  [2026,[31,31,32,32,31,30,30,29,30,29,30,30]],
  [2027,[31,32,31,32,31,30,30,30,29,29,30,32]],
  [2028,[31,32,31,32,31,30,30,30,29,30,29,31]],
  [2029,[31,31,31,32,31,30,30,30,29,30,29,31]],
  [2030,[31,31,32,31,31,31,30,29,30,29,30,30]],
  [2031,[31,31,32,32,31,30,30,29,30,29,30,30]],
  [2032,[31,32,31,32,31,30,30,30,29,29,30,31]],
  [2033,[31,31,31,32,31,30,30,30,29,30,29,31]],
  [2034,[31,31,32,31,31,31,30,29,30,29,30,30]],
  [2035,[31,31,32,32,31,30,30,29,30,29,30,30]],
  [2036,[31,32,31,32,31,30,30,30,29,29,30,31]],
  [2037,[31,31,31,32,31,30,30,30,29,30,29,31]],
  [2038,[31,31,32,31,31,31,30,29,30,29,30,30]],
  [2039,[31,31,32,32,31,30,30,29,30,29,30,30]],
  [2040,[31,32,31,32,31,30,30,30,29,29,30,31]],
  [2041,[31,31,31,32,31,30,30,30,29,30,29,31]],
  [2042,[31,31,32,31,31,31,30,29,30,29,30,30]],
  [2043,[31,31,32,32,31,30,30,29,30,29,30,30]],
  [2044,[31,32,31,32,31,30,30,30,29,29,30,31]],
  [2045,[31,31,31,32,31,30,30,30,29,30,29,31]],
  [2046,[31,31,32,31,31,31,30,29,30,29,30,30]],
  [2047,[31,31,32,32,31,30,30,29,30,29,30,30]],
  [2048,[31,32,31,32,31,30,30,30,29,29,30,31]],
  [2049,[31,31,31,32,31,30,30,30,29,30,29,31]],
  [2050,[31,31,32,31,31,31,30,29,30,29,30,30]],
  [2051,[31,31,32,32,31,30,30,29,30,29,30,30]],
  [2052,[31,32,31,32,31,30,30,30,29,29,30,31]],
  [2053,[31,31,31,32,31,30,30,30,29,30,29,31]],
  [2054,[31,31,32,31,31,31,30,29,30,29,30,30]],
  [2055,[31,32,31,32,31,30,30,29,30,29,30,30]],
  [2056,[31,32,31,32,31,30,30,30,29,29,30,31]],
  [2057,[31,31,31,32,31,30,30,30,29,30,29,31]],
  [2058,[31,31,32,31,31,31,30,29,30,29,30,30]],
  [2059,[31,31,32,32,31,30,30,29,30,29,30,30]],
  [2060,[31,32,31,32,31,30,30,30,29,29,30,31]],
  [2061,[31,31,31,32,31,30,30,30,29,30,29,31]],
  [2062,[31,31,32,31,31,31,30,29,30,29,30,30]],
  [2063,[31,31,32,32,31,30,30,29,30,29,30,30]],
  [2064,[31,32,31,32,31,30,30,30,29,29,30,31]],
  [2065,[31,31,31,32,31,30,30,30,29,30,29,31]],
  [2066,[31,31,32,31,31,31,30,29,30,29,30,30]],
  [2067,[31,31,32,32,31,30,30,29,30,29,30,30]],
  [2068,[31,32,31,32,31,30,30,30,29,29,30,31]],
  [2069,[31,31,31,32,31,30,30,30,29,30,29,31]],
  [2070,[31,31,32,31,31,31,30,29,30,29,30,30]],
  [2071,[31,31,32,32,31,30,30,29,30,29,30,30]],
  [2072,[31,32,31,32,31,30,30,30,29,29,30,31]],
  [2073,[31,31,31,32,31,30,30,30,29,30,29,31]],
  [2074,[31,31,32,31,31,31,30,29,30,29,30,30]],
  [2075,[31,31,32,32,31,30,30,29,30,29,30,30]],
  [2076,[31,32,31,32,31,30,30,30,29,29,30,31]],
  [2077,[31,31,31,32,31,30,30,30,29,30,29,31]],
  [2078,[31,31,32,31,31,31,30,29,30,29,30,30]],
  [2079,[31,31,32,32,31,30,30,29,30,29,30,30]],
  [2080,[31,32,31,32,31,30,30,30,29,29,30,31]],
  [2081,[31,31,31,32,31,30,30,30,29,30,29,31]],
  [2082,[31,31,32,31,31,31,30,29,30,29,30,30]],
  [2083,[31,31,32,32,31,30,30,29,30,29,30,30]],
  [2084,[31,32,31,32,31,30,30,30,29,29,30,31]],
  [2085,[31,31,31,32,31,30,30,30,29,30,29,31]],
];

const BS_MONTHS = ['Baisakh','Jestha','Ashadh','Shrawan','Bhadra','Ashwin','Kartik','Mangsir','Poush','Magh','Falgun','Chaitra'];
const BS_MONTHS_NP = ['बैशाख','जेठ','असार','साउन','भाद्र','असोज','कार्तिक','मंसिर','पुस','माघ','फागुन','चैत'];

function adToBs(adYear, adMonth, adDay) {
  // Reference: 2000 BS = April 13, 1943 AD
  const refAD = new Date(1943, 3, 14); // April 14, 1943
  const inputAD = new Date(adYear, adMonth - 1, adDay);
  let totalDays = Math.floor((inputAD - refAD) / (1000 * 60 * 60 * 24));

  let bsYear = 1999, bsMonth = 12, bsDay = 1;
  for (const [yr, months] of BS_DATA) {
    for (let m = 0; m < 12; m++) {
      if (totalDays <= months[m]) {
        bsDay = totalDays;
        return { year: yr, month: m + 1, day: bsDay };
      }
      totalDays -= months[m];
    }
  }
  return { year: bsYear, month: bsMonth, day: bsDay };
}

function todayBS() {
  const now = new Date();
  return adToBs(now.getFullYear(), now.getMonth() + 1, now.getDate());
}

function formatBS(bsObj, style = 'full') {
  if (!bsObj) return '—';
  if (style === 'full') return bsObj.day + ' ' + BS_MONTHS[bsObj.month - 1] + ' ' + bsObj.year + ' B.S.';
  if (style === 'short') return bsObj.year + '-' + String(bsObj.month).padStart(2,'0') + '-' + String(bsObj.day).padStart(2,'0');
  if (style === 'np') return bsObj.year + ' ' + BS_MONTHS_NP[bsObj.month - 1] + ' ' + bsObj.day;
  return bsObj.day + '/' + bsObj.month + '/' + bsObj.year;
}

function adStrToBS(adStr) {
  if (!adStr) return '—';
  const parts = adStr.split('-');
  if (parts.length < 3) return adStr;
  const bs = adToBs(parseInt(parts[0]), parseInt(parts[1]), parseInt(parts[2]));
  return formatBS(bs, 'full');
}

function todayBSStr() {
  return formatBS(todayBS(), 'full');
}

// ─── GLOBAL STATE (replaces DB object) ────────────────────────────────────────
// We keep a local DB cache for rendering, synced from the server.
// Key insight: we override save/load functions to go through API.

// ─── LOADING STATE ────────────────────────────────────────────────────────────
function apiLoading(show = true) {
  let el = document.getElementById('_apiOverlay');
  if (!el) {
    el = document.createElement('div');
    el.id = '_apiOverlay';
    el.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(255,255,255,.6);z-index:99999;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(2px);';
    el.innerHTML = '<div style="background:#fff;border-radius:16px;padding:28px 36px;box-shadow:0 8px 40px rgba(0,0,0,.18);text-align:center;"><div style="font-size:2rem;margin-bottom:8px;">⏳</div><div style="font-family:Cinzel,serif;font-weight:700;color:var(--n);">Loading…</div></div>';
    document.body.appendChild(el);
  }
  el.style.display = show ? 'flex' : 'none';
}

// ─── OVERRIDE ADMIN LOGIN ──────────────────────────────────────────────────────
window.doAdminLogin = async function () {
  const u = document.getElementById('loginUser').value.trim();
  const p = document.getElementById('loginPass').value.trim();
  const err = document.getElementById('loginErr');
  try {
    const data = await API.login(u, p);
    API.setToken(data.token);
    err.style.display = 'none';
    await loadAllData();
    showAdminSite();
    buildAdminPanels();
    showAdmin('dashboard');
  } catch {
    err.style.display = 'block';
    document.getElementById('loginPass').value = '';
  }
};

window.doLogout = function () {
  API.clearToken();
  showPublicSite();
  goPage('home');
};

// ─── OVERRIDE PORTAL LOGIN ────────────────────────────────────────────────────
window.portalLogin = async function () {
  const role = document.getElementById('portalRole').value;
  const id = document.getElementById('portalID').value.trim();
  const verify = document.getElementById('portalVerify').value.trim();
  const err = document.getElementById('portalErr');
  err.style.display = 'none';
  try {
    const res = await API.portalLogin(role, id, verify);
    if (role === 'student') {
      const grades = await API.getStudentGrades(res.data.id);
      const bills = await API.getStudentBills(res.data.id);
      // Patch DB for the original render functions
      DB.grades = grades;
      DB.bills = bills;
      showStudentPortal(res.data);
    } else {
      showTeacherPortal(res.data);
    }
  } catch {
    err.style.display = 'block';
  }
};

// ─── CHECK BILL (public) ──────────────────────────────────────────────────────
// Keep original checkBill using DB.students/DB.bills — populated on page load
// for the public-facing pages. We'll load public data on startup.

// ─── LOAD ALL DATA INTO DB CACHE ─────────────────────────────────────────────
async function loadAllData() {
  apiLoading(true);
  try {
    const [students, staff, notices, exams, grades, bills, payments,
      hostel, library, gallery, subjects, feeStructure, termSettings, acadYearRes, dashboard] =
      await Promise.all([
        API.getStudents(),
        API.getStaff(),
        API.getNotices(),
        API.getExams(),
        API.getGrades(),
        API.getBills(),
        API.getPayments(),
        API.getHostel(),
        API.getLibrary(),
        API.getGallery(),
        API.getSubjects(),
        API.getFeeStructure(),
        API.getTermSettings(),
        API.getAcadYear(),
        API.getDashboard()
      ]);
    DB.students = students;
    DB.staff = staff;
    DB.notices = notices;
    DB.exams = exams;
    DB.grades = grades;
    DB.bills = bills;
    DB.staffbills = payments; // map payments to staffbills slot for payments panel
    DB.hostel = hostel;
    DB.library = library;
    DB.gallery = gallery;
    DB.subjects = subjects;
    DB.fees = {
      monthly: feeStructure.monthly || {},
      exam: feeStructure.exam || {},
      vest: feeStructure.vest || 0,
      tie: feeStructure.tie || 0
    };
    DB.termSettings = termSettings;
    DB.acadYear = acadYearRes.acadYear;
  } finally {
    apiLoading(false);
  }
}

// ─── LOAD PUBLIC DATA (no auth) ───────────────────────────────────────────────
async function loadPublicData() {
  try {
    const [notices, exams, gallery] = await Promise.all([
      API.getNotices(),
      API.getExams(),
      API.getGallery()
    ]);
    DB.notices = notices;
    DB.exams = exams;
    DB.gallery = gallery;
    renderHome();
  } catch { /* silent fail on network error */ }
}

// ─── OVERRIDE saveKey (no-op — saves done per-API-call) ──────────────────────
window.saveKey = function () { /* no-op — API calls handle persistence */ };

// ─── OVERRIDE DASHBOARD ───────────────────────────────────────────────────────
window.updateDashboard = async function () {
  try {
    const d = await API.getDashboard();
    const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
    set('dashDate', new Date().toDateString() + ' | ' + d.acadYear);
    set('dStudents', d.totalStudents);
    set('dPaid', DB.bills.filter(b => b.status === 'Paid').length);
    set('dUnpaid', DB.bills.filter(b => b.status !== 'Paid').length);
    set('dRevenue', 'Rs.' + d.totalRevenue.toLocaleString());
    set('dNotices', DB.notices.length);
    set('dTransport', DB.students.filter(s => s.transport).length);
    set('dStaff', d.totalStaff);
    set('dBooks', DB.library.filter(b => b.status !== 'Returned').length);
  } catch { /* silent */ }
};

// ─── OVERRIDE STUDENT FUNCTIONS ───────────────────────────────────────────────
window.saveStudent = async function () {
  const id = document.getElementById('sID').value;
  const s = {
    name: document.getElementById('sName').value.trim(),
    sno: document.getElementById('sSno').value.trim(),
    class: document.getElementById('sClass').value,
    section: document.getElementById('sSec').value || 'A',
    dob: document.getElementById('sDOB').value,
    gender: document.getElementById('sGender').value,
    parent: document.getElementById('sParent').value.trim(),
    phone: document.getElementById('sPhone').value.trim(),
    address: document.getElementById('sAddr').value.trim(),
    transport: document.getElementById('sTrans').checked,
    transportFee: parseInt(document.getElementById('sTFee').value) || 0,
    route: document.getElementById('sRoute').value.trim(),
    vest: document.getElementById('sVest').checked,
    vestFee: parseInt(document.getElementById('sVFee').value) || 0,
    tie: document.getElementById('sTie').checked,
    tieFee: parseInt(document.getElementById('sTIFee').value) || 0,
    prevDue: parseInt(document.getElementById('sPrevDue').value) || 0,
    otherDue: parseInt(document.getElementById('sOtherDue').value) || 0,
    photo: document.getElementById('sPD').value
  };
  if (!s.name || !s.sno) { toast('Name and Student No. required.', 'error'); return; }
  try {
    if (id) {
      await API.updateStudent(id, s);
      DB.students = DB.students.map(x => x.id === id ? { ...x, ...s } : x);
    } else {
      const ns = await API.addStudent(s);
      DB.students.push(ns);
    }
    closeModal('mo-student');
    toast(id ? 'Student updated!' : 'Student added!');
    renderStudents();
    updateDashboard();
    populateDrops();
  } catch (e) { toast(e.message, 'error'); }
};

window.deleteStudent = async function (id) {
  if (!confirm('Delete?')) return;
  try {
    await API.deleteStudent(id);
    DB.students = DB.students.filter(s => s.id !== id);
    DB.bills = DB.bills.filter(b => b.studentId !== id);
    toast('Deleted.', 'error');
    renderStudents();
    updateDashboard();
    populateDrops();
  } catch (e) { toast(e.message, 'error'); }
};

window.doUpgrade = async function () {
  const tc = document.getElementById('ugTo').value;
  const year = document.getElementById('ugYear').value;
  if (!tc || !year) { toast('Select year.', 'error'); return; }
  const sel = [...document.querySelectorAll('.ugCb:checked')].map(cb => cb.value);
  if (!sel.length) { toast('No students selected.', 'error'); return; }
  try {
    await API.upgradeStudents(document.getElementById('ugFrom').value, tc, sel);
    sel.forEach(id => { const s = DB.students.find(x => x.id === id); if (s) s.class = tc; });
    toast(sel.length + ' promoted to ' + tc + '!');
    loadUpgradeList();
    populateDrops();
  } catch (e) { toast(e.message, 'error'); }
};

// ─── OVERRIDE STAFF FUNCTIONS ─────────────────────────────────────────────────
window.saveStaff = async function () {
  const id = document.getElementById('stID').value;
  const s = {
    name: document.getElementById('stName').value.trim(),
    sid: document.getElementById('stSid').value.trim(),
    role: document.getElementById('stRole').value,
    subject: document.getElementById('stSub').value.trim(),
    phone: document.getElementById('stPhone').value.trim(),
    salary: parseInt(document.getElementById('stSalary').value) || 0,
    classAssign: document.getElementById('stCls').value.trim(),
    joined: document.getElementById('stJoined').value,
    photo: document.getElementById('stPD').value
  };
  if (!s.name) { toast('Name required.', 'error'); return; }
  try {
    if (id) {
      await API.updateStaff(id, s);
      DB.staff = DB.staff.map(x => x.id === id ? { ...x, ...s } : x);
    } else {
      const ns = await API.addStaff(s);
      DB.staff.push(ns);
    }
    closeModal('mo-staff');
    toast(id ? 'Updated!' : 'Staff added!');
    renderStaff();
    updateDashboard();
  } catch (e) { toast(e.message, 'error'); }
};

window.deleteStaff = async function (id) {
  if (!confirm('Delete?')) return;
  try {
    await API.deleteStaff(id);
    DB.staff = DB.staff.filter(s => s.id !== id);
    toast('Deleted.', 'error');
    renderStaff();
  } catch (e) { toast(e.message, 'error'); }
};

// ─── OVERRIDE NOTICE FUNCTIONS ────────────────────────────────────────────────
window.saveNotice = async function () {
  const id = document.getElementById('nID').value;
  const title = document.getElementById('nTitle').value.trim();
  const content = document.getElementById('nContent').value.trim();
  if (!title || !content) { toast('Title and content required.', 'error'); return; }
  const n = {
    type: document.getElementById('nType').value,
    date: document.getElementById('nDate').value,
    title, content
  };
  try {
    if (id) {
      await API.updateNotice(id, n);
      DB.notices = DB.notices.map(x => x.id === id ? { ...x, ...n } : x);
    } else {
      const nn = await API.addNotice(n);
      DB.notices.push(nn);
    }
    closeModal('mo-notice');
    toast('Saved!');
    renderAdminNotices();
    renderHome();
  } catch (e) { toast(e.message, 'error'); }
};

window.deleteNotice = async function (id) {
  if (!confirm('Delete?')) return;
  try {
    await API.deleteNotice(id);
    DB.notices = DB.notices.filter(n => n.id !== id);
    toast('Deleted.', 'error');
    renderAdminNotices();
    renderHome();
  } catch (e) { toast(e.message, 'error'); }
};

// ─── OVERRIDE EXAM FUNCTIONS ──────────────────────────────────────────────────
window.saveExam = async function () {
  const id = document.getElementById('exID').value;
  const sub = document.getElementById('exSub').value.trim();
  if (!sub) { toast('Subject required.', 'error'); return; }
  const e = {
    term: document.getElementById('exTerm').value,
    date: document.getElementById('exDate').value,
    subject: sub,
    class: document.getElementById('exClass').value,
    start: document.getElementById('exStart').value,
    end: document.getElementById('exEnd').value,
    full: parseInt(document.getElementById('exFM').value) || 100,
    pass: parseInt(document.getElementById('exPM').value) || 40
  };
  try {
    if (id) {
      await API.updateExam(id, e);
      DB.exams = DB.exams.map(x => x.id === id ? { ...x, ...e } : x);
    } else {
      const ne = await API.addExam(e);
      DB.exams.push(ne);
    }
    closeModal('mo-exam');
    toast('Saved!');
    renderAdminExams();
  } catch (er) { toast(er.message, 'error'); }
};

window.deleteExam = async function (id) {
  if (!confirm('Delete?')) return;
  try {
    await API.deleteExam(id);
    DB.exams = DB.exams.filter(e => e.id !== id);
    toast('Deleted.', 'error');
    renderAdminExams();
  } catch (e) { toast(e.message, 'error'); }
};

// ─── OVERRIDE GRADE FUNCTIONS ─────────────────────────────────────────────────
window.saveGrade = async function () {
  const sid = document.getElementById('grStudent').value;
  if (!sid) { toast('Select a student.', 'error'); return; }
  const s = DB.students.find(x => x.id === sid);
  const subs = getSubjects(s.class);
  const term = document.getElementById('grTerm').value;
  const year = document.getElementById('grYear').value;
  const marks = subs.map((sub, i) => {
    const th = parseInt(document.getElementById('grTH' + i)?.value) || 0;
    const pr = parseInt(document.getElementById('grPR' + i)?.value) || 0;
    const total = th + pr;
    const pct = ((total / (sub.fm || 100)) * 100).toFixed(1);
    const gr = getGrade(parseFloat(pct));
    return { subject: sub.name, theory: th, practical: pr, total, fm: sub.fm || 100, pm: sub.pm || 40, grade: gr.grade, gpa: gr.gpa, pct: parseFloat(pct) };
  });
  const totalObt = marks.reduce((a, m) => a + m.total, 0);
  const totalFM = marks.reduce((a, m) => a + (m.fm || 100), 0);
  const pct = totalFM > 0 ? ((totalObt / totalFM) * 100).toFixed(2) : 0;
  const grObj = getGrade(parseFloat(pct));
  const anyFail = marks.some(m => m.total < (m.pm || 40));
  const g = {
    studentId: sid, studentName: s.name, class: s.class,
    term, year, marks, totalMarks: totalObt, maxMarks: totalFM,
    percentage: parseFloat(pct), gpa: grObj.gpa, grade: grObj.grade,
    label: grObj.label, result: (grObj.grade === 'NG' || anyFail) ? 'FAIL' : 'PASS'
  };
  try {
    const saved = await API.saveGrade(g);
    // Remove existing + add new in cache
    DB.grades = DB.grades.filter(x => !(x.studentId === sid && x.term === term && x.year === year));
    DB.grades.push(saved);
    closeModal('mo-grade');
    toast('Marks saved!');
    renderGrades();
  } catch (e) { toast(e.message, 'error'); }
};

window.deleteGrade = async function (id) {
  if (!confirm('Delete?')) return;
  try {
    await API.deleteGrade(id);
    DB.grades = DB.grades.filter(g => g.id !== id);
    toast('Deleted.', 'error');
    renderGrades();
  } catch (e) { toast(e.message, 'error'); }
};

// ─── OVERRIDE BILLING FUNCTIONS ───────────────────────────────────────────────
window.generateBills = async function () {
  const term = document.getElementById('billTerm').value;
  const year = document.getElementById('billYear').value;
  const cls = document.getElementById('billCls').value;
  try {
    const res = await API.generateBills(term, year, cls);
    // Reload bills
    DB.bills = await API.getBills();
    toast('Generated ' + res.count + ' bills!');
    renderBills();
  } catch (e) { toast(e.message, 'error'); }
};

window.savePayment = async function () {
  const id = document.getElementById('payBillId').value;
  const amt = parseInt(document.getElementById('payAmount').value) || 0;
  if (amt <= 0) { toast('Enter valid amount.', 'error'); return; }
  const method = document.getElementById('payMode').value;
  const note = document.getElementById('payReceipt')?.value || '';
  try {
    await API.payBill(id, amt, method, note);
    DB.bills = await API.getBills();
    closeModal('mo-payment');
    toast('Payment recorded!');
    const b = DB.bills.find(x => x.id === id);
    if (b && b.status === 'Paid') printReceipt(id);
    renderPayments();
    renderBills();
    updateDashboard();
  } catch (e) { toast(e.message, 'error'); }
};

window.deleteBill = async function (id) {
  if (!confirm('Delete?')) return;
  try {
    await API.deleteBill(id);
    DB.bills = DB.bills.filter(b => b.id !== id);
    toast('Deleted.', 'error');
    renderBills();
  } catch (e) { toast(e.message, 'error'); }
};

// ─── OVERRIDE HOSTEL FUNCTIONS ────────────────────────────────────────────────
window.saveHostelBill = async function () {
  const sid = document.getElementById('hbStu').value;
  if (!sid) { toast('Select student.', 'error'); return; }
  const s = DB.students.find(x => x.id === sid);
  const h = {
    studentId: sid, studentName: s?.name || '',
    month: document.getElementById('hbMonth').value,
    room: document.getElementById('hbRoom').value,
    amount: parseInt(document.getElementById('hbAmt').value) || 0,
    meals: document.getElementById('hbMeals').value,
    mealFee: parseInt(document.getElementById('hbMFee').value) || 0,
    status: 'Unpaid'
  };
  try {
    const nh = await API.addHostel(h);
    DB.hostel.push(nh);
    closeModal('mo-hostel');
    toast('Hostel bill added!');
    renderHostel();
  } catch (e) { toast(e.message, 'error'); }
};

window.markHostelPaid = async function (id) {
  try {
    await API.updateHostel(id, { status: 'Paid' });
    const h = DB.hostel.find(x => x.id === id);
    if (h) h.status = 'Paid';
    toast('Marked paid!');
    renderHostel();
  } catch (e) { toast(e.message, 'error'); }
};

window.deleteHostel = async function (id) {
  if (!confirm('Delete?')) return;
  try {
    await API.deleteHostel(id);
    DB.hostel = DB.hostel.filter(h => h.id !== id);
    toast('Deleted.', 'error');
    renderHostel();
  } catch (e) { toast(e.message, 'error'); }
};

// ─── OVERRIDE LIBRARY FUNCTIONS ───────────────────────────────────────────────
window.saveBook = async function () {
  const sid = document.getElementById('bkStu').value;
  const title = document.getElementById('bkTitle').value.trim();
  if (!sid || !title) { toast('Book title and student required.', 'error'); return; }
  const s = DB.students.find(x => x.id === sid);
  const b = {
    title, author: document.getElementById('bkAuthor').value.trim(),
    studentId: sid, studentName: s?.name || '',
    issueDate: document.getElementById('bkIssue').value,
    dueDate: document.getElementById('bkDue').value,
    status: 'Issued'
  };
  try {
    const nb = await API.addBook(b);
    DB.library.push(nb);
    closeModal('mo-book');
    toast('Book issued!');
    renderLibrary();
    updateDashboard();
  } catch (e) { toast(e.message, 'error'); }
};

window.returnBook = async function (id) {
  try {
    await API.updateBook(id, { status: 'Returned', returnDate: new Date().toISOString().split('T')[0] });
    const b = DB.library.find(x => x.id === id);
    if (b) { b.status = 'Returned'; b.returnDate = new Date().toISOString().split('T')[0]; }
    toast('Book returned!');
    renderLibrary();
    updateDashboard();
  } catch (e) { toast(e.message, 'error'); }
};

window.deleteBook = async function (id) {
  if (!confirm('Delete?')) return;
  try {
    await API.deleteBook(id);
    DB.library = DB.library.filter(b => b.id !== id);
    toast('Deleted.', 'error');
    renderLibrary();
  } catch (e) { toast(e.message, 'error'); }
};

// ─── OVERRIDE ATTENDANCE FUNCTIONS ───────────────────────────────────────────
window.loadAttendance = async function () {
  const cls = document.getElementById('attClass').value;
  const date = document.getElementById('attDate').value;
  const students = DB.students.filter(s => s.class === cls);
  if (!students.length) {
    document.getElementById('attPanel').innerHTML = '<div class="alert a-w">No students in this class.</div>';
    return;
  }
  let saved = {};
  try { saved = await API.getAttendance(cls, date); } catch { }
  const key = cls + '__' + date;
  document.getElementById('attPanel').innerHTML =
    '<div class="fc"><div class="fct">📅 ' + cls + ' – ' + date + '</div>' +
    '<div style="display:flex;gap:7px;flex-wrap:wrap;margin-bottom:10px;">' +
    '<button class="btn btn-success btn-sm" onclick="markAllAtt(\'P\',\'' + key + '\')">✅ All Present</button>' +
    '<button class="btn btn-danger btn-sm" onclick="markAllAtt(\'A\',\'' + key + '\')">❌ All Absent</button>' +
    '<button class="btn btn-primary btn-sm" onclick="saveAttendance(\'' + key + '\')">💾 Save</button>' +
    '</div><table class="dt"><thead><tr><th>Sno</th><th>Name</th><th>Present</th><th>Absent</th><th>Leave</th></tr></thead><tbody>' +
    students.map(s =>
      '<tr><td>' + s.sno + '</td><td><strong>' + s.name + '</strong></td>' +
      '<td><input type="radio" name="att-' + s.id + '" value="P" ' + ((saved[s.id] || 'P') === 'P' ? 'checked' : '') + '></td>' +
      '<td><input type="radio" name="att-' + s.id + '" value="A" ' + (saved[s.id] === 'A' ? 'checked' : '') + '></td>' +
      '<td><input type="radio" name="att-' + s.id + '" value="L" ' + (saved[s.id] === 'L' ? 'checked' : '') + '></td></tr>'
    ).join('') +
    '</tbody></table></div>';
};

window.saveAttendance = async function (key) {
  const cls = document.getElementById('attClass').value;
  const date = document.getElementById('attDate').value;
  const records = {};
  DB.students.filter(s => s.class === cls).forEach(s => {
    const c = document.querySelector('input[name="att-' + s.id + '"]:checked');
    if (c) records[s.id] = c.value;
  });
  try {
    await API.saveAttendance(cls, date, records);
    toast('Attendance saved!');
  } catch (e) { toast(e.message, 'error'); }
};

// ─── OVERRIDE GALLERY FUNCTIONS ───────────────────────────────────────────────
window.uploadGalleryPhoto = async function () {
  const fi = document.getElementById('galFile');
  const cap = document.getElementById('galCaption').value.trim();
  const file = fi.files[0];
  if (!file) { toast('Select a photo.', 'error'); return; }
  const reader = new FileReader();
  reader.onload = async ev => {
    try {
      const ng = await API.addGalleryItem({ photo: ev.target.result, caption: cap, uploadedAt: new Date().toISOString() });
      DB.gallery.push(ng);
      fi.value = '';
      document.getElementById('galCaption').value = '';
      toast('Photo uploaded!');
      renderAdminGallery();
    } catch (e) { toast(e.message, 'error'); }
  };
  reader.readAsDataURL(file);
};

window.delGalleryPhoto = async function (id) {
  if (!confirm('Delete?')) return;
  try {
    await API.deleteGalleryItem(id);
    DB.gallery = DB.gallery.filter(g => g.id !== id);
    toast('Deleted.', 'error');
    renderAdminGallery();
  } catch (e) { toast(e.message, 'error'); }
};

// ─── OVERRIDE FEE STRUCTURE ───────────────────────────────────────────────────
window.saveFeeStructure = async function () {
  const monthly = {}, exam = {};
  CLASSES.forEach(c => {
    const k = c.replace(/ /g, '_');
    monthly[c] = parseInt(document.getElementById('fm_' + k)?.value) || 0;
    exam[c] = parseInt(document.getElementById('fe_' + k)?.value) || 0;
  });
  const vest = parseInt(document.getElementById('feeVest')?.value) || 0;
  const tie = parseInt(document.getElementById('feeTie')?.value) || 0;
  try {
    await API.saveFeeStructure({ monthly, exam, vest, tie });
    DB.fees = { monthly, exam, vest, tie };
    toast('Fee structure saved!');
  } catch (e) { toast(e.message, 'error'); }
};

// ─── OVERRIDE TERM SETTINGS ───────────────────────────────────────────────────
window.saveTermSettings = async function () {
  const termSettings = {};
  TERM_KEYS.forEach(tk => {
    termSettings[tk] = { months: [] };
    document.querySelectorAll('.termCb[data-term="' + tk + '"]:checked').forEach(cb => {
      termSettings[tk].months.push(cb.dataset.month);
    });
  });
  try {
    await API.saveTermSettings(termSettings);
    DB.termSettings = termSettings;
    toast('Term settings saved!');
  } catch (e) { toast(e.message, 'error'); }
};

// ─── OVERRIDE ACADEMIC YEAR ───────────────────────────────────────────────────
window.saveAcadYear = async function () {
  const v = document.getElementById('curAcadYear')?.value;
  if (!v) { toast('Enter year.', 'error'); return; }
  try {
    await API.saveAcadYear(v);
    DB.acadYear = v;
    toast('Academic year saved!');
    updateDashboard();
  } catch (e) { toast(e.message, 'error'); }
};

// ─── PATCH delGalleryPhoto to use id instead of index ────────────────────────
// Override renderAdminGallery to pass id instead of index
const _origBuildAdminPanels = window.buildAdminPanels;

// ─── FIX 1: COMPACT ADMIT CARD ───────────────────────────────────────────────
window.buildAdmitCard = function(s, b, examName, yr) {
  const termKey = examName.includes('First') ? 'First Term'
    : examName.includes('Second') ? 'Second Term'
    : examName.includes('Third') ? 'Third Term' : 'Annual';
  const termExams = DB.exams.filter(e => e.term === termKey);
  const photo = s.photo
    ? '<img src="' + s.photo + '" style="width:100%;height:100%;object-fit:cover;">'
    : '<div style="font-size:4pt;color:#888;text-align:center;padding-top:6px;line-height:1.4;">PASTE<br>PHOTO</div>';
  const rp = termExams.length > 8 ? '1px 2pt' : termExams.length > 5 ? '1.5px 2pt' : '2px 2pt';
  const rf = termExams.length > 8 ? '3pt' : termExams.length > 5 ? '3.2pt' : '3.5pt';
  const rows = termExams.map(e =>
    '<tr>'
    + '<td style="padding:' + rp + ';font-size:' + rf + ';border:.2pt solid #ddd;">' + (e.date||'\u2014').slice(5) + '</td>'
    + '<td style="padding:' + rp + ';font-size:' + rf + ';border:.2pt solid #ddd;max-width:18mm;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + (e.subject||'').substring(0,14) + '</td>'
    + '<td style="padding:' + rp + ';font-size:' + rf + ';border:.2pt solid #ddd;">' + (e.start||'\u2014') + '</td>'
    + '<td style="padding:' + rp + ';font-size:' + rf + ';border:.2pt solid #ddd;">' + (e.full||100) + '</td>'
    + '</tr>'
  ).join('');
  return '<div style="width:65mm;border:1.5px solid #1A2B5F;background:#fff;font-family:Arial,sans-serif;display:flex;flex-direction:column;overflow:hidden;box-sizing:border-box;">'
    + '<div style="background:linear-gradient(135deg,#0D1B40,#1A2B5F);padding:3px 4px;display:flex;align-items:center;gap:3px;flex-shrink:0;">'
    + '<img src="' + LOGO_B64 + '" style="width:15px;height:15px;border-radius:50%;border:1px solid #B8832A;object-fit:cover;flex-shrink:0;">'
    + '<div><div style="color:#fff;font-size:4.3pt;font-weight:700;font-family:Georgia,serif;">NEPAL PUBLIC SECONDARY BOARDING SCHOOL</div>'
    + '<div style="color:rgba(232,184,75,.6);font-size:3.2pt;">Samsi-5, Mahottari | ESTD 2060</div></div></div>'
    + '<div style="height:2px;background:linear-gradient(90deg,#B8832A,#E8B84B,#B8832A);flex-shrink:0;"></div>'
    + '<div style="background:linear-gradient(135deg,#8B1A1A,#c0392b);padding:2px 4px;text-align:center;flex-shrink:0;">'
    + '<div style="color:#fff;font-size:5pt;font-weight:700;font-family:Georgia,serif;">' + examName.toUpperCase() + '</div>'
    + '<div style="color:rgba(255,255,255,.7);font-size:3.2pt;">ADMIT CARD \u2013 ' + yr + '</div></div>'
    + '<div style="padding:2px 4px;display:flex;gap:3px;flex-shrink:0;">'
    + '<div style="flex:1;min-width:0;"><table style="width:100%;border-collapse:collapse;">'
    + '<tr><td style="font-size:3.7pt;color:#666;padding:.5px 0;white-space:nowrap;">Name:</td><td style="font-size:4pt;font-weight:700;color:#1A2B5F;padding:.5px 0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + s.name + '</td></tr>'
    + '<tr><td style="font-size:3.7pt;color:#666;padding:.5px 0;">Sno:</td><td style="font-size:4pt;font-weight:700;color:#1A2B5F;padding:.5px 0;">' + s.sno + '</td></tr>'
    + '<tr><td style="font-size:3.7pt;color:#666;padding:.5px 0;">Class:</td><td style="font-size:4pt;font-weight:700;color:#1A2B5F;padding:.5px 0;">' + s.class + '\u2013' + (s.section||'A') + '</td></tr>'
    + '<tr><td style="font-size:3.7pt;color:#666;padding:.5px 0;">DOB:</td><td style="font-size:3.7pt;color:#1A2B5F;padding:.5px 0;">' + (s.dob ? adStrToBS(s.dob) : '\u2014') + '</td></tr>'
    + '</table></div>'
    + '<div style="width:23px;height:30px;border:1px solid #1A2B5F;border-radius:2px;overflow:hidden;background:#EEF2FF;flex-shrink:0;">' + photo + '</div></div>'
    + '<div style="height:.4px;background:#ddd;margin:0 4px;flex-shrink:0;"></div>'
    + '<div style="padding:2px 4px;flex-shrink:0;">'
    + '<div style="font-size:3.5pt;font-weight:700;text-transform:uppercase;color:#1A2B5F;letter-spacing:.3px;margin-bottom:1px;">Exam Schedule</div>'
    + (termExams.length
      ? '<table style="width:100%;border-collapse:collapse;"><tr style="background:#FEF3C7;"><td style="padding:1.5pt 2pt;font-size:3.3pt;font-weight:700;border:.2pt solid #ccc;">Date</td><td style="padding:1.5pt 2pt;font-size:3.3pt;font-weight:700;border:.2pt solid #ccc;">Subject</td><td style="padding:1.5pt 2pt;font-size:3.3pt;font-weight:700;border:.2pt solid #ccc;">Time</td><td style="padding:1.5pt 2pt;font-size:3.3pt;font-weight:700;border:.2pt solid #ccc;">FM</td></tr>' + rows + '</table>'
      : '<div style="font-size:3.5pt;color:#888;text-align:center;padding:2px;">No schedule yet</div>')
    + '</div>'
    + '<div style="border-top:.5pt solid #ddd;padding:2px 4px;display:flex;justify-content:space-between;flex-shrink:0;background:#F8FAFF;margin-top:2px;">'
    + '<div style="font-size:3.2pt;text-align:center;"><div style="height:8px;"></div><div style="border-top:.3pt solid #555;width:25px;margin:0 auto;padding-top:1px;">Student</div></div>'
    + '<div style="font-size:3.2pt;text-align:center;"><img src="' + SIG_PRINCIPAL + '" style="height:10px;object-fit:contain;display:block;margin:0 auto 1px;"><div style="border-top:.3pt solid #555;width:27px;margin:0 auto;padding-top:1px;">Principal</div></div>'
    + '</div></div>';
};


// ─── FIX 2: 2 GRADESHEETS PER A4 PAGE ────────────────────────────────────────
// ─── GRADESHEET PICKER MODAL ─────────────────────────────────────────────────
window.printGradeSheet = function(gradeId) {
  document.getElementById('gsPickerOverlay')?.remove();
  const overlay = document.createElement('div');
  overlay.id = 'gsPickerOverlay';
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:9999;display:flex;align-items:center;justify-content:center;padding:16px;';
  overlay.innerHTML = `
    <div style="background:#fff;border-radius:14px;max-width:380px;width:100%;box-shadow:0 20px 60px rgba(0,0,0,.3);overflow:hidden;">
      <div style="background:#1A2B5F;padding:13px 17px;display:flex;justify-content:space-between;align-items:center;">
        <div style="color:#fff;font-weight:700;font-size:.95rem;font-family:Georgia,serif;">📄 Choose Grade Sheet Style</div>
        <button onclick="document.getElementById('gsPickerOverlay').remove()" style="background:none;border:none;color:#fff;font-size:1.3rem;cursor:pointer;">✕</button>
      </div>
      <div style="padding:18px;display:flex;flex-direction:column;gap:12px;">
        <button onclick="document.getElementById('gsPickerOverlay').remove();printGradeSheetStyle1('${gradeId}')"
          style="padding:14px;border:2px solid #1A2B5F;border-radius:10px;background:#F0F4FF;cursor:pointer;text-align:left;">
          <div style="font-weight:700;color:#1A2B5F;margin-bottom:3px;">📋 Style 1 — GPA Grade Sheet</div>
          <div style="font-size:.78rem;color:#666;">Classic format with Theory, Practical, Grade & GPA. 2 per A4. Simple, no colours.</div>
        </button>
        <button onclick="document.getElementById('gsPickerOverlay').remove();printGradeSheetStyle2('${gradeId}')"
          style="padding:14px;border:2px solid #8B1A1A;border-radius:10px;background:#FFF5F5;cursor:pointer;text-align:left;">
          <div style="font-weight:700;color:#8B1A1A;margin-bottom:3px;">📊 Style 2 — Marks & Percentage Sheet</div>
          <div style="font-size:.78rem;color:#666;">Detailed format with Marks, %, GPA. Like the official SEE sheet. 1 full A4 page.</div>
        </button>
      </div>
    </div>`;
  document.body.appendChild(overlay);
};

// ─── STYLE 1: PORTRAIT 1 PER A4, FULL FIT, MARKS+% + BS DATE ────────────────
window.printGradeSheetStyle1 = function(gradeId) {
  const g = DB.grades.find(x => x.id === gradeId);
  if (!g) return;
  const s = DB.students.find(x => x.id === g.studentId) || {};
  const marks = g.marks || [];
  const result = g.result;
  const todayStr = todayBSStr();
  const dobBS = s.dob ? adStrToBS(s.dob) : '\u2014';

  const subRows = marks.map((m, i) => {
    const pct = m.fm > 0 ? ((m.total / m.fm) * 100).toFixed(1) : '0.0';
    return '<tr style="background:' + (i%2===0?'#fafafa':'#fff') + ';">'
      + '<td style="padding:6px 8px;font-size:9pt;border:.5pt solid #ccc;text-align:center;">' + (i+1) + '</td>'
      + '<td style="padding:6px 8px;font-size:10pt;border:.5pt solid #ccc;">' + m.subject + '</td>'
      + '<td style="padding:6px 8px;font-size:9pt;border:.5pt solid #ccc;text-align:center;">' + (m.fm||100) + '</td>'
      + '<td style="padding:6px 8px;font-size:9pt;border:.5pt solid #ccc;text-align:center;">' + (m.pm||40) + '</td>'
      + '<td style="padding:6px 8px;font-size:9pt;border:.5pt solid #ccc;text-align:center;">' + m.theory + '</td>'
      + '<td style="padding:6px 8px;font-size:9pt;border:.5pt solid #ccc;text-align:center;">' + m.practical + '</td>'
      + '<td style="padding:6px 8px;font-size:10pt;font-weight:700;border:.5pt solid #ccc;text-align:center;">' + m.total + '</td>'
      + '<td style="padding:6px 8px;font-size:9pt;border:.5pt solid #ccc;text-align:center;">' + pct + '%</td>'
      + '<td style="padding:6px 8px;font-size:9pt;border:.5pt solid #ccc;text-align:center;color:' + (m.total<(m.pm||40)?'#c0392b':'#15803d') + ';">' + (m.total<(m.pm||40)?'F':'P') + '</td>'
      + '</tr>';
  }).join('');

  const html = '<div style="width:190mm;height:277mm;font-family:Arial,sans-serif;border:2pt solid #333;background:#fff;display:flex;flex-direction:column;box-sizing:border-box;overflow:hidden;">'
    + '<div style="border-bottom:2pt solid #333;padding:10px 14px;display:flex;gap:12px;align-items:center;flex-shrink:0;">'
    + '<img src="' + LOGO_B64 + '" style="width:58px;height:58px;border-radius:50%;object-fit:cover;">'
    + '<div style="flex:1;text-align:center;">'
    + '<div style="font-size:14pt;font-weight:700;font-family:Georgia,serif;text-transform:uppercase;">Nepal Public Secondary Boarding School</div>'
    + '<div style="font-size:7pt;color:#555;">Samsi-5, Pokharivinda, Mahottari | Madhesh Province, Nepal | eSewa: 9844015447</div>'
    + '</div>'
    + '<img src="' + LOGO_B64 + '" style="width:58px;height:58px;border-radius:50%;object-fit:cover;">'
    + '</div>'
    + '<div style="text-align:center;padding:7px;border-bottom:2pt solid #333;flex-shrink:0;">'
    + '<div style="font-size:14pt;font-weight:700;font-family:Georgia,serif;text-transform:uppercase;letter-spacing:2px;">Grade \u2013 Sheet</div>'
    + '<div style="font-size:9pt;font-weight:600;">' + (g.term||'').toUpperCase() + ' EXAMINATION \u2014 ' + (g.year||'') + ' B.S.</div>'
    + '</div>'
    + '<div style="display:grid;grid-template-columns:1fr 1fr;border-bottom:1pt solid #999;flex-shrink:0;">'
    + '<div style="padding:7px 14px;border-right:.5pt solid #999;font-size:9.5pt;line-height:2.2;">'
    + 'THE GRADE(S) SECURED BY: <strong>' + (s.name||'\u2014') + '</strong><br>'
    + 'DATE OF BIRTH: <strong>' + dobBS + '</strong>'
    + '</div>'
    + '<div style="padding:7px 14px;font-size:9.5pt;line-height:2.2;">'
    + 'P.S.: <strong>' + (s.sno||'\u2014') + '</strong> &nbsp;&nbsp; GRADE: <strong>' + (g.grade||'\u2014') + '</strong><br>'
    + 'IN THE EXAM CONDUCTED IN: <strong>' + (g.year||'\u2014') + '</strong> B.S.'
    + '</div>'
    + '</div>'
    + '<table style="width:100%;border-collapse:collapse;flex:1;">'
    + '<thead><tr style="background:#e0e0e0;">'
    + '<th style="padding:6px;font-size:9pt;border:.5pt solid #999;text-align:center;width:6%;">S.N.</th>'
    + '<th style="padding:6px;font-size:9pt;border:.5pt solid #999;text-align:left;">SUBJECTS</th>'
    + '<th style="padding:6px;font-size:9pt;border:.5pt solid #999;text-align:center;width:8%;">F.M.</th>'
    + '<th style="padding:6px;font-size:9pt;border:.5pt solid #999;text-align:center;width:8%;">P.M.</th>'
    + '<th style="padding:6px;font-size:9pt;border:.5pt solid #999;text-align:center;width:7%;">TH</th>'
    + '<th style="padding:6px;font-size:9pt;border:.5pt solid #999;text-align:center;width:7%;">PR</th>'
    + '<th style="padding:6px;font-size:9pt;border:.5pt solid #999;text-align:center;width:9%;">TOTAL</th>'
    + '<th style="padding:6px;font-size:9pt;border:.5pt solid #999;text-align:center;width:8%;">%</th>'
    + '<th style="padding:6px;font-size:9pt;border:.5pt solid #999;text-align:center;width:8%;">REMARK</th>'
    + '</tr></thead>'
    + '<tbody>' + subRows + '</tbody>'
    + '<tfoot><tr style="background:#e8e8e8;">'
    + '<td colspan="2" style="padding:6px 8px;font-size:10pt;font-weight:700;border:.5pt solid #999;">TOTAL</td>'
    + '<td style="padding:6px;border:.5pt solid #999;text-align:center;">' + g.maxMarks + '</td>'
    + '<td style="border:.5pt solid #999;"></td>'
    + '<td style="padding:6px;font-size:9pt;font-weight:700;border:.5pt solid #999;text-align:center;">' + marks.reduce((a,m)=>a+m.theory,0) + '</td>'
    + '<td style="padding:6px;font-size:9pt;font-weight:700;border:.5pt solid #999;text-align:center;">' + marks.reduce((a,m)=>a+m.practical,0) + '</td>'
    + '<td style="padding:6px;font-size:10.5pt;font-weight:700;border:.5pt solid #999;text-align:center;">' + g.totalMarks + '</td>'
    + '<td style="padding:6px;font-size:9.5pt;font-weight:700;border:.5pt solid #999;text-align:center;">' + g.percentage + '%</td>'
    + '<td style="padding:6px;font-size:9.5pt;font-weight:700;border:.5pt solid #999;text-align:center;color:' + (result==='PASS'?'#15803d':'#c0392b') + ';">' + result + '</td>'
    + '</tr></tfoot>'
    + '</table>'
    + '<div style="padding:7px 14px;border-top:.5pt solid #999;display:flex;gap:20px;font-size:9.5pt;flex-shrink:0;">'
    + '<strong>GPA: ' + (g.gpa||'\u2014') + '</strong>'
    + '<strong>Grade: ' + (g.grade||'\u2014') + ' (' + (g.label||'') + ')</strong>'
    + '<strong>%: ' + g.percentage + '%</strong>'
    + '<strong style="margin-left:auto;color:' + (result==='PASS'?'#15803d':'#c0392b') + ';">Result: ' + result + '</strong>'
    + '</div>'
    + '<div style="padding:5px 14px;border-top:.5pt solid #999;flex-shrink:0;">'
    + '<div style="font-size:8.5pt;font-weight:700;">EXTRA CREDIT SUBJECT</div>'
    + '</div>'
    + sigRow3('Prepared By', '24px')
    + '<div style="padding:3px 14px;border-top:.3pt solid #ddd;font-size:5.5pt;color:#777;flex-shrink:0;">DATE: ' + todayStr + ' | A+(4.0,90%) A(3.6,80%) B+(3.2,70%) B(2.8,60%) C+(2.4,50%) C(2.0,40%) D(1.6,35%) NG(0,<35%) | TH=Theory PR=Practical</div>'
    + '</div>';

  doPrint('<div style="font-family:Arial,sans-serif;">' + html + '</div>');
};

window.printGradeSheetStyle2 = function(gradeId) {
  const g = DB.grades.find(x => x.id === gradeId);
  if (!g) return;
  const s = DB.students.find(x => x.id === g.studentId) || {};
  const marks = g.marks || [];
  const result = g.result;
  const todayStr = todayBSStr();
  const dobBS = s.dob ? adStrToBS(s.dob) : '\u2014';

  const subRows = marks.map((m, i) => {
    const pct = m.fm > 0 ? ((m.total / m.fm) * 100).toFixed(1) : '0.0';
    return '<tr style="background:' + (i%2===0?'#fafafa':'#fff') + ';">'
      + '<td style="padding:5px 7px;font-size:8.5pt;border:.5pt solid #ccc;text-align:center;">' + (i+1) + '</td>'
      + '<td style="padding:5px 7px;font-size:9pt;border:.5pt solid #ccc;">' + m.subject + '</td>'
      + '<td style="padding:5px 7px;font-size:8.5pt;border:.5pt solid #ccc;text-align:center;">' + (m.fm||100) + '</td>'
      + '<td style="padding:5px 7px;font-size:8.5pt;border:.5pt solid #ccc;text-align:center;">' + (m.pm||40) + '</td>'
      + '<td style="padding:5px 7px;font-size:8.5pt;border:.5pt solid #ccc;text-align:center;">' + m.theory + '</td>'
      + '<td style="padding:5px 7px;font-size:8.5pt;border:.5pt solid #ccc;text-align:center;">' + m.practical + '</td>'
      + '<td style="padding:5px 7px;font-size:9.5pt;font-weight:700;border:.5pt solid #ccc;text-align:center;">' + m.total + '</td>'
      + '<td style="padding:5px 7px;font-size:8.5pt;border:.5pt solid #ccc;text-align:center;">' + pct + '%</td>'
      + '<td style="padding:5px 7px;font-size:8.5pt;font-weight:700;border:.5pt solid #ccc;text-align:center;">' + (m.grade||'\u2014') + '</td>'
      + '<td style="padding:5px 7px;font-size:8.5pt;border:.5pt solid #ccc;text-align:center;">' + (m.gpa||'\u2014') + '</td>'
      + '<td style="padding:5px 7px;font-size:8.5pt;border:.5pt solid #ccc;text-align:center;color:' + (m.total<(m.pm||40)?'#c0392b':'#15803d') + ';">' + (m.total<(m.pm||40)?'F':'P') + '</td>'
      + '</tr>';
  }).join('');

  const html = '<div style="width:190mm;height:277mm;font-family:Arial,sans-serif;border:2pt solid #333;background:#fff;display:flex;flex-direction:column;box-sizing:border-box;overflow:hidden;">'
    + '<div style="border-bottom:2pt solid #333;padding:9px 14px;display:flex;gap:12px;align-items:center;flex-shrink:0;">'
    + '<img src="' + LOGO_B64 + '" style="width:58px;height:58px;border-radius:50%;object-fit:cover;">'
    + '<div style="flex:1;text-align:center;">'
    + '<div style="font-size:14pt;font-weight:700;font-family:Georgia,serif;text-transform:uppercase;">Nepal Public Secondary Boarding School</div>'
    + '<div style="font-size:7pt;color:#555;">Samsi-5, Pokharivinda, Mahottari | Madhesh Province, Nepal</div>'
    + '<div style="font-size:7.5pt;font-weight:700;color:#1A2B5F;">Ph: 9801671781 | eSewa: 9844015447</div>'
    + '</div>'
    + '<img src="' + LOGO_B64 + '" style="width:58px;height:58px;border-radius:50%;object-fit:cover;">'
    + '</div>'
    + '<div style="text-align:center;padding:7px 10px;border-bottom:1.5pt solid #333;background:#f8faff;flex-shrink:0;">'
    + '<div style="font-size:8pt;font-weight:700;color:#555;text-transform:uppercase;letter-spacing:1px;">' + (g.term||'').toUpperCase() + ' EXAMINATION \u2014 ' + (g.year||'') + ' B.S.</div>'
    + '<div style="font-size:15pt;font-weight:700;font-family:Georgia,serif;text-transform:uppercase;letter-spacing:3px;color:#1A2B5F;">GRADE SHEET</div>'
    + '</div>'
    + '<div style="display:grid;grid-template-columns:1fr auto;border-bottom:1pt solid #ccc;flex-shrink:0;">'
    + '<div style="padding:7px 14px;font-size:9pt;line-height:2.1;">'
    + '<div><span style="color:#555;min-width:90px;display:inline-block;">Student Name:</span> <strong>' + (s.name||'\u2014') + '</strong></div>'
    + '<div><span style="color:#555;min-width:90px;display:inline-block;">Class:</span> <strong>' + (g.class||'\u2014') + ' \u2014 Section: ' + (s.section||'A') + '</strong></div>'
    + '<div><span style="color:#555;min-width:90px;display:inline-block;">Date of Birth:</span> <strong>' + dobBS + '</strong></div>'
    + '</div>'
    + '<div style="padding:7px 14px;font-size:9pt;line-height:2.1;border-left:1pt solid #ccc;">'
    + '<div><span style="color:#555;">P.S. No:</span> <strong>' + (s.sno||'\u2014') + '</strong></div>'
    + '<div><span style="color:#555;">Roll No:</span> <strong>' + (s.sno||'\u2014') + '</strong></div>'
    + '<div><span style="color:#555;">Date:</span> <strong>' + todayStr + '</strong></div>'
    + '</div></div>'
    + '<table style="width:100%;border-collapse:collapse;flex:1;">'
    + '<thead><tr style="background:#1A2B5F;color:#fff;">'
    + '<th style="padding:6px 7px;font-size:8pt;border:.5pt solid #263570;text-align:center;width:5%;">S.N.</th>'
    + '<th style="padding:6px 7px;font-size:8pt;border:.5pt solid #263570;text-align:left;">SUBJECTS</th>'
    + '<th style="padding:6px 7px;font-size:8pt;border:.5pt solid #263570;text-align:center;width:7%;">F.M.</th>'
    + '<th style="padding:6px 7px;font-size:8pt;border:.5pt solid #263570;text-align:center;width:7%;">P.M.</th>'
    + '<th style="padding:6px 7px;font-size:8pt;border:.5pt solid #263570;text-align:center;width:7%;">TH</th>'
    + '<th style="padding:6px 7px;font-size:8pt;border:.5pt solid #263570;text-align:center;width:7%;">PR</th>'
    + '<th style="padding:6px 7px;font-size:8pt;border:.5pt solid #263570;text-align:center;width:9%;">TOTAL</th>'
    + '<th style="padding:6px 7px;font-size:8pt;border:.5pt solid #263570;text-align:center;width:8%;">%</th>'
    + '<th style="padding:6px 7px;font-size:8pt;border:.5pt solid #263570;text-align:center;width:8%;">GRADE</th>'
    + '<th style="padding:6px 7px;font-size:8pt;border:.5pt solid #263570;text-align:center;width:7%;">GPA</th>'
    + '<th style="padding:6px 7px;font-size:8pt;border:.5pt solid #263570;text-align:center;width:7%;">REM.</th>'
    + '</tr></thead>'
    + '<tbody>' + subRows + '</tbody>'
    + '<tfoot><tr style="background:#e8e8e8;font-weight:700;">'
    + '<td colspan="2" style="padding:6px 7px;font-size:9.5pt;border:.5pt solid #ccc;">TOTAL</td>'
    + '<td style="padding:6px 7px;border:.5pt solid #ccc;text-align:center;">' + g.maxMarks + '</td>'
    + '<td style="border:.5pt solid #ccc;"></td>'
    + '<td style="padding:6px 7px;border:.5pt solid #ccc;text-align:center;">' + marks.reduce((a,m)=>a+m.theory,0) + '</td>'
    + '<td style="padding:6px 7px;border:.5pt solid #ccc;text-align:center;">' + marks.reduce((a,m)=>a+m.practical,0) + '</td>'
    + '<td style="padding:6px 7px;font-size:10pt;border:.5pt solid #ccc;text-align:center;">' + g.totalMarks + '</td>'
    + '<td style="padding:6px 7px;border:.5pt solid #ccc;text-align:center;">' + g.percentage + '%</td>'
    + '<td style="padding:6px 7px;border:.5pt solid #ccc;text-align:center;">' + (g.grade||'\u2014') + '</td>'
    + '<td style="padding:6px 7px;border:.5pt solid #ccc;text-align:center;">' + (g.gpa||'\u2014') + '</td>'
    + '<td style="padding:6px 7px;font-size:9pt;border:.5pt solid #ccc;text-align:center;color:' + (result==='PASS'?'#15803d':'#c0392b') + ';">' + result + '</td>'
    + '</tr></tfoot></table>'
    + '<div style="display:grid;grid-template-columns:repeat(4,1fr);border-top:1.5pt solid #333;border-bottom:1pt solid #ccc;background:#F0F4FF;flex-shrink:0;">'
    + '<div style="padding:5px 7px;text-align:center;border-right:.5pt solid #ccc;"><div style="font-size:11pt;font-weight:700;color:#1A2B5F;">' + g.totalMarks + '/' + g.maxMarks + '</div><div style="font-size:6.5pt;color:#555;">Total Marks</div></div>'
    + '<div style="padding:5px 7px;text-align:center;border-right:.5pt solid #ccc;"><div style="font-size:11pt;font-weight:700;color:#1A2B5F;">' + g.percentage + '%</div><div style="font-size:6.5pt;color:#555;">Percentage</div></div>'
    + '<div style="padding:5px 7px;text-align:center;border-right:.5pt solid #ccc;"><div style="font-size:11pt;font-weight:700;color:#1A2B5F;">' + (g.grade||'\u2014') + ' (' + (g.gpa||'\u2014') + ')</div><div style="font-size:6.5pt;color:#555;">Grade / GPA</div></div>'
    + '<div style="padding:5px 7px;text-align:center;"><div style="font-size:11pt;font-weight:700;color:' + (result==='PASS'?'#15803d':'#c0392b') + ';">' + result + '</div><div style="font-size:6.5pt;color:#555;">Result</div></div>'
    + '</div>'
    + '<div style="display:grid;grid-template-columns:1fr 1fr;border-bottom:1pt solid #ccc;flex-shrink:0;">'
    + '<div style="padding:5px 10px;border-right:.5pt solid #ccc;">'
    + '<div style="font-size:7pt;font-weight:700;margin-bottom:3px;color:#1A2B5F;text-transform:uppercase;">Marks Range and Grade Points</div>'
    + '<table style="width:100%;border-collapse:collapse;font-size:6.5pt;">'
    + '<tr style="background:#e0e0e0;"><th style="padding:2px 4px;border:.3pt solid #bbb;">Marks %</th><th style="padding:2px 4px;border:.3pt solid #bbb;">Grade</th><th style="padding:2px 4px;border:.3pt solid #bbb;">Point</th><th style="padding:2px 4px;border:.3pt solid #bbb;">Remarks</th></tr>'
    + '<tr><td style="padding:2px 4px;border:.3pt solid #bbb;">90-100</td><td style="padding:2px 4px;border:.3pt solid #bbb;text-align:center;font-weight:700;">A+</td><td style="padding:2px 4px;border:.3pt solid #bbb;text-align:center;">4.0</td><td style="padding:2px 4px;border:.3pt solid #bbb;">Outstanding</td></tr>'
    + '<tr style="background:#fafafa;"><td style="padding:2px 4px;border:.3pt solid #bbb;">80-89</td><td style="padding:2px 4px;border:.3pt solid #bbb;text-align:center;font-weight:700;">A</td><td style="padding:2px 4px;border:.3pt solid #bbb;text-align:center;">3.6</td><td style="padding:2px 4px;border:.3pt solid #bbb;">Excellent</td></tr>'
    + '<tr><td style="padding:2px 4px;border:.3pt solid #bbb;">70-79</td><td style="padding:2px 4px;border:.3pt solid #bbb;text-align:center;font-weight:700;">B+</td><td style="padding:2px 4px;border:.3pt solid #bbb;text-align:center;">3.2</td><td style="padding:2px 4px;border:.3pt solid #bbb;">Very Good</td></tr>'
    + '<tr style="background:#fafafa;"><td style="padding:2px 4px;border:.3pt solid #bbb;">60-69</td><td style="padding:2px 4px;border:.3pt solid #bbb;text-align:center;font-weight:700;">B</td><td style="padding:2px 4px;border:.3pt solid #bbb;text-align:center;">2.8</td><td style="padding:2px 4px;border:.3pt solid #bbb;">Good</td></tr>'
    + '<tr><td style="padding:2px 4px;border:.3pt solid #bbb;">50-59</td><td style="padding:2px 4px;border:.3pt solid #bbb;text-align:center;font-weight:700;">C+</td><td style="padding:2px 4px;border:.3pt solid #bbb;text-align:center;">2.4</td><td style="padding:2px 4px;border:.3pt solid #bbb;">Satisfactory</td></tr>'
    + '<tr style="background:#fafafa;"><td style="padding:2px 4px;border:.3pt solid #bbb;">40-49</td><td style="padding:2px 4px;border:.3pt solid #bbb;text-align:center;font-weight:700;">C</td><td style="padding:2px 4px;border:.3pt solid #bbb;text-align:center;">2.0</td><td style="padding:2px 4px;border:.3pt solid #bbb;">Acceptable</td></tr>'
    + '<tr><td style="padding:2px 4px;border:.3pt solid #bbb;">35-39</td><td style="padding:2px 4px;border:.3pt solid #bbb;text-align:center;font-weight:700;">D</td><td style="padding:2px 4px;border:.3pt solid #bbb;text-align:center;">1.6</td><td style="padding:2px 4px;border:.3pt solid #bbb;">Partial</td></tr>'
    + '<tr style="background:#fafafa;"><td style="padding:2px 4px;border:.3pt solid #bbb;">Below 35</td><td style="padding:2px 4px;border:.3pt solid #bbb;text-align:center;font-weight:700;">NG</td><td style="padding:2px 4px;border:.3pt solid #bbb;text-align:center;">0.0</td><td style="padding:2px 4px;border:.3pt solid #bbb;">Not Graded</td></tr>'
    + '</table></div>'
    + '<div style="padding:5px 10px;">'
    + '<div style="font-size:7pt;font-weight:700;margin-bottom:4px;color:#1A2B5F;">Remarks</div>'
    + '<div style="font-size:7pt;line-height:1.9;color:#333;">'
    + 'Total Marks: <strong>' + g.totalMarks + ' / ' + g.maxMarks + '</strong><br>'
    + 'Percentage: <strong>' + g.percentage + '%</strong><br>'
    + 'Final GPA: <strong>' + (g.gpa||'\u2014') + '</strong><br>'
    + 'Grade: <strong>' + (g.grade||'\u2014') + ' (' + (g.label||'') + ')</strong><br>'
    + 'Result: <strong style="color:' + (result==='PASS'?'#15803d':'#c0392b') + ';">' + result + '</strong>'
    + '</div>'
    + '<div style="margin-top:5px;font-size:5.5pt;color:#777;border-top:.3pt solid #ddd;padding-top:3px;">TH=Theory | PR=Practical | F=Fail | P=Pass</div>'
    + '</div></div>'
    + sigRow3('Class Teacher', '22px')
    + '<div style="padding:3px 14px;border-top:.3pt solid #ddd;font-size:5.5pt;color:#777;flex-shrink:0;">DATE: ' + todayStr + ' | Nepal Public Secondary Boarding School, Samsi-5, Mahottari</div>'
    + '</div>';

  doPrint('<div style="font-family:Arial,sans-serif;">' + html + '</div>');
};



// ─── FIX 3: EDITABLE BILL PREVIEW MODAL ──────────────────────────────────────
window.previewBill = function(billId) {
  const b = DB.bills.find(x => x.id === billId);
  if (!b) return;
  const s = DB.students.find(x => x.id === b.studentId) || { name: b.studentName, sno: b.sno, class: b.class };
  document.getElementById('billPreviewOverlay')?.remove();
  const overlay = document.createElement('div');
  overlay.id = 'billPreviewOverlay';
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:9999;display:flex;align-items:center;justify-content:center;padding:16px;';
  overlay.innerHTML = `
    <div style="background:#fff;border-radius:14px;max-width:460px;width:100%;max-height:90vh;overflow-y:auto;box-shadow:0 20px 60px rgba(0,0,0,.3);">
      <div style="background:linear-gradient(135deg,#1A2B5F,#263570);padding:13px 17px;border-radius:14px 14px 0 0;display:flex;justify-content:space-between;align-items:center;">
        <div style="color:#fff;font-family:Georgia,serif;font-weight:700;font-size:.95rem;">✏️ Edit Bill Preview</div>
        <button onclick="document.getElementById('billPreviewOverlay').remove()" style="background:none;border:none;color:#fff;font-size:1.3rem;cursor:pointer;line-height:1;">✕</button>
      </div>
      <div style="padding:16px;">
        <div style="background:#F0F4FF;border-radius:8px;padding:10px 13px;margin-bottom:13px;font-size:.83rem;color:#1A2B5F;">
          <strong>${s.name}</strong> &nbsp;·&nbsp; Sno: ${s.sno} &nbsp;·&nbsp; Class: ${b.class} &nbsp;·&nbsp; ${b.term}
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-bottom:13px;">
          <div><label style="font-size:.72rem;font-weight:700;color:#555;display:block;margin-bottom:3px;">Monthly Fee (×3)</label>
            <input id="pbMonthly" type="number" value="${b.monthly||0}" oninput="calcBillTotal()" style="width:100%;padding:7px 9px;border:1.5px solid #ddd;border-radius:7px;font-size:.88rem;box-sizing:border-box;"></div>
          <div><label style="font-size:.72rem;font-weight:700;color:#555;display:block;margin-bottom:3px;">Exam Fee</label>
            <input id="pbExam" type="number" value="${b.examFee||0}" oninput="calcBillTotal()" style="width:100%;padding:7px 9px;border:1.5px solid #ddd;border-radius:7px;font-size:.88rem;box-sizing:border-box;"></div>
          <div><label style="font-size:.72rem;font-weight:700;color:#555;display:block;margin-bottom:3px;">Transport Fee</label>
            <input id="pbTransport" type="number" value="${b.transportFee||0}" oninput="calcBillTotal()" style="width:100%;padding:7px 9px;border:1.5px solid #ddd;border-radius:7px;font-size:.88rem;box-sizing:border-box;"></div>
          <div><label style="font-size:.72rem;font-weight:700;color:#555;display:block;margin-bottom:3px;">Vest Fee</label>
            <input id="pbVest" type="number" value="${b.vestFee||0}" oninput="calcBillTotal()" style="width:100%;padding:7px 9px;border:1.5px solid #ddd;border-radius:7px;font-size:.88rem;box-sizing:border-box;"></div>
          <div><label style="font-size:.72rem;font-weight:700;color:#555;display:block;margin-bottom:3px;">Tie Fee</label>
            <input id="pbTie" type="number" value="${b.tieFee||0}" oninput="calcBillTotal()" style="width:100%;padding:7px 9px;border:1.5px solid #ddd;border-radius:7px;font-size:.88rem;box-sizing:border-box;"></div>
          <div><label style="font-size:.72rem;font-weight:700;color:#555;display:block;margin-bottom:3px;">Previous Due</label>
            <input id="pbPrevDue" type="number" value="${b.prevDue||0}" oninput="calcBillTotal()" style="width:100%;padding:7px 9px;border:1.5px solid #ddd;border-radius:7px;font-size:.88rem;box-sizing:border-box;"></div>
          <div><label style="font-size:.72rem;font-weight:700;color:#555;display:block;margin-bottom:3px;">Other Charges</label>
            <input id="pbOther" type="number" value="${b.otherDue||0}" oninput="calcBillTotal()" style="width:100%;padding:7px 9px;border:1.5px solid #ddd;border-radius:7px;font-size:.88rem;box-sizing:border-box;"></div>
          <div><label style="font-size:.72rem;font-weight:700;color:#555;display:block;margin-bottom:3px;">Late Fee</label>
            <input id="pbLate" type="number" value="${b.lateFee||0}" oninput="calcBillTotal()" style="width:100%;padding:7px 9px;border:1.5px solid #ddd;border-radius:7px;font-size:.88rem;box-sizing:border-box;"></div>
        </div>
        <div id="pbTotal" style="background:linear-gradient(135deg,#1A2B5F,#263570);color:#fff;border-radius:8px;padding:11px;text-align:center;font-size:1.05rem;font-weight:700;margin-bottom:13px;">
          Total: Rs.${(b.total||0).toLocaleString()}
        </div>
        <div style="display:flex;gap:8px;">
          <button onclick="saveBillEdit('${billId}')" style="flex:1;background:linear-gradient(135deg,#1A2B5F,#263570);color:#fff;border:none;border-radius:8px;padding:10px;font-weight:700;cursor:pointer;font-size:.88rem;">💾 Save & Print</button>
          <button onclick="printBillOnly('${billId}')" style="flex:1;background:linear-gradient(135deg,#15803D,#166534);color:#fff;border:none;border-radius:8px;padding:10px;font-weight:700;cursor:pointer;font-size:.88rem;">🖨️ Print Only</button>
        </div>
      </div>
    </div>`;
  document.body.appendChild(overlay);
};

window.calcBillTotal = function() {
  const v = id => parseInt(document.getElementById(id)?.value) || 0;
  const total = v('pbMonthly')*3 + v('pbExam') + v('pbTransport') + v('pbVest') + v('pbTie') + v('pbPrevDue') + v('pbOther') + v('pbLate');
  const el = document.getElementById('pbTotal');
  if (el) el.textContent = 'Total: Rs.' + total.toLocaleString();
};

function getBillEdits(billId) {
  const b = DB.bills.find(x => x.id === billId);
  const v = id => parseInt(document.getElementById(id)?.value) || 0;
  const monthly = v('pbMonthly'), exam = v('pbExam'), transport = v('pbTransport');
  const vest = v('pbVest'), tie = v('pbTie'), prev = v('pbPrevDue'), other = v('pbOther'), late = v('pbLate');
  const total = monthly*3 + exam + transport + vest + tie + prev + other + late;
  const due = Math.max(0, total - (b.paid||0));
  const status = due<=0?'Paid':(b.paid>0?'Partial':'Unpaid');
  return { monthly, examFee:exam, transportFee:transport, vestFee:vest, tieFee:tie, prevDue:prev, otherDue:other, lateFee:late, total, due, status };
}

window.saveBillEdit = async function(billId) {
  const b = DB.bills.find(x => x.id === billId);
  if (!b) return;
  const edits = getBillEdits(billId);
  try { await API.updateBill(billId, edits); } catch {}
  Object.assign(b, edits);
  document.getElementById('billPreviewOverlay')?.remove();
  toast('Bill saved!');
  renderBills();
  printBill(billId);
};

window.printBillOnly = function(billId) {
  const b = DB.bills.find(x => x.id === billId);
  if (!b) return;
  const edits = getBillEdits(billId);
  const orig = {...b};
  Object.assign(b, edits);
  document.getElementById('billPreviewOverlay')?.remove();
  printBill(billId);
  Object.assign(b, orig);
};

// Patch bill table to show Preview button instead of plain print
const _origRB = window.renderBills;
window.renderBills = function() {
  if (_origRB) _origRB();
  const tb = document.getElementById('billingTbody');
  if (!tb) return;
  tb.querySelectorAll('button').forEach(btn => {
    const oc = btn.getAttribute('onclick') || '';
    const m = oc.match(/printBill\('([^']+)'\)/);
    if (m && btn.textContent.includes('\uD83D\uDDA8')) {
      btn.innerHTML = '\uD83D\uDC41\uFE0F';
      btn.setAttribute('onclick', "previewBill('" + m[1] + "')");
      btn.title = 'Preview & Edit';
    }
  });
};

// ─── INIT ON PAGE LOAD ────────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  // Load public data (notices, exams, gallery) without auth
  loadPublicData();

  // If token exists in session, try to auto-restore admin session
  if (API.hasToken()) {
    loadAllData().catch(() => {
      API.clearToken(); // token expired
    });
  }
});

// ─── SIGNATURES IN ALL DOCUMENTS ─────────────────────────────────────────────

// Helper: signature row HTML (4 cols)
function sigRow4() {
  return '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:6px 10px;border-top:.5pt solid #ccc;margin-top:4px;">'
    + '<div style="text-align:center;font-size:5.5pt;">'
    + '<img src="' + SIG_ACCOUNTANT + '" style="height:18px;object-fit:contain;display:block;margin:0 auto 1px;">'
    + '<div style="border-top:.5pt solid #555;padding-top:2px;">Accountant</div>'
    + '</div>'
    + '<div style="text-align:center;font-size:5.5pt;">'
    + '<img src="' + SIG_PRINCIPAL + '" style="height:18px;object-fit:contain;display:block;margin:0 auto 1px;">'
    + '<div style="border-top:.5pt solid #555;padding-top:2px;">Principal — Mr. Bineet Jha</div>'
    + '</div>'
    + '</div>';
}

// Helper: small 2-col sig for compact docs (bill, receipt)
function sigRow2() {
  return '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:5px 10px;border-top:.5pt solid #ddd;">'
    + '<div style="text-align:center;font-size:5pt;">'
    + '<img src="' + SIG_ACCOUNTANT + '" style="height:14px;object-fit:contain;display:block;margin:0 auto 1px;">'
    + '<div style="border-top:.5pt solid #aaa;padding-top:2px;">Accountant</div>'
    + '</div>'
    + '<div style="text-align:center;font-size:5pt;">'
    + '<img src="' + SIG_PRINCIPAL + '" style="height:14px;object-fit:contain;display:block;margin:0 auto 1px;">'
    + '<div style="border-top:.5pt solid #aaa;padding-top:2px;">Principal — Mr. Bineet Jha</div>'
    + '</div>'
    + '</div>';
}

// Helper: 3-col sig row (Prepared By / Student-Parent / Principal)
function sigRow3(leftLabel, h) {
  const _h = h || '24px';
  return '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;padding:8px 14px;gap:12px;border-top:.5pt solid #999;flex-shrink:0;">'
    + '<div style="font-size:7.5pt;text-align:center;"><img src="' + SIG_ACCOUNTANT + '" style="height:' + _h + ';object-fit:contain;display:block;margin:0 auto 2px;"><div style="border-top:.5pt solid #555;padding-top:2px;">' + (leftLabel || 'Prepared By') + '</div></div>'
    + '<div style="font-size:7.5pt;text-align:center;"><div style="height:' + _h + ';"></div><div style="border-top:.5pt solid #555;padding-top:2px;">Student / Parent</div></div>'
    + '<div style="font-size:7.5pt;text-align:center;"><img src="' + SIG_PRINCIPAL + '" style="height:' + _h + ';object-fit:contain;display:block;margin:0 auto 2px;"><div style="border-top:.5pt solid #555;padding-top:2px;">Principal \u2014 Mr. Bineet Jha</div></div>'
    + '</div>';
}

// ── OVERRIDE buildBillHTML ────────────────────────────────────────────────────
const _origBuildBillHTML = window.buildBillHTML;
window.buildBillHTML = function(s, b) {
  const orig = _origBuildBillHTML ? _origBuildBillHTML(s, b) : '';
  if (!orig) return orig;
  // Inject signature row before closing </div> of bill card
  return orig.replace(/<\/div>\s*$/, sigRow2() + '</div>');
};

// ── OVERRIDE printReceipt ─────────────────────────────────────────────────────
const _origPrintReceipt = window.printReceipt;
window.printReceipt = function(billId) {
  const b = DB.bills.find(x => x.id === billId);
  if (!b) return;
  const s = DB.students.find(x => x.id === b.studentId) || { name: b.studentName, sno: b.sno, class: b.class };
  const html = '<div style="width:148mm;margin:0 auto;background:#fff;border:1.5px solid #15803D;border-radius:4px;overflow:hidden;font-family:Arial,sans-serif;">'
    + '<div style="background:linear-gradient(135deg,#14532d,#15803d);padding:8px 12px;display:flex;gap:9px;align-items:center;">'
    + '<img src="' + LOGO_B64 + '" style="width:32px;height:32px;border-radius:50%;border:2px solid #4ade80;object-fit:cover;">'
    + '<div><div style="color:#fff;font-family:Georgia,serif;font-size:7.5pt;font-weight:700;">NEPAL PUBLIC ENGLISH BOARDING SCHOOL</div>'
    + '<div style="color:rgba(255,255,255,.45);font-size:5pt;">PAYMENT RECEIPT | eSewa: 9844015447</div></div></div>'
    + '<div style="height:2px;background:linear-gradient(90deg,#86efac,#4ade80,#86efac);"></div>'
    + '<div style="padding:8px 12px;">'
    + '<div style="text-align:center;margin-bottom:6px;font-size:9pt;font-weight:700;color:#15803D;font-family:Georgia,serif;">✅ PAYMENT RECEIVED</div>'
    + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:3px 11px;font-size:7pt;margin-bottom:7px;">'
    + '<span style="color:#6B7280;">Student:</span><strong>' + s.name + '</strong>'
    + '<span style="color:#6B7280;">Sno:</span><strong>' + s.sno + '</strong>'
    + '<span style="color:#6B7280;">Class:</span><strong>' + b.class + '</strong>'
    + '<span style="color:#6B7280;">Term:</span><strong>' + b.term + '</strong>'
    + '<span style="color:#6B7280;">Mode:</span><strong>' + (b.payMode || 'Cash') + '</strong>'
    + '<span style="color:#6B7280;">Date:</span><strong>' + (b.payDate || new Date().toLocaleDateString()) + '</strong>'
    + '</div>'
    + '<div style="background:#F0FFF4;border:1px solid #86efac;border-radius:4px;padding:5px;text-align:center;">'
    + '<div style="font-size:11pt;font-weight:700;color:#15803D;">Rs.' + (b.paid || 0).toLocaleString() + '</div>'
    + '<div style="font-size:6pt;color:#14532d;">Amount Paid</div>'
    + '</div></div>'
    + sigRow2()
    + '</div>';
  doPrint('<div style="display:flex;flex-direction:column;">' + html
    + '<div style="border-top:2px dashed #aaa;margin:3mm 0;text-align:center;position:relative;"><span style="position:absolute;top:-7px;left:50%;transform:translateX(-50%);background:#fff;padding:0 8px;font-size:5pt;color:#aaa;">✂ Cut here</span></div>'
    + html + '</div>');
};

// ── OVERRIDE printCertificate ─────────────────────────────────────────────────
const _origPrintCertificate = window.printCertificate;
window.printCertificate = function() {
  const sid = document.getElementById('certSid').value;
  if (!sid) { toast('Select a student.', 'error'); return; }
  const s = DB.students.find(x => x.id === sid);
  const type = document.getElementById('certType').value;
  const from = document.getElementById('certFrom').value;
  const to = document.getElementById('certTo').value;
  const gpa = document.getElementById('certGpa').value;
  const neb = document.getElementById('certNeb').value;
  const emis = document.getElementById('certEmis').value;
  const date = document.getElementById('certDate').value;

  const wmL = 'NEPAL PUBLIC SECONDARY BOARDING SCHOOL  '.repeat(8);
  let wm = '';
  for (let i = 0; i < 42; i++)
    wm += '<div style="white-space:nowrap;overflow:hidden;font-size:8pt;color:rgba(26,43,95,.055);letter-spacing:3px;line-height:1.5;">' + wmL + '</div>';

  let title = 'Character Certificate', body2 = '';
  if (type.includes('Transfer')) {
    title = 'Transfer Certificate';
    body2 = 'This certifies that <strong>' + s.name + '</strong>, son/daughter of <strong>' + (s.parent || '___') + '</strong>, passed <strong>' + s.class + '</strong> in ' + to + ' with <strong>' + (gpa || '___') + '</strong>. DOB: <strong>' + (s.dob || '—') + '</strong>. He/She bears good moral character.';
  } else if (type.includes('Leaving')) {
    title = 'School Leaving Certificate';
    body2 = 'This certifies that <strong>' + s.name + '</strong>, son/daughter of <strong>' + (s.parent || '___') + '</strong>, completed SEE in ' + to + ' with <strong>' + (gpa || '___') + '</strong>. He/She bears good moral character.';
  } else {
    body2 = 'This certifies that <strong>' + s.name + '</strong>, son/daughter of <strong>' + (s.parent || '___') + '</strong>, was a regular student from <strong>' + from + ' B.S.</strong> to <strong>' + to + ' B.S.</strong> and maintains good moral character.';
  }

  doPrint('<div style="width:190mm;margin:0 auto;background:#fff;border:3px double #1A2B5F;padding:18px;font-family:Arial,sans-serif;">'
    + '<div style="border:1px solid #B8832A;padding:14px;position:relative;overflow:hidden;">'
    + '<div style="position:absolute;inset:0;pointer-events:none;overflow:hidden;">' + wm + '</div>'
    + '<div style="position:relative;z-index:1;text-align:center;margin-bottom:12px;">'
    + '<img src="' + LOGO_B64 + '" style="width:64px;height:64px;border-radius:50%;border:3px solid #B8832A;margin:0 auto 7px;display:block;object-fit:cover;">'
    + '<div style="font-family:Georgia,serif;font-size:13pt;color:#1A2B5F;font-weight:700;">Nepal Public Secondary Boarding School</div>'
    + '<div style="font-size:7.5pt;color:#6B7280;">Samsi-5, Pokharivinda, Mahottari | Ph: +977 9801671781 | eSewa: 9844015447</div>'
    + '</div>'
    + '<div style="height:2px;background:linear-gradient(90deg,transparent,#B8832A,transparent);margin:11px 0;"></div>'
    + '<div style="text-align:center;font-family:Georgia,serif;font-size:12pt;font-weight:700;color:#8B1A1A;text-transform:uppercase;letter-spacing:2px;margin-bottom:12px;">' + title + '</div>'
    + '<div style="font-size:9.5pt;line-height:1.9;color:#374151;text-align:justify;">' + body2 + '</div>'
    + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:4px 18px;font-size:8pt;margin:10px 0;">'
    + '<span style="color:#6B7280;">NEB Reg.:</span><strong>' + (neb || '—') + '</strong>'
    + '<span style="color:#6B7280;">EMIS:</span><strong>' + (emis || '—') + '</strong>'
    + '<span style="color:#6B7280;">Issued:</span><strong>' + date + '</strong>'
    + '</div>'
    + sigRow4()
    + '</div></div>');
  toast('Certificate printing...');
};

// ── OVERRIDE buildAdmitCard — add principal sig ───────────────────────────────
const _origBuildAdmitCard = window.buildAdmitCard;
window.buildAdmitCard = function(s, b, examName, yr) {
  const card = _origBuildAdmitCard(s, b, examName, yr);
  // Replace the plain "Principal" text signature with real sig image
  return card.replace(
    /<div style="font-size:3.3pt;text-align:center;"><div style="border-top:.3pt solid #555;width:27px;margin:0 auto;padding-top:1.5px;">Principal<\/div><\/div>/,
    '<div style="text-align:center;font-size:3pt;">'
    + '<img src="' + SIG_PRINCIPAL + '" style="height:10px;object-fit:contain;display:block;margin:0 auto 1px;">'
    + '<div style="border-top:.3pt solid #555;width:27px;margin:0 auto;padding-top:1px;">Principal</div>'
    + '</div>'
  );
};

// ─── STUDENT CLASS UPDATE — TYPE ANY CLASS ────────────────────────────────────
window.quickUpdateClass = async function(studentId, newClass) {
  if (!newClass || !studentId) return;
  try {
    await API.updateStudent(studentId, { class: newClass });
    const s = DB.students.find(x => x.id === studentId);
    if (s) s.class = newClass;
    toast('Class updated to ' + newClass + '!');
    renderStudents();
    populateDrops();
  } catch(e) { toast(e.message, 'error'); }
};

// Patch renderStudents to add inline class edit input
const _origRS2 = window.renderStudents;
window.renderStudents = function() {
  if (_origRS2) _origRS2();
  // Add quick-edit class input to each student row
  const tb = document.getElementById('stuTbody');
  if (!tb) return;
  tb.querySelectorAll('tr').forEach(tr => {
    const editBtn = tr.querySelector('button[onclick*="openStudentEdit"]') || tr.querySelector('button[onclick*="editStudent"]');
    if (!editBtn) return;
    const oc = editBtn.getAttribute('onclick') || '';
    const m = oc.match(/'([a-f0-9-]{36})'/);
    if (!m) return;
    const sid = m[1];
    const s = DB.students.find(x => x.id === sid);
    if (!s) return;
    // Find the class cell (3rd td usually)
    const tds = tr.querySelectorAll('td');
    if (tds.length < 3) return;
    const classTd = tds[2];
    if (classTd && !classTd.querySelector('input')) {
      const orig = classTd.textContent.trim();
      classTd.innerHTML = '<input value="' + orig + '" style="width:60px;padding:2px 4px;border:1px solid #ddd;border-radius:4px;font-size:.78rem;" onchange="quickUpdateClass(\'' + sid + '\',this.value)" title="Type class and press Enter to update">';
    }
  });
};

// ─── PASSWORD CHANGE VIA EMAIL (Gmail OTP simulation) ────────────────────────
window.requestPasswordReset = async function() {
  const email = document.getElementById('resetEmail')?.value?.trim();
  if (!email) { toast('Enter your email.', 'error'); return; }
  if (email !== 'nppublics@gmail.com') {
    toast('Only nppublics@gmail.com is authorised.', 'error'); return;
  }
  // Generate a 6-digit code and store in sessionStorage
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  sessionStorage.setItem('resetCode', code);
  sessionStorage.setItem('resetCodeExp', (Date.now() + 10 * 60 * 1000).toString());
  // Show code in a toast (in production this would be emailed)
  toast('Your reset code is: ' + code + ' (valid 10 min)', 'success');
  document.getElementById('resetCodeSection').style.display = 'block';
};

window.verifyResetCode = function() {
  const entered = document.getElementById('resetCodeInput')?.value?.trim();
  const stored = sessionStorage.getItem('resetCode');
  const exp = parseInt(sessionStorage.getItem('resetCodeExp') || '0');
  if (Date.now() > exp) { toast('Code expired. Request again.', 'error'); return; }
  if (entered !== stored) { toast('Wrong code.', 'error'); return; }
  document.getElementById('newPassSection').style.display = 'block';
  toast('Code verified! Set new password.');
};

window.submitNewPassword = async function() {
  const np = document.getElementById('newPassInput')?.value?.trim();
  const cp = document.getElementById('confirmPassInput')?.value?.trim();
  if (!np || np.length < 6) { toast('Password must be at least 6 characters.', 'error'); return; }
  if (np !== cp) { toast('Passwords do not match.', 'error'); return; }
  try {
    await API.changePassword(np);
    sessionStorage.removeItem('resetCode');
    sessionStorage.removeItem('resetCodeExp');
    toast('Password changed successfully! Please login again.');
    document.getElementById('pwResetModal')?.remove();
    setTimeout(() => { API.clearToken(); showPublicSite(); goPage('home'); }, 2000);
  } catch(e) { toast('Failed: ' + e.message, 'error'); }
};

// Add changePassword to API
API.changePassword = (newPassword) => {
  return fetch('/api/auth/changepassword', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + (API.hasToken() ? sessionStorage.getItem('npsbs_token') : '') },
    body: JSON.stringify({ newPassword })
  }).then(r => r.json()).then(d => { if (d.error) throw new Error(d.error); return d; });
};

// Inject password change UI into Settings panel
const _origBuildSettings = window.buildSettingsPanel || window.renderSettings;
function injectPwResetToSettings() {
  const settingsPanel = document.getElementById('ap-settings');
  if (!settingsPanel || document.getElementById('pwResetSection')) return;
  const section = document.createElement('div');
  section.id = 'pwResetSection';
  section.className = 'fc';
  section.style.marginTop = '16px';
  section.innerHTML = `
    <div class="fct">🔐 Change Password</div>
    <div style="max-width:380px;">
      <div style="margin-bottom:10px;">
        <label style="font-size:.8rem;font-weight:600;color:#555;display:block;margin-bottom:4px;">Authorised Email</label>
        <input id="resetEmail" type="email" placeholder="nppublics@gmail.com" value="nppublics@gmail.com"
          style="width:100%;padding:8px 11px;border:1.5px solid #ddd;border-radius:8px;font-size:.88rem;box-sizing:border-box;">
      </div>
      <button onclick="requestPasswordReset()" class="btn btn-primary btn-sm">📧 Send Reset Code</button>
      <div id="resetCodeSection" style="display:none;margin-top:12px;">
        <label style="font-size:.8rem;font-weight:600;color:#555;display:block;margin-bottom:4px;">Enter Code</label>
        <input id="resetCodeInput" type="text" placeholder="6-digit code"
          style="width:100%;padding:8px 11px;border:1.5px solid #ddd;border-radius:8px;font-size:.88rem;box-sizing:border-box;margin-bottom:8px;">
        <button onclick="verifyResetCode()" class="btn btn-success btn-sm">✅ Verify Code</button>
      </div>
      <div id="newPassSection" style="display:none;margin-top:12px;">
        <label style="font-size:.8rem;font-weight:600;color:#555;display:block;margin-bottom:4px;">New Password</label>
        <input id="newPassInput" type="password" placeholder="New password (min 6 chars)"
          style="width:100%;padding:8px 11px;border:1.5px solid #ddd;border-radius:8px;font-size:.88rem;box-sizing:border-box;margin-bottom:8px;">
        <label style="font-size:.8rem;font-weight:600;color:#555;display:block;margin-bottom:4px;">Confirm Password</label>
        <input id="confirmPassInput" type="password" placeholder="Confirm new password"
          style="width:100%;padding:8px 11px;border:1.5px solid #ddd;border-radius:8px;font-size:.88rem;box-sizing:border-box;margin-bottom:8px;">
        <button onclick="submitNewPassword()" class="btn btn-danger btn-sm">💾 Save New Password</button>
      </div>
    </div>`;
  settingsPanel.appendChild(section);
}

// ─── PUBLIC GRADESHEET & BILL VIEW FOR STUDENTS/STAFF ────────────────────────
// Override showStudentPortal to include grade + bill view buttons
const _origShowStudentPortal = window.showStudentPortal;
window.showStudentPortal = function(s) {
  if (_origShowStudentPortal) _origShowStudentPortal(s);
  // Add "View Grade Sheet" and "View Bill" buttons in the portal
  setTimeout(() => {
    const portal = document.getElementById('studentPortalContent') || document.querySelector('.portal-content');
    if (!portal || document.getElementById('portalPrintBtns')) return;
    const btns = document.createElement('div');
    btns.id = 'portalPrintBtns';
    btns.style.cssText = 'display:flex;gap:10px;flex-wrap:wrap;margin-top:14px;';
    btns.innerHTML = `
      <button onclick="portalPrintGrades('${s.id}')" class="btn btn-primary">📄 Print Grade Sheet</button>
      <button onclick="portalPrintBills('${s.id}')" class="btn btn-success">💰 Print Fee Bill</button>`;
    portal.appendChild(btns);
  }, 300);
};

window.portalPrintGrades = async function(sid) {
  try {
    const grades = await API.getStudentGrades(sid);
    if (!grades.length) { toast('No grade sheets found.', 'error'); return; }
    // Show picker for which grade
    const latest = grades[0];
    // Update DB.grades temporarily for printGradeSheet
    if (!DB.grades.find(x => x.id === latest.id)) DB.grades.push(latest);
    printGradeSheet(latest.id);
  } catch(e) { toast(e.message, 'error'); }
};

window.portalPrintBills = async function(sid) {
  try {
    const bills = await API.getStudentBills(sid);
    if (!bills.length) { toast('No bills found.', 'error'); return; }
    if (!DB.bills) DB.bills = [];
    bills.forEach(b => { if (!DB.bills.find(x => x.id === b.id)) DB.bills.push(b); });
    // Print latest bill
    printBill(bills[0].id);
  } catch(e) { toast(e.message, 'error'); }
};

// ─── HOOK INTO showAdmin TO INJECT PW RESET SECTION ─────────────────────────
const _origShowAdmin = window.showAdmin;
window.showAdmin = function(panel) {
  if (_origShowAdmin) _origShowAdmin(panel);
  if (panel === 'settings') {
    injectPwResetToSettings();
    setTimeout(injectPwResetToSettings, 300);
    setTimeout(injectPwResetToSettings, 700);
  }
};

// ═══════════════════════════════════════════════════════════════════════════════
// FINAL FIXES: Full A4 fit, style picker, multi-student print for bills/admit/receipt
// ═══════════════════════════════════════════════════════════════════════════════

// ─── OVERRIDE printGradeSheet — show style picker + multi-student option ──────
window.printGradeSheet = function(gradeId) {
  document.getElementById('gsPickerOverlay')?.remove();
  const overlay = document.createElement('div');
  overlay.id = 'gsPickerOverlay';
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:99999;display:flex;align-items:center;justify-content:center;padding:16px;';
  overlay.innerHTML = `
    <div style="background:#fff;border-radius:14px;max-width:420px;width:100%;box-shadow:0 20px 60px rgba(0,0,0,.35);overflow:hidden;">
      <div style="background:#1A2B5F;padding:13px 17px;display:flex;justify-content:space-between;align-items:center;">
        <div style="color:#fff;font-weight:700;font-size:.95rem;">📄 Choose Grade Sheet Style</div>
        <button onclick="document.getElementById('gsPickerOverlay').remove()" style="background:none;border:none;color:#fff;font-size:1.4rem;cursor:pointer;line-height:1;">✕</button>
      </div>
      <div style="padding:16px;display:flex;flex-direction:column;gap:10px;">
        <button onclick="document.getElementById('gsPickerOverlay').remove();printGradeSheetStyle1('${gradeId}')"
          style="padding:13px;border:2px solid #1A2B5F;border-radius:10px;background:#F0F4FF;cursor:pointer;text-align:left;width:100%;">
          <div style="font-weight:700;color:#1A2B5F;font-size:.9rem;">📋 Style 1 — Portrait, 1 per A4</div>
          <div style="font-size:.76rem;color:#666;margin-top:3px;">Full A4 portrait. Marks, %, GPA summary at bottom.</div>
        </button>
        <button onclick="document.getElementById('gsPickerOverlay').remove();printGradeSheetStyle2('${gradeId}')"
          style="padding:13px;border:2px solid #8B1A1A;border-radius:10px;background:#FFF5F5;cursor:pointer;text-align:left;width:100%;">
          <div style="font-weight:700;color:#8B1A1A;font-size:.9rem;">📊 Style 2 — Compact, 2 per A4</div>
          <div style="font-size:.76rem;color:#666;margin-top:3px;">Two grade sheets on one A4. Marks, %, result.</div>
        </button>
      </div>
    </div>`;
  document.body.appendChild(overlay);
};

// ─── STYLE 1: TRUE FULL A4 PORTRAIT, NO WASTE ────────────────────────────────
window.printGradeSheetStyle1 = function(gradeId) {
  const g = DB.grades.find(x => x.id === gradeId);
  if (!g) return;
  const s = DB.students.find(x => x.id === g.studentId) || {};
  const marks = g.marks || [];
  const result = g.result;
  const todayStr = todayBSStr();
  const dobBS = s.dob ? adStrToBS(s.dob) : '—';

  const subRows = marks.map((m, i) => {
    const pct = m.fm > 0 ? ((m.total / m.fm) * 100).toFixed(1) : '0.0';
    return '<tr style="background:' + (i % 2 === 0 ? '#fafafa' : '#fff') + ';">'
      + '<td style="padding:6px 8px;font-size:9pt;border:.5pt solid #ccc;text-align:center;">' + (i + 1) + '</td>'
      + '<td style="padding:6px 8px;font-size:10pt;border:.5pt solid #ccc;">' + m.subject + '</td>'
      + '<td style="padding:6px 8px;font-size:9pt;border:.5pt solid #ccc;text-align:center;">' + (m.fm || 100) + '</td>'
      + '<td style="padding:6px 8px;font-size:9pt;border:.5pt solid #ccc;text-align:center;">' + (m.pm || 40) + '</td>'
      + '<td style="padding:6px 8px;font-size:9pt;border:.5pt solid #ccc;text-align:center;">' + m.theory + '</td>'
      + '<td style="padding:6px 8px;font-size:9pt;border:.5pt solid #ccc;text-align:center;">' + m.practical + '</td>'
      + '<td style="padding:6px 8px;font-size:10pt;font-weight:700;border:.5pt solid #ccc;text-align:center;">' + m.total + '</td>'
      + '<td style="padding:6px 8px;font-size:9pt;border:.5pt solid #ccc;text-align:center;">' + pct + '%</td>'
      + '<td style="padding:6px 8px;font-size:9pt;border:.5pt solid #ccc;text-align:center;color:' + (m.total < (m.pm || 40) ? '#c0392b' : '#15803d') + ';">' + (m.total < (m.pm || 40) ? 'F' : 'P') + '</td>'
      + '</tr>';
  }).join('');

  const html = `
  <div style="width:190mm;height:275mm;font-family:Arial,sans-serif;border:2pt solid #333;background:#fff;display:flex;flex-direction:column;box-sizing:border-box;overflow:hidden;">
    <div style="border-bottom:2pt solid #333;padding:10px 14px;display:flex;gap:12px;align-items:center;flex-shrink:0;">
      <img src="${LOGO_B64}" style="width:58px;height:58px;border-radius:50%;object-fit:cover;">
      <div style="flex:1;text-align:center;">
        <div style="font-size:14pt;font-weight:700;font-family:Georgia,serif;text-transform:uppercase;">Nepal Public Secondary Boarding School</div>
        <div style="font-size:7.5pt;">Samsi-5, Pokharivinda, Mahottari | Madhesh Province, Nepal | eSewa: 9844015447</div>
      </div>
      <img src="${LOGO_B64}" style="width:58px;height:58px;border-radius:50%;object-fit:cover;">
    </div>
    <div style="text-align:center;padding:7px;border-bottom:2pt solid #333;flex-shrink:0;">
      <div style="font-size:14pt;font-weight:700;font-family:Georgia,serif;text-transform:uppercase;letter-spacing:2px;">Grade – Sheet</div>
      <div style="font-size:9pt;font-weight:600;">${(g.term||'').toUpperCase()} EXAMINATION — ${g.year||''} B.S.</div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;border-bottom:1pt solid #999;flex-shrink:0;">
      <div style="padding:7px 14px;border-right:.5pt solid #999;font-size:9.5pt;line-height:2.2;">
        THE GRADE(S) SECURED BY: <strong>${s.name||'—'}</strong><br>
        DATE OF BIRTH: <strong>${dobBS}</strong>
      </div>
      <div style="padding:7px 14px;font-size:9.5pt;line-height:2.2;">
        P.S.: <strong>${s.sno||'—'}</strong> &nbsp;&nbsp; GRADE: <strong>${g.grade||'—'}</strong><br>
        IN THE EXAM CONDUCTED IN: <strong>${g.year||'—'}</strong> B.S.
      </div>
    </div>
    <table style="width:100%;border-collapse:collapse;flex:1;">
      <thead><tr style="background:#e0e0e0;">
        <th style="padding:6px;font-size:9pt;border:.5pt solid #999;text-align:center;width:6%;">S.N.</th>
        <th style="padding:6px;font-size:9pt;border:.5pt solid #999;text-align:left;">SUBJECTS</th>
        <th style="padding:6px;font-size:9pt;border:.5pt solid #999;text-align:center;width:8%;">F.M.</th>
        <th style="padding:6px;font-size:9pt;border:.5pt solid #999;text-align:center;width:8%;">P.M.</th>
        <th style="padding:6px;font-size:9pt;border:.5pt solid #999;text-align:center;width:7%;">TH</th>
        <th style="padding:6px;font-size:9pt;border:.5pt solid #999;text-align:center;width:7%;">PR</th>
        <th style="padding:6px;font-size:9pt;border:.5pt solid #999;text-align:center;width:9%;">TOTAL</th>
        <th style="padding:6px;font-size:9pt;border:.5pt solid #999;text-align:center;width:8%;">%</th>
        <th style="padding:6px;font-size:9pt;border:.5pt solid #999;text-align:center;width:8%;">REMARK</th>
      </tr></thead>
      <tbody>${subRows}</tbody>
      <tfoot><tr style="background:#e8e8e8;">
        <td colspan="2" style="padding:6px 8px;font-size:10pt;font-weight:700;border:.5pt solid #999;">TOTAL</td>
        <td style="padding:6px;font-size:9pt;border:.5pt solid #999;text-align:center;">${g.maxMarks}</td>
        <td style="border:.5pt solid #999;"></td>
        <td style="padding:6px;font-size:9pt;font-weight:700;border:.5pt solid #999;text-align:center;">${marks.reduce((a,m)=>a+m.theory,0)}</td>
        <td style="padding:6px;font-size:9pt;font-weight:700;border:.5pt solid #999;text-align:center;">${marks.reduce((a,m)=>a+m.practical,0)}</td>
        <td style="padding:6px;font-size:10.5pt;font-weight:700;border:.5pt solid #999;text-align:center;">${g.totalMarks}</td>
        <td style="padding:6px;font-size:9.5pt;font-weight:700;border:.5pt solid #999;text-align:center;">${g.percentage}%</td>
        <td style="padding:6px;font-size:9.5pt;font-weight:700;border:.5pt solid #999;text-align:center;color:${result==='PASS'?'#15803d':'#c0392b'};">${result}</td>
      </tr></tfoot>
    </table>
    <div style="padding:7px 14px;border-top:.5pt solid #999;display:flex;gap:20px;font-size:9.5pt;flex-shrink:0;">
      <strong>GPA: ${g.gpa||'—'}</strong>
      <strong>Grade: ${g.grade||'—'} (${g.label||''})</strong>
      <strong>Percentage: ${g.percentage}%</strong>
      <strong style="margin-left:auto;color:${result==='PASS'?'#15803d':'#c0392b'};">Result: ${result}</strong>
    </div>
    <div style="padding:5px 14px;border-top:.5pt solid #999;flex-shrink:0;">
      <div style="font-size:8.5pt;font-weight:700;">EXTRA CREDIT SUBJECT</div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;padding:8px 14px;gap:12px;border-top:.5pt solid #999;flex-shrink:0;">
      <div style="font-size:7.5pt;text-align:center;">
        <img src="${SIG_ACCOUNTANT}" style="height:24px;object-fit:contain;display:block;margin:0 auto 2px;">
        <div style="border-top:.5pt solid #555;padding-top:2px;">Prepared By</div>
      </div>
      <div style="font-size:7.5pt;text-align:center;">
        <div style="height:24px;"></div>
        <div style="border-top:.5pt solid #555;padding-top:2px;">Student / Parent</div>
      </div>
      <div style="font-size:7.5pt;text-align:center;">
        <img src="${SIG_PRINCIPAL}" style="height:24px;object-fit:contain;display:block;margin:0 auto 2px;">
        <div style="border-top:.5pt solid #555;padding-top:2px;">Principal — Mr. Bineet Jha</div>
      </div>
    </div>
    <div style="padding:3px 14px;border-top:.3pt solid #ddd;font-size:5.5pt;color:#555;flex-shrink:0;">DATE: ${todayStr} | A+(4.0,90-100%) A(3.6,80-89%) B+(3.2,70-79%) B(2.8,60-69%) C+(2.4,50-59%) C(2.0,40-49%) D(1.6,35-39%) NG(0.0,&lt;35%) | TH=Terminal PR=Written</div>
  </div>`;

  doPrint(`<div style="font-family:Arial,sans-serif;">${html}</div>`);
};

// ─── STYLE 2: 2 PER A4, COMPACT NO WASTE ─────────────────────────────────────
window.printGradeSheetStyle2 = function(gradeId) {
  const g = DB.grades.find(x => x.id === gradeId);
  if (!g) return;
  const s = DB.students.find(x => x.id === g.studentId) || {};
  const marks = g.marks || [];
  const result = g.result;
  const todayStr = todayBSStr();
  const dobBS = s.dob ? adStrToBS(s.dob) : '—';

  const subRows = marks.map((m, i) => {
    const pct = m.fm > 0 ? ((m.total / m.fm) * 100).toFixed(1) : '0.0';
    return `<tr style="background:${i%2===0?'#fafafa':'#fff'};">
      <td style="padding:3px 5px;font-size:7pt;border:.4pt solid #bbb;text-align:center;">${i+1}</td>
      <td style="padding:3px 5px;font-size:7.5pt;border:.4pt solid #bbb;">${m.subject}</td>
      <td style="padding:3px 5px;font-size:7pt;border:.4pt solid #bbb;text-align:center;">${m.fm||100}</td>
      <td style="padding:3px 5px;font-size:7pt;border:.4pt solid #bbb;text-align:center;">${m.pm||40}</td>
      <td style="padding:3px 5px;font-size:7pt;border:.4pt solid #bbb;text-align:center;">${m.theory}</td>
      <td style="padding:3px 5px;font-size:7pt;border:.4pt solid #bbb;text-align:center;">${m.practical}</td>
      <td style="padding:3px 5px;font-size:7.5pt;font-weight:700;border:.4pt solid #bbb;text-align:center;">${m.total}</td>
      <td style="padding:3px 5px;font-size:7pt;border:.4pt solid #bbb;text-align:center;">${pct}%</td>
      <td style="padding:3px 5px;font-size:7pt;border:.4pt solid #bbb;text-align:center;color:${m.total<(m.pm||40)?'#c0392b':'#15803d'};">${m.total<(m.pm||40)?'F':'P'}</td>
    </tr>`;
  }).join('');

  const sheet = `
  <div style="width:190mm;font-family:Arial,sans-serif;border:1pt solid #555;background:#fff;">
    <div style="border-bottom:1pt solid #555;padding:5px 10px;display:flex;gap:8px;align-items:center;">
      <img src="${LOGO_B64}" style="width:36px;height:36px;border-radius:50%;object-fit:cover;">
      <div style="flex:1;text-align:center;">
        <div style="font-size:10pt;font-weight:700;font-family:Georgia,serif;text-transform:uppercase;">Nepal Public Secondary Boarding School</div>
        <div style="font-size:5.5pt;">Samsi-5, Mahottari | Ph:9801671781 | eSewa:9844015447</div>
        <div style="font-size:6.5pt;font-weight:700;">MARKS SHEET — ${(g.term||'').toUpperCase()} EXAMINATION ${g.year||''} B.S.</div>
      </div>
      <img src="${LOGO_B64}" style="width:36px;height:36px;border-radius:50%;object-fit:cover;">
    </div>
    <div style="display:grid;grid-template-columns:2fr 1fr 1fr 1fr;border-bottom:.5pt solid #bbb;padding:3px 8px;gap:4px;align-items:center;">
      <div style="font-size:7pt;">Name: <strong>${s.name||'—'}</strong></div>
      <div style="font-size:7pt;">S.No.: <strong>${s.sno||'—'}</strong></div>
      <div style="font-size:7pt;">Class: <strong>${g.class||'—'}</strong></div>
      <div style="font-size:7pt;text-align:right;">Date: <strong>${todayStr}</strong></div>
    </div>
    <div style="display:grid;grid-template-columns:2fr 1fr 1fr 1fr;border-bottom:.5pt solid #bbb;padding:2px 8px;gap:4px;">
      <div style="font-size:7pt;">DOB: <strong>${dobBS}</strong></div>
      <div style="font-size:7pt;">GPA: <strong>${g.gpa||'—'}</strong></div>
      <div style="font-size:7pt;">Grade: <strong>${g.grade||'—'}</strong></div>
      <div style="font-size:7pt;text-align:right;font-weight:700;color:${result==='PASS'?'#15803d':'#c0392b'};">Result: ${result}</div>
    </div>
    <table style="width:100%;border-collapse:collapse;">
      <thead><tr style="background:#ddd;">
        <th style="padding:3px 4px;font-size:6.5pt;border:.4pt solid #bbb;text-align:center;width:5%;">S.N.</th>
        <th style="padding:3px 4px;font-size:6.5pt;border:.4pt solid #bbb;text-align:left;">SUBJECT</th>
        <th style="padding:3px 4px;font-size:6.5pt;border:.4pt solid #bbb;text-align:center;width:7%;">F.M.</th>
        <th style="padding:3px 4px;font-size:6.5pt;border:.4pt solid #bbb;text-align:center;width:7%;">P.M.</th>
        <th style="padding:3px 4px;font-size:6.5pt;border:.4pt solid #bbb;text-align:center;width:6%;">TH</th>
        <th style="padding:3px 4px;font-size:6.5pt;border:.4pt solid #bbb;text-align:center;width:6%;">PR</th>
        <th style="padding:3px 4px;font-size:6.5pt;border:.4pt solid #bbb;text-align:center;width:8%;">TOTAL</th>
        <th style="padding:3px 4px;font-size:6.5pt;border:.4pt solid #bbb;text-align:center;width:7%;">%</th>
        <th style="padding:3px 4px;font-size:6.5pt;border:.4pt solid #bbb;text-align:center;width:7%;">REM.</th>
      </tr></thead>
      <tbody>${subRows}</tbody>
      <tfoot><tr style="background:#e8e8e8;">
        <td colspan="2" style="padding:3px 5px;font-size:7.5pt;font-weight:700;border:.4pt solid #bbb;">TOTAL</td>
        <td style="padding:3px 4px;font-size:7pt;border:.4pt solid #bbb;text-align:center;">${g.maxMarks}</td>
        <td style="border:.4pt solid #bbb;"></td>
        <td style="padding:3px 4px;font-size:7pt;font-weight:700;border:.4pt solid #bbb;text-align:center;">${marks.reduce((a,m)=>a+m.theory,0)}</td>
        <td style="padding:3px 4px;font-size:7pt;font-weight:700;border:.4pt solid #bbb;text-align:center;">${marks.reduce((a,m)=>a+m.practical,0)}</td>
        <td style="padding:3px 4px;font-size:8pt;font-weight:700;border:.4pt solid #bbb;text-align:center;">${g.totalMarks}</td>
        <td style="padding:3px 4px;font-size:7.5pt;font-weight:700;border:.4pt solid #bbb;text-align:center;">${g.percentage}%</td>
        <td style="padding:3px 4px;font-size:7.5pt;font-weight:700;border:.4pt solid #bbb;text-align:center;color:${result==='PASS'?'#15803d':'#c0392b'};">${result}</td>
      </tr></tfoot>
    </table>
    <div style="padding:3px 8px;border-top:.5pt solid #bbb;font-size:7pt;display:flex;gap:12px;">
      <span>GPA: <strong>${g.gpa||'—'}</strong></span>
      <span>Grade: <strong>${g.grade||'—'} (${g.label||''})</strong></span>
      <span>Total: <strong>${g.totalMarks}/${g.maxMarks}</strong></span>
      <span>%: <strong>${g.percentage}%</strong></span>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;padding:4px 8px;gap:8px;border-top:.5pt solid #bbb;">
      <div style="font-size:6pt;text-align:center;">
        <img src="${SIG_ACCOUNTANT}" style="height:14px;object-fit:contain;display:block;margin:0 auto 1px;">
        <div style="border-top:.4pt solid #555;padding-top:1px;">Prepared By</div>
      </div>
      <div style="font-size:6pt;text-align:center;">
        <div style="height:14px;"></div>
        <div style="border-top:.4pt solid #555;padding-top:1px;">Student / Parent</div>
      </div>
      <div style="font-size:6pt;text-align:center;">
        <img src="${SIG_PRINCIPAL}" style="height:14px;object-fit:contain;display:block;margin:0 auto 1px;">
        <div style="border-top:.4pt solid #555;padding-top:1px;">Principal — Mr. Bineet Jha</div>
      </div>
    </div>
    <div style="padding:1px 8px;border-top:.3pt solid #ddd;font-size:4.8pt;color:#777;">DATE: ${todayStr} | A+(4.0,90-100%) A(3.6,80-89%) B+(3.2,70-79%) B(2.8,60-69%) C+(2.4,50-59%) C(2.0,40-49%) D(1.6,35-39%) NG(0.0,&lt;35%)</div>
  </div>`;

  const cut = '<div style="border-top:1.5px dashed #aaa;margin:2mm 0;text-align:center;position:relative;"><span style="position:absolute;top:-6px;left:50%;transform:translateX(-50%);background:#fff;padding:0 6px;font-size:4.5pt;color:#aaa;">✂ Cut here</span></div>';
  doPrint('<div>' + sheet + cut + sheet + '</div>');
};

// ─── MULTI-STUDENT PRINT: BILLS, RECEIPTS, ADMIT CARDS ───────────────────────
// Adds a "Print 2 Students" button to bills and grades panels
function addMultiPrintButtons() {
  // Bills panel
  const billingPanel = document.getElementById('ap-billing');
  if (billingPanel && !document.getElementById('multiPrintBillsBtn')) {
    const btn = document.createElement('div');
    btn.style.cssText = 'margin:8px 0;display:flex;gap:8px;flex-wrap:wrap;';
    btn.innerHTML = `
      <button id="multiPrintBillsBtn" class="btn btn-primary btn-sm" onclick="openMultiPrintModal('bills')">🖨️ Print 2 Bills (2 Students on 1 A4)</button>
      <button class="btn btn-success btn-sm" onclick="openMultiPrintModal('receipts')">🧾 Print 2 Receipts on 1 A4</button>`;
    const dtw = billingPanel.querySelector('.dtw') || billingPanel;
    billingPanel.insertBefore(btn, dtw);
  }

  // Grades panel
  const gradesPanel = document.getElementById('ap-grades');
  if (gradesPanel && !document.getElementById('multiPrintGradesBtn')) {
    const btn = document.createElement('div');
    btn.style.cssText = 'margin:8px 0;';
    btn.innerHTML = `<button id="multiPrintGradesBtn" class="btn btn-primary btn-sm" onclick="openMultiPrintModal('grades')">🖨️ Print 2 Grade Sheets (2 Students on 1 A4)</button>`;
    const dtw = gradesPanel.querySelector('.dtw') || gradesPanel;
    gradesPanel.insertBefore(btn, dtw);
  }
}

// ─── MULTI-PRINT MODAL ────────────────────────────────────────────────────────
window.openMultiPrintModal = function(type) {
  document.getElementById('multiPrintModal')?.remove();

  const isGrades = type === 'grades';
  const isReceipts = type === 'receipts';
  const isBills = type === 'bills';

  let list1, list2;
  if (isGrades) {
    list1 = list2 = DB.grades.map(g => `<option value="${g.id}">${g.studentName} — ${g.term} ${g.year}</option>`).join('');
  } else {
    const billList = DB.bills.filter(b => isReceipts ? b.status === 'Paid' : true);
    list1 = list2 = billList.map(b => `<option value="${b.id}">${b.studentName} — ${b.term} (${b.status})</option>`).join('');
  }

  const overlay = document.createElement('div');
  overlay.id = 'multiPrintModal';
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:99999;display:flex;align-items:center;justify-content:center;padding:16px;';
  overlay.innerHTML = `
    <div style="background:#fff;border-radius:14px;max-width:460px;width:100%;box-shadow:0 20px 60px rgba(0,0,0,.3);overflow:hidden;">
      <div style="background:#1A2B5F;padding:13px 17px;display:flex;justify-content:space-between;align-items:center;">
        <div style="color:#fff;font-weight:700;">🖨️ Print 2 Students on 1 A4</div>
        <button onclick="document.getElementById('multiPrintModal').remove()" style="background:none;border:none;color:#fff;font-size:1.3rem;cursor:pointer;">✕</button>
      </div>
      <div style="padding:18px;display:flex;flex-direction:column;gap:12px;">
        <div>
          <label style="font-size:.8rem;font-weight:700;color:#555;display:block;margin-bottom:4px;">Student 1</label>
          <select id="mp1" style="width:100%;padding:8px 10px;border:1.5px solid #ddd;border-radius:8px;font-size:.85rem;">
            ${list1}
          </select>
        </div>
        <div>
          <label style="font-size:.8rem;font-weight:700;color:#555;display:block;margin-bottom:4px;">Student 2</label>
          <select id="mp2" style="width:100%;padding:8px 10px;border:1.5px solid #ddd;border-radius:8px;font-size:.85rem;">
            ${list2}
          </select>
        </div>
        ${isGrades ? `
        <div>
          <label style="font-size:.8rem;font-weight:700;color:#555;display:block;margin-bottom:4px;">Style</label>
          <select id="mpStyle" style="width:100%;padding:8px 10px;border:1.5px solid #ddd;border-radius:8px;font-size:.85rem;">
            <option value="1">Style 1 — Portrait (each half page)</option>
            <option value="2">Style 2 — Compact (recommended for 2/A4)</option>
          </select>
        </div>` : ''}
        <button onclick="doMultiPrint('${type}')" style="background:linear-gradient(135deg,#1A2B5F,#263570);color:#fff;border:none;border-radius:8px;padding:11px;font-weight:700;cursor:pointer;font-size:.9rem;">🖨️ Print Now</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);
};

window.doMultiPrint = function(type) {
  const id1 = document.getElementById('mp1')?.value;
  const id2 = document.getElementById('mp2')?.value;
  if (!id1 || !id2) { toast('Select both students.', 'error'); return; }
  document.getElementById('multiPrintModal')?.remove();

  const cut = '<div style="border-top:1.5px dashed #aaa;margin:2mm 0;text-align:center;position:relative;"><span style="position:absolute;top:-6px;left:50%;transform:translateX(-50%);background:#fff;padding:0 6px;font-size:4.5pt;color:#aaa;">✂ Cut here</span></div>';

  if (type === 'grades') {
    const style = document.getElementById('mpStyle')?.value || '2';
    const g1 = DB.grades.find(x => x.id === id1);
    const g2 = DB.grades.find(x => x.id === id2);
    if (!g1 || !g2) { toast('Grade not found.', 'error'); return; }
    if (style === '1') {
      // Use style1 but scaled to half
      const h1 = buildGradeSheetHTML1(g1);
      const h2 = buildGradeSheetHTML1(g2);
      doPrint('<div>' + h1 + cut + h2 + '</div>');
    } else {
      const h1 = buildGradeSheetHTML2(g1);
      const h2 = buildGradeSheetHTML2(g2);
      doPrint('<div>' + h1 + cut + h2 + '</div>');
    }
  } else if (type === 'bills') {
    const b1 = DB.bills.find(x => x.id === id1);
    const b2 = DB.bills.find(x => x.id === id2);
    const s1 = DB.students.find(x => x.id === b1?.studentId) || { name: b1?.studentName, sno: b1?.sno, class: b1?.class };
    const s2 = DB.students.find(x => x.id === b2?.studentId) || { name: b2?.studentName, sno: b2?.sno, class: b2?.class };
    if (!b1 || !b2) { toast('Bill not found.', 'error'); return; }
    const h1 = buildBillHTML(s1, b1);
    const h2 = buildBillHTML(s2, b2);
    doPrint('<div>' + h1 + cut + h2 + '</div>');
  } else if (type === 'receipts') {
    const b1 = DB.bills.find(x => x.id === id1);
    const b2 = DB.bills.find(x => x.id === id2);
    if (!b1 || !b2) { toast('Receipt not found.', 'error'); return; }
    const h1 = buildReceiptHTML(b1);
    const h2 = buildReceiptHTML(b2);
    doPrint('<div>' + h1 + cut + h2 + '</div>');
  }
};

// ─── SHARED HTML BUILDERS ─────────────────────────────────────────────────────
function buildGradeSheetHTML1(g) {
  const s = DB.students.find(x => x.id === g.studentId) || {};
  const marks = g.marks || [];
  const result = g.result;
  const todayStr = todayBSStr();
  const dobBS = s.dob ? adStrToBS(s.dob) : '—';
  const subRows = marks.map((m, i) => {
    const pct = m.fm > 0 ? ((m.total / m.fm) * 100).toFixed(1) : '0.0';
    return `<tr style="background:${i%2===0?'#fafafa':'#fff'};"><td style="padding:4px 5px;font-size:7.5pt;border:.4pt solid #ccc;text-align:center;">${i+1}</td><td style="padding:4px 5px;font-size:8pt;border:.4pt solid #ccc;">${m.subject}</td><td style="padding:4px 5px;font-size:7.5pt;border:.4pt solid #ccc;text-align:center;">${m.fm||100}</td><td style="padding:4px 5px;font-size:7.5pt;border:.4pt solid #ccc;text-align:center;">${m.pm||40}</td><td style="padding:4px 5px;font-size:7.5pt;border:.4pt solid #ccc;text-align:center;">${m.theory}</td><td style="padding:4px 5px;font-size:7.5pt;border:.4pt solid #ccc;text-align:center;">${m.practical}</td><td style="padding:4px 5px;font-size:8pt;font-weight:700;border:.4pt solid #ccc;text-align:center;">${m.total}</td><td style="padding:4px 5px;font-size:7.5pt;border:.4pt solid #ccc;text-align:center;">${pct}%</td><td style="padding:4px 5px;font-size:7.5pt;border:.4pt solid #ccc;text-align:center;color:${m.total<(m.pm||40)?'#c0392b':'#15803d'};">${m.total<(m.pm||40)?'F':'P'}</td></tr>`;
  }).join('');
  return `<div style="width:190mm;font-family:Arial,sans-serif;border:1.5pt solid #333;background:#fff;">
    <div style="border-bottom:1.5pt solid #333;padding:6px 10px;display:flex;gap:8px;align-items:center;"><img src="${LOGO_B64}" style="width:40px;height:40px;border-radius:50%;object-fit:cover;"><div style="flex:1;text-align:center;"><div style="font-size:11pt;font-weight:700;font-family:Georgia,serif;">Nepal Public Secondary Boarding School</div><div style="font-size:6pt;">Samsi-5, Mahottari | eSewa: 9844015447</div></div><img src="${LOGO_B64}" style="width:40px;height:40px;border-radius:50%;object-fit:cover;"></div>
    <div style="text-align:center;padding:4px;border-bottom:1.5pt solid #333;"><div style="font-size:11pt;font-weight:700;font-family:Georgia,serif;">Grade – Sheet</div><div style="font-size:7.5pt;font-weight:600;">${(g.term||'').toUpperCase()} EXAMINATION — ${g.year||''} B.S.</div></div>
    <div style="display:grid;grid-template-columns:1fr 1fr;border-bottom:1pt solid #999;"><div style="padding:4px 10px;border-right:.5pt solid #999;font-size:8pt;line-height:2;">Name: <strong>${s.name||'—'}</strong><br>DOB: <strong>${dobBS}</strong></div><div style="padding:4px 10px;font-size:8pt;line-height:2;">P.S.: <strong>${s.sno||'—'}</strong> &nbsp; Grade: <strong>${g.grade||'—'}</strong><br>Exam Year: <strong>${g.year||'—'} B.S.</strong></div></div>
    <table style="width:100%;border-collapse:collapse;"><thead><tr style="background:#e0e0e0;"><th style="padding:4px;font-size:7.5pt;border:.4pt solid #999;text-align:center;width:6%;">S.N.</th><th style="padding:4px;font-size:7.5pt;border:.4pt solid #999;text-align:left;">SUBJECTS</th><th style="padding:4px;font-size:7.5pt;border:.4pt solid #999;text-align:center;width:8%;">F.M.</th><th style="padding:4px;font-size:7.5pt;border:.4pt solid #999;text-align:center;width:8%;">P.M.</th><th style="padding:4px;font-size:7.5pt;border:.4pt solid #999;text-align:center;width:7%;">TH</th><th style="padding:4px;font-size:7.5pt;border:.4pt solid #999;text-align:center;width:7%;">PR</th><th style="padding:4px;font-size:7.5pt;border:.4pt solid #999;text-align:center;width:9%;">TOTAL</th><th style="padding:4px;font-size:7.5pt;border:.4pt solid #999;text-align:center;width:8%;">%</th><th style="padding:4px;font-size:7.5pt;border:.4pt solid #999;text-align:center;width:8%;">REMARK</th></tr></thead><tbody>${subRows}</tbody><tfoot><tr style="background:#e8e8e8;"><td colspan="2" style="padding:4px 6px;font-size:8.5pt;font-weight:700;border:.4pt solid #999;">TOTAL</td><td style="padding:4px;border:.4pt solid #999;text-align:center;">${g.maxMarks}</td><td style="border:.4pt solid #999;"></td><td style="padding:4px;font-weight:700;border:.4pt solid #999;text-align:center;">${marks.reduce((a,m)=>a+m.theory,0)}</td><td style="padding:4px;font-weight:700;border:.4pt solid #999;text-align:center;">${marks.reduce((a,m)=>a+m.practical,0)}</td><td style="padding:4px;font-size:9pt;font-weight:700;border:.4pt solid #999;text-align:center;">${g.totalMarks}</td><td style="padding:4px;font-size:8.5pt;font-weight:700;border:.4pt solid #999;text-align:center;">${g.percentage}%</td><td style="padding:4px;font-size:8.5pt;font-weight:700;border:.4pt solid #999;text-align:center;color:${result==='PASS'?'#15803d':'#c0392b'};">${result}</td></tr></tfoot></table>
    <div style="padding:4px 10px;border-top:.5pt solid #999;font-size:8pt;display:flex;gap:14px;"><strong>GPA: ${g.gpa||'—'}</strong><strong>Grade: ${g.grade||'—'} (${g.label||''})</strong><strong>%: ${g.percentage}%</strong><strong style="margin-left:auto;color:${result==='PASS'?'#15803d':'#c0392b'};">${result}</strong></div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;padding:5px 10px;gap:8px;border-top:.5pt solid #999;"><div style="font-size:6pt;text-align:center;"><img src="${SIG_ACCOUNTANT}" style="height:16px;object-fit:contain;display:block;margin:0 auto 1px;"><div style="border-top:.4pt solid #555;padding-top:1px;">Prepared By</div></div><div style="font-size:6pt;text-align:center;"><div style="height:16px;"></div><div style="border-top:.4pt solid #555;padding-top:1px;">Student / Parent</div></div><div style="font-size:6pt;text-align:center;"><img src="${SIG_PRINCIPAL}" style="height:16px;object-fit:contain;display:block;margin:0 auto 1px;"><div style="border-top:.4pt solid #555;padding-top:1px;">Principal — Mr. Bineet Jha</div></div></div>
    <div style="padding:2px 10px;border-top:.3pt solid #ddd;font-size:5pt;color:#777;">DATE: ${todayStr} | A+(4.0,90%) A(3.6,80%) B+(3.2,70%) B(2.8,60%) C+(2.4,50%) C(2.0,40%) D(1.6,35%) NG(0.0,&lt;35%)</div>
  </div>`;
}

function buildGradeSheetHTML2(g) {
  const s = DB.students.find(x => x.id === g.studentId) || {};
  const marks = g.marks || [];
  const result = g.result;
  const todayStr = todayBSStr();
  const dobBS = s.dob ? adStrToBS(s.dob) : '—';
  const subRows = marks.map((m, i) => {
    const pct = m.fm > 0 ? ((m.total / m.fm) * 100).toFixed(1) : '0.0';
    return `<tr style="background:${i%2===0?'#fafafa':'#fff'};"><td style="padding:3px 4px;font-size:6.5pt;border:.4pt solid #bbb;text-align:center;">${i+1}</td><td style="padding:3px 4px;font-size:7pt;border:.4pt solid #bbb;">${m.subject}</td><td style="padding:3px 4px;font-size:6.5pt;border:.4pt solid #bbb;text-align:center;">${m.fm||100}</td><td style="padding:3px 4px;font-size:6.5pt;border:.4pt solid #bbb;text-align:center;">${m.pm||40}</td><td style="padding:3px 4px;font-size:6.5pt;border:.4pt solid #bbb;text-align:center;">${m.theory}</td><td style="padding:3px 4px;font-size:6.5pt;border:.4pt solid #bbb;text-align:center;">${m.practical}</td><td style="padding:3px 4px;font-size:7pt;font-weight:700;border:.4pt solid #bbb;text-align:center;">${m.total}</td><td style="padding:3px 4px;font-size:6.5pt;border:.4pt solid #bbb;text-align:center;">${pct}%</td><td style="padding:3px 4px;font-size:6.5pt;border:.4pt solid #bbb;text-align:center;color:${m.total<(m.pm||40)?'#c0392b':'#15803d'};">${m.total<(m.pm||40)?'F':'P'}</td></tr>`;
  }).join('');
  return `<div style="width:190mm;font-family:Arial,sans-serif;border:1pt solid #555;background:#fff;"><div style="border-bottom:1pt solid #555;padding:4px 8px;display:flex;gap:7px;align-items:center;"><img src="${LOGO_B64}" style="width:32px;height:32px;border-radius:50%;object-fit:cover;"><div style="flex:1;text-align:center;"><div style="font-size:9pt;font-weight:700;font-family:Georgia,serif;">Nepal Public Secondary Boarding School</div><div style="font-size:5.5pt;">Samsi-5, Mahottari | eSewa:9844015447 | MARKS SHEET — ${(g.term||'').toUpperCase()} ${g.year||''} B.S.</div></div><img src="${LOGO_B64}" style="width:32px;height:32px;border-radius:50%;object-fit:cover;"></div><div style="display:grid;grid-template-columns:2fr 1fr 1fr 1fr;border-bottom:.5pt solid #bbb;padding:2px 7px;gap:3px;"><div style="font-size:6.5pt;">Name: <strong>${s.name||'—'}</strong></div><div style="font-size:6.5pt;">S.No.: <strong>${s.sno||'—'}</strong></div><div style="font-size:6.5pt;">Class: <strong>${g.class||'—'}</strong></div><div style="font-size:6.5pt;text-align:right;">Date: <strong>${todayStr}</strong></div></div><div style="display:grid;grid-template-columns:2fr 1fr 1fr 1fr;border-bottom:.5pt solid #bbb;padding:2px 7px;gap:3px;"><div style="font-size:6.5pt;">DOB: <strong>${dobBS}</strong></div><div style="font-size:6.5pt;">GPA: <strong>${g.gpa||'—'}</strong></div><div style="font-size:6.5pt;">Grade: <strong>${g.grade||'—'}</strong></div><div style="font-size:6.5pt;text-align:right;font-weight:700;color:${result==='PASS'?'#15803d':'#c0392b'};">${result}</div></div><table style="width:100%;border-collapse:collapse;"><thead><tr style="background:#ddd;"><th style="padding:2.5px 3px;font-size:6pt;border:.4pt solid #bbb;text-align:center;width:5%;">S.N.</th><th style="padding:2.5px 3px;font-size:6pt;border:.4pt solid #bbb;text-align:left;">SUBJECT</th><th style="padding:2.5px 3px;font-size:6pt;border:.4pt solid #bbb;text-align:center;width:7%;">F.M.</th><th style="padding:2.5px 3px;font-size:6pt;border:.4pt solid #bbb;text-align:center;width:7%;">P.M.</th><th style="padding:2.5px 3px;font-size:6pt;border:.4pt solid #bbb;text-align:center;width:6%;">TH</th><th style="padding:2.5px 3px;font-size:6pt;border:.4pt solid #bbb;text-align:center;width:6%;">PR</th><th style="padding:2.5px 3px;font-size:6pt;border:.4pt solid #bbb;text-align:center;width:8%;">TOTAL</th><th style="padding:2.5px 3px;font-size:6pt;border:.4pt solid #bbb;text-align:center;width:7%;">%</th><th style="padding:2.5px 3px;font-size:6pt;border:.4pt solid #bbb;text-align:center;width:7%;">REM.</th></tr></thead><tbody>${subRows}</tbody><tfoot><tr style="background:#e8e8e8;"><td colspan="2" style="padding:2.5px 4px;font-size:7pt;font-weight:700;border:.4pt solid #bbb;">TOTAL</td><td style="padding:2.5px 3px;font-size:6.5pt;border:.4pt solid #bbb;text-align:center;">${g.maxMarks}</td><td style="border:.4pt solid #bbb;"></td><td style="padding:2.5px 3px;font-size:6.5pt;font-weight:700;border:.4pt solid #bbb;text-align:center;">${marks.reduce((a,m)=>a+m.theory,0)}</td><td style="padding:2.5px 3px;font-size:6.5pt;font-weight:700;border:.4pt solid #bbb;text-align:center;">${marks.reduce((a,m)=>a+m.practical,0)}</td><td style="padding:2.5px 3px;font-size:7.5pt;font-weight:700;border:.4pt solid #bbb;text-align:center;">${g.totalMarks}</td><td style="padding:2.5px 3px;font-size:7pt;font-weight:700;border:.4pt solid #bbb;text-align:center;">${g.percentage}%</td><td style="padding:2.5px 3px;font-size:7pt;font-weight:700;border:.4pt solid #bbb;text-align:center;color:${result==='PASS'?'#15803d':'#c0392b'};">${result}</td></tr></tfoot></table><div style="padding:2px 7px;border-top:.5pt solid #bbb;font-size:6.5pt;display:flex;gap:10px;"><span>GPA:<strong>${g.gpa||'—'}</strong></span><span>Grade:<strong>${g.grade||'—'}(${g.label||''})</strong></span><span>Total:<strong>${g.totalMarks}/${g.maxMarks}</strong></span><span>%:<strong>${g.percentage}%</strong></span></div><div style="display:grid;grid-template-columns:1fr 1fr 1fr;padding:3px 7px;gap:6px;border-top:.5pt solid #bbb;"><div style="font-size:5.5pt;text-align:center;"><img src="${SIG_ACCOUNTANT}" style="height:12px;object-fit:contain;display:block;margin:0 auto 1px;"><div style="border-top:.4pt solid #555;padding-top:1px;">Prepared By</div></div><div style="font-size:5.5pt;text-align:center;"><div style="height:12px;"></div><div style="border-top:.4pt solid #555;padding-top:1px;">Student / Parent</div></div><div style="font-size:5.5pt;text-align:center;"><img src="${SIG_PRINCIPAL}" style="height:12px;object-fit:contain;display:block;margin:0 auto 1px;"><div style="border-top:.4pt solid #555;padding-top:1px;">Principal — Mr. Bineet Jha</div></div></div><div style="padding:1px 7px;border-top:.3pt solid #ddd;font-size:4.5pt;color:#777;">DATE: ${todayStr} | A+(4.0,90%) A(3.6,80%) B+(3.2,70%) B(2.8,60%) C+(2.4,50%) C(2.0,40%) D(1.6,35%) NG(0.0,&lt;35%)</div></div>`;
}

function buildReceiptHTML(b) {
  const s = DB.students.find(x => x.id === b.studentId) || { name: b.studentName, sno: b.sno, class: b.class };
  const todayStr = todayBSStr();
  return `<div style="width:190mm;background:#fff;border:1pt solid #15803D;font-family:Arial,sans-serif;">
    <div style="background:#15803d;padding:5px 10px;display:flex;gap:8px;align-items:center;">
      <img src="${LOGO_B64}" style="width:26px;height:26px;border-radius:50%;border:1.5px solid #4ade80;object-fit:cover;">
      <div><div style="color:#fff;font-size:7.5pt;font-weight:700;">NEPAL PUBLIC SECONDARY BOARDING SCHOOL</div>
      <div style="color:rgba(255,255,255,.6);font-size:5pt;">PAYMENT RECEIPT | eSewa: 9844015447</div></div>
    </div>
    <div style="padding:6px 10px;">
      <div style="text-align:center;font-size:8pt;font-weight:700;color:#15803D;margin-bottom:4px;">✅ PAYMENT RECEIVED</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1px 10px;font-size:6.5pt;margin-bottom:5px;">
        <span style="color:#666;">Student:</span><strong>${s.name}</strong>
        <span style="color:#666;">Sno:</span><strong>${s.sno||'—'}</strong>
        <span style="color:#666;">Class:</span><strong>${b.class||'—'}</strong>
        <span style="color:#666;">Term:</span><strong>${b.term||'—'}</strong>
        <span style="color:#666;">Mode:</span><strong>${b.payMode||'Cash'}</strong>
        <span style="color:#666;">Date:</span><strong>${todayStr}</strong>
      </div>
      <div style="background:#F0FFF4;border:1px solid #86efac;border-radius:3px;padding:4px;text-align:center;margin-bottom:5px;">
        <div style="font-size:10pt;font-weight:700;color:#15803D;">Rs.${(b.paid||0).toLocaleString()}</div>
        <div style="font-size:5.5pt;color:#14532d;">Amount Paid</div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:5px;">
        <div style="font-size:5.5pt;text-align:center;">
          <img src="${SIG_ACCOUNTANT}" style="height:13px;object-fit:contain;display:block;margin:0 auto 1px;">
          <div style="border-top:.4pt solid #555;padding-top:1px;">Accountant</div>
        </div>
        <div style="font-size:5.5pt;text-align:center;">
          <img src="${SIG_PRINCIPAL}" style="height:13px;object-fit:contain;display:block;margin:0 auto 1px;">
          <div style="border-top:.4pt solid #555;padding-top:1px;">Principal — Mr. Bineet Jha</div>
        </div>
      </div>
    </div>
  </div>`;
}

// Hook into showAdmin to add multi-print buttons
const __origShowAdmin = window.showAdmin;
window.showAdmin = function(panel) {
  if (__origShowAdmin) __origShowAdmin(panel);
  if (panel === 'billing' || panel === 'grades') {
    setTimeout(addMultiPrintButtons, 400);
  }
  if (panel === 'settings') {
    injectPwResetToSettings();
    setTimeout(injectPwResetToSettings, 300);
    setTimeout(injectPwResetToSettings, 700);
  }
};

// ─── EXAM NOTICE WITH SCHEDULE ───────────────────────────────────────────────
window.printNotice = function(id) {
  const n = DB.notices.find(x => x.id === id);
  if (!n) return;
  let scheduleHTML = '';
  if (n.type === 'Exam') {
    const exams = DB.exams.slice().sort((a,b) => (a.date||'').localeCompare(b.date||''));
    if (exams.length) {
      scheduleHTML = '<div style="margin-top:10px;border-top:.5pt solid #ddd;padding-top:8px;">'
        + '<div style="font-size:7.5pt;font-weight:700;color:#1A2B5F;margin-bottom:5px;text-transform:uppercase;">Exam Schedule</div>'
        + '<table style="width:100%;border-collapse:collapse;font-size:7pt;">'
        + '<thead><tr style="background:#1A2B5F;color:#fff;">'
        + '<th style="padding:3px 5px;text-align:left;">Date</th><th style="padding:3px 5px;text-align:left;">Subject</th>'
        + '<th style="padding:3px 5px;text-align:center;">Class</th><th style="padding:3px 5px;text-align:center;">Time</th>'
        + '<th style="padding:3px 5px;text-align:center;">F.M.</th></tr></thead><tbody>'
        + exams.map((e,i) => '<tr style="background:' + (i%2===0?'#f8faff':'#fff') + ';">'
          + '<td style="padding:3px 5px;border:.3pt solid #ddd;">' + (e.date||'\u2014') + '</td>'
          + '<td style="padding:3px 5px;border:.3pt solid #ddd;font-weight:600;">' + (e.subject||'\u2014') + '</td>'
          + '<td style="padding:3px 5px;border:.3pt solid #ddd;text-align:center;">' + (e.class||'All') + '</td>'
          + '<td style="padding:3px 5px;border:.3pt solid #ddd;text-align:center;">' + (e.start||'\u2014') + ' \u2013 ' + (e.end||'') + '</td>'
          + '<td style="padding:3px 5px;border:.3pt solid #ddd;text-align:center;">' + (e.full||100) + '</td></tr>'
        ).join('')
        + '</tbody></table></div>';
    }
  }
  doPrint('<div style="width:165mm;margin:0 auto;background:#fff;border:1.5px solid #1A2B5F;overflow:hidden;font-family:Arial,sans-serif;">'
    + '<div style="background:linear-gradient(135deg,#1A2B5F,#263570);padding:9px 12px;display:flex;gap:9px;align-items:center;">'
    + '<img src="' + LOGO_B64 + '" style="width:40px;height:40px;border-radius:50%;border:2px solid #B8832A;object-fit:cover;">'
    + '<div><div style="color:#fff;font-family:Georgia,serif;font-size:8.5pt;font-weight:700;">NEPAL PUBLIC SECONDARY BOARDING SCHOOL</div>'
    + '<div style="color:rgba(255,255,255,.5);font-size:5.5pt;">Samsi-5, Mahottari | Ph: 9801671781 | eSewa: 9844015447</div></div></div>'
    + '<div style="height:2px;background:linear-gradient(90deg,#B8832A,#E8B84B,#B8832A);"></div>'
    + '<div style="background:linear-gradient(135deg,#8B1A1A,#c0392b);padding:5px;text-align:center;font-size:8pt;font-weight:700;color:#fff;text-transform:uppercase;letter-spacing:1.5px;">NOTICE \u2013 ' + n.type.toUpperCase() + '</div>'
    + '<div style="padding:12px 14px;">'
    + '<div style="font-size:10pt;font-weight:700;color:#1A2B5F;margin-bottom:6px;font-family:Georgia,serif;">' + n.title + '</div>'
    + '<div style="font-size:8.5pt;line-height:1.8;color:#374151;">' + n.content + '</div>'
    + scheduleHTML
    + '<div style="margin-top:10px;font-size:6.5pt;color:#6B7280;border-top:.5pt solid #ddd;padding-top:6px;display:flex;justify-content:space-between;">'
    + '<span>Date: ' + n.date + '</span><span>Nepal Public Secondary Boarding School</span></div>'
    + '<div style="margin-top:16px;display:grid;grid-template-columns:1fr 1fr;gap:10px;">'
    + '<div style="font-size:6pt;text-align:center;"><img src="' + SIG_PRINCIPAL + '" style="height:16px;object-fit:contain;display:block;margin:0 auto 1px;"><div style="border-top:.4pt solid #555;padding-top:2px;">Principal \u2014 Mr. Bineet Jha</div></div>'
    + '<div style="font-size:6pt;text-align:center;"><div style="height:16px;"></div><div style="border-top:.4pt solid #555;padding-top:2px;">School Stamp</div></div>'
    + '</div></div></div>');
};

// ─── CHECKBOX MULTI-SELECT FOR BILLS AND GRADES ───────────────────────────────
const _rbOrigCb = window.renderBills;
window.renderBills = function() {
  if (_rbOrigCb) _rbOrigCb();
  const tb = document.getElementById('billingTbody');
  if (!tb) return;
  const thead = tb.closest('table') && tb.closest('table').querySelector('thead tr');
  if (thead && !thead.querySelector('th.cb-col')) {
    const th = document.createElement('th');
    th.className = 'cb-col';
    th.style.cssText = 'width:30px;text-align:center;';
    th.innerHTML = '<input type="checkbox" id="billSelectAll" onchange="document.querySelectorAll(\'.billCb\').forEach(c=>c.checked=this.checked)" title="Select All">';
    thead.insertBefore(th, thead.firstChild);
  }
  tb.querySelectorAll('tr').forEach(tr => {
    if (tr.querySelector('td.cb-td')) return;
    const btn = tr.querySelector('button[onclick*="openPayModal"]') || tr.querySelector('button[onclick*="payBill"]');
    if (!btn) return;
    const m = (btn.getAttribute('onclick')||'').match(/'([^']+)'/);
    if (!m) return;
    const td = document.createElement('td');
    td.className = 'cb-td';
    td.style.cssText = 'text-align:center;';
    td.innerHTML = '<input type="checkbox" class="billCb" value="' + m[1] + '">';
    tr.insertBefore(td, tr.firstChild);
  });
  const panel = document.getElementById('ap-billing');
  if (panel && !document.getElementById('billPrintBar')) {
    const bar = document.createElement('div');
    bar.id = 'billPrintBar';
    bar.style.cssText = 'display:flex;gap:8px;flex-wrap:wrap;margin-top:10px;padding:8px;background:#F0F4FF;border-radius:8px;align-items:center;';
    bar.innerHTML = '<span style="font-size:.8rem;font-weight:600;color:#555;">Selected:</span>'
      + '<button class="btn btn-primary btn-sm" onclick="printSelectedBills()">Print Bills</button>'
      + '<button class="btn btn-success btn-sm" onclick="printSelectedReceipts()">Print Receipts</button>'
      + '<button class="btn btn-warning btn-sm" onclick="printSelected2perA4()">2 Bills per A4</button>';
    const dtw = panel.querySelector('.dtw');
    if (dtw) dtw.after(bar); else panel.appendChild(bar);
  }
};

const _rgOrigCb = window.renderGrades;
window.renderGrades = function() {
  if (_rgOrigCb) _rgOrigCb();
  const tb = document.getElementById('gradesTbody');
  if (!tb) return;
  const thead = tb.closest('table') && tb.closest('table').querySelector('thead tr');
  if (thead && !thead.querySelector('th.gcb-col')) {
    const th = document.createElement('th');
    th.className = 'gcb-col';
    th.style.cssText = 'width:30px;text-align:center;';
    th.innerHTML = '<input type="checkbox" id="gradeSelectAll" onchange="document.querySelectorAll(\'.gradeCb\').forEach(c=>c.checked=this.checked)" title="Select All">';
    thead.insertBefore(th, thead.firstChild);
  }
  tb.querySelectorAll('tr').forEach(tr => {
    if (tr.querySelector('td.gcb-td')) return;
    const btn = tr.querySelector('button[onclick*="printGradeSheet"]');
    if (!btn) return;
    const m = (btn.getAttribute('onclick')||'').match(/'([^']+)'/);
    if (!m) return;
    const td = document.createElement('td');
    td.className = 'gcb-td';
    td.style.cssText = 'text-align:center;';
    td.innerHTML = '<input type="checkbox" class="gradeCb" value="' + m[1] + '">';
    tr.insertBefore(td, tr.firstChild);
  });
  const panel = document.getElementById('ap-grades');
  if (panel && !document.getElementById('gradePrintBar')) {
    const bar = document.createElement('div');
    bar.id = 'gradePrintBar';
    bar.style.cssText = 'display:flex;gap:8px;flex-wrap:wrap;margin-top:10px;padding:8px;background:#F0F4FF;border-radius:8px;align-items:center;';
    bar.innerHTML = '<span style="font-size:.8rem;font-weight:600;color:#555;">Selected:</span>'
      + '<button class="btn btn-primary btn-sm" onclick="printSelectedGrades(1)">Style 1</button>'
      + '<button class="btn btn-info btn-sm" onclick="printSelectedGrades(2)">Style 2</button>';
    const dtw = panel.querySelector('.dtw');
    if (dtw) dtw.after(bar); else panel.appendChild(bar);
  }
};

const _cut = '<div style="border-top:1.5px dashed #aaa;margin:2mm 0;text-align:center;position:relative;"><span style="position:absolute;top:-6px;left:50%;transform:translateX(-50%);background:#fff;padding:0 6px;font-size:4.5pt;color:#aaa;">Cut here</span></div>';

window.printSelectedBills = function() {
  const ids = [...document.querySelectorAll('.billCb:checked')].map(c=>c.value);
  if (!ids.length) { toast('Select bills first.','error'); return; }
  doPrint('<div>' + ids.map(id => { const b=DB.bills.find(x=>x.id===id); const s=DB.students.find(x=>x.id===b.studentId)||{name:b.studentName,sno:b.sno,class:b.class}; return b?buildBillHTML(s,b):''; }).filter(Boolean).join(_cut) + '</div>');
};

window.printSelectedReceipts = function() {
  const ids = [...document.querySelectorAll('.billCb:checked')].map(c=>c.value).filter(id => DB.bills.find(x=>x.id===id)?.status==='Paid');
  if (!ids.length) { toast('Select paid bills first.','error'); return; }
  const slips = [];
  for (let i=0;i<ids.length;i+=3) {
    slips.push(ids.slice(i,i+3).map(id => { const b=DB.bills.find(x=>x.id===id); return b?buildReceiptHTML(b):''; }).filter(Boolean).join(_cut));
  }
  doPrint('<div>' + slips.join('<div style="page-break-after:always;"></div>') + '</div>');
};

window.printSelected2perA4 = function() {
  const ids = [...document.querySelectorAll('.billCb:checked')].map(c=>c.value);
  if (!ids.length) { toast('Select bills first.','error'); return; }
  const pages = [];
  for (let i=0;i<ids.length;i+=2) {
    const b1=DB.bills.find(x=>x.id===ids[i]); const s1=DB.students.find(x=>x.id===b1?.studentId)||{name:b1?.studentName,sno:b1?.sno,class:b1?.class};
    let pg = b1?buildBillHTML(s1,b1):'';
    if (ids[i+1]) { const b2=DB.bills.find(x=>x.id===ids[i+1]); const s2=DB.students.find(x=>x.id===b2?.studentId)||{name:b2?.studentName,sno:b2?.sno,class:b2?.class}; if (b2) pg += _cut + buildBillHTML(s2,b2); }
    pages.push(pg);
  }
  doPrint('<div>' + pages.join('<div style="page-break-after:always;"></div>') + '</div>');
};

window.printSelectedGrades = function(style) {
  const ids = [...document.querySelectorAll('.gradeCb:checked')].map(c=>c.value);
  if (!ids.length) { toast('Select grade sheets first.','error'); return; }
  const fn = style===1 ? buildGradeSheetHTML1 : buildGradeSheetHTML2;
  const pages = [];
  for (let i=0;i<ids.length;i+=2) {
    const g1=DB.grades.find(x=>x.id===ids[i]);
    let pg = g1?fn(g1):'';
    if (ids[i+1]) { const g2=DB.grades.find(x=>x.id===ids[i+1]); if (g2) pg += _cut + fn(g2); }
    pages.push(pg);
  }
  doPrint('<div>' + pages.join('<div style="page-break-after:always;"></div>') + '</div>');
};
