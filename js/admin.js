const ADMIN_STORAGE_KEYS = {
    users: 'fixmyarea_users_mock',
    reports: 'fixmyarea_reports'
};

const STATUS_OPTIONS = ['Reported', 'In Progress', 'Under Review', 'Resolved', 'Archived'];
let dashboardState = {
    reports: [],
    users: { users: [] }
};

function getMockUsers() {
    try {
        const cached = localStorage.getItem(ADMIN_STORAGE_KEYS.users);
        if (cached) {
            const parsed = JSON.parse(cached);
            if (parsed && Array.isArray(parsed.users)) {
                return parsed;
            }
        }
    } catch (error) {
        console.warn('Unable to load cached users data.', error);
    }

    return fetch('./data/users.json', { cache: 'no-store' })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Unable to load data/users.json');
            }
            return response.json();
        })
        .then((data) => {
            localStorage.setItem(ADMIN_STORAGE_KEYS.users, JSON.stringify(data));
            return data;
        });
}

function getMockReports() {
    try {
        const cached = localStorage.getItem(ADMIN_STORAGE_KEYS.reports);
        if (cached) {
            const parsed = JSON.parse(cached);
            if (Array.isArray(parsed)) {
                return Promise.resolve(parsed);
            }
        }
    } catch (error) {
        console.warn('Unable to load cached reports data.', error);
    }

    return fetch('./data/reports.json', { cache: 'no-store' })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Unable to load data/reports.json');
            }
            return response.json();
        })
        .then((data) => {
            localStorage.setItem(ADMIN_STORAGE_KEYS.reports, JSON.stringify(data));
            return data;
        });
}

function persistReports(reports) {
    localStorage.setItem(ADMIN_STORAGE_KEYS.reports, JSON.stringify(reports));
    dashboardState.reports = reports;
}

function renderArchivedReports(reports) {
    const list = document.getElementById('admin-archived-list');
    const count = document.getElementById('archived-count');
    if (!list) return;

    const archivedReports = (Array.isArray(reports) ? reports : []).filter((report) => report.status === 'Archived');

    if (count) {
        count.textContent = String(archivedReports.length);
    }

    if (archivedReports.length === 0) {
        list.innerHTML = '<div class="rounded-xl border border-dashed border-slate-300 p-4 text-sm text-slate-500 dark:border-slate-600 dark:text-slate-400">No archived reports.</div>';
        return;
    }

    list.innerHTML = archivedReports.map((report) => `
        <div class="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-900/50">
            <div class="flex items-start justify-between gap-3">
                <div>
                    <p class="font-semibold text-slate-800 dark:text-slate-100">${report.title || 'Untitled issue'}</p>
                    <p class="text-xs text-slate-500 dark:text-slate-400">${report.location || 'Unknown location'}</p>
                </div>
                <button type="button" data-restore-id="${report.id}" class="restore-button rounded-lg bg-emerald-500 px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-emerald-600">Restore</button>
            </div>
        </div>
    `).join('');

    list.querySelectorAll('.restore-button').forEach((button) => {
        button.addEventListener('click', (event) => {
            const reportId = event.currentTarget.getAttribute('data-restore-id');
            if (!reportId) return;

            const updatedReports = dashboardState.reports.map((report) => {
                if (report.id === reportId) {
                    return { ...report, status: 'Reported' };
                }
                return report;
            });

            persistReports(updatedReports);
            renderStats(updatedReports, dashboardState.users);
            renderReports(updatedReports);
            renderArchivedReports(updatedReports);
        });
    });
}

