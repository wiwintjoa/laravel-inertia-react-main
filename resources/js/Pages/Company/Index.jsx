import { Head, usePage } from '@inertiajs/react';
import Layout from "@/Layouts/layout/layout.jsx";
import SearchForm from './Partials/SearchForm';
import CreateForm from './Partials/CreateForm';
import EditForm from './Partials/EditForm';
import React, { useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Index() {
    const { props } = usePage();
    const prefectures = props.prefectures || [];

    const [showCreate, setShowCreate] = useState(false);
    const [editCompany, setEditCompany] = useState(null);

    const handleCreateClick = () => {
        setEditCompany(null); // clear edit state
        setShowCreate(true);
    };

    const handleEditClick = (company) => {
        setShowCreate(false);
        setEditCompany(company); // set company to edit
    };

    const handleCloseForm = () => {
        setShowCreate(false);
        setEditCompany(null);
    };


    return (
        <Layout>
            <Head title="Company" />

            <div className="grid">
                <div className="col-12">
                    <div className="card">
                        <SearchForm handleEditClick={handleEditClick} />
                        {/* <div className="flex justify-content-end mb-3">
                            <button className="btn btn-primary" onClick={handleCreateClick}>
                                Create Company
                            </button>
                        </div> */}


                        <div className="mt-5 mb-4 text-left">
                            {/* <PrimaryButton label="Create Company" icon="pi pi-plus" severity="success" onClick={() => router.get(route('companies.create'))} /> */}
                            <PrimaryButton label="Create Company" icon="pi pi-plus" severity="success" onClick={handleCreateClick} />
                        </div>   

                        {showCreate && (
                            <CreateForm onClose={handleCloseForm} prefectures={prefectures}/>
                        )}

                        {editCompany && (
                            <EditForm company={editCompany} onClose={handleCloseForm} />
                        )}

                        
                    </div>
                </div>
            </div>
        </Layout>
    );
}
