const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    name: String,
    designation: String,
    phone: String,
    email: String,
});

const membershipApplicationSchema = new mongoose.Schema(
    {
        membership_type: {
            type: String,
            enum: ["Primary Membership", "Associate Membership"],
            required: true,
        },
        name_of_incubator: { type: String, required: true },
        website_link: { type: String, required: true },
        phone: { type: String, required: true },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            index: true,
        },
        promoting_organization: String,
        year_of_starting: Number,
        legal_status: {
            type: String,
            enum: ["Society", "Trust", "Section 8 Co", "Pvt. Ltd", "Pub Ltd", "Others"],
        },
        establishment_supported_by: String,
        nominee_letter: String,
        certificate_of_registration: String,

        street_line_1: String,
        street_line_2: String,
        landmark: String,
        city: String,
        state: String,
        postal_code: String,

        contacts: [contactSchema],

        total_area: Number,
        working_area: Number,
        common_area: Number,
        incubation_period: Number,
        will_renew_contract: { type: Boolean, default: false },
        startup_supported: String,

        dedicated_internet: { type: Boolean, default: false },
        dedicated_software: { type: Boolean, default: false },
        laboratories: { type: Boolean, default: false },
        technical_experts_inhouse: { type: Boolean, default: false },
        technical_experts_external: { type: Boolean, default: false },

        one_to_one_mentoring: {
            type: String,
            enum: ["Yes", "No", "Partial"],
        },
        common_mentoring_sessions: {
            type: String,
            enum: ["Yes", "No", "Partial"],
        },
        list_of_mentors_accessible: {
            type: String,
            enum: ["Yes", "No", "Partial"],
        },
        mentors_on_retainership: {
            type: String,
            enum: ["Yes", "No", "Partial"],
        },
        training_workshops: {
            type: String,
            enum: ["Yes", "No", "Partial"],
        },

        access_to_investors: {
            type: String,
            enum: ["Yes", "No", "Partial"],
        },
        invest_in_startups: {
            type: String,
            enum: ["Yes", "No", "Partial"],
        },
        seed_fund_support: {
            type: String,
            enum: ["Yes", "No", "Partial"],
        },
        corporate_tie_up: {
            type: String,
            enum: ["Yes", "No", "Partial"],
        },
        loan_assistance: {
            type: String,
            enum: ["Yes", "No", "Partial"],
        },

        is_member_of_isba: { type: Boolean, default: false },
    },
    { timestamps: { createdAt: "submitted_at" } }
);

module.exports = mongoose.model("MembershipApplication", membershipApplicationSchema);