function renderReports(reports) {
    const list = document.getElementById('admin-reports-list');
    if (!list) return;

    const activeReports = (Array.isArray(reports) ? reports : []).filter((report) => report.status !== 'Archived');

    if (activeReports.length === 0) {
        list.innerHTML = '<div class="rounded-xl border border-dashed border-slate-300 p-4 text-sm text-slate-500 dark:border-slate-600 dark:text-slate-400">No active reports available.</div>';
        return;
    }

    list.innerHTML = activeReports.slice(0, 6).map((report) => {
        return `
            <div class="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/50">
                <div class="flex items-start justify-between gap-3">
                    <div>
                        <h3 class="text-lg font-bold text-slate-900 dark:text-white">${report.title || 'Untitled issue'}</h3>
                        <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">${report.location || 'Unknown location'} · ${report.date || 'Unknown date'}</p>
                    </div>
                    <span class="rounded-full px-2 py-1 text-xs font-semibold ${report.status === 'Resolved' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300' : report.status === 'In Progress' ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300' : report.status === 'Under Review' ? 'bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300' : 'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300'}">${report.status || 'Reported'}</span>
                </div>
                <p class="mt-3 text-sm text-slate-600 dark:text-slate-300">${report.description || 'No description.'}</p>
                <div class="mt-4 flex items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
                    <span>${report.category || 'Uncategorized'}</span>
                    <span>${report.city || 'Unknown city'}</span>
                </div>
                <div class="mt-4">
                    <label for="status-${report.id}" class="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Progress</label>
                    <select id="status-${report.id}" data-report-id="${report.id}" class="admin-progress-select w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:border-teal-500 focus:outline-none dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200">
                        ${STATUS_OPTIONS.filter((status) => status !== 'Archived').map((status) => `<option value="${status}" ${report.status === status ? 'selected' : ''}>${status}</option>`).join('')}
                    </select>
                </div>
                <div class="mt-4 flex justify-end">
                    <button type="button" data-archive-id="${report.id}" class="archive-toggle-button rounded-lg bg-slate-800 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600">
                        Archive
                    </button>
                </div>
            </div>
        `;
    }).join('');

    list.querySelectorAll('.admin-progress-select').forEach((select) => {
        select.addEventListener('change', (event) => {
            const target = event.target;
            const reportId = target.getAttribute('data-report-id');
            const nextStatus = target.value;

            if (!reportId || !nextStatus) {
                return;
            }

            const updatedReports = dashboardState.reports.map((report) => {
                if (report.id === reportId) {
                    return { ...report, status: nextStatus };
                }
                return report;
            });

            persistReports(updatedReports);
            renderStats(updatedReports, dashboardState.users);
            renderReports(updatedReports);
            renderArchivedReports(updatedReports);
        });
    });

    list.querySelectorAll('.archive-toggle-button').forEach((button) => {
        button.addEventListener('click', (event) => {
            const reportId = event.currentTarget.getAttribute('data-archive-id');
            if (!reportId) return;

            const updatedReports = dashboardState.reports.map((report) => {
                if (report.id === reportId) {
                    return { ...report, status: 'Archived' };
                }
                return report;
            });

            persistReports(updatedReports);
            renderStats(updatedReports, dashboardState.users);
            renderReports(updatedReports);
            renderArchivedReports(updatedReports);
        });
    });
}

function renderUsers(users) {
    const list = document.getElementById('admin-users-list');
    if (!list) return;

    const userList = Array.isArray(users) ? users : [];
    if (userList.length === 0) {
        list.innerHTML = '<div class="rounded-xl border border-dashed border-slate-300 p-4 text-sm text-slate-500 dark:border-slate-600 dark:text-slate-400">No users available.</div>';
        return;
    }

    list.innerHTML = userList.slice(0, 6).map((user) => `
        <div class="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-900/50">
            <div>
                <p class="font-semibold text-slate-900 dark:text-white">${user.fullName || 'User'}</p>
                <p class="text-sm text-slate-500 dark:text-slate-400">${user.email || 'No email'}</p>
            </div>
            <span class="rounded-full bg-sky-100 px-2 py-1 text-xs font-semibold text-sky-700 dark:bg-sky-500/15 dark:text-sky-300">${user.role || 'user'}</span>
        </div>
    `).join('');
}

function renderStats(reports, users) {
    const totalReports = document.getElementById('total-reports');
    const inProgress = document.getElementById('in-progress-reports');
    const resolved = document.getElementById('resolved-reports');
    const totalUsers = document.getElementById('total-users');

    const activeReports = reports.filter((item) => item.status !== 'Archived');

    if (totalReports) totalReports.textContent = String(activeReports.length || 0);
    if (inProgress) inProgress.textContent = String(activeReports.filter((item) => item.status === 'In Progress').length || 0);
    if (resolved) resolved.textContent = String(activeReports.filter((item) => item.status === 'Resolved').length || 0);
    if (totalUsers) totalUsers.textContent = String((users.users || []).length || 0);
}

function renderDashboard() {
    renderStats(dashboardState.reports, dashboardState.users);
    renderReports(dashboardState.reports);
    renderArchivedReports(dashboardState.reports);
    renderUsers((dashboardState.users && Array.isArray(dashboardState.users.users)) ? dashboardState.users.users : []);
}

async function initAdminDashboard() {
    const adminLogout = document.getElementById('admin-logout-button');
    if (adminLogout) {
        adminLogout.addEventListener('click', () => {
            localStorage.removeItem('fixmyarea_session');
            window.location.href = 'components/login.html';
        });
    }

    try {
        const [userData, reportData] = await Promise.all([
            getMockUsers(),
            getMockReports()
        ]);

        dashboardState.users = userData || { users: [] };
        dashboardState.reports = reportData || [];
        renderDashboard();
    } catch (error) {
        const list = document.getElementById('admin-reports-list');
        if (list) {
            list.innerHTML = `<div class="rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-200">${error.message || 'Unable to load dashboard data.'}</div>`;
        }
    }
}

document.addEventListener('DOMContentLoaded', initAdminDashboard);
