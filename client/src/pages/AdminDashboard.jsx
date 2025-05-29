import React, { useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [forms, setForms] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [expandedRows, setExpandedRows] = useState({});
    const navigate = useNavigate();

    const bossEmail = "shivamsrivastava126@gmail.com";

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser || currentUser.email !== bossEmail) {
                navigate("/login");
            } else {
                setUser(currentUser);
            }
        });

        return () => unsub();
    }, []);

    useEffect(() => {
        if (user) {
            fetch("http://localhost:5000/api/admin/users")
                .then((res) => res.json())
                .then((data) => setUsers(data));

            fetch("http://localhost:5000/api/forms/all")
                .then((res) => res.json())
                .then((data) => setForms(data));
        }
    }, [user]);

    if (!user) return null;

    // Metrics logic
    const totalSubmissions = forms.length;
    const thisMonth = forms.filter((f) => {
        const d = new Date(f.submitted_at);
        const now = new Date();
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).length;
    const uniqueEmails = new Set(forms.map((f) => f.email)).size;
    const renderExpandedDetails = (f) => {
        return (
            <div className="details-container">
                <div className="detail-section">
                    <h4>📘 Incubator Info</h4>
                    <p><strong>Name:</strong> {f.name_of_incubator}</p>
                    <p><strong>Email:</strong> {f.email}</p>
                    <p><strong>Phone:</strong> {f.phone}</p>
                    <p><strong>Website:</strong> {f.website_link}</p>
                    <p><strong>Promoting Organization:</strong> {f.promoting_organization}</p>
                    <p><strong>Year Started:</strong> {f.year_of_starting}</p>
                    <p><strong>Legal Status:</strong> {f.legal_status}</p>
                </div>

                <div className="detail-section">
                    <h4>📍 Address</h4>
                    <p>{f.street_line_1}</p>
                    <p>{f.street_line_2}</p>
                    <p>{f.landmark}</p>
                    <p>{f.city}, {f.state} - {f.postal_code}</p>
                </div>

                <div className="detail-section">
                    <h4>📞 Contacts</h4>
                    {f.contacts?.map((c, i) => (
                        <div key={i}>
                            <p><strong>{c.name}</strong> — {c.designation} | {c.phone} | {c.email}</p>
                        </div>
                    ))}
                </div>

                <div className="detail-section">
                    <h4>🏢 Infrastructure</h4>
                    <p><strong>Total Area:</strong> {f.total_area} sq.ft</p>
                    <p><strong>Working Area:</strong> {f.working_area} sq.ft</p>
                    <p><strong>Common Area:</strong> {f.common_area} sq.ft</p>
                    <p><strong>Incubation Period:</strong> {f.incubation_period} months</p>
                    <p><strong>Renew Contract:</strong> {f.will_renew_contract ? "Yes" : "No"}</p>
                    <p><strong>Startups Supported:</strong> {f.startup_supported}</p>
                </div>

                <div className="detail-section">
                    <h4>🛠 Technical Support</h4>
                    <ul>
                        <li>Dedicated Internet: {f.dedicated_internet ? "Yes" : "No"}</li>
                        <li>Dedicated Software: {f.dedicated_software ? "Yes" : "No"}</li>
                        <li>Laboratories: {f.laboratories ? "Yes" : "No"}</li>
                        <li>Technical Experts (In-house): {f.technical_experts_inhouse ? "Yes" : "No"}</li>
                        <li>Technical Experts (External): {f.technical_experts_external ? "Yes" : "No"}</li>
                    </ul>
                </div>

                <div className="detail-section">
                    <h4>🎓 Mentoring & Funding</h4>
                    <ul>
                        <li>One-to-One Mentoring: {f.one_to_one_mentoring}</li>
                        <li>Common Mentoring Sessions: {f.common_mentoring_sessions}</li>
                        <li>Mentors List Access: {f.list_of_mentors_accessible}</li>
                        <li>Mentors on Retainership: {f.mentors_on_retainership}</li>
                        <li>Training/Workshops: {f.training_workshops}</li>
                        <li>Access to Investors: {f.access_to_investors}</li>
                        <li>Invest in Startups: {f.invest_in_startups}</li>
                        <li>Seed Fund Support: {f.seed_fund_support}</li>
                        <li>Corporate Tie-Up: {f.corporate_tie_up}</li>
                        <li>Loan Assistance: {f.loan_assistance}</li>
                    </ul>
                </div>

                <div className="detail-section">
                    <h4>📄 ISBA & Documents</h4>
                    <p>ISBA Member Before: {f.is_member_of_isba ? "Yes" : "No"}</p>
                    <p>Nominee Letter:
                        {f.nominee_letter ? (
                            <a href={f.nominee_letter} target="_blank" rel="noreferrer">View</a>
                        ) : (
                            "N/A"
                        )}
                    </p>

                    <p>Certificate of Registration:
                        {f.certificate_of_registration ? (
                            <a href={f.certificate_of_registration} target="_blank" rel="noreferrer">View</a>
                        ) : (
                            "N/A"
                        )}
                    </p>

                </div>
            </div>
        );
    };

    const exportToCSV = () => {
        if (!forms.length) return;

        const headers = [
            "Incubator",
            "Email",
            "Phone",
            "City",
            "State",
            "Membership",
            "Submitted At"
        ];

        const rows = forms.map((f) => [
            f.name_of_incubator,
            f.email,
            f.phone,
            f.city,
            f.state,
            f.membership_type,
            new Date(f.submitted_at).toLocaleString()
        ]);

        const csvContent =
            "data:text/csv;charset=utf-8," +
            [headers, ...rows].map((e) => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "membership_submissions.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };


    return (
        <div className="admin-dashboard">
            <h1>🛡️ Admin Control Panel</h1>

            <div className="metrics-grid">
                <div className="metric-card">
                    <h3>{totalSubmissions}</h3>
                    <p>Total Applications</p>
                </div>
                <div className="metric-card">
                    <h3>{thisMonth}</h3>
                    <p>This Month</p>
                </div>
                <div className="metric-card">
                    <h3>{uniqueEmails}</h3>
                    <p>Unique Applicants</p>
                </div>
            </div>

            <section className="admin-section">
                <h2>👥 Registered Users</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Name</th>
                            <th>UID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u) => (
                            <tr key={u.uid}>
                                <td>{u.email}</td>
                                <td>{u.name}</td>
                                <td>{u.uid}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
            {/* Membership Applications */}
            <section className="admin-section">
                <h2>📝 Membership Submissions</h2>

                <button className="download-btn" onClick={exportToCSV}>
                    📥 Download CSV
                </button>


                <input
                    type="text"
                    className="search-input"
                    placeholder="Search by incubator or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <table>
                    <thead>
                        <tr>
                            <th>Incubator</th>
                            <th>Email</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Membership</th>
                            <th>Nominee Letter</th>
                            <th>Certificate</th>
                            <th>Submitted At</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {forms
                            .filter(f =>
                                f.name_of_incubator?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                f.email?.toLowerCase().includes(searchTerm.toLowerCase())
                            )
                            .map((f, i) => (
                                <React.Fragment key={i}>
                                    <tr>
                                        <td>{f.name_of_incubator}</td>
                                        <td>{f.email}</td>
                                        <td>{f.city}</td>
                                        <td>{f.state}</td>
                                        <td>{f.membership_type}</td>
                                        <td>
                                            {f.nominee_letter ? (
                                                <a href={f.nominee_letter} target="_blank" rel="noopener noreferrer">View</a>
                                            ) : "N/A"}
                                        </td>
                                        <td>
                                            {f.certificate_of_registration ? (
                                                <a href={f.certificate_of_registration} target="_blank" rel="noopener noreferrer">View</a>
                                            ) : "N/A"}
                                        </td>
                                        <td>{f.submitted_at ? new Date(f.submitted_at).toLocaleString() : "N/A"}</td>
                                        <td>
                                            <button onClick={() =>
                                                setExpandedRows(prev => ({
                                                    ...prev,
                                                    [f._id]: !prev[f._id]
                                                }))
                                            }>
                                                {expandedRows[f._id] ? "Hide" : "View All"}
                                            </button>
                                        </td>
                                    </tr>

                                    {expandedRows[f._id] && (
                                        <tr>
                                            <td colSpan="9" className="expanded-cell">
                                                {renderExpandedDetails(f)}
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>

                            ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default AdminDashboard;
