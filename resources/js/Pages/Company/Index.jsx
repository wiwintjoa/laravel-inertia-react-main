/** 
 *This is company main page 
 *Create by Wiwin
 *On: 07-Jul-2025 
*/

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
    const [loadingForm, setLoadingForm] = useState(false);

    const handleCreateClick = () => {
        setEditCompany(null); // clear edit state
        setLoadingForm(true);

        setTimeout(() => {
            setShowCreate(true);
            setLoadingForm(false);
            setScrollToForm(true);
        }, 300); 
    };

    const handleEditClick = (company) => {
        setShowCreate(false); // make sure create form is closed
        setEditCompany(null); // close EditForm first
        setLoadingForm(true);
        setScrollToForm(true);
        
        // Wait to unmount EditForm before opening with new company
        setTimeout(() => {
            setEditCompany({ ...company }); // force fresh object for reactivity
            setLoadingForm(false);
        }, 300);
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

                         {loadingForm && (
                            <div className="flex justify-content-center my-4">
                                <i className="pi pi-spin pi-spinner text-4xl text-primary"></i>
                            </div>
                        )}

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
