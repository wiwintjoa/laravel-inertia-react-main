import React, { useState } from "react";
import { Head, usePage } from "@inertiajs/react";
import Layout from "@/Layouts/layout/layout.jsx";
import SearchForm from "./Partials/SearchForm";
import CreateForm from "./Partials/CreateForm";
import EditForm from "./Partials/EditForm";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Index() {
    const { props } = usePage();
    const prefectures = props.prefectures || [];

    const [showCreate, setShowCreate] = useState(false);
    const [scrollToForm, setScrollToForm] = useState(false);
    const [editCompany, setEditCompany] = useState(null);

    const handleCreateClick = () => {
        setEditCompany(null); // clear edit state
        setShowCreate(true);
        setScrollToForm(true);
    };

    const handleEditClick = (company) => {
        setShowCreate(false);
        setScrollToForm(true);
        setEditCompany(company); // set company to edit
    };

    const resetScrollToForm = () => {
        setScrollToForm(false); // This is passed to child to reset the flag
    };

    const handleCloseForm = () => {
        setShowCreate(false);
        setScrollToForm(false);
        setEditCompany(null);
    };

    return (
        <Layout>
            <Head title="Company" />

            <div className="grid">
                <div className="col-12">
                    <div className="card">
                        <SearchForm handleEditClick={handleEditClick} />

                        <div className="mt-5 mb-4 text-left">
                            {
                                !editCompany && (<PrimaryButton
                                label="Create Company"
                                icon="pi pi-plus"
                                severity="success"
                                onClick={handleCreateClick}
                            />)
                            }
                            
                        </div>

                        {(showCreate && !editCompany) && (
                            <CreateForm
                                onClose={handleCloseForm}
                                scrollToForm={scrollToForm}
                                resetScrollToForm={resetScrollToForm}
                                prefectures={prefectures}
                            />
                        )}

                        {editCompany && (
                            <EditForm
                                company={editCompany}
                                onClose={handleCloseForm}
                                scrollToForm={scrollToForm}
                                resetScrollToForm={resetScrollToForm}
                                prefectures={prefectures}
                            />
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
