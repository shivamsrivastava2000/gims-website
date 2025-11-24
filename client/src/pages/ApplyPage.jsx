// src/pages/ApplyPage.jsx
import React, { useState } from 'react';
import '../styles/ApplyPage.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export default function ApplyPage() {
    const [contacts, setContacts] = useState([{ name: '', designation: '', phone: '', email: '' }]);

    const [formData, setFormData] = useState({
        membership_type: "",
        name_of_incubator: "",
        website_link: "",
        phone: "",
        email: "",
        promoting_organization: "",
        year_of_starting: "",
        legal_status: "",
        establishment_supported_by: "",
        street_line_1: "",
        street_line_2: "",
        landmark: "",
        city: "",
        state: "",
        postal_code: "",
        total_area: "",
        working_area: "",
        common_area: "",
        incubation_period: "",
        will_renew_contract: "",
        startup_supported: "",
        dedicated_internet: "",
        dedicated_software: "",
        laboratories: "",
        technical_experts_inhouse: "",
        technical_experts_external: "",
        one_to_one_mentoring: "",
        common_mentoring_sessions: "",
        list_of_mentors_accessible: "",
        mentors_on_retainership: "",
        training_workshops: "",
        access_to_investors: "",
        invest_in_startups: "",
        seed_fund_support: "",
        corporate_tie_up: "",
        loan_assistance: "",
        is_member_of_isba: "",
    });

    const [nomineeLetter, setNomineeLetter] = useState(null);
    const [registrationCertificate, setRegistrationCertificate] = useState(null);

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleContactChange = (index, field, value) => {
        const updatedContacts = [...contacts];
        updatedContacts[index][field] = value;
        setContacts(updatedContacts);
    };

    const addContact = () => {
        setContacts([...contacts, { name: '', designation: '', phone: '', email: '' }]);
    };

    const removeContact = (index) => {
        const updatedContacts = [...contacts];
        updatedContacts.splice(index, 1);
        setContacts(updatedContacts);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const finalForm = {
            ...formData,
            contacts,
            will_renew_contract: formData.will_renew_contract === "Yes",
            dedicated_internet: formData.dedicated_internet === "Yes",
            dedicated_software: formData.dedicated_software === "Yes",
            laboratories: formData.laboratories === "Yes",
            technical_experts_inhouse: formData.technical_experts_inhouse === "Yes",
            technical_experts_external: formData.technical_experts_external === "Yes",
            is_member_of_isba: formData.is_member_of_isba === "Yes"
        };

        const payload = new FormData();
        payload.append("data", JSON.stringify(finalForm));
        if (nomineeLetter) payload.append("nomineeLetter", nomineeLetter);
        if (registrationCertificate) payload.append("registrationCertificate", registrationCertificate);

        try {
            const res = await fetch("https://gims-website.onrender.com/api/forms/apply", {
                method: "POST",
                body: payload
            });


            const result = await res.json();
            if (res.ok) {
                toast.success("✅ Form submitted successfully!");
                setTimeout(() => {
                    navigate("/thank-you");
                }, 2000);
            } else {
                toast.error(result.error || "❌ Submission failed");
            }
        } catch (err) {
            console.error("❌ Server error:", err);
            toast.error("Server error during submission.");
        }
    };

    return (
        <div className="membership-form">
            <div className="form-inner">
                <form className="form-container" onSubmit={handleSubmit} encType="multipart/form-data">
                    <h1 className="form-title">Apply Membership Form</h1>

                    {/* MEMBERSHIP TYPE */}
                    <div className="form-section">
                        <div className="section-title">MEMBERSHIP TYPE *</div>
                        <div className="radio-group">
                            <label><input type="radio" name="membership_type" value="Primary Membership" onChange={handleInputChange} /> Primary Membership</label>
                            <label><input type="radio" name="membership_type" value="Associate Membership" onChange={handleInputChange} /> Associate Membership</label>
                        </div>
                    </div>

                    {/* INCUBATOR INFORMATION */}
                    <div className="form-section">
                        <div className="section-title">INCUBATOR INFORMATION</div>
                        <div className="input-group"><label>Name of Incubator *</label><input type="text" name="name_of_incubator" value={formData.name_of_incubator} onChange={handleInputChange} required /></div>
                        <div className="input-group"><label>Website Link *</label><input type="url" name="website_link" value={formData.website_link} onChange={handleInputChange} required /></div>
                        <div className="input-group"><label>Phone *</label><input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required /></div>
                        <div className="input-group"><label>Email *</label><input type="email" name="email" value={formData.email} onChange={handleInputChange} required /></div>
                        <div className="input-group"><label>Name of Promoting (host) Organization</label><input type="text" name="promoting_organization" value={formData.promoting_organization} onChange={handleInputChange} /></div>
                        <div className="input-group"><label>Year of Starting the Incubator / Incubation *</label>
                            <select name="year_of_starting" value={formData.year_of_starting} onChange={handleInputChange} required>
                                <option value="">Select</option>
                                {Array.from({ length: 50 }, (_, i) => <option key={i} value={2025 - i}>{2025 - i}</option>)}
                            </select>
                        </div>
                        <div className="input-group">
                            <label>Legal Status of Incubator *</label>
                            <div className="radio-group">
                                {['Society', 'Trust', 'Section 8 Co', 'Pvt. Ltd', 'Pub Ltd', 'Others'].map(type => (
                                    <label key={type}><input type="radio" name="legal_status" value={type} onChange={handleInputChange} required /> {type}</label>
                                ))}
                            </div>
                        </div>
                        <div className="input-group"><label>Establishment supported by *</label><input type="text" name="establishment_supported_by" value={formData.establishment_supported_by} onChange={handleInputChange} required /></div>
                        <div className="input-group"><label>Nominee Letter *</label><input type="file" onChange={(e) => setNomineeLetter(e.target.files[0])} required /></div>
                        <div className="input-group"><label>Certificate of Registration of Incubator</label><input type="file" onChange={(e) => setRegistrationCertificate(e.target.files[0])} /></div>
                    </div>
                    {/* ADDRESS SECTION */}
                    <div className="form-section">
                        <div className="section-title">ADDRESS</div>
                        <div className="input-group"><label>Street Line 1 *</label><input type="text" name="street_line_1" value={formData.street_line_1} onChange={handleInputChange} required /></div>
                        <div className="input-group"><label>Street Line 2</label><input type="text" name="street_line_2" value={formData.street_line_2} onChange={handleInputChange} /></div>
                        <div className="input-group"><label>Landmark</label><input type="text" name="landmark" value={formData.landmark} onChange={handleInputChange} /></div>
                        <div className="input-group"><label>City *</label><input type="text" name="city" value={formData.city} onChange={handleInputChange} required /></div>
                        <div className="input-group"><label>State *</label>
                            <select name="state" value={formData.state} onChange={handleInputChange} required>
                                <option value="">Select State</option>
                                <option value="Uttar Pradesh">Uttar Pradesh</option>
                            </select>
                        </div>
                        <div className="input-group"><label>Postal Code *</label><input type="text" name="postal_code" value={formData.postal_code} onChange={handleInputChange} required /></div>
                    </div>

                    {/* CONTACT SECTION */}
                    <div className="form-section">
                        <div className="section-title">CONTACT</div>
                        <div className="contact-list">
                            {contacts.map((contact, index) => (
                                <div key={index} className="contact-item">
                                    <input type="text" placeholder="Name" value={contact.name} onChange={(e) => handleContactChange(index, 'name', e.target.value)} />
                                    <input type="text" placeholder="Designation" value={contact.designation} onChange={(e) => handleContactChange(index, 'designation', e.target.value)} />
                                    <input type="tel" placeholder="Phone" value={contact.phone} onChange={(e) => handleContactChange(index, 'phone', e.target.value)} />
                                    <input type="email" placeholder="Email" value={contact.email} onChange={(e) => handleContactChange(index, 'email', e.target.value)} />
                                    <button type="button" onClick={() => removeContact(index)}>Remove</button>
                                </div>
                            ))}
                            <button type="button" onClick={addContact}>Add Contact</button>
                        </div>
                    </div>

                    {/* DETAILS OF INCUBATION SUPPORT */}
                    <div className="form-section">
                        <div className="section-title">DETAILS OF INCUBATION SUPPORT</div>
                        <div className="input-group"><label>Total Area available in sq. ft. *</label><input type="number" name="total_area" value={formData.total_area} onChange={handleInputChange} required /></div>
                        <div className="input-group"><label>Dedicated 'working' area for startups *</label><input type="number" name="working_area" value={formData.working_area} onChange={handleInputChange} required /></div>
                        <div className="input-group"><label>Common area (cafeteria, event, etc.) *</label><input type="number" name="common_area" value={formData.common_area} onChange={handleInputChange} required /></div>
                        <div className="input-group"><label>Incubation period (months) *</label><input type="number" name="incubation_period" value={formData.incubation_period} onChange={handleInputChange} required /></div>
                        <div className="input-group">
                            <label>Will you be renewing the Contract? *</label>
                            <div className="radio-group">
                                <label><input type="radio" name="will_renew_contract" value="Yes" onChange={handleInputChange} required /> Yes</label>
                                <label><input type="radio" name="will_renew_contract" value="No" onChange={handleInputChange} /> No</label>
                            </div>
                        </div>
                        <div className="input-group"><label>Startup Supported *</label><input type="text" name="startup_supported" value={formData.startup_supported} onChange={handleInputChange} required /></div>
                    </div>

                    {/* TECHNICAL SUPPORT */}
                    <div className="form-section">
                        <div className="section-title">DETAILS OF TECHNICAL SUPPORT BEING PROVIDED</div>
                        {[
                            { label: "Dedicated Internet facility", name: "dedicated_internet" },
                            { label: "Dedicated Software facility", name: "dedicated_software" },
                            { label: "Laboratories / Equipment [exclusive for Incubator]", name: "laboratories" },
                            { label: "Technical experts (in-house)", name: "technical_experts_inhouse" },
                            { label: "Technical experts (external) - if any formal engagements exist", name: "technical_experts_external" }
                        ].map((item, i) => (
                            <div key={i} className="input-group">
                                <label>{item.label} *</label>
                                <div className="radio-group">
                                    <label><input type="radio" name={item.name} value="Yes" onChange={handleInputChange} required /> Yes</label>
                                    <label><input type="radio" name={item.name} value="No" onChange={handleInputChange} /> No</label>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* MENTORING / KNOWLEDGE SUPPORT */}
                    <div className="form-section">
                        <div className="section-title">MENTORING / KNOWLEDGE SUPPORT</div>
                        {[
                            { label: "Dedicated one to one mentoring of startups (on-site)", name: "one_to_one_mentoring" },
                            { label: "Common mentoring sessions", name: "common_mentoring_sessions" },
                            { label: "Is List of mentors accessible to all startups", name: "list_of_mentors_accessible" },
                            { label: "Mentors on retainership fee / equity model", name: "mentors_on_retainership" },
                            { label: "Training / Workshops on relevant topics", name: "training_workshops" }
                        ].map((item, i) => (
                            <div key={i} className="input-group">
                                <label>{item.label} *</label>
                                <div className="radio-group">
                                    <label><input type="radio" name={item.name} value="Yes" onChange={handleInputChange} required /> Yes</label>
                                    <label><input type="radio" name={item.name} value="No" onChange={handleInputChange} /> No</label>
                                    <label><input type="radio" name={item.name} value="Partial" onChange={handleInputChange} /> Partial</label>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* FUNDING SUPPORT */}
                    <div className="form-section">
                        <div className="section-title">FUNDING SUPPORT</div>
                        {[
                            { label: "Access to Investors", name: "access_to_investors" },
                            { label: "Do invest in startups by themselves", name: "invest_in_startups" },
                            { label: "Any seed fund support", name: "seed_fund_support" },
                            { label: "Any corporate tie up", name: "corporate_tie_up" },
                            { label: "Loan assistance from Banks", name: "loan_assistance" }
                        ].map((item, i) => (
                            <div key={i} className="input-group">
                                <label>{item.label} *</label>
                                <div className="radio-group">
                                    <label><input type="radio" name={item.name} value="Yes" onChange={handleInputChange} required /> Yes</label>
                                    <label><input type="radio" name={item.name} value="No" onChange={handleInputChange} /> No</label>
                                    <label><input type="radio" name={item.name} value="Partial" onChange={handleInputChange} /> Partial</label>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* MEMBER OF ISBA BEFORE */}
                    <div className="form-section">
                        <div className="section-title">MEMBER OF ISBA BEFORE</div>
                        <div className="input-group">
                            <label>Have you been a member of ISBA before *</label>
                            <div className="radio-group">
                                <label><input type="radio" name="is_member_of_isba" value="Yes" onChange={handleInputChange} required /> Yes</label>
                                <label><input type="radio" name="is_member_of_isba" value="No" onChange={handleInputChange} /> No</label>
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="submit-btn">Submit</button>
                </form>
                <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
            </div>
        </div>
    );
}
